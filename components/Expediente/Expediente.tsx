"use client";
import { Button, Tabs, Tab, CardBody, Input } from "@heroui/react";
import React, { useState, useEffect } from 'react';
import { Card, Chip, cn } from "@heroui/react";
import { Icon } from "@iconify/react";
import config from "../../config/config";
import { Select, SelectItem } from "@heroui/react";
import { Checkbox } from "@heroui/checkbox";
import { getUserLocation } from '../Utilidades';
import PreloaderBar from "../login/PreloaderBar";
import { SubirDocumentoInput } from "../ComponentesAxion/expediente/SubirDocumentoInput";
import { generarMesesDesde } from "../Utilidades";

/* ========================
   CONFIGURACIÓN VISUAL TARJETAS
========================= */
const INPUT_HEIGHT = "h-8";
const INPUT_TEXT = "text-sm";

/* ========================
   CONFIGURACIÓN VISUAL DE INFORMACIÓN COMPLEMENTARIA
======================== */
const FIELD_HEIGHT = "h-11";
const FIELD_TEXT = "text-sm";
const FIELD_RADIUS = "rounded-xl";
const FIELD_WIDTH = "w-full";

const selectStyles = {
  base: FIELD_WIDTH,
  trigger: `
      ${FIELD_HEIGHT}
      bg-[#eeefef]
      dark:bg-[#2F3A3F]
      data-[hover=true]:bg-[#dcdede]
      dark:data-[hover=true]:bg-[#374247]
      data-[focus=true]:bg-[#dcdede]
      dark:data-[focus=true]:bg-[#4e595f]
      focus-within:bg-[#4C585E]
      dark:focus-within:bg-[#4e595f]
      ${FIELD_RADIUS}
      border border-transparent
      transition-colors
    `,
  label: "!text-zinc-400 text-xs",
  value: `!text-zinc-600 dark:!text-white ${FIELD_TEXT}`,
  popoverContent: `
    bg-white
    dark:bg-[#2F3A3F]
    border border-zinc-200
    dark:border-zinc-700
  `,

  listbox: `
      bg-white
      dark:bg-[#2F3A3F]
      scrollbar-thin
      scrollbar-thumb-zinc-400
      dark:scrollbar-thumb-zinc-600      
    `,

  listboxItem: `
      text-zinc-600
      dark:text-zinc-100

      data-[hover=true]:bg-zinc-100
      dark:data-[hover=true]:bg-[#374247]

      data-[selected=true]:bg-zinc-200
      dark:data-[selected=true]:bg-[#4e595f]
    `,
};

const inputStyles = {
  inputWrapper: `
      bg-[#eeefef]
      dark:bg-[#2F3A3F]
      data-[filled=true]:text-zinc-500
      data-[hover=true]:bg-[#dcdede]
      dark:data-[hover=true]:bg-[#374247]
      data-[focus=true]:bg-[#dcdede]
      dark:data-[focus=true]:bg-[#4e595f]
      focus-within:bg-[#4C585E]
      dark:focus-within:bg-[#4e595f]      
      ${FIELD_RADIUS}
      border border-transparent
      transition-colors          
    `,
  input: `
      ${FIELD_TEXT}      
      !text-zinc-600
      dark:!text-zinc-600
      placeholder:text-zinc-400 //color de texto label 
      dark:caret-white
      caret-dark
    `,
  innerWrapper: "text-zinc-600",
  value: `!text-zinc-600 dark:!text-white ${FIELD_TEXT}`,

};

// constantes para botones dentro de TABS
const BUTTON_INACTIVE_BG = "!bg-transparent border-2 border-[#8C9296]";
const BUTTON_INACTIVE_TEXT = "text-[#8C9296]";
const BUTTON_ACTIVE_BG = "bg-primary-100 hover:bg-primary-50 dark:hover:bg-[#34cacc] dark:bg-[#40a6a6]";
const BUTTON_ACTIVE_TEXT = "text-white";

interface Documentos {
  estatus: number;
  nombredocumento: string;
}

type TrendCardProps = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "neutral" | "negative";
  trendType: "up" | "neutral" | "down";
};

const cardsData: TrendCardProps[] = [
  {
    title: "Contratos Activos",
    value: "24",
    change: "12%",
    changeType: "positive",
    trendType: "up",
  },
  {
    title: "Contratos Firmados",
    value: "120",
    change: "8%",
    changeType: "positive",
    trendType: "up",
  },
  {
    title: "Contratos Pendientes",
    value: "6",
    change: "0%",
    changeType: "neutral",
    trendType: "neutral",
  },
  {
    title: "Contratos Vencidos",
    value: "3",
    change: "5%",
    changeType: "negative",
    trendType: "down",
  },
  {
    title: "Contratos Totales",
    value: "153",
    change: "10%",
    changeType: "positive",
    trendType: "up",
  },
];

const TrendCard = ({
  title,
  value,
  change,
  changeType,
  trendType,
}: TrendCardProps) => {


  return (
    <Card className="relative bg-white dark:bg-[#131919] rounded-xl border border-transparent shadow-none p-4">
      <dt className="md:text-sm lg:text-xs xl:text-sm 2xl:text-sm text-default-500 font-montserrat_regular lg:max-w-[90px] xl:max-w-[90px] 2xl:max-w-[200px]">
        {title}
      </dt>
      <dd className="text-2xl font-montserrat_bold text-titles dark:text-white">
        {value}
      </dd>

      <Chip
        className="absolute top-4 right-4"
        classNames={{ content: "font-montserrat_semibold text-xs lg:text-[0.65rem] xl:text-xs" }}
        color={
          changeType === "positive"
            ? "success"
            : changeType === "neutral"
              ? "warning"
              : "danger"
        }
        radius="sm"
        size="sm"
        startContent={
          trendType === "up" ? (
            <Icon width={12} height={12} icon="solar:arrow-right-up-linear" />
          ) : trendType === "neutral" ? (
            <Icon width={12} height={12} icon="solar:arrow-right-linear" />
          ) : (
            <Icon width={12} height={12} icon="solar:arrow-right-down-linear" />
          )
        }
        variant="light"
      >
        {change}
      </Chip>
    </Card>
  );
};

interface Giros {
  descripcion: string;
  id: string;
}

interface Ingresos {
  descripcion: string;
  id: string;
}

interface Procedencias {
  descripcion: string;
  id: string;
}

interface Actividades {
  descripcion: string;
  id: string;
}

interface Fuentes {
  descripcion: string;
  id: string;
}

interface Operaciones {
  descripcion: string;
  id: string;
}

interface OpcionesMeses {
  label: string;
  value: string;
}

interface Inversiones {
  descripcion: string;
  id: string;
}

interface Mercados {
  descripcion: string;
  id: string;
}


type StatusType =
  | "pendiente"
  | "no_aprobado"
  | "en_revision"
  | "aprobado";



// CONFIGURACIÓN DE 4 VARIABLES DE ESTADO DE ENVÍO DE DOCUMENTOS
const STATUS_CONFIG: Record<
  StatusType,
  {
    label: string;
    text: string;
    bg: string;
    border: string;
  }
> = {
  pendiente: {
    label: "Pendiente",
    text: "text-white dark:text-white",
    bg: "bg-[#f18618] dark:bg-[#f18618]",
    border: "border-1 border-[#f18618] dark:border-white",
  },
  no_aprobado: {
    label: "No aprobado",
    text: "text-white dark:text-white",
    bg: "bg-[#e73845] dark:bg-[#e73845]",
    border: "border-1 border-[#e73845] dark:border-white",
  },
  en_revision: {
    label: "En revisión",
    text: "text-white dark:text-white",
    bg: "bg-[#feca05] dark:bg-[#feca05]",
    border: "border-1 border-[#feca05] dark:border-white",
  },
  aprobado: {
    label: "Aprobado",
    text: "text-white dark:text-white",
    bg: "bg-[#5cbc2d] dark:[#5cbc2d]",
    border: "border-1 border-[#5cbc2d] dark:border-white",
  },
};



export const Expediente = () => {

  const [verModal, setVerModal] = useState(false);
  const [documentos, setDocumentos] = useState<Documentos[]>([]);

  const [nombre, setNombre] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");
  const [fechanacimiento, setFechaNacimiento] = useState("");
  const [idinterno, setIdInterno] = useState("");
  const [idcontrato, setIdContrato] = useState("");
  const [iddocumento, setIdDocumento] = useState("");
  const [nombredocumento, setNombreDocumento] = useState("");
  const [FIEL, setFIEL] = useState("");

  const [persona, setPersona] = useState("fisica");

  const [fechaEdoDeCuenta, setFechaEdoDeCuenta] = useState<string>("");

  const [opcionesEdoCuenta, setopcionesEdoCuenta] = useState<OpcionesMeses[]>([]);

  // const [statusComprobanteDomiclio, setStatusComprobanteDomiclio] = useState("*");
  // const [statusEstadoDeCuenta, setStatusEstadoDeCuenta] = useState("*");
  // const [statusIdentificacionFrente, setStatusIdentificacionFrente] = useState("*");
  // const [statusIdentificacionReverso, setStatusIdentificacionReverso] = useState("*");
  // const [statusCURP, setStatusCURP] = useState("*");
  // const [statusRFC, setStatusRFC] = useState("*");

  //Nuevas Constantes para estado en TABS
  const [statusComprobanteDomiclio, setStatusComprobanteDomiclio] = useState<StatusType | null>(null);
  const [statusEstadoDeCuenta, setStatusEstadoDeCuenta] = useState<StatusType | null>(null);
  const [statusIdentificacionFrente, setStatusIdentificacionFrente] = useState<StatusType | null>(null);
  const [statusIdentificacionReverso, setStatusIdentificacionReverso] = useState<StatusType | null>(null);
  const [statusCURP, setStatusCURP] = useState<StatusType | null>(null);
  const [statusRFC, setStatusRFC] = useState<StatusType | null>(null);



  // Control de archivos seleccionados
  const [fileComprobanteReady, setFileComprobanteReady] = useState(false);
  const [fileEstadoReady, setFileEstadoReady] = useState(false);
  const [fileINEFrenteReady, setFileINEFrenteReady] = useState(false);
  const [fileINEReversoReady, setFileINEReversoReady] = useState(false);
  const [fileCURPReady, setFileCURPReady] = useState(false);
  const [fileRFCReady, setFileRFCReady] = useState(false);




  const [giros, setGiros] = useState<Giros[]>([]);
  const [giro, setGiro] = useState('');
  const [nombregiro, setNombreGiro] = useState('');

  const [ingresos, setIngresos] = useState<Ingresos[]>([]);
  const [ingreso, setIngreso] = useState('');
  const [nombreingreso, setnombreIngreso] = useState('');

  const [procedencias, setProcedencias] = useState<Procedencias[]>([]);
  const [procedencia, setProcedencia] = useState('');
  const [nombreprocedencia, setNombreProcedencia] = useState('');

  const [actividades, setActividades] = useState<Procedencias[]>([]);
  const [actividad, setActividad] = useState('');
  const [nombreactividad, setNombreActividad] = useState('');

  const [fuentes, setFuentes] = useState<Fuentes[]>([]);
  const [fuente, setFuente] = useState('');
  const [nombrefuente, setNombreFuente] = useState('');

  const [operaciones, setOperaciones] = useState<Operaciones[]>([]);
  const [operacion, setOperacion] = useState('');
  const [nombreoperacion, setNombreOperacion] = useState('');

  const [inversiones, setInversiones] = useState<Inversiones[]>([]);
  const [inversion, setInversion] = useState('');
  const [nombreinversion, setNombreInversion] = useState('');

  const [mercados, setMercados] = useState<Mercados[]>([]);
  const [mercado, setMercado] = useState('');
  const [nombremercados, setNombreMercados] = useState('');
  const [mercadosdefault, setMercadosDefault] = useState('');

  const [ocupacion, setOcupacion] = useState('');

  const [empresarial, setEmpresarial] = useState('0');

  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const [dataexist, setDataExist] = useState(false);

  const [loading, setLoading] = useState(false);

  const [txtConsulta, settxtConsulta] = useState("");
  const [txtConsultaContrato, settxtConsultaContrato] = useState("");

  useEffect(() => {

    let opciones = generarMesesDesde(localStorage.getItem("fecharegistro_axnweb") + "")

    setopcionesEdoCuenta(opciones);

    getDocumentos();

    getInformacionTransaccional();

    getUserLocation().then(setLocation);

    setNombre(localStorage.getItem("nombreusuario_axnweb") + "");
    setPaterno(localStorage.getItem("paternog_axnweb") + "");
    setMaterno(localStorage.getItem("maternog_axnweb") + "");

    setPersona( localStorage.getItem("persona_axnweb") + "" );

    setIdInterno(localStorage.getItem("idexternog_axnweb") + "");

    setEmail(localStorage.getItem("email_axnweb") + "");
    setDireccion(localStorage.getItem("direccion_axnweb") + "");
    setCelular(localStorage.getItem("celular_axnweb") + "");
    setFechaNacimiento(localStorage.getItem("fechanacimiento_axnweb") + "");

    setIdContrato(localStorage.getItem("idcontrato_axnweb") + "");

    getEstatusDocumento("Comprobante domicilio");

    getGiros();
    getIngresos();
    getProcedencias();

    if (giro != '')
      getActividades(giro);

    getFuentes();
    getOperaciones();
    getInversiones();
    getMercados();

  }, []);

  /*OBTENER LISTADO DE GIROS*/
  const getGiros = async () => {
    try {
      const response = await fetch(config.baseUrlAPI + "tiposgiros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      //console.log(result);

      const parsedData: Giros[] = JSON.parse(result.data);
      setGiros(parsedData);

    } catch (error) {
      console.error(error);
    }
  };

  /*OBTENER LISTADO DE INGRESOS*/
  const getIngresos = async () => {
    try {
      const response = await fetch(config.baseUrlAPI + "tiposingresos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      const parsedData: Ingresos[] = JSON.parse(result.data);
      setIngresos(parsedData);

    } catch (error) {
      console.error(error);
    }
  };

  /*OBTENER LISTADO DE INGRESOS*/
  const getProcedencias = async () => {
    try {
      const response = await fetch(config.baseUrlAPI + "tiposprocedencias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      const parsedData: Procedencias[] = JSON.parse(result.data);
      setProcedencias(parsedData);

    } catch (error) {
      console.error(error);
    }
  };

  /*OBTENER LISTADO DE ACTIVIDADES*/
  const getActividades = async (giro_search: string) => {

    if (giro_search === '') return;

    const datasend = JSON.stringify({
      idrecurso: giro_search
    });

    console.log(datasend);

    try {
      const response = await fetch(config.baseUrlAPI + "tiposactividades", {
        method: "POST",
        body: datasend,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      const parsedData: Actividades[] = JSON.parse(result.data);
      setActividades(parsedData);

    } catch (error) {
      console.error(error);
    }
  };

  /*OBTENER LISTADO DE FUENTES*/
  const getFuentes = async () => {
    try {
      const response = await fetch(config.baseUrlAPI + "tiposfuentes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      const parsedData: Fuentes[] = JSON.parse(result.data);
      setFuentes(parsedData);

    } catch (error) {
      console.error(error);
    }
  };

  /*OBTENER LISTADO DE OPERACIONES*/
  const getOperaciones = async () => {

    try {
      const response = await fetch(config.baseUrlAPI + "tiposoperaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      const parsedData: Operaciones[] = JSON.parse(result.data);
      setOperaciones(parsedData);

    } catch (error) {
      console.error(error);
    }
  };

  /*OBTENER LISTADO DE TIPOS DE INVERSIONES*/
  const getInversiones = async () => {

    try {
      const response = await fetch(config.baseUrlAPI + "tiposinversiones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      const parsedData: Inversiones[] = JSON.parse(result.data);
      setInversiones(parsedData);

    } catch (error) {
      console.error(error);
    }
  };

  const getMercados = async () => {

    try {
      const response = await fetch(config.baseUrlAPI + "tiposmercados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      const parsedData: Mercados[] = JSON.parse(result.data);
      setMercados(parsedData);

    } catch (error) {
      console.error(error);
    }
  };

  const getDocumentos = async () => {

    const datasend = JSON.stringify({
      uuid: localStorage.getItem("uuidg_axnweb")
    });

    console.log(datasend);

    try {
      const response = await fetch(config.baseUrlAPI + "fisicas/estatus/documentos", {
        method: "POST",
        body: datasend,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      console.log(result);

      setDocumentos(result);

    } catch (error) {
      console.error(error);
    }
  };


  const getEstatusDocumento = (nombre: string): StatusType => {
    for (let i = 0; i < documentos.length; i++) {
      if (documentos[i].nombredocumento === nombre) {
        switch (documentos[i].estatus) {
          case 1:
            return "en_revision";
          case 2:
            return "no_aprobado";
          case 3:
            return "aprobado";
          default:
            return "pendiente";
        }
      }
    }

    return "pendiente";
  };


  //Estado Único para INE frente y vuelta
  const getEstatusIdentificacion = (): StatusType => {
    const frente =
      statusIdentificacionFrente ??
      getEstatusDocumento("Identificación frente");

    const reverso =
      statusIdentificacionReverso ??
      getEstatusDocumento("Identificación reverso");

    // 1. Si alguno está pendiente → pendiente
    if (frente === "pendiente" || reverso === "pendiente") {
      return "pendiente";
    }

    // 2. Si alguno no aprobado → no aprobado
    if (frente === "no_aprobado" || reverso === "no_aprobado") {
      return "no_aprobado";
    }

    // 3. Si ambos en revisión
    if (frente === "en_revision" && reverso === "en_revision") {
      return "en_revision";
    }

    // 4. Si ambos aprobados
    if (frente === "aprobado" && reverso === "aprobado") {
      return "aprobado";
    }

    return "pendiente";
  };

  const getEdoCuenta = async () => {

    let fecha = fechaEdoDeCuenta.split("-");

    settxtConsulta("Consultando...");
    let personaL = 'fisica';

    if( localStorage.getItem( "persona_axnweb" ) === 'moral' )
      personaL = 'moral';

    settxtConsulta("Consultando...");

    const datasend = JSON.stringify({
      token: localStorage.getItem("token_axnweb"),
      uuid: localStorage.getItem("uuidg_axnweb"),
      mes: fecha[1].substring(0, 1) === "0" ? fecha[1].substring(1, 2) : fecha[1],
      anio: fecha[0],
      idcontrato: idcontrato,
      persona: personaL
    });

    const baseURL = config.baseUrlAPI + "contratos/estatus/cuenta";

    try {
      const response = await fetch(baseURL, {
        method: "POST",
        body: datasend,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // No especificamos el tipo todavía

      if (result.auth) {

        alert(result.K);

      }
    } catch (error) {
      console.error("Error fetching data**:", error);
      alert("Estado de cuenta no encontrado");
    }

    settxtConsulta("");
  }

  const getContrato = async () => {

    settxtConsultaContrato("Consultando...");
    let personaL = 'fisica';

    if( localStorage.getItem( "persona_axnweb" ) === 'moral' )
      personaL = 'moral';

    const datasend = JSON.stringify({
      token: localStorage.getItem("token_axnweb"),
      uuid: localStorage.getItem("uuidg_axnweb"),
      idcontrato: idcontrato,
      persona: personaL
    });

    const baseURL = config.baseUrlAPI + "contratos/estatus/contrato/descargar";

    try {
      const response = await fetch(baseURL, {
        method: "POST",
        body: datasend,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // No especificamos el tipo todavía

      console.log( result );

      if (result.auth) {

        alert(result.K);

      }
    } catch (error) {
      console.error("Error fetching data**:", error);
      alert("El contrato no pudo ser enviado");
    }

    settxtConsultaContrato("");
  }

  const actualizarInformacionTransaccional = async () => {

    setLoading(true);

    const datasend = JSON.stringify({
      token: localStorage.getItem("token_axnweb"),
      uuid: localStorage.getItem("uuidg_axnweb"),
      idcontrato: idcontrato,
      giro: giro,
      ocupacion: ocupacion,
      nombregiro: nombregiro,
      ingreso: ingreso,
      nombreingreso: nombreingreso,
      procedencia: procedencia,
      nombreprocedencia: nombreprocedencia,
      actividad: actividad,
      nombreactividad: nombreactividad,
      fuente: fuente,
      nombrefuente: nombrefuente,
      operacion: operacion,
      nombreoperacion: nombreoperacion,
      inversion: inversion,
      nombreinversion: nombreinversion,
      mercados: mercado.replaceAll(",", "_"),
      nombremercados: nombremercados,
      fiel: FIEL,
      empresarial: empresarial,
      latitud: "" + location.lat,
      longitud: "" + location.lng
    });

    console.log(datasend);

    let baseURL = config.baseUrlAPI + "infotransaccional/add";

    if (dataexist)
      baseURL = config.baseUrlAPI + "infotransaccional/update";

    try {
      const response = await fetch(baseURL, {
        method: "POST",
        body: datasend,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // No especificamos el tipo todavía

      console.log(result);

      if (result.auth) {

        if (result.auth === "ERRORDATA") {
          setLoading(false);
          return;
        }
        if (result.auth === "OKPROCCES") {
          setGiro(result.data.giro);
          setIngreso(result.data.ingreso);
          setProcedencia(result.data.procedencia);
          setActividad(result.data.actividad);
          setFuente(result.data.fuente);
          setOperacion(result.data.operacion);
          setInversion(result.data.inversion);
          setFIEL(result.data.fiel);
          setEmpresarial(result.data.empresarial);
          setMercadosDefault(result.data.nombremercados);
          setOcupacion(result.data.ocupacion);
          alert( "Información actualizada" )
        }

      }
    } catch (error) {
      console.error("Error fetching data*:", error);
      alert( "La información no se pudo actualizar, por favor vuelva a intentarlo." );
      setLoading(false);
    }

    setLoading(false);
    getInformacionTransaccional();
  }

  const getInformacionTransaccional = async () => {

    const datasend = JSON.stringify({
      token: localStorage.getItem("token_axnweb"),
      uuid: localStorage.getItem("uuidg_axnweb")
    });

    const baseURL = config.baseUrlAPI + "infotransaccional/get";

    try {
      const response = await fetch(baseURL, {
        method: "POST",
        body: datasend,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // No especificamos el tipo todavía

      console.log(result);

      if (result.auth) {

        if (result.auth === "ERRORDATA") {
          return false;
        }
        if (result.auth === "OKDATA") {

          setGiro(result.data.giro);
          setNombreGiro(result.data.nombregiro);

          setIngreso(result.data.ingreso);
          setnombreIngreso(result.data.nombreingreso);

          setProcedencia(result.data.procedencia);
          setNombreProcedencia(result.data.nombreprocedencia);

          setActividad(result.data.actividad);
          setNombreActividad(result.data.nombreactividad);
          getActividades(result.data.giro);

          setFuente(result.data.fuente);
          setNombreFuente(result.data.nombrefuente);

          setOperacion(result.data.operacion);
          setNombreOperacion(result.data.nombreoperacion);

          setInversion(result.data.inversion);
          setNombreInversion(result.data.nombreinversion);

          setFIEL(result.data.fiel);

          setEmpresarial(result.data.empresarial);

          setMercadosDefault(result.data.nombremercados);
          setMercado(result.data.mercados)
          setNombreMercados(result.data.nombremercados);

          setOcupacion(result.data.ocupacion);

          setDataExist(true);

          console.log("Información ya existe");
        }

      }
    } catch (error) {
      console.error("Error fetching data**:", error);
    }
  }

  // Estados para tabs
  const actualizarstatusdocumento = (nombre: string) => {
    switch (nombre) {
      case "Comprobante domicilio":
        setStatusComprobanteDomiclio("en_revision");
        break;
      case "Estado de cuenta":
        setStatusEstadoDeCuenta("en_revision");
        break;
      case "Identificación frente":
        setStatusIdentificacionFrente("en_revision");
        break;
      case "Identificación reverso":
        setStatusIdentificacionReverso("en_revision");
        break;
      case "CURP":
        setStatusCURP("en_revision");
        break;
      case "RFC":
        setStatusRFC("en_revision");
        break;
    }
  };



  // Estado del botón COMPROBANTE
  const isComprobanteDisabled =
    !fileComprobanteReady ||
    getEstatusDocumento("Comprobante domicilio") === "en_revision" ||
    statusComprobanteDomiclio === "en_revision";

  // Estado del botón ESTADO DE CUENTA
  const isEstadoDisabled =
    !fileEstadoReady ||
    getEstatusDocumento("Estado de cuenta") === "en_revision" ||
    statusEstadoDeCuenta === "en_revision";

  // Estado del botón INE FRENTE
  const isINEFrenteDisabled =
    !fileINEFrenteReady ||
    getEstatusIdentificacion() === "en_revision" ||
    statusIdentificacionFrente === "en_revision";

  // Estado del botón INE VUELTA
  const isINEReversoDisabled =
    !fileINEReversoReady ||
    getEstatusIdentificacion() === "en_revision" ||
    statusIdentificacionReverso === "en_revision";

  // Estado del botón CURP
  const isCURPDisabled =
    !fileCURPReady ||
    getEstatusDocumento("CURP") === "en_revision" ||
    statusCURP === "en_revision";

  // Estado del botón RFC
  const isRFCDisabled =
    !fileRFCReady ||
    getEstatusDocumento("RFC") === "en_revision" ||
    statusRFC === "en_revision";


  return (
    <div className="space-y-6">


      {/* Sección SUBIDA DE DOCUMENTOS */}
      <div className="grid grid-cols-6 gap-5 mt-0 md:mt-0 lg:-mt-3 xl:-mt-3 2xl:-mt-3">
        <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 bg-white dark:bg-[#131919] rounded-xl">

          {/* Elemento tabs*/}
          <div className="p-4">

            <p className="font-montserrat_bold text-titles dark:text-white mb-4">
              <span className="text-[20px]">ID. Axion: {idinterno}</span><br />
              <span className="text-[20px]">No. Contrato: {idcontrato === "0" || idcontrato === "null" ? "Validando información" : idcontrato}</span>
            </p>

            <Tabs
              aria-label="Documentos requeridos"
              variant="solid"
              color="secondary"
              classNames={{
                tab: "text-[9px] sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-sm font-montserrat_medium "
              }}
            >

              {/* -- Tab COMPROBANTE -- */}
              <Tab
                key="comprobante"
                title="Comprobante">
                <Card shadow="none">
                  <CardBody>

                    {/* Estatus COMPROBANTE */}
                    {(() => {
                      const status =
                        statusComprobanteDomiclio ??
                        getEstatusDocumento("Comprobante domicilio");

                      return (
                        <div
                          className={`mt-5 px-4 py-1 inline-block w-fit rounded-2xl border ${STATUS_CONFIG[status].bg} ${STATUS_CONFIG[status].border}`}
                        >
                          <p
                            className={`font-montserrat_regular text-[11px] md:text-xs ${STATUS_CONFIG[status].text}`}
                          >
                            <span className="font-montserrat_semibold">Estatus:</span>{" "}
                            {STATUS_CONFIG[status].label}
                          </p>
                        </div>
                      );
                    })()}


                    { getEstatusDocumento("Comprobante domicilio") === "pendiente" || getEstatusDocumento("Comprobante domicilio") === "no_aprobado" ?

                    <>

                    <p className="mt-6 font-montserrat_bold text-sm sm:text-sm md:text-sm xl:text-base">COMPROBANTE DE DOMICILIO </p>

                    <p className="font-montserrat_regular">Por favor sube tu comprobante de domicilio más reciente.</p>

                    <div className="mt-2">
                      <SubirDocumentoInput
                        iddocumento="1"
                        nombredocumento="Comprobante domicilio"
                        actualizarstatusdocumento={actualizarstatusdocumento}
                        onFileSelected={(hasFile: boolean) => setFileComprobanteReady(hasFile)}
                      />
                    </div>
                    </>

                    :null }

                    {/* Botón subir */}
                    {/* <div className="mt-10">
                        {idcontrato != '0' ? (

                          <Button
                            className={`
                              w-40
                              ${isComprobanteDisabled
                                ? `${BUTTON_INACTIVE_BG} ${BUTTON_INACTIVE_TEXT}`
                                : `${BUTTON_ACTIVE_BG} ${BUTTON_ACTIVE_TEXT}`
                              }
                            `}
                            isDisabled={isComprobanteDisabled}
                            onPress={() => {
                              document.getElementById("fileInput-1")?.click();
                            }}
                          >
                            <p className="font-montserrat_semibold text-sm">Subir</p>
                          </Button>

                        ) : (
                          <>Contrato en revisión</>
                        )}
                      </div> */}

                  </CardBody>
                </Card>
              </Tab>

              {/* -- Tab ESTADO DE CUENTA -- */}
              <Tab key="estado" title="Estado de cuenta">
                <Card shadow="none">
                  <CardBody>


                    {/* Estatus ESTADO DE CUENTA */}
                    {(() => {
                      const status =
                        statusEstadoDeCuenta ??
                        getEstatusDocumento("Estado de cuenta");

                      return (
                        <div
                          className={`mt-5 px-4 py-1 inline-block w-fit rounded-2xl border ${STATUS_CONFIG[status].bg} ${STATUS_CONFIG[status].border}`}
                        >
                          <p
                            className={`font-montserrat_regular text-[11px] md:text-xs ${STATUS_CONFIG[status].text}`}
                          >
                            <span className="font-montserrat_semibold">Estatus:</span>{" "}
                            {STATUS_CONFIG[status].label}
                          </p>
                        </div>
                      );
                    })()}



                    {/* Funcion SUBIDA de documento */}
                    { getEstatusDocumento("Estado de cuenta") === "pendiente" || getEstatusDocumento("Estado de cuenta") === "no_aprobado" ?
                      <>

                        <p className="mt-6 font-montserrat_bold text-sm sm:text-sm md:text-sm xl:text-base">ESTADO DE CUENTA{statusEstadoDeCuenta}</p>
                        <p className="font-montserrat_regular">Por favor sube tu estado de cuenta más reciente.</p>

                        <div className="mt-2">

                          <SubirDocumentoInput
                            iddocumento="2"
                            nombredocumento="Estado de cuenta"
                            actualizarstatusdocumento={actualizarstatusdocumento}
                            onFileSelected={(hasFile: boolean) => setFileEstadoReady(hasFile)}
                          />
                        </div>
                      </>
                      : null}

                    {/* Botón subir */}
                    {/* <div className="mt-10">
                      {idcontrato != '0' ? (
                        <Button
                          className={`
                            w-40
                            ${isEstadoDisabled ? BUTTON_INACTIVE_BG : BUTTON_ACTIVE_BG}
                            ${isEstadoDisabled ? BUTTON_INACTIVE_TEXT : BUTTON_ACTIVE_TEXT}
                          `}
                          isDisabled={isEstadoDisabled}
                          onPress={() => {
                            document.getElementById("fileInput-2")?.click();
                          }}
                        >
                          <p className="font-montserrat_semibold text-sm">Subir</p>
                        </Button>
                      ) : (
                        <>Contrato en revisión</>
                      )}
                    </div> */}




                  </CardBody>
                </Card>
              </Tab>

              {/* -- Tab IDENTIFICACIÓN FRENTE Y VUELTA -- */}
              <Tab key="ine_frente" title="Identificación">
                <Card shadow="none">
                  <CardBody className="">

                    {/* Estatus ID frente */}
                    {(() => {
                      const status = getEstatusIdentificacion();

                      return (
                        <div
                          className={`mt-5 px-4 py-1 inline-block w-fit rounded-2xl border ${STATUS_CONFIG[status].bg} ${STATUS_CONFIG[status].border}`}
                        >
                          <p
                            className={`font-montserrat_regular text-[11px] md:text-xs ${STATUS_CONFIG[status].text}`}
                          >
                            <span className="font-montserrat_semibold">Estatus:</span>{" "}
                            {STATUS_CONFIG[status].label}
                          </p>
                        </div>
                      );
                    })()}


                    {/* Elemento central 2 columnas */}
                    { getEstatusIdentificacion() === 'pendiente' && idcontrato != '' && idcontrato != 'null' && idcontrato != '0' ?
                      <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-4 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-12">

                        {/* Elemento izquierdo */}
                        <div className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1">

                          {/* Funcion SUBIDA de documento */}
                          
                          <p className="font-montserrat_bold text-sm sm:text-sm md:text-sm xl:text-base">IDENTIFICACIÓN OFICIAL (ANVERSO) </p>
                          <p className="font-montserrat_regular">Por favor sube una fotografía de la parte frontal de tu identificación oficial (INE).
                          </p>

                          <div className="mt-8 sm:mt-8 md:mt-6 lg:mt-6 xl:mt-8">
                            <SubirDocumentoInput
                              iddocumento="3"
                              nombredocumento="Identificación frente"
                              actualizarstatusdocumento={actualizarstatusdocumento}
                              onFileSelected={(hasFile: boolean) => setFileINEFrenteReady(hasFile)}
                            />
                          </div>


                          {/* Botón subir */}
                          {/* <div className="mt-10">
                                    {idcontrato != '0' ? (

                                      <Button
                                        className={`
                                          w-40
                                          ${isINEFrenteDisabled
                                            ? `${BUTTON_INACTIVE_BG} ${BUTTON_INACTIVE_TEXT}`
                                            : `${BUTTON_ACTIVE_BG} ${BUTTON_ACTIVE_TEXT}`
                                          }
                                        `}
                                        isDisabled={isINEFrenteDisabled}
                                        onPress={() => {
                                          document.getElementById("fileInput-3")?.click();
                                        }}
                                      >
                                        <p className="font-montserrat_semibold text-sm">Subir</p>
                                      </Button>

                                    ) : (
                                      <>Contrato en revisión</>
                                    )}
                                </div>                      */}

                        </div>


                        {/* Elemento derecho */}
                        <div className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 mt-10 sm:mt-10 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0">

                          {/* Estatus foto ID vuelta */}
                          {/* <div className="mt-5 border-1 px-5 py-1 inline-block w-fit rounded-2xl">  
                                    <p className="font-montserrat_regular text-sm md:text-base">
                                      <span className="font-montserrat_semibold">Estatus:</span>{" "}
                                      <span className="font-montserrat_regular">
                                        {statusIdentificacionReverso === '*'
                                          ? getEstatusDocumento("Identificación reverso")
                                          : statusIdentificacionReverso}
                                      </span>
                                    </p>
                                  </div>   */}

                          <p className="font-montserrat_bold text-sm sm:text-sm md:text-sm xl:text-base">IDENTIFICACIÓN OFICIAL (REVERSO)
                          </p>
                          <p className="font-montserrat_regular">Por favor sube una fotografía de la parte posterior de tu identificación oficial (INE).
                          </p>


                          {/* Funcion SUBIDA de documento */}
                          <div className="mt-8 sm:mt-6 md:mt-6 xl:mt-8">
                            <SubirDocumentoInput
                              iddocumento="4"
                              nombredocumento="Identificación reverso"
                              actualizarstatusdocumento={actualizarstatusdocumento}
                              onFileSelected={(hasFile: boolean) => setFileINEReversoReady(hasFile)}
                            />
                          </div>

                          {/* Botón subir */}
                          {/* <div className="mt-10">
                                    {idcontrato != '0' ? (

                                      <Button
                                        className={`
                                          w-40
                                          ${isINEReversoDisabled
                                            ? `${BUTTON_INACTIVE_BG} ${BUTTON_INACTIVE_TEXT}`
                                            : `${BUTTON_ACTIVE_BG} ${BUTTON_ACTIVE_TEXT}`
                                          }
                                        `}
                                        isDisabled={isINEReversoDisabled}
                                        onPress={() => {
                                          document.getElementById("fileInput-3")?.click();
                                        }}
                                      >
                                        <p className="font-montserrat_semibold text-sm">Subir</p>
                                      </Button>

                                    ) : (
                                      <>Contrato en revisión</>
                                    )}
                                </div>    */}


                        </div>


                      </div> : null}

                  </CardBody>
                </Card>
              </Tab>

              {/* --  Tab CURP -- */}
              <Tab key="curp" title="CURP">
                <Card shadow="none">
                  <CardBody>

                    {/* Estatus CURP */}
                    {(() => {
                      const status =
                        statusCURP ??
                        getEstatusDocumento("CURP");

                      return (
                        <div
                          className={`mt-5 px-4 py-1 inline-block w-fit rounded-2xl border ${STATUS_CONFIG[status].bg} ${STATUS_CONFIG[status].border}`}
                        >
                          <p
                            className={`font-montserrat_regular text-[11px] md:text-xs ${STATUS_CONFIG[status].text}`}
                          >
                            <span className="font-montserrat_semibold">Estatus:</span>{" "}
                            {STATUS_CONFIG[status].label}
                          </p>
                        </div>
                      );
                    })()}

                    {getEstatusDocumento("CURP") === 'pendiente' ?
                      <>

                        <p className="mt-6 font-montserrat_bold text-sm sm:text-sm md:text-sm xl:text-base">CURP</p>
                        <p className="font-montserrat_regular">Por favor suba su CURP más reciente.</p>


                        {/* Funcion SUBIDA de documento */}
                        <div className="mt-2">
                          <SubirDocumentoInput
                            iddocumento="5"
                            nombredocumento="CURP"
                            actualizarstatusdocumento={actualizarstatusdocumento}
                            onFileSelected={(hasFile: boolean) => setFileCURPReady(hasFile)}
                          />
                        </div>
                      </>

                      : null}

                    {/* Botón subir */}
                    {/* <div className="mt-10">
                        {idcontrato != '0' ? (
                          <Button
                            className={`
                              w-40
                              ${isCURPDisabled
                                ? `${BUTTON_INACTIVE_BG} ${BUTTON_INACTIVE_TEXT}`
                                : `${BUTTON_ACTIVE_BG} ${BUTTON_ACTIVE_TEXT}`
                              }
                            `}
                            isDisabled={isCURPDisabled}
                            onPress={() => {
                              document.getElementById("fileInput-5")?.click();
                            }}
                          >
                            <p className="font-montserrat_semibold text-sm">Subir</p>
                          </Button>

                        ) : (
                          <>Contrato en revisión</>
                        )}
                      </div> */}




                  </CardBody>
                </Card>
              </Tab>

              {/* --  Tab RFC -- */}
              <Tab key="rfc" title="RFC">
                <Card shadow="none">
                  <CardBody>

                    {/* Estatus RFC */}
                    {(() => {
                      const status =
                        statusRFC ??
                        getEstatusDocumento("RFC");

                      return (
                        <div
                          className={`mt-5 px-4 py-1 inline-block w-fit rounded-2xl border ${STATUS_CONFIG[status].bg} ${STATUS_CONFIG[status].border}`}
                        >
                          <p
                            className={`font-montserrat_regular text-[11px] md:text-xs ${STATUS_CONFIG[status].text}`}
                          >
                            <span className="font-montserrat_semibold">Estatus:</span>{" "}
                            {STATUS_CONFIG[status].label}
                          </p>
                        </div>
                      );
                    })()}

                    {getEstatusDocumento("RFC") === 'pendiente' ?

                      <>

                        <p className="mt-6 font-montserrat_bold text-sm sm:text-sm md:text-sm xl:text-base">RFC</p>
                        <p className="font-montserrat_regular">Por favor suba su RFC.</p>


                        {/* Funcion SUBIDA de documento */}
                        <div className="mt-2">
                          <SubirDocumentoInput
                            iddocumento="6"
                            nombredocumento="RFC"
                            actualizarstatusdocumento={actualizarstatusdocumento}
                            onFileSelected={(hasFile: boolean) => setFileRFCReady(hasFile)}
                          />
                        </div>
                      </>

                      : null}


                    {/* Botón subir */}
                    {/* <div className="mt-10">
                        {idcontrato != '0' ? (

                          <Button
                            className={`
                              w-40
                              ${isRFCDisabled
                                ? `${BUTTON_INACTIVE_BG} ${BUTTON_INACTIVE_TEXT}`
                                : `${BUTTON_ACTIVE_BG} ${BUTTON_ACTIVE_TEXT}`
                              }
                            `}
                            isDisabled={isRFCDisabled}
                            onPress={() => {
                              document.getElementById("fileInput-6")?.click();
                            }}
                          >
                            <p className="font-montserrat_semibold text-sm">Subir</p>
                          </Button>

                        ) : (
                          <>Contrato en revisión</>
                        )}
                  </div> */}




                  </CardBody>
                </Card>
              </Tab>

            </Tabs>

          </div>

        </div>
      </div>


      {/* Sección DESCARGAS */}
      <div className="col-span-6 sm:col-span-6 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-3 bg-white dark:bg-[#131919]  rounded-xl">
        <p className="p-4 h-[50px] font-montserrat_bold text-titles dark:text-white">
          Descargas
        </p>

        {idcontrato != '0' ?
          <>

            <Select
              label="Seleccione mes"
              selectedKeys={fechaEdoDeCuenta ? [fechaEdoDeCuenta] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setFechaEdoDeCuenta(selected);
              }}
            >
              {opcionesEdoCuenta.map((item) => (
                <SelectItem key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>

            <br></br>
            <Button isDisabled={fechaEdoDeCuenta === '' || fechaEdoDeCuenta === undefined || txtConsulta != ''} color="secondary" onPress={() => getEdoCuenta()}>
              {txtConsulta === "" ? "Descargar Estado de Cuenta" : txtConsulta}
            </Button>
            <br></br> <br></br>
            <Button isDisabled={txtConsultaContrato != ''} color="secondary" onPress={() => getContrato()}>
              {txtConsultaContrato === "" ? "Descargar Contrato Digital" : txtConsultaContrato}
            </Button>
          </>
          : <>Por el momento no es posible hacer descargas</>}

      </div>


      {/* Sección Información Complementaria */}

      {persona === "fisica" || persona === "null"  ? 

      <div className="bg-white dark:bg-[#131919] rounded-xl p-6 space-y-8">

        <p className="font-montserrat_bold text-titles dark:text-white">
          Información complementaria
        </p>

        {/* FILA 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Giro con el que se relacionan sus actividades:"
            isRequired
            selectedKeys={giro ? [giro] : []}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;
              const itemSeleccionado = giros.find((i) => i.id === selectedId);

              setGiro(selectedId);
              setNombreGiro(itemSeleccionado?.descripcion ?? "");
              getActividades(selectedId);
            }}
            classNames={selectStyles}
          >
            {giros.map((giro) => (
              <SelectItem key={giro.id}>
                {giro.descripcion}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Actividad:"
            isRequired
            isDisabled={!giro || actividades.length === 0}
            selectedKeys={actividad ? [actividad] : []}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;
              const itemSeleccionado = actividades.find((i) => i.id === selectedId);

              setActividad(selectedId);
              setNombreActividad(itemSeleccionado?.descripcion ?? "");
            }}
            classNames={selectStyles}
          >
            {actividades?.map((actividad) => (
              <SelectItem key={actividad.id}>
                {actividad.descripcion}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* FILA 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Su ingreso mensual neto:"
            isRequired
            selectedKeys={ingreso ? [ingreso] : []}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;
              const itemSeleccionado = ingresos.find((i) => i.id === selectedId);

              setIngreso(selectedId);
              setnombreIngreso(itemSeleccionado?.descripcion ?? "");
            }}
            classNames={selectStyles}
          >
            {ingresos.map((ingreso) => (
              <SelectItem key={ingreso.id}>
                {ingreso.descripcion}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Procedencia de los recursos que serán invertidos:"
            isRequired
            selectedKeys={procedencia ? [procedencia] : []}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;
              const itemSeleccionado = procedencias.find((i) => i.id === selectedId);

              setProcedencia(selectedId);
              setNombreProcedencia(itemSeleccionado?.descripcion ?? "");
            }}
            classNames={selectStyles}
          >
            {procedencias.map((procedencia) => (
              <SelectItem key={procedencia.id}>
                {procedencia.descripcion}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* FILA 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Fuente de los ingresos:"
            isRequired
            selectedKeys={fuente ? [fuente] : []}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;
              const itemSeleccionado = fuentes.find((i) => i.id === selectedId);

              setFuente(selectedId);
              setNombreFuente(itemSeleccionado?.descripcion ?? "");
            }}
            classNames={selectStyles}
          >
            {fuentes.map((fuente) => (
              <SelectItem key={fuente.id}>
                {fuente.descripcion}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Números de operaciones a realizar por mes:"
            isRequired
            selectedKeys={operacion ? [operacion] : []}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;
              const itemSeleccionado = operaciones.find((i) => i.id === selectedId);

              setOperacion(selectedId);
              setNombreOperacion(itemSeleccionado?.descripcion ?? "");
            }}
            classNames={selectStyles}
          >
            {operaciones.map((operacion) => (
              <SelectItem key={operacion.id}>
                {operacion.descripcion}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* FILA 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Estimación de inversión al mes:"
            isRequired
            selectedKeys={inversion ? [inversion] : []}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;
              const itemSeleccionado = inversiones.find((i) => i.id === selectedId);

              setInversion(selectedId);
              setNombreInversion(itemSeleccionado?.descripcion ?? "");
            }}
            classNames={selectStyles}
          >
            {inversiones.map((inversion) => (
              <SelectItem key={inversion.id}>
                {inversion.descripcion}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Tipos de mercados a los cuales invertirá:"
            isRequired
            selectionMode="multiple"
            defaultSelectedKeys={mercadosdefault}
            onSelectionChange={(keys) => {
              const selectedIds = Array.from(keys) as string[];
              setMercado(selectedIds.join(","));

              const nombresSeleccionados = mercados
                .filter((m) => selectedIds.includes(m.id))
                .map((m) => m.descripcion);

              setNombreMercados(nombresSeleccionados.join(", "));
            }}
            classNames={selectStyles}
          >
            {mercados.map((mercado) => (
              <SelectItem key={mercado.id}>
                {mercado.descripcion}
              </SelectItem>
            ))}
          </Select>
        </div>



        {/* INPUTS */}
        <div className="flex flex-col gap-6 flex flex-col">


          <Input
            isRequired
            type="text"
            value={ocupacion}
            placeholder="Ocupación*"
            onChange={(e: any) => setOcupacion(e.target.value)}
            classNames={inputStyles}
          />


          <Input
            isRequired
            type="text"
            value={FIEL}
            placeholder="Número de certificado de la FIEL*"
            onChange={(e: any) => setFIEL(e.target.value)}
            classNames={inputStyles}
          />


        </div>

        {/* CHECKBOX + BOTÓN */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4">

          <Checkbox
            defaultSelected={empresarial === '0' ? false : true}
            onChange={() =>
              empresarial === '0'
                ? setEmpresarial("1")
                : setEmpresarial("0")
            }
          >
            Cuento con actividad empresarial
          </Checkbox>

          <div className="flex items-center gap-4">
            <Button
              isDisabled={
                loading ||
                !giro ||
                !actividad ||
                !ingreso ||
                !procedencia ||
                !fuente ||
                !operacion ||
                !inversion ||
                !mercado ||
                !ocupacion ||
                !FIEL
              }
              color="secondary"
              onPress={() => actualizarInformacionTransaccional()}
            >
              Guardar
            </Button>

            {loading && <PreloaderBar />}
          </div>
        </div>
      </div>
      :null}

      {/* Sección Mini Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {cardsData.map((card, index) => (
          <TrendCard key={index} {...card} />
        ))}
      </div>



    </div>
  );
};
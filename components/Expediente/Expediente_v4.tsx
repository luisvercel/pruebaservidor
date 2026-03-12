"use client";
import { Button, Tabs, Tab, CardBody, Input } from "@heroui/react";
import React, { useState, useEffect } from 'react';
import { Card, Chip, cn } from "@heroui/react";
import { Icon } from "@iconify/react";
import config from "../../config/config";
import { Select, SelectItem } from "@heroui/react";
import { Checkbox } from "@heroui/checkbox";
import { getUserLocation } from '../Utilidades';
import { SubirDocumentoModal } from "../MiPerfil/SubirDoumentoModal";
import PreloaderBar from "../login/PreloaderBar";
import { generarMesesDesde } from "../Utilidades";

/* ========================
   CONFIGURACIÓN VISUAL
========================= */
const CARD_WIDTH = "max-w-xl";
const CARD_PADDING = "p-8";
const INPUT_HEIGHT = "h-8";
const INPUT_TEXT = "text-sm";

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

interface Inversiones {
  descripcion: string;
  id: string;
}

interface Mercados {
  descripcion: string;
  id: string;
}

interface OpcionesMeses {
  label: string;
  value: string;
}

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

  const [statusComprobanteDomiclio, setStatusComprobanteDomiclio] = useState("*");
  const [statusEstadoDeCuenta, setStatusEstadoDeCuenta] = useState("*");
  const [statusIdentificacionFrente, setStatusIdentificacionFrente] = useState("*");
  const [statusIdentificacionReverso, setStatusIdentificacionReverso] = useState("*");
  const [statusCURP, setStatusCURP] = useState("*");
  const [statusRFC, setStatusRFC] = useState("*");

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

  const [fechaEdoDeCuenta, setFechaEdoDeCuenta] = useState<string>("");

  const [opcionesEdoCuenta, setopcionesEdoCuenta] = useState<OpcionesMeses[]>([]);

  const [txtConsulta, settxtConsulta] = useState("");
  const [txtConsultaContrato, settxtConsultaContrato] = useState("");


  useEffect(() => {

    let opciones = generarMesesDesde(localStorage.getItem("fecharegistro_axnweb") + "")

    setopcionesEdoCuenta(opciones);

    getInformacionTransaccional();

    getUserLocation().then(setLocation);

    setNombre(localStorage.getItem("nombreusuario_axnweb") + "");
    setPaterno(localStorage.getItem("paternog_axnweb") + "");
    setMaterno(localStorage.getItem("maternog_axnweb") + "");

    setIdInterno(localStorage.getItem("idexternog_axnweb") + "");

    setEmail(localStorage.getItem("email_axnweb") + "");
    setDireccion(localStorage.getItem("direccion_axnweb") + "");
    setCelular(localStorage.getItem("celular_axnweb") + "");
    setFechaNacimiento(localStorage.getItem("fechanacimiento_axnweb") + "");

    setIdContrato(localStorage.getItem("idcontrato_axnweb") + "");
    getDocumentos();

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

    try {
      const response = await fetch(config.baseUrlAPI + "fisicas/estatus/documentos", {
        method: "POST",
        body: datasend,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      setDocumentos(result);

    } catch (error) {
      console.error(error);
    }
  };

  const getEstatusDocumento = (nombre: any) => {

    for (let i = 0; i < documentos.length; i++) {
      if (documentos[i].nombredocumento === nombre) {
        switch (documentos[i].estatus) {
          case 1: return "En revisión";
          case 2: return "No aprobado, volver a subir";
          default: return "Subida pendiente";
        }
      }
    }

    return "Subida pendiente";
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
        }

      }
    } catch (error) {
      console.error("Error fetching data*:", error);
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
        }

      }
    } catch (error) {
      console.error("Error fetching data**:", error);
    }
  }

  const getEdoCuenta = async () => {

    let fecha = fechaEdoDeCuenta.split("-");

    settxtConsulta("Consultando...");

    const datasend = JSON.stringify({
      token: localStorage.getItem("token_axnweb"),
      uuid: localStorage.getItem("uuidg_axnweb"),
      mes: fecha[1].substring(0, 1) === "0" ? fecha[1].substring(1, 2) : fecha[1],
      anio: fecha[0],
      idcontrato: idcontrato
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

    const datasend = JSON.stringify({
      token: localStorage.getItem("token_axnweb"),
      uuid: localStorage.getItem("uuidg_axnweb"),
      idcontrato: idcontrato
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

      if (result.auth) {

        alert(result.K);

      }
    } catch (error) {
      console.error("Error fetching data**:", error);
      alert("El contrato no pudo ser enviado");
    }

    settxtConsultaContrato("");
  }

  return (
    <div className="space-y-6">

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {cardsData.map((card, index) => (
          <TrendCard key={index} {...card} />
        ))}
      </div>


      {/* Info 2 */}
      <div className="grid grid-cols-6 gap-5">

        <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-3 bg-white dark:bg-[#131919] rounded-xl">


          {/* Elemento tabs*/}
          <div className="p-4">

            <p className="font-montserrat_bold text-titles dark:text-white mb-4">
              <span className="text-[20px]">Id. Axion: {idinterno}</span><br />
              <span className="text-[20px]">No. Contrato: {idcontrato === '0' ? "En revisión" : idcontrato}</span>
            </p>

            {verModal && (
              <SubirDocumentoModal
                openvalue={true}
                setCambiarImagenPerfilView={setVerModal}
                setImgPerfil={null}
              />
            )}

            <Tabs
              aria-label="Documentos requeridos"
              variant="solid"
              color="secondary"
              classNames={{
                tab: "text-[9px] sm:text-xs md:text-[9px] lg:text-[10px] xl:text-sm 2xl:text-sm font-montserrat_medium "
              }}
            >
              <Tab
                key="comprobante"
                title="Comprobante">
                <Card shadow="none">
                  <CardBody className="space-y-4">
                    {/* <p>Por favor suba su comprobante de domicilio.</p> */}
                    {statusComprobanteDomiclio === '*' ?
                      <>
                        Estatus: {getEstatusDocumento("Comprobante domicilio")} </> :
                      <>Estatus*: {statusComprobanteDomiclio}
                      </>
                    }
                    <br></br>
                    {idcontrato != '0' ?

                      <Button isDisabled={getEstatusDocumento("Comprobante domicilio") === 'En revisión' || statusComprobanteDomiclio === 'En revisión' ? true : false} color="secondary"
                        onPress={() => { verModal ? setVerModal(false) : setVerModal(true), setIdDocumento("1"), setNombreDocumento("Comprobante domicilio") }}>Subir</Button>

                      : <>Contrato en revisión</>}
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="estado" title="Estado de cuenta">
                <Card shadow="none">
                  <CardBody className="space-y-4">
                    {/* <p>Por favor suba su estado de cuenta.</p> */}
                    {statusEstadoDeCuenta === '*' ?
                      <>
                        Estatus: {getEstatusDocumento("Estado de cuenta")} </> :
                      <>Estatus*: {statusEstadoDeCuenta}
                      </>
                    }
                    <br></br>


                    {idcontrato != '0' ?

                      <Button isDisabled={getEstatusDocumento("Estado de cuenta") === 'En revisión' || statusEstadoDeCuenta === 'En revisión' ? true : false} color="secondary"
                        onPress={() => { verModal ? setVerModal(false) : setVerModal(true), setIdDocumento("2"), setNombreDocumento("Estado de cuenta") }}>Subir</Button>

                      : <>Contrato en revisión</>}
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="ine_frente" title="Identificación">
                <Card shadow="none">
                  <CardBody className="space-y-4">
                    {/* <p>Por favor suba la parte frontal de su INE.</p> */}
                    {statusIdentificacionFrente === '*' ?
                      <>Anverso
                        Estatus: {getEstatusDocumento("Identificación frente")} </> :
                      <>Estatus*: {statusIdentificacionFrente}
                      </>
                    }
                    <br></br>

                    {idcontrato != '0' ?

                      <Button isDisabled={getEstatusDocumento("Identificación frente") === 'En revisión' || statusIdentificacionFrente === 'En revisión' ? true : false} color="secondary"
                        onPress={() => { verModal ? setVerModal(false) : setVerModal(true), setIdDocumento("3"), setNombreDocumento("Identificación frente") }}>Subir</Button>

                      : null}

                    {/* <p className="pt-10">Por favor suba la parte frontal de su INE.</p> */}
                    {statusIdentificacionReverso === '*' ?
                      <>Reverso
                        Estatus: {getEstatusDocumento("Identificación reverso")} </> :
                      <>Estatus*: {statusIdentificacionReverso}
                      </>
                    }
                    <br></br>

                    {idcontrato != '0' ?

                      <Button isDisabled={getEstatusDocumento("Identificación reverso") === 'En revisión' || statusIdentificacionReverso === 'En revisión' ? true : false} color="secondary"
                        onPress={() => { verModal ? setVerModal(false) : setVerModal(true), setIdDocumento("4"), setNombreDocumento("Identificación reverso") }}>Subir</Button>

                      : null}

                  </CardBody>
                </Card>
              </Tab>

              {/* <Tab key="ine_reverso" title="INE reverso">
              <Card shadow="none">
                <CardBody className="space-y-4">
                  <p>Por favor suba la parte posterior de su INE.</p>
                  <p><span className="font-montserrat_bold">Estatus:</span> Subida pendiente</p>
                  <Button color="secondary" onPress={() => setVerModal(!verModal)}>
                    Subir
                  </Button>
                </CardBody>
              </Card>
            </Tab> */}

              <Tab key="curp" title="CURP">
                <Card shadow="none">
                  <CardBody className="space-y-4">
                    {/* <p>Por favor suba su CURP.</p> */}
                    {statusCURP === '*' ?
                      <>
                        Estatus: {getEstatusDocumento("CURP")} </> :
                      <>Estatus*: {statusCURP}
                      </>
                    }
                    <br></br>
                    {idcontrato != '0' ?

                      <Button isDisabled={getEstatusDocumento("CURP") === 'En revisión' || statusCURP === 'En revisión' ? true : false} color="secondary"
                        onPress={() => { verModal ? setVerModal(false) : setVerModal(true), setIdDocumento("5"), setNombreDocumento("CURP") }}>Subir</Button>

                      : null}
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="rfc" title="RFC">
                <Card shadow="none">
                  <CardBody className="space-y-4">
                    {/* <p>Por favor suba su RFC.</p> */}
                    {statusRFC === '*' ?
                      <>
                        Estatus: {getEstatusDocumento("RFC")} </> :
                      <>Estatus*: {statusRFC}
                      </>
                    }
                    <br></br>
                    {idcontrato != '0' ?

                      <Button isDisabled={getEstatusDocumento("RFC") === 'En revisión' || statusRFC === 'En revisión' ? true : false} color="secondary"
                        onPress={() => { verModal ? setVerModal(false) : setVerModal(true), setIdDocumento("6"), setNombreDocumento("RFC") }}>Subir</Button>

                      : null}
                  </CardBody>
                </Card>
              </Tab>

            </Tabs>

          </div>

        </div>

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

      </div>

      <div className="bg-white dark:bg-[#131919]  rounded-xl">
        <p className="p-4 h-[50px] font-montserrat_bold text-titles dark:text-white">
          Información complementaria
        </p>

        <div className="flex gap-3 w-full">


          {/* SELECTOR - GIRO */}
          <Select
            label="Giro con el que se relacionan sus actividades:"
            isRequired
            //isDisabled={dataexist}
            selectedKeys={giro ? [giro] : []}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;

              const itemSeleccionado = giros.find(
                (i) => i.id === selectedId
              );

              setGiro(selectedId);
              setNombreGiro(itemSeleccionado?.descripcion ?? "");
              getActividades(selectedId);
            }}
            classNames={{
              base: "w-full",
              trigger: `
                  h-11
                  bg-[#444E53]
                  dark:bg-[#2F3A3F]
                  hover:bg-[#4C585E]
                  dark:hover:bg-[#374247]
                  focus-within:bg-[#4C585E]
                  dark:focus-within:bg-[#4e595f]
                  rounded-xl
                  border border-transparent
                `,
              label: "!text-zinc-400",
              value: "!text-white",
              popoverContent: "bg-[#2A3235] text-white",
            }}
          >
            {giros.map((giro) => (
              <SelectItem key={giro.id}>
                {giro.descripcion}
              </SelectItem>
            ))}
          </Select>

          {/* SELECTOR - ACTIVIDADES */}
          <Select
            label="Actividad:"
            isRequired
            isDisabled={giro === '' && actividades.length < 0}
            selectedKeys={actividad ? [actividad] : []}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;

              const itemSeleccionado = actividades.find(
                (i) => i.id === selectedId
              );

              setActividad(selectedId);
              setNombreActividad(itemSeleccionado?.descripcion ?? "");
            }}
            classNames={{
              base: "w-full",
              trigger: `
                            h-11
                            bg-[#444E53]
                            dark:bg-[#2F3A3F]
                            hover:bg-[#4C585E]
                            dark:hover:bg-[#374247]
                            focus-within:bg-[#4C585E]
                            dark:focus-within:bg-[#4e595f]
                            rounded-xl
                            border border-transparent
                            `,
              label: "!text-zinc-400",
              value: "!text-white",
              popoverContent: "bg-[#2A3235] text-white",
            }}
          >
            {actividades?.map((actividad) => (
              <SelectItem key={actividad.id}>
                {actividad.descripcion}
              </SelectItem>
            ))}
          </Select>

        </div>

        <br></br>

        <div className="flex gap-3 w-full">

          {/* SELECTOR - INGRESO */}
          <Select
            label="Su ingreso mensual neto:"
            isRequired
            //isDisabled={dataexist}
            selectedKeys={ingreso ? [ingreso] : []}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;

              const itemSeleccionado = ingresos.find(
                (i) => i.id === selectedId
              );

              setIngreso(selectedId);
              setnombreIngreso(itemSeleccionado?.descripcion ?? "");
            }}
            classNames={{
              base: "w-full",
              trigger: `
                            h-11
                            bg-[#444E53]
                            dark:bg-[#2F3A3F]
                            hover:bg-[#4C585E]
                            dark:hover:bg-[#374247]
                            focus-within:bg-[#4C585E]
                            dark:focus-within:bg-[#4e595f]
                            rounded-xl
                            border border-transparent
                            `,
              label: "!text-zinc-400",
              value: "!text-white",
              popoverContent: "bg-[#2A3235] text-white",
            }}
          >
            {ingresos.map((ingreso) => (
              <SelectItem key={ingreso.id}>
                {ingreso.descripcion}
              </SelectItem>
            ))}
          </Select>

          {/* SELECTOR - PROCEDENCIA */}
          <Select
            label="Procedencia de los recursos que serán invertidos:"
            isRequired
            //isDisabled={dataexist}
            selectedKeys={procedencia ? [procedencia] : []}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;

              const itemSeleccionado = procedencias.find(
                (i) => i.id === selectedId
              );

              setProcedencia(selectedId);
              setNombreProcedencia(itemSeleccionado?.descripcion ?? "");
            }}
            classNames={{
              base: "w-full",
              trigger: `
                            h-11
                            bg-[#444E53]
                            dark:bg-[#2F3A3F]
                            hover:bg-[#4C585E]
                            dark:hover:bg-[#374247]
                            focus-within:bg-[#4C585E]
                            dark:focus-within:bg-[#4e595f]
                            rounded-xl
                            border border-transparent
                            `,
              label: "!text-zinc-400",
              value: "!text-white",
              popoverContent: "bg-[#2A3235] text-white",
            }}
          >
            {procedencias.map((procedencia) => (
              <SelectItem key={procedencia.id}>
                {procedencia.descripcion}
              </SelectItem>
            ))}
          </Select>

        </div>

        <br></br>

        <div className="flex gap-3 w-full">

          {/* SELECTOR - FUENTES */}
          <Select
            label="Fuente de los ingresos:"
            isRequired
            //isDisabled={dataexist}
            selectedKeys={fuente ? [fuente] : []}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;

              const itemSeleccionado = fuentes.find(
                (i) => i.id === selectedId
              );

              setFuente(selectedId);
              setNombreFuente(itemSeleccionado?.descripcion ?? "");
            }}
            classNames={{
              base: "w-full",
              trigger: `
                            h-11
                            bg-[#444E53]
                            dark:bg-[#2F3A3F]
                            hover:bg-[#4C585E]
                            dark:hover:bg-[#374247]
                            focus-within:bg-[#4C585E]
                            dark:focus-within:bg-[#4e595f]
                            rounded-xl
                            border border-transparent
                            `,
              label: "!text-zinc-400",
              value: "!text-white",
              popoverContent: "bg-[#2A3235] text-white",
            }}
          >
            {fuentes.map((fuente) => (
              <SelectItem key={fuente.id}>
                {fuente.descripcion}
              </SelectItem>
            ))}
          </Select>

          {/*SELECTOR - OPERACIONES */}
          <Select
            label="Números de operaciones a realizar por mes:"
            isRequired
            //isDisabled={dataexist}
            selectedKeys={operacion ? [operacion] : []}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;

              const itemSeleccionado = operaciones.find(
                (i) => i.id === selectedId
              );

              setOperacion(selectedId);
              setNombreOperacion(itemSeleccionado?.descripcion ?? "");
            }}
            classNames={{
              base: "w-full",
              trigger: `
                            h-11
                            bg-[#444E53]
                            dark:bg-[#2F3A3F]
                            hover:bg-[#4C585E]
                            dark:hover:bg-[#374247]
                            focus-within:bg-[#4C585E]
                            dark:focus-within:bg-[#4e595f]
                            rounded-xl
                            border border-transparent
                            `,
              label: "!text-zinc-400",
              value: "!text-white",
              popoverContent: "bg-[#2A3235] text-white",
            }}
          >
            {operaciones.map((operacion) => (
              <SelectItem key={operacion.id}>
                {operacion.descripcion}
              </SelectItem>
            ))}
          </Select>

        </div>

        <br></br>

        <div className="flex gap-3 w-full">

          {/* SELECTOR - ESTIMACIÓN DE INVERSIONES */}
          <Select
            label="Estimación de inversión al mes:"
            isRequired
            //isDisabled={dataexist}
            selectedKeys={inversion ? [inversion] : []}
            onSelectionChange={(keys) => {
              const selectedId = Array.from(keys)[0] as string;

              const itemSeleccionado = inversiones.find(
                (i) => i.id === selectedId
              );

              setInversion(selectedId);
              setNombreInversion(itemSeleccionado?.descripcion ?? "");
            }}
            classNames={{
              base: "w-full",
              trigger: `
                            h-11
                            bg-[#444E53]
                            dark:bg-[#2F3A3F]
                            hover:bg-[#4C585E]
                            dark:hover:bg-[#374247]
                            focus-within:bg-[#4C585E]
                            dark:focus-within:bg-[#4e595f]
                            rounded-xl
                            border border-transparent
                            `,
              label: "!text-zinc-400",
              value: "!text-white",
              popoverContent: "bg-[#2A3235] text-white",
            }}
          >
            {inversiones.map((inversion) => (
              <SelectItem key={inversion.id}>
                {inversion.descripcion}
              </SelectItem>
            ))}
          </Select>

          {/*SELECTOR - MERCADOS */}
          <Select
            label={"Tipos de mercados a los cuales invertirá: " + mercadosdefault}
            isRequired
            //isDisabled={dataexist}
            selectionMode="multiple"
            defaultSelectedKeys={mercadosdefault}
            onSelectionChange={(keys) => {
              const selectedIds = Array.from(keys) as string[];

              // Guardas los IDs (como string o array, tú decides)
              setMercado(selectedIds.join(","));

              // Buscas todos los mercados seleccionados
              const nombresSeleccionados = mercados
                .filter((m) => selectedIds.includes(m.id))
                .map((m) => m.descripcion);

              // Guardas TODAS las descripciones
              setNombreMercados(nombresSeleccionados.join(", "));
            }}
            classNames={{
              base: "w-full",
              trigger: `
                h-11
                bg-[#444E53]
                dark:bg-[#2F3A3F]
                hover:bg-[#4C585E]
                dark:hover:bg-[#374247]
                focus-within:bg-[#4C585E]
                dark:focus-within:bg-[#4e595f]
                rounded-xl
                border border-transparent
              `,
              label: "!text-zinc-400",
              value: "!text-white",
              popoverContent: "bg-[#2A3235] text-white",
            }}
          >
            {mercados.map((mercado) => (
              <SelectItem key={mercado.id}>
                {mercado.descripcion}
              </SelectItem>
            ))}
          </Select>


        </div>

        <br></br>

        <div className="gap-3 w-full">

          <Input
            isRequired
            //isDisabled={dataexist}
            type="text"
            value={ocupacion}
            placeholder="Ocupación*"
            onChange={(e: any) => {
              setOcupacion(e.target.value);
            }}
            classNames={{
              inputWrapper: `
                                                      ${INPUT_HEIGHT}
                                                      bg-[#444E53]
                                                      dark:bg-[#2F3A3F]
                                                      hover:bg-[#4C585E]
                                                      dark:hover:bg-[#374247]
                                                      focus-within:bg-[#4C585E]
                                                      dark:focus-within:bg-[#4e595f]
                                                      transition-colors
                                                      rounded-xl
                                                      `,
              input: `
                                                      ${INPUT_TEXT}
                                                      !text-[#111827]
                                                      dark:!text-[#E5E7EB]
                                                      placeholder:text-gray-400
                                                      selection:bg-primary-200
                                                      selection:text-[#0B1220]
                                                      dark:selection:bg-primary-400
                                                      dark:selection:text-[#020617]
                                                      dark:caret-white
                                                      `,
            }}
          />

          <br></br>

          <Input
            isRequired
            //isDisabled={dataexist}
            type="text"
            value={FIEL}
            placeholder="Número de certificado de la FIEL*"
            onChange={(e: any) => {
              setFIEL(e.target.value);
            }}
            classNames={{
              inputWrapper: `
                                                      ${INPUT_HEIGHT}
                                                      bg-[#444E53]
                                                      dark:bg-[#2F3A3F]
                                                      hover:bg-[#4C585E]
                                                      dark:hover:bg-[#374247]
                                                      focus-within:bg-[#4C585E]
                                                      dark:focus-within:bg-[#4e595f]
                                                      transition-colors
                                                      rounded-xl
                                                      `,
              input: `
                                                      ${INPUT_TEXT}
                                                      !text-[#111827]
                                                      dark:!text-[#E5E7EB]
                                                      placeholder:text-gray-400
                                                      selection:bg-primary-200
                                                      selection:text-[#0B1220]
                                                      dark:selection:bg-primary-400
                                                      dark:selection:text-[#020617]
                                                      dark:caret-white
                                                      `,
            }}
          />

          <br></br>

          <Checkbox
            //isDisabled={dataexist} 
            defaultSelected={empresarial === '0' ? false : true} onChange={() => empresarial === '0' ? setEmpresarial("1") : setEmpresarial("0")}>Cuento con actividad empresarial</Checkbox>

          <span> </span>

          <Button
            isDisabled={
              loading || giro === '' || actividad === '' || ingreso === '' || procedencia === '' || fuente === '' || operacion === '' || inversion === '' || mercado === '' || ocupacion === '' || FIEL === ''
            }
            color="secondary" onPress={() => actualizarInformacionTransaccional()}>Guardar</Button>

          {loading ?
            <PreloaderBar></PreloaderBar>
            : null
          }

        </div>
      </div>
    </div>
  );
};
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import PreloaderBar from '../login/PreloaderBar';
import { Checkbox } from "@heroui/react";
import { Form } from "@heroui/react";
import { Eye, EyeOff } from 'lucide-react';
import config from "../../config/config";
import { Select, SelectItem } from "@heroui/react";
import { InputOtp } from "@heroui/input-otp";
import { getUserLocation } from '../Utilidades';
import RowSteps from "../ComponentesAxion/contratos/RowSteps";

interface Paises {
    descripcion: string;
    id: string;
}

interface Estados {
    descripcion: string;
    id: string;
}

interface Colonias {
    descripcion: string;
    id: string;
}

interface Regimenes {
    descripcion: string;
    id: string;
}

interface Elemento {
    descripcion: string;
    id: string;
}

interface Actividades {
    descripcion: string;
    id: string;
}

interface Procedencias {
    descripcion: string;
    id: string;
}

interface Giros {
    descripcion: string;
    id: string;
}

export const RegistroMorales = ({ setSessionHandle, pagerouter }: any) => {

    const [parte1, setParte1] = useState("block");
    const [parte2, setParte2] = useState("hidden");
    const [parte3, setParte3] = useState("hidden");
    const [parte4, setParte4] = useState("hidden");
    const [parte5, setParte5] = useState("hidden");
    const [currentStep, setCurrentStep] = useState(0); //contador de pasos

    const [parteactual, setParteActual] = useState(1);
    const [valueProgress, setValueProgress] = useState(0);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [confirm18, setConfirm18] = useState(false);
    const [confirmTC, setConfirmTC] = useState(false);

    const [paises, setPaises] = useState<Paises[]>([]);
    const [estados, setEstados] = useState<Estados[]>([]);

    const [colonias, setColonias] = useState<Colonias[]>([]);
    const [regimenes, setRegimenes] = useState<Regimenes[]>([]);

    const [persona, setPersona] = useState('');
    const [email, setEmail] = useState('');

    const [razonsocial, setRazonSocial] = useState('');
    const [rfc, setRFC] = useState('');
    const [claveLada, setClaveLada] = useState('');
    const [telefono, setTelefono] = useState('');
    const [extension, setExtension] = useState('');
    const [noFIEL, setNoFIEL] = useState('');
    const [fechaConstitucion, setFechaConstitucion] = useState('');
    const [numEscrituraConstitucion, setNumEscrituraConstitucion] = useState('');
    const [fechaProtocolizacion, setFechaProtocolizacion] = useState('');

    const [nombreR, setNombreR] = useState('');
    const [paternoR, setPaternoR] = useState('');
    const [maternoR, setMaternoR] = useState('');
    const [rfcR, setRFCR] = useState('');
    const [curpR, setCURPR] = useState('');
    const [emailR, setEmailR] = useState('');

    const [noEscrituraPoderR, setNoEscrituraPoderR] = useState('');
    const [fechaProtocolizacionPoderO, setFechaProtocolizacionPoderO] = useState('');

    const [calle, setCalle] = useState('');
    const [noInterior, setNoInterior] = useState('');
    const [noExterior, setNoExterior] = useState('');
    const [pais, setPais] = useState('187');
    const [estado, setEstado] = useState('');
    const [iddelegacion, setIdDelegacion] = useState('');


    const [sexo, setSexo] = useState("H");
    const [paisnacimiento, setPaisNacimiento] = useState('187');
    const [estadonacimiento, setEstadoNacimiento] = useState('');
    const [colonia, setColonia] = useState('');
    const [codigopostal, setCodigoPostal] = useState('');

    const [idBanco, setIdBanco] = useState('');
    const [cpFiscal, setCpFiscal] = useState('');
    const [clabe, setCLABE] = useState('');
    const [longitud, setLongitud] = useState('');
    const [latitud, setLatitud] = useState('');

    const [ciudad, setCiudad] = useState('');
    const [regimenfiscal, setRegimenFiscal] = useState('');
    const [location, setLocation] = useState({ lat: 0, lng: 0 });

    const [password, setPassword] = useState('');
    const [errorlogin, setErrorLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msgerror, setMsgError] = useState("");

    const [idusuarionuevo, setIdUsuarioNuevo] = useState("");

    const [bancos, setBancos] = useState<Elemento[]>([]);
    const [nombreBanco, setNombreBanco] = useState("");

    const [giros, setGiros] = useState<Giros[]>([]);
    const [giro, setGiro] = useState('');
    const [nombregiro, setNombreGiro] = useState('');

    const [actividades, setActividades] = useState<Procedencias[]>([]);
    const [actividad, setActividad] = useState('');
    const [nombreactividad, setNombreActividad] = useState('');

    //const estados = obtenerEstadosOrdenados();

    const [id, setID] = useState("");
    const [pin, setPIN] = useState("");

    /*OBTENER LISTADO DE BANCOS*/
    const getBancos = async () => {

        try {
            const response = await fetch(config.baseUrlAPI + "bancos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            const parsedData: Elemento[] = JSON.parse(result.data);
            setBancos(parsedData);

        } catch (error) {
            console.error("Bancos: " + error);
            //getBancos();
        }
    };

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

    /*OBTENER LISTADO DE PAÍSES*/
    const getPaises = async () => {
        try {
            const response = await fetch(config.baseUrlAPI + "paises", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            const parsedData: Paises[] = JSON.parse(result.data);
            setPaises(parsedData);

        } catch (error) {
            console.error(error);
            //getPaises();
        } finally {
            setLoading(false);
        }
    };

    /*OBTENER LISTADO DE ESTADOS */
    const getEstados = async (idpais: any) => {

        const datasend = JSON.stringify({
            idrecurso: idpais
        });

        try {
            const response = await fetch(config.baseUrlAPI + "estados", {
                method: "POST",
                body: datasend,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            const parsedData: Estados[] = JSON.parse(result.data);
            setEstados(parsedData);

        } catch (error) {
            console.error(error);
            //getEstados( idpais );
        } finally {
            setLoading(false);
        }
    };

    /*OBTENER LISTADO DE COLONIAS Y MUNICIPIOS DE ACUERDO AL CP INGRESADO */
    const getDirecciones = async (cp: any) => {

        const datasend = JSON.stringify({
            idrecurso: cp
        });

        try {
            const response = await fetch(config.baseUrlAPI + "direcciones", {
                method: "POST",
                body: datasend,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (result.colonia)
                setColonias(result.colonia);

            if (result.municipio.descripcion) {
                setCiudad(result.municipio.descripcion);
                setIdDelegacion(result.municipio.id);
            }

        } catch (error) {
            return;
        } finally {
            setLoading(false);
        }
    };

    /*OBTENER LISTADO DE COLONIAS Y MUNICIPIOS DE ACUERDO AL CP INGRESADO */
    const getRegimenFiscal = async () => {

        try {
            const response = await fetch(config.baseUrlAPI + "regimenfiscal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            const parsedData: Regimenes[] = JSON.parse(result.data);
            setRegimenes(parsedData);

        } catch (error) {
            console.error(error);
            //getRegimenFiscal();
        } finally {
            setLoading(false);
        }
    };

    const nextPart = () => {

        setMsgError("");

        if (parteactual === 1) {
            setCurrentStep(1);
            setParte1("hidden");
            setParteActual(parteactual + 1);
            setParte2("block");
            setParte3("hidden");
            setParte4("hidden");
            setValueProgress(valueProgress + 25);
        }

        if (parteactual === 2) {
            setCurrentStep(2);
            setParte1("hidden");
            setParteActual(parteactual + 1);
            setParte2("hidden");
            setParte3("block");
            setParte4("hidden");
            setValueProgress(valueProgress + 25);
        }

        if (parteactual === 3) {
            setCurrentStep(3);
            setParte1("hidden");
            setParteActual(parteactual + 1);
            setParte2("hidden");
            setParte3("hidden");
            setParte4("block");
            setValueProgress(valueProgress + 25);
        }

    }

    const previousPart = () => {

        setMsgError("");

        if (parteactual === 1){
            router.push("../registro");
            return;
        }

        if (parteactual === 2) {
            setCurrentStep(0);
            setParte2("hidden");
            setParteActual(parteactual - 1);
            setParte1("block");
            setValueProgress(valueProgress - 25);
        }

        if (parteactual === 3) {
            setCurrentStep(1);
            setParte3("hidden");
            setParteActual(parteactual - 1);
            setParte2("block");
            setValueProgress(valueProgress - 25);
        }

        if (parteactual === 4) {
            setParte3("block");
            setParteActual(parteactual - 1);
            setParte2("hidden");
            setParte1("hidden");
            setParte4("hidden");
            setValueProgress(valueProgress - 25);
        }

    }

    const AgregarUsuario = async () => {

        setLoading(true);
        const datasend = JSON.stringify({
            razonSocial: razonsocial,
            rfcPM: rfc,
            claveLada: claveLada,
            telefono: telefono,
            extension: extension,
            noFiel: noFIEL,
            idActividad: actividad,
            idGiro: giro,
            fechaConstitucion: fechaConstitucion,
            numEscrituraConstitucion: numEscrituraConstitucion,
            fechaProtocolizacion: fechaProtocolizacion,
            nombreR: nombreR,
            apPaternoR: paternoR,
            apMaternoR: maternoR,
            rfcR: rfcR,
            curpR: curpR,
            noEscrituraPoderR: noEscrituraPoderR,
            fechaProtocolizacionPoderO: fechaProtocolizacionPoderO,
            emailR: emailR,
            callePM: calle,
            noExtPM: noExterior,
            noIntPM: noInterior,
            idPaisPM: pais,
            idEstadoPM: estado,
            idDelegacionPM: iddelegacion,
            idColoniaPM: colonia,
            cpPM: codigopostal,
            idBancoPM: idBanco,
            clabePM: clabe,
            latitud: "" + location.lat,
            longitud: "" + location.lng,
            idRegimenFiscal: regimenfiscal,
            cpFiscal: cpFiscal,
            nombreBanco: nombreBanco,
            nombreGiro: nombregiro,
            nombreActividad: nombreactividad,
            password: password
        });

        const baseURL = config.baseUrlAPI + "ax/usuarios/morales/add";

        console.log( datasend );

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

                if (result.auth === "ERRORNEW") {
                    setMsgError("El email/usuario ya tienen una cuenta asociada.");
                    return false;
                }
                if (result.auth === "OKPROCCES") {

                    setIdUsuarioNuevo("" + result.data[0].idExterno);

                    localStorage.setItem("persona_axnweb", "moral");

                    localStorage.setItem("session_axnweb", "" + new Date().getTime());
                    localStorage.setItem("token_axnweb", "" + result.token);

                    localStorage.setItem("nombreusuario_axnweb", result.data[0].razonSocial);

                    localStorage.setItem("idexternog_axnweb", result.data[0].idExterno);
                    localStorage.setItem("idcontrato_axnweb", result.data[0].idcontrato);
                    localStorage.setItem("uuidg_axnweb", result.data[0].uuid);

                    localStorage.setItem("email_axnweb", result.data[0].emailR);
                    localStorage.setItem("direccion_axnweb", result.data[0].calle + " " + result.data[0].noInt + "...");
                    localStorage.setItem("celular_axnweb", "("+result.data[0].claveLada+")"+result.data[0].telefono);
                    localStorage.setItem("fechanacimiento_axnweb", result.data[0].fechaConstitucion);

                    let fechatmp = result.data[0].fechaRegistro.split("T");
                    fechatmp = fechatmp[0];
                    localStorage.setItem("fecharegistro_axnweb", fechatmp);

                    nextPart();
                }

            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }

        setLoading(false);

    }

    const validarPIN = async () => {

        setLoading(true);

        if (!pin) {
            setErrorLogin(true);
            setLoading(false);
            return false;
        }

        const datasend = JSON.stringify({
            email: emailR,
            pin: pin
        });

        try {
            const response = await fetch(config.baseUrlAPI + "validarpin", {
                method: "POST",
                body: datasend,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (result.auth === 'OKPIN') { //Autenticación correcta

                // setIdUsuarioNuevo("" + result.data[0].idExterno);

                // localStorage.setItem("persona_axnweb", "moral");

                // localStorage.setItem("session_axnweb", "" + new Date().getTime());

                // localStorage.setItem("nombreusuario_axnweb", result.data[0].razonsocial);

                // localStorage.setItem("idexternog_axnweb", result.data[0].idExterno);
                // localStorage.setItem("idcontrato_axnweb", result.data[0].idcontrato);
                // localStorage.setItem("uuidg_axnweb", result.data[0].uuid);

                // localStorage.setItem("email_axnweb", result.data[0].emailR);
                // localStorage.setItem("direccion_axnweb", result.data[0].calle + " " + result.data[0].noInt + "...");
                // localStorage.setItem("celular_axnweb", "("+result.data[0].claveLada+")"+result.data[0].telefono);
                // localStorage.setItem("fechanacimiento_axnweb", result.data[0].fechaConstitucion);

                // let fechatmp = result.data[0].fechaRegistro.split("T");
                // fechatmp = fechatmp[0];
                // localStorage.setItem("fecharegistro_axnweb", fechatmp);

                router.push(config.baseUrl + "/miperfil");

                setErrorLogin(false);
                return;

            } else if (result.auth === "ERRORLOGIN") {
                setMsgError("El PIN proporcionado no es válido o ha expirado.");
            }

        } catch (error) {
            console.error("Error en el proceso de login:", error);
        }

        setLoading(false);
    };

    useEffect(() => {

        getPaises();
        getEstados(187); //México default
        getRegimenFiscal();
        getBancos();
        getUserLocation().then(setLocation);

        getGiros();

        if (giro != '')
            getActividades(giro);

    }, []);

    /* ========================
       CONFIGURACIÓN VISUAL
    ========================= */
    const CARD_WIDTH = "max-w-xl";
    const CARD_PADDING = "p-4 sm:p-6 md:p-8";
    const INPUT_HEIGHT = "h-6 sm:h-8 md:h-8";
    const INPUT_TEXT = "text-sm";


    const isButtonActive = email.length > 0;

    const BUTTON_INACTIVE_BG = "!bg-transparent border-2 border-[#8C9296]";
    const BUTTON_INACTIVE_TEXT = "text-[#8C9296]";
    const BUTTON_ACTIVE_BG = "bg-primary-100 hover:bg-primary-50 dark:hover:bg-[#34cacc] dark:bg-[#40a6a6]";
    const BUTTON_ACTIVE_TEXT = "text-[#2A3235]";

    const isParte1Valid =
        razonsocial.trim() !== '' &&
        rfc.trim() !== '' &&
        regimenfiscal !== '' &&
        calle.trim() !== '' &&
        noInterior.trim() !== '' &&
        noExterior.trim() !== '' &&
        pais !== '' &&
        estado !== '' &&
        codigopostal.trim() !== '' &&
        ciudad !== '' &&
        colonia != '';

    /* VALIDACIÓN DE LA PARTE 2 PARA PASAR A PARTE 3 */
    const isParte2Valid =
        idBanco != '' &&
        clabe != '' &&
        cpFiscal != '' &&
        telefono.trim() != '' &&
        noFIEL.trim() != '' &&
        numEscrituraConstitucion.trim() != '' &&
        fechaConstitucion != '' &&
        fechaProtocolizacion != '' &&
        giro != '' &&
        actividad != '';

    /* VALIDACIÓN DE LA PARTE 3 PARA PASAR A PARTE 4 */
    const isParte3Valid =
        nombreR.trim() !== "" &&
        paternoR.trim() !== "" &&
        maternoR.trim() !== "" &&
        curpR.trim() !== "" &&
        rfcR.trim() !== "" &&
        emailR.trim() !== "" &&
        noEscrituraPoderR.trim() !== "" &&
        fechaProtocolizacionPoderO !== "" &&
        password !== "" &&
        confirm18 &&
        confirmTC;

    return (
        <div
            className="
        min-h-screen
        bg-cover bg-center bg-no-repeat
        
        bg-[url('/imagenes/axn/bg_registro/bg_light_registro.jpg')]
        sm:bg-[url('/imagenes/axn/bg_registro/bg_light_registro.jpg')]
        md:bg-[url('/imagenes/axn/bg_registro/bg_light_registro.jpg')]
        lg:bg-[url('/imagenes/axn/bg_registro/bg_light_registro.jpg')]
        xl:bg-[url('/imagenes/axn/bg_registro/bg_light_registro.jpg')]
        2xl:bg-[url('/imagenes/axn/bg_registro/bg_light_registro.jpg')]
        
        dark:bg-[url('/imagenes/axn/bg_registro/bg_dark_registro.jpg')]
        dark:sm:bg-[url('/imagenes/axn/bg_registro/bg_dark_registro.jpg')]
        dark:md:bg-[url('/imagenes/axn/bg_registro/bg_dark_registro.jpg')]
        dark:lg:bg-[url('/imagenes/axn/bg_registro/bg_dark_registro.jpg')]
        dark:xl:bg-[url('/imagenes/axn/bg_registro/bg_dark_registro.jpg')]
        dark:2xl:bg-[url('/imagenes/axn/bg_registro/bg_dark_registro.jpg')]
      "
        >
            {/* CONTENEDOR FLEX */}

            <div
                className="
          min-h-screen 
          flex 
          items-center
          justify-center
          lg:justify-end
          px-2
          sm:px-5
          md:px-6
          lg:px-6
          xl:px-6
          lg:pr-20
          xl:pr-28
          2xl:pr-60 
          AgregarUsuario
        "
            >
                {/* TARJETA LOGIN */}
                <div className={`w-full ${CARD_WIDTH}`}>
                    <div
                        className={`
              
              relative
              bg-[#cccccc]
              _bg-[#2A3235] 
              dark:bg-[#2A3235]
              rounded-2xl shadow-2xl
              ${CARD_PADDING}
            `}
                    >
                        {/* TEXTO SUPERIOR DERECHO */}
                        <p className="absolute top-4 right-6 text-[10px] sm:text-[10px] md:text-[12px] lg:text-[12px] text-[#8C9296] font-montserrat_medium">
                            ¿Tienes una cuenta?{" "}

                            <span className=" 
                text-sky-500 
                text-[10px] sm:text-[10px] md:text-[12px] lg:text-[12px]
                transition-colors 
                duration-200
                hover:text-white
                cursor-pointer
              ">
                                <a href="../login">Inicia Sesión</a>
                            </span>

                        </p>

                        {/* LOGOTIPO */}
                        <div className="flex justify-center">
                            <img
                                src={`${config.baseUrlIMG}/imagenes/logo_axn.png`}
                                alt="Logo AXN"
                                className="w-[110px] sm:w-[130px] md:w-[140px] lg:w-[150px] h-auto mt-6 sm:mt-2 md:mt-4 lg:mt-3"
                            />
                        </div>

                        {/* TÍTULO */}
                        <p className="mt-2 text-center text-[#A4B1B9] font-montserrat_semibold text-xl lg:text-2xl">
                            REGISTRO PERSONA MORAL
                        </p>

                        <p className="text-center text-[#A4B1B9] mb-6 font-montserrat_regular text-sm">
                            Crea tu cuenta
                        </p>


                        {/* Contador de pasos */}
                        <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-6 xl:mb-4">
                            <div className=" ">
                                <RowSteps
                                    className="-mt-4"
                                    currentStep={currentStep}
                                    steps={[
                                        { title: "" },
                                        { title: "" },
                                        { title: "" },
                                        { title: "" },
                                    ]}
                                />
                            </div>
                        </div>

                        {/* ================= PARTE 1 ================= */}
                        <div className={`${parte1}`}>
                            <Form className="gap-5">

                                {/* INPUT - Nombre(s) */}

                                <Input
                                    isRequired
                                    placeholder=" Ingrese la Razón Social*"
                                    onChange={(e: any) => {
                                        setRazonSocial(e.target.value);
                                        setErrorLogin(false);
                                    }}
                                    classNames={{
                                        inputWrapper: `
                                ${INPUT_HEIGHT}
                                bg-[#444E53]
                                dark:bg-[#2F3A3F]
                               
                                data-[hover=true]:bg-[#586267]
                                dark:data-[hover=true]:bg-[#374247]
                                data-[focus=true]:bg-[#4C585E]
                                dark:data-[focus=true]:bg-[#4e595f]

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

                                <Input
                                    isRequired
                                    placeholder=" Ingrese el RFC de la Razón Social*"
                                    onChange={(e: any) => {
                                        setRFC(e.target.value);
                                        setErrorLogin(false);
                                    }}
                                    classNames={{
                                        inputWrapper: `
                                ${INPUT_HEIGHT}
                                bg-[#444E53]
                                dark:bg-[#2F3A3F]
                               
                                data-[hover=true]:bg-[#586267]
                                dark:data-[hover=true]:bg-[#374247]
                                data-[focus=true]:bg-[#4C585E]
                                dark:data-[focus=true]:bg-[#4e595f]

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

                                {/* SELECTOR - Régimen Fiscal */}
                                <Select
                                    label="Régimen Fiscal"
                                    isRequired
                                    selectedKeys={regimenfiscal ? [regimenfiscal] : []}
                                    onSelectionChange={(keys) => {
                                        setRegimenFiscal(Array.from(keys)[0] as string);
                                    }}
                                    classNames={{
                                        selectorIcon: "text-white",
                                        base: "w-full",
                                        trigger: `
                            h-11
                            bg-[#444E53]
                            dark:bg-[#2F3A3F]
                     
                            data-[hover=true]:bg-[#586267]
                            dark:data-[hover=true]:bg-[#374247]
                            data-[focus=true]:bg-[#4C585E]
                            dark:data-[focus=true]:bg-[#4e595f]

                            rounded-xl
                            border border-transparent
                            `,
                                        label: "!text-zinc-400",
                                        value: "!text-white",
                                        popoverContent: "bg-[#2A3235] text-white",
                                    }}
                                >
                                    {regimenes.map((regimen) => (
                                        <SelectItem key={regimen.id}>
                                            {regimen.descripcion}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Input
                                    isRequired
                                    placeholder="Ingrese el nombre de su calle*"
                                    onChange={(e: any) => {
                                        setCalle(e.target.value);
                                        setErrorLogin(false);
                                    }}
                                    classNames={{
                                        inputWrapper: `
                                        ${INPUT_HEIGHT}
                                        bg-[#444E53]
                                        dark:bg-[#2F3A3F]
                                   
                                        data-[hover=true]:bg-[#586267]
                                        dark:data-[hover=true]:bg-[#374247]
                                        data-[focus=true]:bg-[#4C585E]
                                        dark:data-[focus=true]:bg-[#4e595f]

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

                                <div className="flex gap-3 w-full">

                                    <Input
                                        type="text"
                                        placeholder="No. Interior"
                                        onChange={(e: any) => {
                                            setNoInterior(e.target.value);
                                            setErrorLogin(false);
                                        }}
                                        classNames={{
                                            inputWrapper: `
                                            ${INPUT_HEIGHT}
                                            bg-[#444E53]
                                            dark:bg-[#2F3A3F]
                                      
                                            data-[hover=true]:bg-[#586267]
                                            dark:data-[hover=true]:bg-[#374247]
                                            data-[focus=true]:bg-[#4C585E]
                                            dark:data-[focus=true]:bg-[#4e595f]

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

                                    <Input
                                        isRequired
                                        type="text"
                                        placeholder="No. Exterior*"
                                        onChange={(e: any) => {
                                            setNoExterior(e.target.value);
                                            setErrorLogin(false);
                                        }}
                                        classNames={{
                                            inputWrapper: `
                                            ${INPUT_HEIGHT}
                                            bg-[#444E53]
                                            dark:bg-[#2F3A3F]
                                        
                                            data-[hover=true]:bg-[#586267]
                                            dark:data-[hover=true]:bg-[#374247]
                                            data-[focus=true]:bg-[#4C585E]
                                            dark:data-[focus=true]:bg-[#4e595f]

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

                                </div>

                                <div className="flex gap-3 w-full">

                                    {/* SELECTOR - País persona moral */}
                                    <Select
                                        label="País"
                                        isRequired
                                        selectedKeys={pais ? [pais] : []}
                                        onSelectionChange={(keys) => {
                                            const value = Array.from(keys)[0] as string;
                                            setPais(value);
                                            setEstado("");
                                            getEstados(value);
                                        }}
                                        classNames={{
                                            selectorIcon: "text-white",
                                            base: "w-full",
                                            trigger: `
                                h-11
                                bg-[#444E53]
                                dark:bg-[#2F3A3F]
            
                                data-[hover=true]:bg-[#586267]
                                dark:data-[hover=true]:bg-[#374247]
                                data-[focus=true]:bg-[#4C585E]
                                dark:data-[focus=true]:bg-[#4e595f]

                                rounded-xl
                                border border-transparent
                            `,
                                            label: "!text-zinc-400",
                                            value: "!text-white",
                                            popoverContent: "bg-[#2A3235] text-white",
                                        }}
                                    >
                                        {paises.map((pais) => (
                                            <SelectItem key={pais.id}>
                                                {pais.descripcion}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    {/* Estado Persona Moral*/}
                                    {pais !== "" && estados.length > 0 && (
                                        <Select
                                            label="Estado"
                                            isRequired
                                            selectedKeys={estado ? [estado] : []}
                                            onSelectionChange={(keys) => {
                                                setEstado(Array.from(keys)[0] as string);
                                            }}
                                            classNames={{
                                                selectorIcon: "text-white",
                                                base: "w-full",
                                                trigger: `
                                h-11
                                bg-[#444E53]
                                dark:bg-[#2F3A3F]

                                data-[hover=true]:bg-[#586267]
                                dark:data-[hover=true]:bg-[#374247]
                                data-[focus=true]:bg-[#4C585E]
                                dark:data-[focus=true]:bg-[#4e595f]

                                rounded-xl
                                border border-transparent
                                `,
                                                label: "!text-zinc-400",
                                                value: "!text-white",
                                                popoverContent: "bg-[#2A3235] text-white",
                                            }}
                                        >
                                            {estados.map((estado) => (
                                                <SelectItem key={estado.id}>
                                                    {estado.descripcion}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    )}

                                </div>

                                <Input
                                    isRequired
                                    type="text"
                                    placeholder="Código Postal*"
                                    onChange={(e: any) => {
                                        setCodigoPostal(e.target.value);
                                        getDirecciones(e.target.value);
                                        setErrorLogin(false);
                                    }}
                                    classNames={{
                                        inputWrapper: `
                                            ${INPUT_HEIGHT}
                                            bg-[#444E53]
                                            dark:bg-[#2F3A3F]
                                        
                                            data-[hover=true]:bg-[#586267]
                                            dark:data-[hover=true]:bg-[#374247]
                                            data-[focus=true]:bg-[#4C585E]
                                            dark:data-[focus=true]:bg-[#4e595f]

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


                                <Input
                                    isRequired
                                    value={ciudad}
                                    isDisabled
                                    placeholder="Localidad / Ciudad"
                                    classNames={{
                                        inputWrapper: `
                                    ${INPUT_HEIGHT}
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                    opacity-70
                                    cursor-not-allowed
                                    rounded-xl
                                `,
                                        input: `
                                    ${INPUT_TEXT}
                                    !text-[#111827]
                                    dark:!text-[#E5E7EB]
                                    placeholder:text-gray-400
                                    dark:caret-white
                                `,
                                    }}
                                />

                                <Select
                                    label="Colonia"
                                    isRequired
                                    selectedKeys={colonia ? [colonia] : []}
                                    onSelectionChange={(keys) =>
                                        setColonia(Array.from(keys)[0] as string)
                                    }
                                    maxListboxHeight={180}
                                    classNames={{
                                        base: "w-full",
                                        trigger: `
                                    ${INPUT_HEIGHT}
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
   
                                        data-[hover=true]:bg-[#586267]
                                        dark:data-[hover=true]:bg-[#374247]
                                        data-[focus=true]:bg-[#4C585E]
                                        dark:data-[focus=true]:bg-[#4e595f]

                                    rounded-xl
                                    border border-transparent
                                    `,
                                        label: "!text-zinc-400",
                                        value: "!text-white",
                                        popoverContent: "bg-[#2A3235] text-white",
                                    }}
                                >
                                    {colonias.map((coloniaitem) => (
                                        <SelectItem key={coloniaitem.id}>
                                            {coloniaitem.descripcion}
                                        </SelectItem>
                                    ))}
                                </Select>

                                {/* BOTONES */}
                                <div className="w-full flex justify-center">
                                    <div className="flex gap-6 mt-8"
                                    >

                                        <Button
                                            className="
                                        bg-[#4d6065]
                                        text-white 
                                        shadow-lg
                                        px-8 sm:px-10 md:px-10 lg:px-8                                                                                                        
                                        dark:text-white                                      
                                        
                                        transition-colors 
                                        duration-300"
                                            radius="full"
                                            onPress={previousPart}
                                        >
                                            <p className='font-montserrat_semibold'>ANTERIOR</p>
                                        </Button>

                                        <Button
                                            radius="full"
                                            onPress={nextPart}
                                            isDisabled={!isParte1Valid}
                                            className={`
                                        px-8
                                        sm:px-10
                                        md:px-10
                                        lg:px-8
                                       
                                        shadow-lg
                                        transition-all
                                        duration-300
                                        ${isParte1Valid ? BUTTON_ACTIVE_BG : BUTTON_INACTIVE_BG}
                                        ${isParte1Valid ? "hover:scale-105" : "cursor-not-allowed"}
                                    `}
                                        >
                                            <span
                                                className={`
                                            font-montserrat_semibold
                                            text-sm
                                            ${isParte1Valid ? BUTTON_ACTIVE_TEXT : BUTTON_INACTIVE_TEXT}
                                        `}
                                            >
                                                SIGUIENTE
                                            </span>
                                        </Button>

                                    </div>
                                </div>




                            </Form>
                        </div>



                        {/* ================= PARTE 2 ================= */}
                        <div className={`${parte2}`}>

                            <Form className="gap-5">

                                {/*SELECTOR - BANCOS */}
                                <Select
                                    label="Seleccione el banco:"
                                    isRequired
                                    selectedKeys={idBanco ? [idBanco] : []}
                                    onSelectionChange={(keys) => {
                                        const selectedId = Array.from(keys)[0] as string;

                                        const itemSeleccionado = bancos.find(
                                            (i) => i.id === selectedId
                                        );

                                        setIdBanco(selectedId);
                                        setNombreBanco(itemSeleccionado?.descripcion ?? "");
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
                                    {bancos.map((banco) => (
                                        <SelectItem key={banco.id}>
                                            {banco.descripcion}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <div className="flex gap-3 w-full">

                                    <Input
                                        isRequired
                                        placeholder="Ingrese la CLABE del banco"
                                        onChange={(e: any) => {
                                            setCLABE(e.target.value);
                                            setErrorLogin(false);
                                        }}
                                        classNames={{
                                            inputWrapper: `
                                    ${INPUT_HEIGHT}
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                    
                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]
    
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

                                    <Input
                                        isRequired
                                        placeholder="Ingrese el Código Postal Fiscal"
                                        onChange={(e: any) => {
                                            setCpFiscal(e.target.value);
                                            setErrorLogin(false);
                                        }}
                                        classNames={{
                                            inputWrapper: `
                                    ${INPUT_HEIGHT}
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                    
                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]
    
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

                                </div>

                                <div className="flex gap-3 w-full">

                                    <Input
                                        isRequired
                                        placeholder="Ingrese Clave lada*"
                                        onChange={(e: any) => {
                                            setClaveLada(e.target.value);
                                            setErrorLogin(false);
                                        }}
                                        classNames={{
                                            inputWrapper: `
                                    ${INPUT_HEIGHT}
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                  
                                    
                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]

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

                                    <Input
                                        isRequired
                                        placeholder="Ingrese teléfono de la empresa*"
                                        onChange={(e: any) => {
                                            setTelefono(e.target.value);
                                            setErrorLogin(false);
                                        }}
                                        classNames={{
                                            inputWrapper: `
                                    ${INPUT_HEIGHT}
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                  
                                    
                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]

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

                                    <Input
                                        placeholder="Ingrese extensión*"
                                        onChange={(e: any) => {
                                            setExtension(e.target.value);
                                            setErrorLogin(false);
                                        }}
                                        classNames={{
                                            inputWrapper: `
                                    ${INPUT_HEIGHT}
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                  
                                    
                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]

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

                                </div>


                                <div className="flex gap-3 w-full">
                                    <Input
                                        isRequired
                                        placeholder="Número FIEL*"
                                        onChange={(e: any) => {
                                            setNoFIEL(e.target.value);
                                            setErrorLogin(false);
                                        }}
                                        classNames={{
                                            inputWrapper: `
                                    ${INPUT_HEIGHT}
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                  
                                    
                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]

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

                                    <Input
                                        isRequired
                                        placeholder="Número de Escritura de Constitución*"
                                        onChange={(e: any) => {
                                            setNumEscrituraConstitucion(e.target.value);
                                            setErrorLogin(false);
                                        }}
                                        classNames={{
                                            inputWrapper: `
                                    ${INPUT_HEIGHT}
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                  
                                    
                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]

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
                                </div>

                                <div className="flex gap-3 w-full">

                                    <Input
                                        type="date"
                                        isRequired
                                        label="Fecha de Constitución"
                                        labelPlacement='outside'
                                        onChange={(e: any) => {
                                            setFechaConstitucion(e.target.value);
                                            setErrorLogin(false);
                                        }}
                                        classNames={{
                                            inputWrapper: `
                                    h-11
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                  
                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]

                                    transition-colors
                                    rounded-xl
                                    border border-transparent
                                    `,
                                            input: `
                                    text-sm
                                    !text-[#111827]
                                    dark:!text-[#E5E7EB]
                                    dark:caret-white
                                    `,
                                        }}
                                    />

                                    <Input
                                        type="date"
                                        isRequired
                                        label="Fecha de de Protocolización**"
                                        labelPlacement='outside'
                                        onChange={(e: any) => {
                                            setFechaProtocolizacion(e.target.value);
                                            setErrorLogin(false);
                                        }}
                                        classNames={{
                                            inputWrapper: `
                                    h-11
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                  
                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]

                                    transition-colors
                                    rounded-xl
                                    border border-transparent
                                    `,
                                            input: `
                                    text-sm
                                    !text-[#111827]
                                    dark:!text-[#E5E7EB]
                                    dark:caret-white
                                    `,
                                        }}
                                    />

                                </div>

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


                                {/* BOTONES PARTE 2 */}
                                <div className="w-full flex justify-center">
                                    <div className="flex gap-6 mt-3">

                                        {/* BOTÓN ANTERIOR */}
                                        <Button
                                            className="
                                            bg-[#4d6065]
                                            text-white 
                                            shadow-lg
                                            px-8 sm:px-10 md:px-10 lg:px-8                                                                                                        
                                            transition-colors 
                                            duration-300
                                        "
                                            radius="full"
                                            onPress={previousPart}
                                        >
                                            <p className="font-montserrat_semibold">ANTERIOR</p>
                                        </Button>

                                        {/* BOTÓN SIGUIENTE */}
                                        <Button
                                            radius="full"
                                            // onPress={()=>{AgregarUsuario(), nextPart}}
                                            onPress={() => { nextPart(); }}
                                            isDisabled={!isParte2Valid}
                                            className={`
                                            px-8
                                            sm:px-10
                                            md:px-10
                                            lg:px-8
                                            shadow-lg
                                            transition-all
                                            duration-300
                                            ${isParte2Valid ? BUTTON_ACTIVE_BG : BUTTON_INACTIVE_BG}
                                            ${isParte2Valid ? "hover:scale-105" : "cursor-not-allowed"}
                                        `}
                                        >
                                            <span
                                                className={`
                                            font-montserrat_semibold
                                            text-sm
                                            ${isParte2Valid ? BUTTON_ACTIVE_TEXT : BUTTON_INACTIVE_TEXT}
                                            `}
                                            >
                                                SIGUIENTE**

                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </Form>

                        </div>

                        {/* ================= PARTE 3 ================= */}
                        {/**INGRESO DE PIN */}
                        <div className={parte3}>

                            <Form className='gap-5'>

                                <Input
                                    isRequired
                                    placeholder=" Ingrese el nombre del representante legal(s)*"
                                    onChange={(e: any) => {
                                        setNombreR(e.target.value);
                                        setErrorLogin(false);
                                    }}
                                    classNames={{
                                        inputWrapper: `
                                ${INPUT_HEIGHT}
                                bg-[#444E53]
                                dark:bg-[#2F3A3F]
                               
                                data-[hover=true]:bg-[#586267]
                                dark:data-[hover=true]:bg-[#374247]
                                data-[focus=true]:bg-[#4C585E]
                                dark:data-[focus=true]:bg-[#4e595f]

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

                                {/* INPUT - Apellido paterno y Apellido materno */}
                                <div className="flex gap-3 w-full">

                                    {/* INPUT - Apellido paterno */}
                                    <Input
                                        isRequired
                                        placeholder="Apellido Paterno del representante legal*"
                                        onChange={(e: any) => {
                                            setPaternoR(e.target.value);
                                            setErrorLogin(false);
                                        }}
                                        classNames={{
                                            inputWrapper: `
                                    ${INPUT_HEIGHT}
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]

                                    transition-colors 
                                    duration-150 
                                    ease-in-out

                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]
                                 

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

                                    {/* INPUT - Apellido paterno */}
                                    <Input
                                        isRequired
                                        placeholder="Apellido Materno del representante legal*"
                                        onChange={(e: any) => {
                                            setMaternoR(e.target.value);
                                            setErrorLogin(false);
                                        }}
                                        classNames={{
                                            inputWrapper: `
                                    ${INPUT_HEIGHT}
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                  
                                    
                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]

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
                                </div>

                                {/* INPUT - CURP */}
                                <Input
                                    isRequired
                                    placeholder="CURP del representante Legal*"
                                    onChange={(e: any) => {
                                        setCURPR(e.target.value);
                                        setErrorLogin(false);
                                    }}
                                    classNames={{
                                        inputWrapper: `
                                ${INPUT_HEIGHT}
                                bg-[#444E53]
                                dark:bg-[#2F3A3F]
                        
                                data-[hover=true]:bg-[#586267]
                                dark:data-[hover=true]:bg-[#374247]
                                data-[focus=true]:bg-[#4C585E]
                                dark:data-[focus=true]:bg-[#4e595f]

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

                                {/* INPUT - RFC */}
                                <Input
                                    isRequired
                                    placeholder="RFC del representante legal*"
                                    onChange={(e: any) => {
                                        setRFCR(e.target.value);
                                        setErrorLogin(false);
                                    }}
                                    classNames={{
                                        inputWrapper: `
                                ${INPUT_HEIGHT}
                                bg-[#444E53]
                                dark:bg-[#2F3A3F]
                        
                                data-[hover=true]:bg-[#586267]
                                dark:data-[hover=true]:bg-[#374247]
                                data-[focus=true]:bg-[#4C585E]
                                dark:data-[focus=true]:bg-[#4e595f]

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

                                <Input
                                    isRequired
                                    placeholder="E-mail del representante legal*"
                                    onChange={(e: any) => {
                                        setEmailR(e.target.value);
                                        setErrorLogin(false);
                                    }}
                                    classNames={{
                                        inputWrapper: `
                                ${INPUT_HEIGHT}
                                bg-[#444E53]
                                dark:bg-[#2F3A3F]
                        
                                data-[hover=true]:bg-[#586267]
                                dark:data-[hover=true]:bg-[#374247]
                                data-[focus=true]:bg-[#4C585E]
                                dark:data-[focus=true]:bg-[#4e595f]

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

                                <Input
                                    isRequired
                                    placeholder="Número de la escritura pública del poder otorgado al representante legal *"
                                    onChange={(e: any) => {
                                        setNoEscrituraPoderR(e.target.value);
                                        setErrorLogin(false);
                                    }}
                                    classNames={{
                                        inputWrapper: `
                                ${INPUT_HEIGHT}
                                bg-[#444E53]
                                dark:bg-[#2F3A3F]
                        
                                data-[hover=true]:bg-[#586267]
                                dark:data-[hover=true]:bg-[#374247]
                                data-[focus=true]:bg-[#4C585E]
                                dark:data-[focus=true]:bg-[#4e595f]

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

                                <Input
                                    type="date"
                                    isRequired
                                    label="Fecha de protocolización del poder otorgado al representante legal"
                                    labelPlacement='outside'
                                    onChange={(e: any) => {
                                        setFechaProtocolizacionPoderO(e.target.value);
                                        setErrorLogin(false);
                                    }}
                                    classNames={{
                                        inputWrapper: `
                                    h-11
                                    bg-[#444E53]
                                    dark:bg-[#2F3A3F]
                                  
                                    data-[hover=true]:bg-[#586267]
                                    dark:data-[hover=true]:bg-[#374247]
                                    data-[focus=true]:bg-[#4C585E]
                                    dark:data-[focus=true]:bg-[#4e595f]

                                    transition-colors
                                    rounded-xl
                                    border border-transparent
                                    `,
                                        input: `
                                    text-sm
                                    !text-[#111827]
                                    dark:!text-[#E5E7EB]
                                    dark:caret-white
                                    `,
                                    }}
                                />

                                <Input
                                    isRequired
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Crea tu contraseña*"
                                    onChange={(e: any) => {
                                        setPassword(e.target.value);
                                        setErrorLogin(false);
                                    }}
                                    classNames={{
                                        inputWrapper: `
                                                                    ${INPUT_HEIGHT}
                                                                    bg-[#444E53]
                                                                    dark:bg-[#2F3A3F]
                                         
                                                                    data-[hover=true]:bg-[#586267]
                                                                    dark:data-[hover=true]:bg-[#374247]
                                                                    data-[focus=true]:bg-[#4C585E]
                                                                    dark:data-[focus=true]:bg-[#4e595f]
                                
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
                                    endContent={
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="focus:outline-none"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} className="text-gray-400" />
                                            ) : (
                                                <Eye size={18} className="text-gray-400" />
                                            )}
                                        </button>
                                    }
                                />

                                {/* CHECK BOXES */}
                                <div className="flex justify-center">
                                    <div className="grid grid-cols-2 gap-4">

                                        <Checkbox

                                            className='ml-3'
                                            color="secondary"
                                            onChange={() => setConfirm18(!confirm18)}
                                        >
                                            <p className="text-[10px] leading-tight text-zinc-400">
                                                Confirmo que tengo 18 años o más.
                                            </p>
                                        </Checkbox>

                                        <Checkbox
                                            color="secondary"
                                            onChange={() => setConfirmTC(!confirmTC)}
                                        >
                                            <p className="text-[10px] leading-tight text-zinc-400">
                                                Acepto{" "}
                                                <a
                                                    href="#"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-zinc-400 text-[10px]   hover:text-primary-50"
                                                >
                                                    términos y condiciones
                                                </a>
                                            </p>
                                        </Checkbox>
                                    </div>
                                </div>

                                {/* BOTONES PARTE 2 */}
                                <div className="w-full flex justify-center">
                                    <div className="flex gap-6 mt-3">

                                        {/* BOTÓN ANTERIOR */}
                                        <Button
                                            className="
                                            bg-[#4d6065]
                                            text-white 
                                            shadow-lg
                                            px-8 sm:px-10 md:px-10 lg:px-8                                                                                                        
                                            transition-colors 
                                            duration-300
                                        "
                                            radius="full"
                                            onPress={previousPart}
                                        >
                                            <p className="font-montserrat_semibold">ANTERIOR</p>
                                        </Button>

                                        {/* BOTÓN SIGUIENTE */}
                                        <Button
                                            radius="full"
                                            onPress={()=>AgregarUsuario()}
                                            //onPress={() => { nextPart(); }}
                                            isDisabled={!isParte3Valid}
                                            className={`
                                            px-8
                                            sm:px-10
                                            md:px-10
                                            lg:px-8
                                            shadow-lg
                                            transition-all
                                            duration-300
                                            ${isParte3Valid ? BUTTON_ACTIVE_BG : BUTTON_INACTIVE_BG}
                                            ${isParte3Valid ? "hover:scale-105" : "cursor-not-allowed"}
                                        `}
                                        >
                                            <span
                                                className={`
                                            font-montserrat_semibold
                                            text-sm
                                            ${isParte3Valid ? BUTTON_ACTIVE_TEXT : BUTTON_INACTIVE_TEXT}
                                            `}
                                            >
                                                SIGUIENTE***

                                            </span>
                                        </Button>
                                    </div>
                                </div>

                            </Form>

                            {loading? <PreloaderBar></PreloaderBar>:null}

                        </div>

                        {/* ================= PARTE 4 ================= */}
                        {/**INGRESO DE PIN */}
                        <div className={parte4}>
                            <div className="w-full">
                                <div className='mt-8 sm:mt-14 md:mt-14 lg:mt-14 xl:mt-14 2xl:mt-12'>
                                    <div>
                                        <p className="mb-6 font-montserrat_semibold text-base text-center text-white dark:text-white">
                                            Por favor ingrese el PIN que fue enviado al e-mail que proporcionó durante su registro.
                                        </p>
                                    </div>

                                    <div className="mt-6 flex justify-center">
                                        <InputOtp
                                            className="text-black"
                                            length={4}
                                            value={pin}
                                            onValueChange={setPIN}
                                            size="lg"
                                            variant="bordered"
                                            classNames={{
                                                segment: `      
                                                                    gap-2                                      
                                                                    border-gray-400
                                                                    dark:border-gray-600
                        
                                                                    !text-white 
                                                                    data-[focus=true]:text-white
                                                                    data-[filled=true]:text-white
                        
                                                                    data-[focus=true]:border-primary-50
                                                                    dark:data-[focus=true]:border-[#34cacc]
                                                                   
                                                                   
                                                                    transition-all duration-200
                                                                    `,
                                            }}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 place-items-center">
                                        <div className="mt-8 text-center">

                                            {errorlogin && (
                                                <p className="text-xs text-red-500 font-montserrat_semibold mb-4">
                                                    El PIN proporcionado no es válido o ha expirado
                                                </p>
                                            )}

                                            <Button
                                                radius="full"
                                                color="secondary"
                                                className={`
                                                                        mx-auto
                                                                        mt-12 sm:mt-12 md:mt-14 lg:mt-16
                                                                        px-16 shadow-lg transition-all duration-300
                                                                        ${isParte1Valid ? BUTTON_ACTIVE_BG : BUTTON_INACTIVE_BG}
                                                                        ${isParte1Valid ? "hover:scale-105" : "cursor-not-allowed"}
                                                                    `}
                                                onPress={validarPIN}
                                                isDisabled={pin.length !== 4 || loading}
                                            >
                                                <p className="font-montserrat_semibold">
                                                    {loading ? "VALIDANDO..." : "VALIDAR PIN"}
                                                </p>

                                            </Button>

                                            {loading ? <PreloaderBar /> : null}




                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mensajes de ERROR */}
                        <div className='text-danger text-center pt-2'>
                            {msgerror ?
                                <> {msgerror}
                                    <div>
                                        <a className='text-start font-montserrat_bold text-xs sm:text-xs text-primary-50 dark:text-sky-400'
                                            href="../registro">Intentar de nuevo</a>
                                    </div></>
                                : null}
                        </div>



                        {/* FOOTER en tarjeta*/}
                        <div className="mt-7 sm:mt-7 md:mt-9 lg:mt-10 xl:mt-10 px-2 sm:px-6 md:px-8 lg:px-10">
                            <p className="text-center text-[9px] sm:text-[10px] md:text-[11px] lg:text-[11px] text-[#8C9296] font-montserrat_regular">
                                Derechos reservados 2026. © AXION. Institución de Banca. Grupo
                                Financiero AXION.{" "}
                                <span className="
                        font-montserrat_medium
                        text-white
                        transition-colors duration-200
                        hover:text-primary-50
                        dark:hover:text-[#34cacc]
                        cursor-pointer
                      ">
                                    Aviso legal. Términos y Condiciones
                                </span>{" "}
                                | v 0.01
                            </p>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};
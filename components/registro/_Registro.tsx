"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import PreloaderBar from '../login/PreloaderBar';
import { Divider, mapPropsVariants, Progress } from "@heroui/react";
import { Checkbox } from "@heroui/react";
import { DateInput } from "@heroui/react";
import { CalendarDate, parseDate } from "@internationalized/date";
import { Form } from "@heroui/react";
import { Eye, EyeOff } from 'lucide-react';
import config from "../../config/config";
import { formatearFecha, obtenerEstadosOrdenados } from '../Utilidades';
import { Select, SelectItem } from "@heroui/react";
import { InputOtp } from "@heroui/input-otp";
import { getUserLocation } from '../Utilidades';

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

export const Registro = ({ setSessionHandle, pagerouter }: any) => {

    const [parte1, setParte1] = useState("block");
    const [parte2, setParte2] = useState("hidden");
    const [parte3, setParte3] = useState("hidden");
    const [parte4, setParte4] = useState("hidden");
    const [parte5, setParte5] = useState("hidden");
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
    const [nombre, setNombre] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [pais, setPais] = useState('187');
    const [estado, setEstado] = useState('');
    const [sexo, setSexo] = useState("H");
    const [paisnacimiento, setPaisNacimiento] = useState('187');
    const [estadonacimiento, setEstadoNacimiento] = useState('');
    const [colonia, setColonia] = useState('');
    const [direccion, setDireccion] = useState('');
    const [calle, setCalle] = useState('');
    const [noInterior, setNoInterior] = useState('');
    const [noExterior, setNoExterior] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [codigopostal, setCodigoPostal] = useState('');
    const [iddelegacion, setIdDelegacion] = useState('');
    const [celular, setCelular] = useState('');
    const [fechanacimiento, setFechaNacimiento] = useState('');
    const [curp, setCURP] = useState('');
    const [longitud, setLongitud] = useState('');
    const [latitud, setLatitud] = useState('');
    const [regimenfiscal, setRegimenFiscal] = useState('');
    const [location, setLocation] = useState({ lat: 0, lng: 0 });

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [errorlogin, setErrorLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msgerror, setMsgError] = useState("");

    const [idusuarionuevo, setIdUsuarioNuevo] = useState("");

    //const estados = obtenerEstadosOrdenados();

    const [id, setID] = useState("");
    const [pin, setPIN] = useState("");

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

            //console.log(result);

            const parsedData: Paises[] = JSON.parse(result.data);
            setPaises(parsedData);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    /*OBTENER LISTADO DE ESTADOS */
    const getEstados = async (idpais: any) => {

        console.log(idpais);

        const datasend = JSON.stringify({
            idrecurso: idpais
        });

        console.log(datasend);

        try {
            const response = await fetch(config.baseUrlAPI + "estados", {
                method: "POST",
                body: datasend,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            console.log(result);

            const parsedData: Estados[] = JSON.parse(result.data);
            setEstados(parsedData);

        } catch (error) {
            console.error(error);
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

            console.log("=> ", result);

            //result.colonia[0] ? console.log(result.colonia[0].descripcion, result.colonia[0].id) : "";
            //console.log(result.municipio.descripcion, result.municipio.id);

            if (result.colonia)
                setColonias(result.colonia);

            if (result.municipio.descripcion) {
                setCiudad(result.municipio.descripcion);
                setIdDelegacion(result.municipio.id);
            }
            //const parsedData: Estados[] = JSON.parse(result.data);
            //setEstados(parsedData);

        } catch (error) {
            console.error(error);
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

            // console.log("=> ", result);

            //result.colonia[0] ? console.log(result.colonia[0].descripcion, result.colonia[0].id) : "";
            //console.log(result.municipio.descripcion, result.municipio.id);

            const parsedData: Regimenes[] = JSON.parse(result.data);
            setRegimenes(parsedData);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: any) => {
        //setEstadoSeleccionado(e.target.value);
        console.log("Estado seleccionado:", e.target.value);
        setEstado(e.target.value);
        setErrorLogin(false);
    };

    const nextPart = () => {

        setMsgError("");

        if (parteactual === 1) {
            setParte1("hidden");
            setParteActual(parteactual + 1);
            setParte2("block");
            setParte3("hidden");
            setParte4("hidden");
            setValueProgress(valueProgress + 25);
        }

        if (parteactual === 2) {

            setParte1("hidden");
            setParteActual(parteactual + 1);
            setParte2("hidden");
            setParte3("block");
            setParte4("hidden");
            setValueProgress(valueProgress + 25);
        }

        if (parteactual === 3) {

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

        if (parteactual === 2) {
            setParte2("hidden");
            setParteActual(parteactual - 1);
            setParte1("block");
            setValueProgress(valueProgress - 25);
        }

        if (parteactual === 3) {
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
            nombre: nombre,
            apellidoPaterno: paterno,
            apellidoMaterno: materno,
            email: email,
            telCelular: celular,
            fechaNacimiento: fechanacimiento,
            curp: curp,
            idPaisDom: pais,
            idEstadoDom: estado,
            idDelegacion: iddelegacion,
            idColonia: colonia,
            cp: codigopostal,
            calle: calle,
            noExt: noExterior,
            noInterior: noInterior,
            idPaisNacimiento: paisnacimiento,
            idEstadoNacimiento: estadonacimiento,
            sexo: sexo,
            latitud: "" + location.lat,
            longitud: "" + location.lng,
            idRegimenFiscal: regimenfiscal,
            password: password
        });

        const baseURL = config.baseUrlAPI + "ax/usuarios/add";

        console.log(datasend);


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

                if (result.auth === "ERRORNEW") {
                    setMsgError("El email/usuario ya tienen una cuenta asociada.");
                    return false;
                }
                if (result.auth === "OKPROCCES") {

                    setIdUsuarioNuevo("" + result.data[0].idExterno);

                    console.log(result.data[0].uuid);
                    localStorage.setItem("idinternog_axnweb", "" + result.data[0].idExterno);


                    localStorage.setItem("nombreusuario_axnweb", result.data[0].nombre);
                    localStorage.setItem("paternog_axnweb", result.data[0].apellidoPaterno);
                    localStorage.setItem("maternog_axnweb", result.data[0].apellidoMaterno);

                    localStorage.setItem("idexternog_axnweb", result.data[0].idExterno);
                    localStorage.setItem("idcontrato_axnweb", result.data[0].idcontrato);
                    localStorage.setItem("uuidg_axnweb", result.data[0].uuid);

                    localStorage.setItem("email_axnweb", result.data[0].email);
                    localStorage.setItem("direccion_axnweb", result.data[0].calle + " " + result.data[0].noInt + "...");
                    localStorage.setItem("celular_axnweb", result.data[0].telCelular);
                    localStorage.setItem("fechanacimiento_axnweb", result.data[0].fechaNacimiento);

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

        console.log(idusuarionuevo, pin);

        if (!pin) {
            setErrorLogin(true);
            setLoading(false);
            return false;
        }

        const datasend = JSON.stringify({
            email: email,
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

            console.log(result);
            //return;

            if (result.auth === 'OKPIN') { //Autenticación correcta

                localStorage.setItem("token_axnweb", result.token);

                localStorage.setItem("session_axnweb", "" + new Date().getTime());
                //         localStorage.setItem("token_axnweb", "" + result.token);

                //         localStorage.setItem("email_axnweb", "" + email);
                //         localStorage.setItem("direccion_axnweb", "" + calle + " " + noInterior + " " + noExterior + ", " + ciudad);
                //         localStorage.setItem("celular_axnweb", "" + celular);
                //         localStorage.setItem("fechanacimiento_axnweb", "" + fechanacimiento);

                //  localStorage.setItem("nombreusuario_axnweb", nombre );
                //  localStorage.setItem("paternog_axnweb", paterno);
                //  localStorage.setItem("maternog_axnweb",  materno);

                // // localStorage.setItem("idexternog_axnweb", result.data.idExterno);
                // // localStorage.setItem("idcontrato_axnweb", result.data.idcontrato);
                // // localStorage.setItem("uuidg_axnweb", result.data.uuid);

                // // localStorage.setItem("email_axnweb", result.data.email);
                // // localStorage.setItem("direccion_axnweb", result.data.calle + " " + result.data.noInt + "...");
                // // localStorage.setItem("celular_axnweb", result.data.telCelular);
                // // localStorage.setItem("fechanacimiento_axnweb", result.data.fechaNacimiento);

                router.push(config.baseUrl + "/miperfil");

                setErrorLogin(false);
                return;

            } else if (result.auth === "ERRORLOGIN") {
                setMsgError("El PIN proporcionado no es válido o ha expirado.");
            }

        } catch (error) {
            console.error("Error en el proceso de login:", error);
            //handleAuthenticationFailure();
        }

        setLoading(false);
    };

    useEffect(() => {

        getPaises();
        getEstados(187); //México default
        getRegimenFiscal();
        getUserLocation().then(setLocation);

        console.log(location);

    }, []);


    return (

        <div className="min-h-screen flex bg-white dark:bg-gradient-to-bl from-[#812DE2] from-1% via-[#03004E] via-30% to-[#812DE2] to-100% text-white">
            {/* Lado izquierdo: Imagen */}
            <div className="w-1/2 hidden md:flex items-center justify-center overflow-hidden">
                <img
                    src="../imagenes/registro_img.png"
                    alt="Imagen registro"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Lado derecho: Formulario */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-7 py-12">
                <div className="w-full max-w-md">
                    <div className='mt-[85px] sm:mt-16 md:mt-20 lg:mt-[90px] xl:mt-[90px] 2xl:mt-10'>
                        <div>
                            <p className="mb-6 font-montserrat_semibold text-3xl text-start text-primary-800 dark:text-white">
                                Crea tu cuenta
                            </p>
                        </div>
                        <div>
                            <p className='font-montserrat_medium text-start text-primary-800 dark:text-[#aaaaaa] -mt-6'>
                                Ingresa tus datos
                            </p>
                        </div>
                        <div>
                            <div className='mt-2 mb-3'>
                                <Progress
                                    aria-label="Loading..."
                                    classNames={{
                                        track: "bg-gray-200 dark:bg-zinc-100",
                                        //  indicator: "bg-green-500 dark:bg-green-300",
                                    }}
                                    className="w-[100%] "
                                    color="secondary"
                                    value={valueProgress} />

                            </div>
                        </div>
                    </div>

                    {/*PARTE 1 */}
                    <div className={`${parte1}`}>

                        <Form className='gap-5'>

                            <Select className="max-w-xs" label="Seleccione tipo de persona" onChange={(e) => setPersona(e.target.value)}>

                                <SelectItem key="fisica">Persona Física</SelectItem>
                                <SelectItem key="moral">Persona Moral</SelectItem>

                            </Select>

                        </Form>
                    </div>
                    {/* FIN DE PARTE 1 */}

                    {/*PARTE 2 */}
                    <div className={`${parte2}`}>
                        <Form className='gap-5'>

                            <Input
                                isRequired
                                onChange={(e: any) => { setNombre(e.target.value); setErrorLogin(false); }}
                                classNames={{
                                    inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white",
                                    input: "!text-black placeholder:text-gray-400",
                                    label: "text-black", // si estás sobre fondo oscuro
                                }}
                                className="caret-black dark:caret-black"
                                label="Nombre(s)"
                                labelPlacement="outside"
                                name="Nombre"
                                placeholder="Ingrese su(s) nombre(s)"
                                color='secondary'
                            />

                            <Input
                                isRequired
                                onChange={(e: any) => { setPaterno(e.target.value); setErrorLogin(false); }}
                                classNames={{
                                    inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white",
                                    input: "!text-black placeholder:text-gray-400",
                                    label: "text-black", // si estás sobre fondo oscuro
                                }}
                                className="caret-black dark:caret-black"
                                label="Apellido Paterno"
                                labelPlacement="outside"
                                name="paterno"
                                placeholder="Ingrese sus apellido paterno"
                                color='secondary'
                            />

                            <Input
                                isRequired
                                onChange={(e: any) => { setMaterno(e.target.value); setErrorLogin(false); }}
                                classNames={{
                                    inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white",
                                    input: "!text-black placeholder:text-gray-400",
                                    label: "text-black", // si estás sobre fondo oscuro
                                }}
                                className="caret-black dark:caret-black"
                                label="Apellido Materno"
                                labelPlacement="outside"
                                name="materno"
                                placeholder="Ingrese su apellido materno"
                                color='secondary'
                            />

                            {/* Una sola línea */}
                            <div className="flex gap-3 w-full">

                                <Input
                                    isRequired
                                    type='date'
                                    classNames={{
                                        inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white ",
                                        input: "!text-black placeholder:text-gray-400",
                                        label: "text-black dark:text-white",
                                    }}
                                    label={"Fecha de nacimiento"}
                                    labelPlacement="outside"
                                    variant="flat"
                                    //placeholderValue={new CalendarDate(1995, 11, 6)}
                                    className="caret-black dark:caret-black"
                                    color='secondary'
                                    onChange={(e: any) => { setFechaNacimiento(e.target.value); setErrorLogin(false); }}
                                // onChange={(fecha: CalendarDate | null) => {
                                //     if (fecha) {
                                //         const fechaFormateada = `${fecha.year}-${String(fecha.month).padStart(2, '0')}-${String(fecha.day).padStart(2, '0')}`;
                                //         setFechaNacimiento(fechaFormateada);
                                //     } else {
                                //         setFechaNacimiento(""); // o el valor que consideres apropiado
                                //     }
                                //     setErrorLogin(false);
                                // }}

                                />

                                <Select
                                    label="Sexo:"
                                    placeholder="Seleccione Sexo"
                                    isRequired
                                    labelPlacement='outside'
                                    onSelectionChange={(keys) => { setSexo("" + Array.from(keys)) }}
                                    defaultSelectedKeys={["H"]}
                                >

                                    <SelectItem key={"H"}>
                                        Hombre
                                    </SelectItem>

                                    <SelectItem key={"M"}>
                                        Mujer
                                    </SelectItem>

                                </Select>

                            </div>

                            <Input
                                isRequired
                                onChange={(e: any) => { setCURP(e.target.value); setErrorLogin(false); }}
                                classNames={{
                                    inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white",
                                    input: "!text-black placeholder:text-gray-400",
                                    label: "text-black", // si estás sobre fondo oscuro
                                }}
                                className="caret-black dark:caret-black"
                                label="CURP"
                                labelPlacement="outside"
                                name="curp"
                                placeholder="Ingrese su CURP"
                                color='secondary'
                            />

                            <Select
                                label="Régimen Fiscal:"
                                placeholder="Seleccione su Régimen Fiscal"
                                isRequired
                                labelPlacement='outside'
                                onSelectionChange={(keys) => {
                                    "" + Array.from(keys) === "" ? (setRegimenFiscal("")) : setRegimenFiscal("" + Array.from(keys)),
                                        console.log("" + Array.from(keys))
                                }}
                            >
                                {regimenes.map((regimen) => (
                                    <SelectItem key={regimen.id}>
                                        {regimen.descripcion}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Select
                                label="País de Nacimiento:"
                                placeholder="Seleccione País de Nacimiento"
                                isRequired
                                labelPlacement='outside'
                                onSelectionChange={(keys) => {
                                    "" + Array.from(keys) === "" ? (setPaisNacimiento("")) : setPaisNacimiento("" + Array.from(keys)),
                                        console.log("" + Array.from(keys)),
                                        setEstadoNacimiento("");
                                    getEstados("" + Array.from(keys))
                                }}
                                //maxListboxHeight={180}
                                defaultSelectedKeys={["187"]}
                            >
                                {paises.map((pais) => (
                                    <SelectItem key={pais.id}>
                                        {pais.descripcion}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Select
                                label="Estado de Nacimiento"
                                placeholder='Seleccione Estado de Nacimiento'
                                isRequired
                                labelPlacement='outside'
                                onSelectionChange={(keys) => { setEstadoNacimiento("" + Array.from(keys)) }}
                            >

                                {estados.map((estado) => (
                                    <SelectItem key={estado.id}>
                                        {estado.descripcion}
                                    </SelectItem>
                                ))}

                            </Select>

                        </Form>
                    </div>

                    <div className={`${parte3}`}>

                        <Form>

                            <Input
                                isRequired
                                errorMessage={({ validationDetails }) => {
                                    if (validationDetails.valueMissing) {
                                        return "Por favor ingresa tu email";
                                    }
                                    if (validationDetails.typeMismatch) {
                                        return "Por favor ingresa un email válido";
                                    }
                                }}
                                onChange={(e: any) => { setEmail(e.target.value); setErrorLogin(false); }}
                                classNames={{
                                    inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white",
                                    input: "text-black placeholder:text-gray-400",
                                    label: "text-black",
                                }}
                                label="Email"
                                variant='flat'
                                className="caret-black dark:caret-black dark:text-black"
                                labelPlacement="outside"
                                name="email"
                                placeholder="Ingrese su email "
                                type="email"
                                color='secondary'
                            />

                            <Input
                                isRequired
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e: any) => {
                                    setPassword(e.target.value);
                                    setErrorLogin(false);
                                }}
                                classNames={{
                                    inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white",
                                    input: "!text-black placeholder:text-gray-400",
                                    label: "text-black",
                                }}
                                className="caret-black dark:caret-dark"
                                label="Contraseña"
                                labelPlacement="outside"
                                name="contraseña"
                                placeholder="Ingrese su contraseña"
                                color="secondary"
                                endContent={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} className="text-gray-500" />
                                        ) : (
                                            <Eye size={20} className="text-gray-500" />
                                        )}
                                    </button>
                                }
                            />

                            <Input
                                isRequired
                                onChange={(e: any) => { setCelular(e.target.value); setErrorLogin(false); }}
                                classNames={{
                                    inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white",
                                    input: "!text-black placeholder:text-gray-400",
                                    label: "text-black", // si estás sobre fondo oscuro
                                }}
                                className="caret-black dark:caret-black"
                                label="Celular"
                                labelPlacement="outside"
                                name="celular"
                                placeholder="Ingrese su número de celular"
                                color='secondary'
                            />

                            <Select
                                label="País de Residencia:"
                                placeholder="Seleccione País de Residencia"
                                isRequired
                                labelPlacement='outside'
                                //onSelectionChange={(keys) => { setPais("" + Array.from(keys)), getEstados("" + Array.from(keys)) }}
                                onSelectionChange={(keys) => {
                                    "" + Array.from(keys) === "" ? (setPais("")) : setPais("" + Array.from(keys)),
                                        console.log("" + Array.from(keys)),
                                        setEstado("");
                                    getEstados("" + Array.from(keys))
                                }}
                                //maxListboxHeight={180}
                                defaultSelectedKeys={["187"]}
                            >
                                {paises.map((pais) => (
                                    <SelectItem key={pais.id}>
                                        {pais.descripcion}
                                    </SelectItem>
                                ))}
                            </Select>

                            {pais != '' && estados.length > 0 ?

                                <Select
                                    label="Estado de Residencia"
                                    placeholder='Seleccione Estado de Residencia'
                                    isRequired
                                    labelPlacement='outside'
                                    onChange={handleChange}>
                                    {estados.map((estado) => (
                                        <SelectItem key={estado.id}>
                                            {estado.descripcion}
                                        </SelectItem>
                                    ))}
                                </Select>
                                : null}

                            <div className="flex gap-3 w-full">

                                <Input
                                    isRequired
                                    onChange={(e: any) => { setCalle(e.target.value); setErrorLogin(false); }}
                                    classNames={{
                                        inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white",
                                        input: "!text-black placeholder:text-gray-400",
                                        label: "text-black", // si estás sobre fondo oscuro
                                    }}
                                    className="caret-black dark:caret-black"
                                    label="Calle"
                                    labelPlacement="outside"
                                    name="Calle"
                                    placeholder="Ingrese el nombre de su calle"
                                    color='secondary'
                                />

                                <Input
                                    isRequired
                                    onChange={(e: any) => {
                                        setCodigoPostal(e.target.value);
                                        getDirecciones(e.target.value);
                                        setErrorLogin(false);
                                    }}
                                    classNames={{
                                        inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white",
                                        input: "!text-black placeholder:text-gray-400",
                                        label: "text-black", // si estás sobre fondo oscuro
                                    }}
                                    className="caret-black dark:caret-black"
                                    label="Código Postal"
                                    labelPlacement="outside"
                                    name="cp"
                                    placeholder="Código Postal"
                                    color='secondary'
                                />

                            </div>

                            <div className="flex gap-3 w-full">

                                <Input
                                    isRequired
                                    onChange={(e: any) => { setNoExterior(e.target.value); setErrorLogin(false); }}
                                    classNames={{
                                        inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white",
                                        input: "!text-black placeholder:text-gray-400",
                                        label: "text-black", // si estás sobre fondo oscuro
                                    }}
                                    className="caret-black dark:caret-black"
                                    label="Número Exterior"
                                    labelPlacement="outside"
                                    name="Número Exterior"
                                    placeholder="Ingrese el Número Exterior"
                                    color='secondary'
                                />

                                <Input
                                    onChange={(e: any) => { setNoInterior(e.target.value); setErrorLogin(false); }}
                                    classNames={{
                                        inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white",
                                        input: "!text-black placeholder:text-gray-400",
                                        label: "text-black", // si estás sobre fondo oscuro
                                    }}
                                    className="caret-black dark:caret-black"
                                    label="Número Interior"
                                    labelPlacement="outside"
                                    name="Número Interior"
                                    placeholder="Ingrese el Número Interior"
                                    color='secondary'
                                />

                            </div>


                            {/* Colonia => una sola línea */}
                            <div className="flex gap-3 w-full">

                                <Input
                                    isRequired
                                    classNames={{
                                        inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white ",
                                        input: "!text-black placeholder:text-gray-400",
                                        label: "text-black dark:text-white",
                                    }}
                                    className="caret-black dark:caret-black"
                                    label="Localidad/Ciudad:"
                                    labelPlacement="outside"
                                    name="ciudad"
                                    placeholder="Localidad/Ciudad"
                                    defaultValue={ciudad}
                                    value={ciudad}
                                    color='secondary'
                                    isDisabled
                                />

                                <Select
                                    label="Colonia:"
                                    isRequired
                                    placeholder="Seleccione Colonia"
                                    onSelectionChange={(keys) => { setColonia("" + Array.from(keys)) }}
                                    maxListboxHeight={180}
                                    defaultSelectedKeys={["187"]}
                                    labelPlacement="outside"
                                >
                                    {colonias.map((coloniaitem) => (
                                        <SelectItem key={coloniaitem.id}>
                                            {coloniaitem.descripcion}
                                        </SelectItem>
                                    ))}
                                </Select>



                            </div>

                            <br></br>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='grid-cols-1'>
                                    <Checkbox color="secondary" onChange={() => setConfirm18(confirm18 ? false : true)}>
                                        <p className='text-[10px] leading-tight'>Confirmo que tengo 18 años o más.</p>
                                    </Checkbox>
                                </div>

                                <div className='grid-cols-1 justify-self-end'>
                                    <Checkbox color="secondary" onChange={() => setConfirmTC(confirmTC ? false : true)}>
                                        <p className='text-[10px] leading-tight'>Acepto términos y condiciones.</p>
                                    </Checkbox>
                                </div>
                            </div>

                        </Form>

                    </div>
                    {/* FIN DE PARTE 2 */}

                    {/**INGRESO DE PIN */}
                    <div className={parte4}>
                        <div className="w-full max-w-md">
                            <div className='mt-[85px] sm:mt-16 md:mt-20 lg:mt-[90px] xl:mt-[90px] 2xl:mt-10'>
                                <div>
                                    <p className="mb-6 font-montserrat_semibold text-3xl text-start text-primary-800 dark:text-white">
                                        Ingrese el PIN que le fue enviado al e-mail proporcionado para crear la cuenta
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
                                    />
                                </div>

                                <div className="grid grid-cols-1 place-items-center">
                                    <div className="mt-8 text-center">
                                        {errorlogin && (
                                            <p className="text-xs text-red-500 font-montserrat_semibold mb-4">
                                                El PIN proporcionado no es válido o ha expirado
                                            </p>
                                        )}

                                        {/* <Button
                                            radius="full"
                                            variant="ghost"
                                            color='secondary'
                                            className='sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-10'
                                            onPress={() => previousPart()}>
                                            <p className='font-montserrat_semibold '>ANTERIOR</p>
                                        </Button> <span> </span> */}

                                        {/* <Button
                                            radius="full"
                                            variant="ghost"
                                            color="secondary"
                                            onPress={validarPIN}
                                            isDisabled={pin.length === 4 ? false : true}
                                            className="mx-auto sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-10"
                                        >

                                            <span className="font-montserrat_semibold">VALIDAR PIN</span>
                                        </Button> */}

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

                    {/* Botón Siguiente */}
                    <div className='content-center text-center mt-6'>
                        {parte1 === "block" ?
                            <Button
                                radius="full"
                                //variant="ghost"
                                color='secondary'
                                className='sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-10'
                                onPress={() => nextPart()}
                                // isDisabled={email && celular && usuario && password ? false : true}
                                isDisabled={persona === '' ? true : false}
                            >
                                <p className='font-montserrat_semibold '>SIGUIENTE(4)</p>
                            </Button> : null}
                    </div>


                    {/* Botones anterior y crear cuenta */}
                    <div className='grid grid-cols-2 gap-6'>
                        <div className='col-span-1 justify-self-center'>
                            {parte1 === "hidden" ?
                                <><Button
                                    radius="full"
                                    variant="ghost"
                                    color='secondary'
                                    className='sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-10'
                                    onPress={() => previousPart()}>
                                    <p className='font-montserrat_semibold '>ANTERIOR</p>
                                </Button> <span> </span></> : null}
                        </div>

                        <div className='col-span-1  justify-self-start'>

                            {parte2 === "block" ?
                                <div className="text-center">

                                    <Button
                                        radius="full"
                                        color='secondary'
                                        className='sm:px-6 md:px-6 lg:px-7 xl:px-7 2xl:px-10'
                                        onPress={() => { nextPart() }}
                                        isDisabled={nombre && paterno && materno && fechanacimiento /*&& paisnacimiento && estadonacimiento */ && curp /*&& regimenfiscal*/ ? false : true}>
                                        <p className='font-montserrat_semibold '>SIGUIENTE**</p>
                                    </Button>

                                    {errorlogin ? (
                                        <div className="flex justify-between text-xs text-red-500 font-montserrat_semibold">Verifique usuario y contraseña</div>

                                    ) : null}

                                </div>

                                : null}

                            {parte3 === "block" ?
                                <div className="text-center">

                                    <Button
                                        radius="full"
                                        color='secondary'
                                        className='sm:px-6 md:px-6 lg:px-7 xl:px-7 2xl:px-10'
                                        onPress={() => { AgregarUsuario(), nextPart() }}
                                        isDisabled={email && celular /*&& pais && estado */ && calle && codigopostal && noExterior /*&& ciudad && colonia*/ && confirm18 && confirmTC && password ? false : true}>
                                        <p className='font-montserrat_semibold '>SIGUIENTE*** </p>

                                    </Button>

                                    {errorlogin ? (
                                        <div className="flex justify-between text-xs text-red-500 font-montserrat_semibold">Verifique usuario y contraseña</div>

                                    ) : null}

                                </div>

                                : null}

                            {parte4 === "block" ?
                                <div className="text-center">

                                    <Button
                                        radius="full"
                                        color='secondary'
                                        className='sm:px-6 md:px-6 lg:px-7 xl:px-7 2xl:px-10'
                                        onPress={validarPIN}
                                        isDisabled={pin.length === 4 ? false : true}
                                    >
                                        <p className='font-montserrat_semibold '>VALIDAR PIN </p>

                                    </Button>

                                    {loading ?
                                        <PreloaderBar></PreloaderBar> : null}

                                    {errorlogin ? (
                                        <div className="flex justify-between text-xs text-red-500 font-montserrat_semibold">Verifique usuario y contraseña</div>

                                    ) : null}

                                </div>

                                : null}

                        </div>

                    </div>

                    {/* Texto inicia sesión */}
                    <div className='grid grid-cols-2 pl-12 mt-5'>
                        <div className='text-black col-span-1'>
                            <p className='text-end font-montserrat_medium text-xs sm:text-xs dark:text-white text-gray-500 dark:text-white'>
                                ¿Ya tienes una cuenta?</p>
                        </div>
                        <div className='col-span-1 ml-2'>
                            <p className='text-start font-montserrat_bold text-xs sm:text-xs text-primary-50 dark:text-sky-400'><a href="../login">
                                Inicia Sesión</a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

};
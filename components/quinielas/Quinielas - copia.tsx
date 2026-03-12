"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import PreloaderBar from '../login/PreloaderBar';
import { Progress } from "@heroui/react";
import { Checkbox } from "@heroui/react";
import { DateInput } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import { Form } from "@heroui/react";
import { Eye, EyeOff } from 'lucide-react';
import config from "../../config/config";
import { obtenerEstadosOrdenados } from '../Utilidades';
import { Select, SelectItem } from "@heroui/react";
import { InputOtp } from "@heroui/input-otp";

export const Quinielas = ({ setSessionHandle, pagerouter }: any) => {

    const [parte1, setParte1] = useState("block");
    const [parte2, setParte2] = useState("hidden");
    const [parte3, setParte3] = useState("hidden");
    const [parteactual, setParteActual] = useState(1);
    const [valueProgress, setValueProgress] = useState(0);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [confirm18, setConfirm18] = useState(false);
    const [confirmTC, setConfirmTC] = useState(false);

    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [codigopostal, setCodigoPostal] = useState('');
    const [estado, setEstado] = useState('');
    const [celular, setCelular] = useState('');
    const [fechanacimiento, setFechaNacimiento] = useState('');
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [errorlogin, setErrorLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msgerror, setMsgError] = useState("");

    const [idusuarionuevo, setIdUsuarioNuevo] = useState("");

    const estados = obtenerEstadosOrdenados();

    const [id, setID] = useState("");
    const [pin, setPIN] = useState("");

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
            setValueProgress(valueProgress + 33);
        }

        if (parteactual === 2) {

            console.log(idusuarionuevo);

            // if( idusuarionuevo === "0" || idusuarionuevo === "" )
            //     {
            //         setParte2("block");
            //         setParte3("hidden");
            //         setLoading( false );
            //         return;
            //     }
            setParte1("hidden");
            setParteActual(parteactual + 1);
            setParte2("hidden");
            setParte3("block");
            setValueProgress(valueProgress + 33);
        }
    }

    const previousPart = () => {

        setMsgError("");

        if (parteactual === 2) {
            setParte2("hidden");
            setParteActual(parteactual - 1);
            setParte1("block");
            setValueProgress(valueProgress - 33);
        }

        if (parteactual === 3) {
            setParte3("hidden");
            setParteActual(parteactual - 1);
            setParte2("block");
            setValueProgress(valueProgress - 33);
        }

    }

    const AgregarUsuario = async () => {

        setLoading(true);

        const datasend = JSON.stringify({
            //token: localStorage.getItem("tokeng_csn"),
            email: email,
            celular: celular,
            usuario: usuario,
            password: password,
            nombre: nombre,
            apellidos: apellidos,
            ciudad: ciudad,
            codigopostal: codigopostal,
            estado: estado,
            fechanacimiento: fechanacimiento,
            direccion: direccion
        });

        const baseURL = config.baseUrlAPI + "usuarios/agregar";

        console.log(datasend);

        try {
            const response = await fetch(baseURL, {
                method: "POST",
                body: datasend,
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

                    setIdUsuarioNuevo("" + result.idusuario);
                    nextPart();

                    // localStorage.setItem("sessiong_csn", "" + new Date().getTime());
                    // localStorage.setItem("tokeng_csn", "" + result.token);
                    // localStorage.setItem("nombreusuario_axnweb", "" + nombre);
                    // localStorage.setItem("usuariog_csn", "" + usuario);
                    // localStorage.setItem("idusuariog_csn", "" + result.idusuario);
                    // localStorage.setItem("email_csn", "" + email);
                    // localStorage.setItem("direccion_csn", "" + direccion);
                    // localStorage.setItem("celular_csn", "" + celular);
                    // localStorage.setItem("fechanacimiento_csn", "" + fechanacimiento);

                    //router.push(config.baseUrl + "/miperfil");

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

        try {
            const response = await fetch(config.baseUrlAPI + 'validarpinregistro', {
                method: "POST",
                //headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idusuarionuevo, pin, email })
            });

            const result = await response.json();

            console.log(result);
            //return;

            if (result.auth === 'OKLOGIN') { //Autenticación correcta

                localStorage.setItem("sessiong_csn", "" + new Date().getTime());
                localStorage.setItem("tokeng_csn", "" + result.token);
                localStorage.setItem("nombreusuario_axnweb", "" + nombre);
                localStorage.setItem("usuariog_csn", "" + usuario);
                localStorage.setItem("idusuariog_csn", "" + result.idusuario);
                localStorage.setItem("email_csn", "" + email);
                localStorage.setItem("direccion_csn", "" + direccion);
                localStorage.setItem("celular_csn", "" + celular);
                localStorage.setItem("fechanacimiento_csn", "" + fechanacimiento);
                localStorage.setItem("sld_csn", "1000");

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


    return (



    <div className="min-h-screen flex flex-col items-center justify-start bg-white dark:bg-gradient-to-bl from-[#812DE2] via-[#03004E] to-[#812DE2] text-white pb-20 pt-20 mt-12">
                {/* Encabezado */}
                <div className="pt-9 text-center px-2">
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#4646F9] to-pink-400 font-montserrat_bold text-4xl">
                    Quinielas
                    </p>                  
                    <p className="px-1 text-primary-600 dark:text-[#B68BFC] font-montserrat_regular text-md sm:text-lg md:text-lg lg:text-lg xl:text-lg">
                    Pon a prueba tu intuición y compite en nuestras quinielas. Elige tus resultados favoritos, suma puntos y demuestra quién sabe más de deportes.
                    </p>
                </div>

                    {/* FILTROS Botones */}
                    <div className="pt-6 w-full flex justify-center">
                    <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 w-full max-w-[800px] px-2 sm:px-6">
                        <Button
                        radius="full"
                        variant="ghost"
                        color="secondary"
                        className="w-full text-xs sm:text-sm md:text-base py-2 sm:py-3"
                        >
                        <p className="font-montserrat_semibold">TODAS</p>
                        </Button>

                        <Button
                        radius="full"
                        variant="ghost"
                        color="secondary"
                        className="w-full text-xs sm:text-sm md:text-base py-2 sm:py-3"
                        >
                        <p className="font-montserrat_semibold">ABIERTAS</p>
                        </Button>

                        <Button
                        radius="full"
                        variant="ghost"
                        color="secondary"
                        className="w-full text-xs sm:text-sm md:text-base py-2 sm:py-3"
                        >
                        <p className="font-montserrat_semibold">EN CURSO</p>
                        </Button>

                        <Button
                        radius="full"
                        variant="ghost"
                        color="secondary"
                        className="w-full text-xs sm:text-sm md:text-base py-2 sm:py-3"
                        >
                        <p className="font-montserrat_semibold">FINALIZADAS</p>
                        </Button>
                    </div>
                    </div>




               

            

        {/* Cuerpo Central con 6 tarjetas */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 justify-items-center p-4 w-full max-w-[1300px] mx-auto">


                {/* Tarjeta 1 */}
                <div className="relative w-full aspect-[16/9] rounded-2xl bg-[url('../public/imagenes/card_background.png')] bg-cover bg-center shadow-[0_10px_30px_rgba(42,13,119,0.3)] flex items-center justify-center grid grid-cols-5 p-2 ">
                    {/* Elementos lado Izquierdo */}   
                    <div className='col-span-3'>
                        {/* Tipo de quiniela */}
                        <div className="absolute top-3 left-3 bg-[#20CA0A]/40 px-3 py-1 rounded-full border border-[#20CA0A]">
                            <p className="font-montserrat_medium text-white text-sm sm:text-[10px] md:text-[12px] lg:text-xs xl:text-xs">Abierta</p>
                        </div>
                        {/* Información y Texto */}
                        <div className='pl-5 sm:pl-2 md:pl-6 lg:pl-7 xl:pl-6 mt-2 sm:mt-6 lg:-mt-2 '>    
                            <p className="text-[#C285FF] font-montserrat_bold text-sm sm:text-[10px] md:text-[12px] lg:text-base xl:text-sm">
                            • FIN DE SEMANA •
                            </p>
                            <p className="text-white font-montserrat_bold text-2xl sm:text-base md:text-lg lg:text-2xl xl:text-xl">
                            ¡JUEGA GRATIS!
                            </p>
                            <p className="text-white font-montserrat_medium text-base sm:text-[10px] md:text-[11px] lg:text-sm xl:text-[12px]">
                            y gana hasta:
                            </p>
                            <p className="text-[#ffde12] font-montserrat_extrabold text-3xl sm:text-lg md:text-xl lg:text-3xl xl:text-2xl">
                            $3,000.00 MN
                            </p>
                        </div>
                        {/* Ícono y leyenda participantes */}
                        <div className="absolute bottom-3 sm:bottom-1 md:bottom-2 lg:bottom-3 xl:bottom-2 left-3 flex items-center gap-2 mb-1">
                            <img
                                className="w-4"
                                src="/imagenes/iconos/user_icon.svg"
                                alt="User icon"
                            />
                            <p className="text-white font-montserrat_semibold text-[10px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[10px] ">
                                328 Participantes
                            </p>
                        </div>
                    </div>    
                    {/* Jackpot */}
                    <div className="relative col-span-2 bg-primary-50 w-full max-w-[170px] h-auto aspect-square rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-md border border-[#FAABFF]">
                        <img
                            className="w-[120px] sm:w-19 md:w-18 lg:w-[130px] -mt-14 sm:-mt-3 md:-mt-5 lg:-mt-10 xl:-mt-11"
                            src="../imagenes/iconos/jackpot_titulo.png"
                            alt="Jackpot image"
                        />
                        <p className="font-montserrat_regular text-[11px] sm:text-[10px] md:text-[12px] lg:text-sm text-white mb-1">
                            Asegurado de:
                        </p>
                        <p className="font-montserrat_semibold text-[14px] sm:text-[13px] md:text-[15px] lg:text-base text-white mb-2">
                            $6,100.00
                        </p>
                        {/* Imagen inferior*/}
                        <img
                            src="/imagenes/iconos/jackpot/1.svg"
                            alt="Gold image"
                            className="absolute -bottom-10 sm:-bottom-10 md:-bottom-11 lg:-bottom-[60px] xl:-bottom-10 left-1/2 -translate-x-1/2 w-[165px] sm:w-[110px] md:w-[145px] lg:w-[140px] z-10 animate-float "
                        />
                    </div>
                </div>  


                {/* Tarjeta 2 */}
                <div className="relative w-full aspect-[16/9] rounded-2xl bg-[url('../public/imagenes/card_background.png')] bg-cover bg-center shadow-[0_10px_30px_rgba(42,13,119,0.3)] flex items-center justify-center grid grid-cols-5 p-2 ">
                    {/* Elementos lado Izquierdo */}   
                    <div className='col-span-3'>
                        {/* Tipo de quiniela */}
                        <div className="absolute top-3 left-3 bg-[#ffffff]/30 px-3 py-1 rounded-full border border-[#ffffff]">
                            <p className="font-montserrat_medium text-white text-sm sm:text-[10px] md:text-[12px] lg:text-xs xl:text-xs">En curso</p>
                        </div>
                        {/* Información y Texto */}
                        <div className='pl-5 sm:pl-2 md:pl-6 lg:pl-7 xl:pl-6 mt-2 sm:mt-6 lg:-mt-2 '>    
                            <p className="text-[#C285FF] font-montserrat_bold text-sm sm:text-[10px] md:text-[12px] lg:text-base xl:text-sm">
                            • FIN DE SEMANA •
                            </p>
                            <p className="text-white font-montserrat_bold text-2xl sm:text-base md:text-lg lg:text-2xl xl:text-xl">
                            ¡JUEGA GRATIS!
                            </p>
                            <p className="text-white font-montserrat_medium text-base sm:text-[10px] md:text-[11px] lg:text-sm xl:text-[12px]">
                            y gana hasta:
                            </p>
                            <p className="text-[#ffde12] font-montserrat_extrabold text-3xl sm:text-lg md:text-xl lg:text-3xl xl:text-2xl">
                            $4,250.00 MN
                            </p>
                        </div>
                        {/* Ícono y leyenda participantes */}
                        <div className="absolute bottom-3 sm:bottom-1 md:bottom-2 lg:bottom-3 xl:bottom-2 left-3 flex items-center gap-2 mb-1">
                            <img
                                className="w-4"
                                src="/imagenes/iconos/user_icon.svg"
                                alt="User icon"
                            />
                            <p className="text-white font-montserrat_semibold text-[10px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[10px] ">
                                328 Participantes
                            </p>
                        </div>
                    </div>    
                    {/* Jackpot */}
                    <div className="relative col-span-2 bg-primary-50 w-full max-w-[170px] h-auto aspect-square rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-md border border-[#FAABFF]">
                        <img
                            className="w-[120px] sm:w-19 md:w-18 lg:w-[130px] -mt-14 sm:-mt-3 md:-mt-5 lg:-mt-10 xl:-mt-11"
                            src="../imagenes/iconos/jackpot_titulo.png"
                            alt="Jackpot image"
                        />
                        <p className="font-montserrat_regular text-[11px] sm:text-[10px] md:text-[12px] lg:text-sm text-white mb-1">
                            Asegurado de:
                        </p>
                        <p className="font-montserrat_semibold text-[14px] sm:text-[13px] md:text-[15px] lg:text-base text-white mb-2">
                            $10,300.00
                        </p>
                        {/* Imagen inferior*/}
                        <img
                            src="/imagenes/iconos/jackpot/2.svg"
                            alt="Gold image"
                            className="absolute -bottom-10 sm:-bottom-10 md:-bottom-11 lg:-bottom-[60px] xl:-bottom-10 left-1/2 -translate-x-1/2 w-[165px] sm:w-[110px] md:w-[145px] lg:w-[140px] z-10 animate-float "
                        />
                    </div>
                </div>  


                {/* Tarjeta 3 */}
                <div className="relative w-full aspect-[16/9] rounded-2xl bg-[url('../public/imagenes/card_background.png')] bg-cover bg-center shadow-[0_10px_30px_rgba(42,13,119,0.3)] flex items-center justify-center grid grid-cols-5 p-2 ">
                    {/* Elementos lado Izquierdo */}   
                    <div className='col-span-3'>
                        {/* Tipo de quiniela */}
                        <div className="absolute top-3 left-3 bg-primary-200/40 px-3 py-1 rounded-full border border-primary-50">
                            <p className="font-montserrat_medium text-[#D1A2FF] text-sm sm:text-[10px] md:text-[12px] lg:text-xs xl:text-xs">Finalizada</p>
                        </div>
                        {/* Información y Texto */}
                        <div className='pl-5 sm:pl-2 md:pl-6 lg:pl-7 xl:pl-6 mt-2 sm:mt-6 lg:-mt-2 '>    
                            <p className="text-[#C285FF] font-montserrat_bold text-sm sm:text-[10px] md:text-[12px] lg:text-base xl:text-sm">
                            • SEMANAL •
                            </p>
                            <p className="text-white font-montserrat_bold text-2xl sm:text-base md:text-lg lg:text-2xl xl:text-xl">
                            ¡JUEGA GRATIS!
                            </p>
                            <p className="text-white font-montserrat_medium text-base sm:text-[10px] md:text-[11px] lg:text-sm xl:text-[12px]">
                            y gana hasta:
                            </p>
                            <p className="text-[#D1A2FF] font-montserrat_extrabold text-3xl sm:text-lg md:text-xl lg:text-3xl xl:text-2xl">
                            $3,850.00 MN
                            </p>
                        </div>
                        {/* Ícono y leyenda participantes */}
                        <div className="absolute bottom-3 sm:bottom-1 md:bottom-2 lg:bottom-3 xl:bottom-2 left-3 flex items-center gap-2 mb-1">
                            <img
                                className="w-4"
                                src="/imagenes/iconos/user_icon.svg"
                                alt="User icon"
                            />
                            <p className="text-white font-montserrat_semibold text-[10px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[10px] ">
                                518 Participantes
                            </p>
                        </div>
                    </div>    
                    {/* Jackpot */}
                    <div className="relative col-span-2 bg-primary-400 w-full max-w-[170px] h-auto aspect-square rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-md border border-primary-100">
                        <img
                            className="w-[120px] sm:w-19 md:w-18 lg:w-[130px] -mt-14 sm:-mt-3 md:-mt-5 lg:-mt-10 xl:-mt-11"
                            src="../imagenes/iconos/jackpot_titulo.png"
                            alt="Jackpot image"
                        />
                        <p className="font-montserrat_regular text-[11px] sm:text-[10px] md:text-[12px] lg:text-sm text-white mb-1">
                            Asegurado de:
                        </p>
                        <p className="font-montserrat_semibold text-[14px] sm:text-[13px] md:text-[15px] lg:text-base text-white mb-2">
                            $15,300.00
                        </p>
                        {/* Imagen inferior*/}
                        <img
                            src="/imagenes/iconos/jackpot/3.svg"
                            alt="Gold image"
                            className="absolute -bottom-10 sm:-bottom-10 md:-bottom-11 lg:-bottom-[60px] xl:-bottom-10 left-1/2 -translate-x-1/2 w-[165px] sm:w-[110px] md:w-[145px] lg:w-[140px] z-10"
                        />
                    </div>
                </div>  


                {/* Tarjeta 4 */}
                <div className="relative w-full aspect-[16/9] rounded-2xl bg-[url('../public/imagenes/card_background.png')] bg-cover bg-center shadow-[0_10px_30px_rgba(42,13,119,0.3)] flex items-center justify-center grid grid-cols-5 p-2 ">
                    {/* Elementos lado Izquierdo */}   
                    <div className='col-span-3'>
                        {/* Tipo de quiniela */}
                        <div className="absolute top-3 left-3 bg-[#ffffff]/30 px-3 py-1 rounded-full border border-[#ffffff]">
                            <p className="font-montserrat_medium text-white text-sm sm:text-[10px] md:text-[12px] lg:text-xs xl:text-xs">En curso</p>
                        </div>
                        {/* Información y Texto */}
                        <div className='pl-5 sm:pl-2 md:pl-6 lg:pl-7 xl:pl-6 mt-2 sm:mt-6 lg:-mt-2 '>    
                            <p className="text-[#C285FF] font-montserrat_bold text-sm sm:text-[10px] md:text-[12px] lg:text-base xl:text-sm">
                            • FIN DE SEMANA •
                            </p>
                            <p className="text-white font-montserrat_bold text-2xl sm:text-base md:text-lg lg:text-2xl xl:text-xl">
                            ¡JUEGA GRATIS!
                            </p>
                            <p className="text-white font-montserrat_medium text-base sm:text-[10px] md:text-[11px] lg:text-sm xl:text-[12px]">
                            y gana hasta:
                            </p>
                            <p className="text-[#ffde12] font-montserrat_extrabold text-3xl sm:text-lg md:text-xl lg:text-3xl xl:text-2xl">
                            $2,400.00 MN
                            </p>
                        </div>
                        {/* Ícono y leyenda participantes */}
                        <div className="absolute bottom-3 sm:bottom-1 md:bottom-2 lg:bottom-3 xl:bottom-2 left-3 flex items-center gap-2 mb-1">
                            <img
                                className="w-4"
                                src="/imagenes/iconos/user_icon.svg"
                                alt="User icon"
                            />
                            <p className="text-white font-montserrat_semibold text-[10px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[10px] ">
                                182 Participantes
                            </p>
                        </div>
                    </div>    
                    {/* Jackpot */}
                    <div className="relative col-span-2 bg-primary-50 w-full max-w-[170px] h-auto aspect-square rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-md border border-[#FAABFF]">
                        <img
                            className="w-[120px] sm:w-19 md:w-18 lg:w-[130px] -mt-14 sm:-mt-3 md:-mt-5 lg:-mt-10 xl:-mt-11"
                            src="../imagenes/iconos/jackpot_titulo.png"
                            alt="Jackpot image"
                        />
                        <p className="font-montserrat_regular text-[11px] sm:text-[10px] md:text-[12px] lg:text-sm text-white mb-1">
                            Asegurado de:
                        </p>
                        <p className="font-montserrat_semibold text-[14px] sm:text-[13px] md:text-[15px] lg:text-base text-white mb-2">
                            $10,300.00
                        </p>
                        {/* Imagen inferior*/}
                        <img
                            src="/imagenes/iconos/jackpot/2.svg"
                            alt="Gold image"
                            className="absolute -bottom-10 sm:-bottom-10 md:-bottom-11 lg:-bottom-[60px] xl:-bottom-10 left-1/2 -translate-x-1/2 w-[165px] sm:w-[110px] md:w-[145px] lg:w-[140px] z-10 animate-float "
                        />
                    </div>
                </div>              


                {/* Tarjeta 5 */}
                <div className="relative w-full aspect-[16/9] rounded-2xl bg-[url('../public/imagenes/card_background.png')] bg-cover bg-center shadow-[0_10px_30px_rgba(42,13,119,0.3)] flex items-center justify-center grid grid-cols-5 p-2 ">
                    {/* Elementos lado Izquierdo */}   
                    <div className='col-span-3'>
                        {/* Tipo de quiniela */}
                        <div className="absolute top-3 left-3 bg-primary-200/40 px-3 py-1 rounded-full border border-primary-50">
                            <p className="font-montserrat_medium text-[#D1A2FF] text-sm sm:text-[10px] md:text-[12px] lg:text-xs xl:text-xs">Finalizada</p>
                        </div>
                        {/* Información y Texto */}
                        <div className='pl-5 sm:pl-2 md:pl-6 lg:pl-7 xl:pl-6 mt-2 sm:mt-6 lg:-mt-2 '>    
                            <p className="text-[#C285FF] font-montserrat_bold text-sm sm:text-[10px] md:text-[12px] lg:text-base xl:text-sm">
                            • SEMANAL •
                            </p>
                            <p className="text-white font-montserrat_bold text-2xl sm:text-base md:text-lg lg:text-2xl xl:text-xl">
                            ¡JUEGA GRATIS!
                            </p>
                            <p className="text-white font-montserrat_medium text-base sm:text-[10px] md:text-[11px] lg:text-sm xl:text-[12px]">
                            y gana hasta:
                            </p>
                            <p className="text-[#D1A2FF] font-montserrat_extrabold text-3xl sm:text-lg md:text-xl lg:text-3xl xl:text-2xl">
                            $5,500.00 MN
                            </p>
                        </div>
                        {/* Ícono y leyenda participantes */}
                        <div className="absolute bottom-3 sm:bottom-1 md:bottom-2 lg:bottom-3 xl:bottom-2 left-3 flex items-center gap-2 mb-1">
                            <img
                                className="w-4"
                                src="/imagenes/iconos/user_icon.svg"
                                alt="User icon"
                            />
                            <p className="text-white font-montserrat_semibold text-[10px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[10px] ">
                                322 Participantes
                            </p>
                        </div>
                    </div>    
                    {/* Jackpot */}
                    <div className="relative col-span-2 bg-primary-400 w-full max-w-[170px] h-auto aspect-square rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-md border border-primary-100">
                        <img
                            className="w-[120px] sm:w-19 md:w-18 lg:w-[130px] -mt-14 sm:-mt-3 md:-mt-5 lg:-mt-10 xl:-mt-11"
                            src="../imagenes/iconos/jackpot_titulo.png"
                            alt="Jackpot image"
                        />
                        <p className="font-montserrat_regular text-[11px] sm:text-[10px] md:text-[12px] lg:text-sm text-white mb-1">
                            Asegurado de:
                        </p>
                        <p className="font-montserrat_semibold text-[14px] sm:text-[13px] md:text-[15px] lg:text-base text-white mb-2">
                            $8,850.00
                        </p>
                        {/* Imagen inferior*/}
                        <img
                            src="/imagenes/iconos/jackpot/2.svg"
                            alt="Gold image"
                            className="absolute -bottom-10 sm:-bottom-10 md:-bottom-11 lg:-bottom-[60px] xl:-bottom-10 left-1/2 -translate-x-1/2 w-[165px] sm:w-[110px] md:w-[145px] lg:w-[140px] z-10"
                        />
                    </div>
                </div>  


                {/* Tarjeta 6 */}
                <div className="relative w-full aspect-[16/9] rounded-2xl bg-[url('../public/imagenes/card_background.png')] bg-cover bg-center shadow-[0_10px_30px_rgba(42,13,119,0.3)] flex items-center justify-center grid grid-cols-5 p-2 ">
                    {/* Elementos lado Izquierdo */}   
                    <div className='col-span-3'>
                        {/* Tipo de quiniela */}
                        <div className="absolute top-3 left-3 bg-[#20CA0A]/40 px-3 py-1 rounded-full border border-[#20CA0A]">
                            <p className="font-montserrat_medium text-white text-sm sm:text-[10px] md:text-[12px] lg:text-xs xl:text-xs">Abierta</p>
                        </div>
                        {/* Información y Texto */}
                        <div className='pl-5 sm:pl-2 md:pl-6 lg:pl-7 xl:pl-6 mt-2 sm:mt-6 lg:-mt-2 '>    
                            <p className="text-[#C285FF] font-montserrat_bold text-sm sm:text-[10px] md:text-[12px] lg:text-base xl:text-sm">
                            • FIN DE SEMANA •
                            </p>
                            <p className="text-white font-montserrat_bold text-2xl sm:text-base md:text-lg lg:text-2xl xl:text-xl">
                            ¡JUEGA GRATIS!
                            </p>
                            <p className="text-white font-montserrat_medium text-base sm:text-[10px] md:text-[11px] lg:text-sm xl:text-[12px]">
                            y gana hasta:
                            </p>
                            <p className="text-[#ffde12] font-montserrat_extrabold text-3xl sm:text-lg md:text-xl lg:text-3xl xl:text-2xl">
                            $1,800.00 MN
                            </p>
                        </div>
                        {/* Ícono y leyenda participantes */}
                        <div className="absolute bottom-3 sm:bottom-1 md:bottom-2 lg:bottom-3 xl:bottom-2 left-3 flex items-center gap-2 mb-1">
                            <img
                                className="w-4"
                                src="/imagenes/iconos/user_icon.svg"
                                alt="User icon"
                            />
                            <p className="text-white font-montserrat_semibold text-[10px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[10px] ">
                                111 Participantes
                            </p>
                        </div>
                    </div>    
                    {/* Jackpot */}
                    <div className="relative col-span-2 bg-primary-50 w-full max-w-[170px] h-auto aspect-square rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-md border border-[#FAABFF]">
                        <img
                            className="w-[120px] sm:w-19 md:w-18 lg:w-[130px] -mt-14 sm:-mt-3 md:-mt-5 lg:-mt-10 xl:-mt-11"
                            src="../imagenes/iconos/jackpot_titulo.png"
                            alt="Jackpot image"
                        />
                        <p className="font-montserrat_regular text-[11px] sm:text-[10px] md:text-[12px] lg:text-sm text-white mb-1">
                            Asegurado de:
                        </p>
                        <p className="font-montserrat_semibold text-[14px] sm:text-[13px] md:text-[15px] lg:text-base text-white mb-2">
                            $2,150.00
                        </p>
                        {/* Imagen inferior*/}
                        <img
                            src="/imagenes/iconos/jackpot/1.svg"
                            alt="Gold image"
                            className="absolute -bottom-10 sm:-bottom-10 md:-bottom-11 lg:-bottom-[60px] xl:-bottom-10 left-1/2 -translate-x-1/2 w-[165px] sm:w-[110px] md:w-[145px] lg:w-[140px] z-10 animate-float "
                        />
                    </div>
                </div>  

            </div>  







        </div>
    );

};
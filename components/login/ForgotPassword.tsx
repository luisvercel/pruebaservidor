"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import PreloaderBar from './PreloaderBar';
import { Form } from "@heroui/react";
import {InputOtp} from "@heroui/input-otp";
import config from "../../config/config";
import { Eye, EyeOff } from 'lucide-react';

export const ForgotPassword = ({ setSessionHandle, pagerouter }: any) => {
    
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();

    const [email, setEmail] = useState(''); // State para el email
    const [password, setPassword] = useState(''); // State para el password
    const [errorlogin, setErrorLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showformforgot, setShowFormForgot] = useState( "" );
    const [showformPIN, setShowFormPIN] = useState( "hidden" );
    const [nombre, setNombre] = useState( "" );
    const [id, setID] = useState( "" );
    const [pin, setPIN] = useState( "" );
    const [showpasswordchange, setPasswwordChange] = useState("hidden");

    const validarUsuario = async () => {

        setLoading(true);

        if (!email) {
            setErrorLogin(true);
            setLoading(false);
            return false;
        }

        console.log( email );

        try {
            const response = await fetch(config.baseUrlAPI+'forgotpassword', {
                method: "POST",
                //headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const result = await response.json();

            console.log( result );

            if (result.auth === 'OKLOGIN') { //Autenticación correcta

                setNombre( "" + result.usuario );
                setID( "" + result.id );
                setIsOpen(false);
                setErrorLogin(false);
                setShowFormForgot( "hidden" );
                setShowFormPIN( "" );
                return;

            } else { //Falló la autenticación
                handleAuthenticationFailure();
            }

        } catch (error) {
            console.error("Error en el proceso de login:", error);
            handleAuthenticationFailure();
        }

        setLoading(false);
    };

    const handleAuthenticationFailure = () => {
        setShowFormForgot( "" );
        setShowFormPIN( "hidden" );
        localStorage.removeItem("sessiong_csn");
        localStorage.removeItem("tokeng_csn");
        localStorage.removeItem("nombreusuario_axnweb");
        localStorage.removeItem("rolg_csn");
        setIsOpen(true);
        setErrorLogin(true);
    };

    const validarPIN = async () => {

        setLoading(true);

        console.log( id, pin );

        if (!pin) {
            setErrorLogin(true);
            setLoading(false);
            return false;
        }

        try {
            const response = await fetch(config.baseUrlAPI+'validarpin', {
                method: "POST",
                //headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, pin })
            });

            const result = await response.json();

            console.log( result );
            //return;

            if (result.auth === 'OKLOGIN') { //Autenticación correcta
                setIsOpen(false);
                setErrorLogin(false);
                setShowFormForgot( "hidden" );
                setShowFormPIN( "hidden" );
                setPasswwordChange( "" );
                return;
                
            } else { //Falló la autenticación
                handleAuthenticationFailure();
            }

        } catch (error) {
            console.error("Error en el proceso de login:", error);
            handleAuthenticationFailure();
        }

        setLoading(false);
    };

    const cambiarPassword = async () => {

        setLoading(true);

        if (!password) {
            setErrorLogin(true);
            setLoading(false);
            return false;
        }

        console.log( password );

        try {
            const response = await fetch(config.baseUrlAPI+'cambiarpassword', {
                method: "POST",
                //headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, password, pin })
            });

            const result = await response.json();

            console.log( result );

            if (result.auth === 'OKLOGIN') { //Autenticación correcta

                router.push( "../login" );
                return;

            } else { //Falló la autenticación
                handleAuthenticationFailure();
            }

        } catch (error) {
            console.error("Error en el proceso de login:", error);
            handleAuthenticationFailure();
        }

        setLoading(false);
    };

    return (

        <div className="min-h-screen flex bg-white dark:bg-gradient-to-bl from-[#812DE2] from-1% via-[#03004E] via-30% to-[#812DE2] to-100% text-white">
            {/* Lado izquierdo: Imagen */}
            <div className="w-1/2 hidden md:flex items-center justify-center overflow-hidden">
                <img
                    src="../imagenes/login_img.png"
                    alt="Imagen registro"
                    className="w-full h-full object-cover"
                />
            </div>
            
            { /* Lado derecho: Formulario */}
            <div className={"w-full md:w-1/2 flex items-center justify-center px-7 py-12 " + showformforgot}>
                <div className="w-full max-w-md">
                    <div className='mt-[85px] sm:mt-16 md:mt-20 lg:mt-[90px] xl:mt-[90px] 2xl:mt-10'>
                        <div>
                            <p className="mb-6 font-montserrat_semibold text-3xl text-start text-primary-800 dark:text-white">
                                Restablecer Password
                            </p>
                        </div>
                        <div>
                            <p className='font-montserrat_medium text-start text-primary-800 dark:text-[#aaaaaa] -mt-6'>
                                Ingresa tus datos
                            </p>
                        </div>
                        <div className='mt-6'>
                            <Form>
                                <Input
                                    isRequired
                                    onChange={(e: any) => { setEmail(e.target.value); setErrorLogin(false); }}
                                    classNames={{
                                        inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white",
                                        input: "!text-black placeholder:text-gray-400",
                                        label: "text-black", // si estás sobre fondo oscuro
                                    }}
                                    label="E-mail o usuario"
                                    className="caret-black dark:caret-black dark:text-black"
                                    labelPlacement="outside"
                                    name="Usuario"
                                    placeholder="Ingrese su e-mail o nombre de usuario"
                                    type="email"
                                />
                            </Form>
                        </div>

                        <div className="grid grid-cols-1 place-items-center">
                            <div className="mt-8 text-center">
                                {errorlogin && (
                                    <p className="text-xs text-red-500 font-montserrat_semibold mb-4">
                                        E-mail o nombre de usuario no válidos
                                    </p>
                                )}

                                {!loading ? (
                                    <Button
                                        radius="full"
                                        variant="ghost"
                                        color="secondary"
                                        onPress={validarUsuario}
                                        className="mx-auto sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-10"
                                    >
                                        <span className="font-montserrat_semibold">SIGUIENTE</span>
                                    </Button>
                                ) : (
                                    <PreloaderBar />
                                )}
                            </div>
                        </div>
                        <div className='grid grid-cols-1 mt-6'>
                            <div className='col-span-1'>
                                <p className='text-center font-montserrat_medium text-xs sm:text-xs dark:text-white text-gray-500 dark:text-white'>
                                    <a href="../login">Iniciar sesión</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/**INGRESO DE PIN */}
            <div className={"w-full md:w-1/2 flex items-center justify-center px-7 py-12 " + showformPIN}>
                <div className="w-full max-w-md">
                    <div className='mt-[85px] sm:mt-16 md:mt-20 lg:mt-[90px] xl:mt-[90px] 2xl:mt-10'>
                        <div>
                            <p className="mb-6 font-montserrat_semibold text-3xl text-start text-primary-800 dark:text-white">
                                Ingrese el PIN que le fue enviado al e-mail asociado a la cuenta de usuario
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
                                        El PIN proporcionado no es válido
                                    </p>
                                )}

                                    <Button
                                        radius="full"
                                        variant="ghost"
                                        color="secondary"
                                        onPress={validarPIN}
                                        isDisabled={pin.length === 4 ? false : true}
                                        className="mx-auto sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-10"
                                    >
                                        <span className="font-montserrat_semibold">VALIDAR PIN</span>
                                    </Button>

                            </div>
                        </div>
                        <div className='grid grid-cols-1 mt-6'>
                            <div className='col-span-1'>
                                <p className='text-center font-montserrat_medium text-xs sm:text-xs dark:text-white text-gray-500 dark:text-white'>
                                    <a href="../login">Iniciar sesión</a>
                                </p>
                                <p className='text-center font-montserrat_medium text-xs sm:text-xs dark:text-white text-gray-500 dark:text-white'>
                                    <a href="../forgotpassword">Intentar de nuevo</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            { /* RESTABLECER PASSWORD */}
            <div className={"w-full md:w-1/2 flex items-center justify-center px-7 py-12 " + showpasswordchange}>
                <div className="w-full max-w-md">
                    <div className='mt-[85px] sm:mt-16 md:mt-20 lg:mt-[90px] xl:mt-[90px] 2xl:mt-10'>
                        <div>
                            <p className="mb-6 font-montserrat_semibold text-3xl text-start text-primary-800 dark:text-white">
                                {nombre}, ingrese su nuevo password:
                            </p>
                        </div>
                        <div className='mt-6'>
                            <Form>
                               <Input
                                    isRequired
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e: any) => { setPassword(e.target.value); setErrorLogin(false); }}
                                    classNames={{
                                        inputWrapper: "border-none shadow-none dark:focus-within:bg-white dark:bg-white",
                                        input: "!text-black placeholder:text-gray-400",
                                        label: "text-black", // si estás sobre fondo oscuro
                                    }}

                                    label="Nuevo password"
                                    className="caret-black dark:caret-black dark:text-black"
                                    labelPlacement="outside"
                                    name="Contraseña"
                                    placeholder="Ingrese el password"
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
                            </Form>
                        </div>

                        <div className="grid grid-cols-1 place-items-center">
                            <div className="mt-8 text-center">
                                {errorlogin && (
                                    <p className="text-xs text-red-500 font-montserrat_semibold mb-4">
                                        E-mail o nombre de usuario no válidos
                                    </p>
                                )}

                                    <Button
                                        radius="full"
                                        variant="ghost"
                                        color="secondary"
                                        onPress={cambiarPassword}
                                        className="mx-auto sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-10"
                                    >
                                        <span className="font-montserrat_semibold">CAMBIAR PASSWORD</span>
                                    </Button>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 mt-6'>
                            <div className='col-span-1'>
                                <p className='text-center font-montserrat_medium text-xs sm:text-xs dark:text-white text-gray-500 dark:text-white'>
                                    <a href="../login">Iniciar sesión</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};
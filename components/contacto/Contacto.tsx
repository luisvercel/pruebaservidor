"use client";
import React, { useState } from 'react';
import { Form, Textarea } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import PreloaderBar from '../login/PreloaderBar';

export const Contacto = () => {
    const router = useRouter();

    // Estados por campo (mínimo necesario)
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');

    const [loading, setLoading] = useState(false);

    // TExt area form color
    const [mensajeFocus, setMensajeFocus] = useState(false);


    const BUTTON_INACTIVE_BG = "!bg-transparent border-2 border-[#8C9296]";
    const BUTTON_INACTIVE_TEXT = "text-[#8C9296]";
    const BUTTON_ACTIVE_BG = "bg-primary-100 hover:bg-primary-50 dark:hover:bg-[#34cacc] dark:bg-[#40a6a6]";
    const BUTTON_ACTIVE_TEXT = "text-[#2A3235]";


    // Validación del botón
    const isButtonActive =
        nombre.trim() !== '' &&
        email.trim() !== '' &&
        asunto.trim() !== '' &&
        mensaje.trim() !== '';

    return (

    <section id='contacto'>    
        <div className="bg-white dark:bg-[#505658] pt-32 sm:pt-20 md:pt-36 pb-20 sm:pb-24 md:pb-28 lg:pb-32
">
            <div className='grid grid-cols-1 md:grid-cols-2 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-24 2xl:px-40 gap-2 sm:gap-6 md:gap-16 lg:gap-16'>

                {/* Título */}
                <div className='col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col justify-center'> 
                    <p className="font-montserrat_bold text-3xl text-center sm:text-center md:text-start text-[#242729] dark:text-white">
                        ¿TIENES ALGUNA PREGUNTA?
                    </p>
                    <p className='text-justify sm:text-justify md:text-start dark:text-zinc-300 text-zinc-500 text-[15px] xl:text-base mt-8 font-montserrat_medium mt-8 mb-10 md:mb-12'>
                        Escríbenos y descubre cómo nuestras soluciones pueden integrarse a tu negocio y optimizar tu operación diaria de forma segura y eficiente.
                    </p>
                </div>

                <div className='col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1'>

                    {/* Formulario */}
                    <div className='shadow-xl bg-[#2A3235] dark:bg-[#2A3235] rounded-[25px] text-white'>
                        <Form className='gap-5 p-6'>

                            {/* NOMBRE */}
                            <span className='font-montserrat_semibold text-[15px]'>TU NOMBRE:</span>
                            <Input
                                isRequired
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                classNames={{
                                    inputWrapper: "bg-[#444E53] dark:bg-[#2F3A3F] rounded-xl data-[hover=true]:bg-[#586267] data-[focus=true]:bg-white  dark:data-[hover=true]:bg-[#38454B]",
                                    input: "text-white focus:text-black text-black placeholder:text-zinc-400",
                                }}
                                placeholder="Ingrese su nombre*"
                            />

                            {/* EMAIL */}
                            <span className='font-montserrat_semibold text-[15px]'>EMAIL:</span>
                            <Input
                                isRequired
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                classNames={{
                                    inputWrapper: "bg-[#444E53] dark:bg-[#2F3A3F] rounded-xl data-[hover=true]:bg-[#586267] data-[focus=true]:bg-white  dark:data-[hover=true]:bg-[#38454B]",
                                    input: "text-white focus:text-black text-black placeholder:text-zinc-400",
                                }}
                                placeholder="Ingrese su email*"
                            />

                            {/* ASUNTO */}
                            <span className='font-montserrat_semibold text-[15px]'>ASUNTO:</span>
                            <Input
                                isRequired
                                value={asunto}
                                onChange={(e) => setAsunto(e.target.value)}
                                classNames={{
                                    inputWrapper: "bg-[#444E53] dark:bg-[#2F3A3F] rounded-xl data-[hover=true]:bg-[#586267] data-[focus=true]:bg-white  dark:data-[hover=true]:bg-[#38454B]",
                                    input: "text-white focus:text-black text-black placeholder:text-zinc-400",
                                }}
                                placeholder="Asunto*"
                            />

                            {/* MENSAJE */}
                            <span className='font-montserrat_semibold text-[15px]'>MENSAJE:</span>
                                <Textarea
                                isRequired
                                value={mensaje}
                                onChange={(e) => setMensaje(e.target.value)}
                                onFocus={() => setMensajeFocus(true)}
                                onBlur={() => setMensajeFocus(false)}
                                classNames={{
                                    inputWrapper: "bg-[#444E53] dark:bg-[#2F3A3F] rounded-xl  data-[hover=true]:bg-[#586267] data-[focus=true]:bg-white  dark:data-[hover=true]:bg-[#38454B]",
                                    input: mensajeFocus
                                    ? "text-black placeholder:text-zinc-400"
                                    : "!text-white placeholder:text-zinc-400",
                                }}
                                placeholder="Ingrese su mensaje*"
                                />





                            {/* BOTÓN */}
                            <div className="text-center mt-5 w-full">
                                {!loading ? (
                                    <Button
                                        radius="full"
                                        isDisabled={!isButtonActive}
                                        className={`
                                            w-full shadow-lg transition-all duration-300
                                            ${isButtonActive ? BUTTON_ACTIVE_BG : BUTTON_INACTIVE_BG}
                                            
                                        `}
                                    >
                                        <p className={`
                                            font-montserrat_semibold text-sm
                                            ${isButtonActive ? BUTTON_ACTIVE_TEXT : BUTTON_INACTIVE_TEXT}
                                        `}>
                                            ENVIAR MENSAJE
                                        </p>
                                    </Button>
                                ) : (
                                    <PreloaderBar />
                                )}
                            </div>

                        </Form>
                    </div>

                </div>
            </div>
        </div>
    </section>                                

    );
};

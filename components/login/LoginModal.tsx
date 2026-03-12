"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Eye, EyeOff } from "lucide-react";
import PreloaderBar from "./PreloaderBar";
import config from "../../config/config";
import UploadForm from "../UploadForm";

export const LoginModal = ({ setSessionHandle, pagerouter }: any) => {
  const router = useRouter();

  /* ========================
     CONFIGURACIÓN VISUAL
  ========================= */
  const CARD_WIDTH = "max-w-lg";
  const CARD_PADDING = "p-14";
  const INPUT_HEIGHT = "h-11";
  const INPUT_TEXT = "text-sm";

  /* ========================
        ESTADOS
  ========================= */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorlogin, setErrorLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isButtonActive = email.length > 0;

  const BUTTON_INACTIVE_BG = "!bg-transparent border-2 border-[#8C9296]";
  const BUTTON_INACTIVE_TEXT = "text-[#8C9296]";
  const BUTTON_ACTIVE_BG = "bg-primary-100 hover:bg-primary-50 dark:hover:bg-[#34cacc] dark:bg-[#40a6a6]";
  const BUTTON_ACTIVE_TEXT = "text-[#2A3235]";

  const LoginProccess = async () => {
    setLoading(true);

    if (!email || !password) {
      setErrorLogin(true);
      setLoading(false);
      return;
    }

    const datasend = JSON.stringify({
      email: email,
      password: password,
      endpoint: "usuariosaxweb/login"
    });

    console.log( datasend );

    try {
      const response = await fetch( '/api/redirigir', {
        method: "POST",
        body: datasend,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      console.log( result );      

      if (result.auth === "OKLOGIN") {

        if (result.persona === 'fisica'){

          localStorage.setItem("persona_axnweb", "fisica");

          localStorage.setItem("session_axnweb", "" + new Date().getTime());
          localStorage.setItem("token_axnweb", result.token);

          localStorage.setItem("nombreusuario_axnweb", result.data.nombre);
          localStorage.setItem("paternog_axnweb", result.data.apellidoPaterno);
          localStorage.setItem("maternog_axnweb", result.data.apellidoMaterno);

          localStorage.setItem("idexternog_axnweb", result.data.idExterno);
          localStorage.setItem("idcontrato_axnweb", result.data.idcontrato);
          localStorage.setItem("uuidg_axnweb", result.data.uuid);

          localStorage.setItem("email_axnweb", result.data.email);
          localStorage.setItem("direccion_axnweb", result.data.calle + " " + result.data.noInt + "...");
          localStorage.setItem("celular_axnweb", result.data.telCelular);
          localStorage.setItem("fechanacimiento_axnweb", result.data.fechaNacimiento);

          localStorage.setItem("clabeKuspit_axnweb", result.data.clabeKuspit);

          let fecharegistro = result.data.fechaRegistro.split("T");
          localStorage.setItem("fecharegistro_axnweb", fecharegistro[0]);

        }else{

          localStorage.setItem("persona_axnweb", "moral");

          localStorage.setItem("session_axnweb", "" + new Date().getTime());
          localStorage.setItem("token_axnweb", "" + result.token);

          localStorage.setItem("nombreusuario_axnweb", result.data.razonSocial);

          localStorage.setItem("idexternog_axnweb", result.data.idExterno);
          localStorage.setItem("idcontrato_axnweb", result.data.idcontrato);
          localStorage.setItem("uuidg_axnweb", result.data.uuid);

          localStorage.setItem("email_axnweb", result.data.emailR);
          localStorage.setItem("direccion_axnweb", result.data.calle + " " + result.data.noInt + "...");
          localStorage.setItem("celular_axnweb", "("+result.data.claveLada+")"+result.data.telefono);
          localStorage.setItem("fechanacimiento_axnweb", result.data.fechaConstitucion);
          localStorage.setItem("clabeKuspit_axnweb", result.data.clabeKuspit);

          let fechatmp = result.data.fechaRegistro.split("T");
          fechatmp = fechatmp[0];
          localStorage.setItem("fecharegistro_axnweb", fechatmp);

        }

        router.push(config.baseUrl + '/miperfil');

      } else {
        setErrorLogin(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("===>" + error);
      setErrorLogin(true);
    }

    setLoading(false);
  };

  return (
    <div
      className="
        min-h-screen
        bg-cover bg-center bg-no-repeat
        
        bg-[url('/imagenes/axn/bg_login/bg_light.jpg')]
        sm:bg-[url('/imagenes/axn/bg_login/bg_light.jpg')]
        md:bg-[url('/imagenes/axn/bg_login/bg_light.jpg')]
        lg:bg-[url('/imagenes/axn/bg_login/bg_light.jpg')]
        xl:bg-[url('/imagenes/axn/bg_login/bg_light.jpg')]
        2xl:bg-[url('/imagenes/axn/bg_login/bg_light.jpg')]
        
        dark:bg-[url('/imagenes/axn/bg_login/bg_dark.jpg')]
        dark:sm:bg-[url('/imagenes/axn/bg_login/bg_dark.jpg')]
        dark:md:bg-[url('/imagenes/axn/bg_login/bg_dark.jpg')]
        dark:lg:bg-[url('/imagenes/axn/bg_login/bg_dark.jpg')]
        dark:xl:bg-[url('/imagenes/axn/bg_login/bg_dark.jpg')]
        dark:2xl:bg-[url('/imagenes/axn/bg_login/bg_dark.jpg')]
      "
    >
      {/* CONTENEDOR FLEX */}

      <div
        className="
          min-h-screen flex items-center
          justify-center
          lg:justify-end
          px-6
          lg:pr-20
          xl:pr-28
          2xl:pr-60
        "
      >
        {/* TARJETA LOGIN */}
        <div className={`w-full ${CARD_WIDTH}`}>
          <div
            className={`
              
              relative
              bg-[#2A3235] 
              dark:bg-[#2A3235]
              rounded-2xl shadow-2xl
              ${CARD_PADDING}
            `}
          >
            {/* TEXTO SUPERIOR DERECHO */}
            <p className="absolute top-4 right-6 text-[12px] text-[#8C9296] font-montserrat_medium">
              ¿No eres miembro?{" "}
              <a href={`../registro`}>
                <span className=" 
                text-sky-500 text-[11px]
                transition-colors duration-200
                hover:text-white
                cursor-pointer
              ">Regístrate
                </span>
              </a>
            </p>

            {/* LOGOTIPO */}
            <div className="flex justify-center">
              <img
                src={`${config.baseUrlIMG}/imagenes/logo_axn.png`}
                alt="Logo AXN"
                className="w-[182px] h-auto mt-5 sm:mt-5 md:mt-10 lg:mt-10"
              />
            </div>

            {/* TÍTULO */}
            <p className="mt-8 text-center text-[#A4B1B9] font-montserrat_semibold text-xl lg:text-2xl">
              BIENVENIDO
            </p>
            <p className="text-center text-[#A4B1B9] mb-8 font-montserrat_regular text-sm">
              Inicia sesión para comenzar
            </p>

            {/* EMAIL */}
            <Input
              isRequired


              onChange={(e: any) => {
                setEmail(e.target.value);
                setErrorLogin(false);
              }}
              placeholder="Email*"
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

            {/* PASSWORD */}
            <Input
              isRequired
              type={showPassword ? "text" : "password"}
              onChange={(e: any) => {
                setPassword(e.target.value);
                setErrorLogin(false);
              }}
              placeholder="Contraseña*"
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-500" />
                  ) : (
                    <Eye size={18} className="text-gray-500" />
                  )}
                </button>
              }
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
                  mt-8
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

            {/* ERROR */}
            {errorlogin && (
              <p className="text-xs text-red-500 text-center mb-4">
                Verifique usuario y contraseña
              </p>
            )}

            {/* FORGOT */}
            <p className="mt-6 
                text-center 
                text-[12px] 
                font-montserrat_medium 
                text-[#8C9296] 
                transition-colors 
                duration-200
                hover:text-primary-50
                dark:hover:text-[#34cacc]
                cursor-pointer ">
              <a>¿Olvidaste tu contraseña?</a>
            </p>


            {/* BOTÓN */}
            <div className="flex justify-center mt-12 sm:mt-12 md:mt-14 lg:mt-16">
              {!loading ? (
                <Button
                  radius="full"
                  onPress={LoginProccess}
                  isDisabled={!isButtonActive}
                  className={`
                    px-16 shadow-lg transition-all duration-300
                    ${isButtonActive ? BUTTON_ACTIVE_BG : BUTTON_INACTIVE_BG}
                    ${isButtonActive ? "hover:scale-105" : "cursor-not-allowed"}
                  `}
                >
                  <span
                    className={`
                      font-montserrat_semibold text-sm
                      ${isButtonActive ? BUTTON_ACTIVE_TEXT : BUTTON_INACTIVE_TEXT}
                    `}
                  >
                    LOGIN
                  </span>
                </Button>
              ) : (
                <PreloaderBar />
              )}
            </div>


            {/* FOOTER */}
            <div className="mt-12 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-20">
              <p className="text-center text-[11px] text-[#8C9296] font-montserrat_regular">
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

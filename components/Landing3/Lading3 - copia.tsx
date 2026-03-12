'use client'
import React, { useState, useEffect } from 'react';
import ReactECharts from "echarts-for-react";
import Lottie from "lottie-react";
import animationData from "@/about_icon.json";
import config from '@/config/config';
import { normalizeText } from '../Utilidades';

import {
  Button
} from "@heroui/react";

export const Landing3 = () => {

  const [loading, setLoading] = useState(false);
  const [local, setLocal] = useState("");
  const [visitante, setVisitante] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {

    // const fetchData = async () => {

    //   setLoading(true);

    //   const datasend = JSON.stringify({
    //     cantidad: "1"
    //   });

    //   try {
    //     const response = await fetch(config.baseUrlAPI + 'partidos/finalizados', {
    //       method: "POST",
    //       body: datasend
    //     });

    //     const result = await response.json();

    //     if (result[0].FECHA) setFecha(result[0].FECHA);
    //     if (result[0].LOCAL) setLocal(result[0].LOCAL);
    //     if (result[0].VISITANTE) setVisitante(result[0].VISITANTE);

    //   } catch (error) {
    //     console.error("Error en la obtención de datos:", error);
    //   }

    // };

    // fetchData();

    setLoading(false);
  }, []);


 
  return (

  
    <div className="bg-[#2A3235] pt-32 sm:pt-20 md:pt-36 lg:pt-36 xl:pt-36 2xl:pt-36 pb-56 -mb-36">     

         {/* Elemento central */}
        <div className='grid grid-cols-4 px-2 sm:px-6 md:px-10 lg:px-20 xl:px-30 2xl:px-64 gap-8 sm:gap-8 md:gap-8 lg:gap-6 xl:gap-10 2xl:gap- '>
          {/* Texto */}
          <div className='col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2' >
            <p className='text-start font-montserrat_bold text-3xl mx-auto text-white dark:text-white'>TECNOLOGÍA, RESPALDO Y TRANSPARENCIA              
            </p>

            <p className='text-justify dark:text-zinc-300 text-zinc-300 text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-base mt-10 font-montserrat_medium'>
              Nuestro enfoque combina innovación tecnológica con una visión financiera sólida, permitiendo a nuestros clientes operar con mayor confianza, eficiencia y claridad en cada transacción.
            </p>
            
              {/* Ícono quote */}
              <div className='mt-12'>
                <img
                  src="/imagenes/axn/icons/quote_icon.svg"
                  alt="Quote icon"
                  className="
                    w-[350px]       
                    sm:w-[325 px]     
                    md:w-[310px]      
                    lg:w-[355px]      
                    xl:w-[400px]      
                    2xl:w-[400px]  
                    h-auto
                  "
                />
              </div>
              <p className='text-start text-zinc-500 font-montserrat_regular text-[14px]'> — CEO. Emilio González</p>

          </div>


      {/* IMG */}
       <div className=" col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
  
            {/* Base */}
            <img
              src="/imagenes/axn/landing/imagen-base.png"
              alt="Imagen landing base"
              className="block sm:hidden w-full h-auto"
            />

            {/* sm */}
            <img
              src="/imagenes/axn/landing/imagen-sm.png"
              alt="Imagen landing sm"
              className="hidden sm:block md:hidden w-full h-auto"
            />

            {/* md */}
            <img
              src="/imagenes/axn/landing/imagen-md.png"
              alt="Imagen landing md"
              className="hidden md:block lg:hidden w-full h-auto"
            />

            {/* lg */}
            <img
              src="/imagenes/axn/landing/imagen-lg.png"
              alt="Imagen landing lg"
              className="hidden lg:block xl:hidden w-full h-auto"
            />

            {/* xl */}
            <img
              src="/imagenes/axn/landing/imagen-xl.png"
              alt="Imagen landing xl"
              className="hidden xl:block 2xl:hidden w-full h-auto"
            />

            {/* 2xl */}
            <img
              src="/imagenes/axn/landing_3/img_2xl.png"
              alt="Imagen landing 2xl"
              className="hidden 2xl:block h-auto w-[800px] " 
            />

       </div>

          
        </div>

       


    </div>

  )
}



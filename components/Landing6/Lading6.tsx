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

export const Landing6 = () => {

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

    /* Sección */
    <div className="bg-titles pt-32 sm:pt-20 md:pt-36 lg:pt-36 xl:pt-36 2xl:pt-36 pb-56 -mb-36">     


        <p className="px-10 sm:px-16 md:px-30 lg:px-36 xl:px-36 2xl:px-64 text-black text-center font-montserrat_bold text-3xl mb-16 mx-auto leading-tight"> 
          INVERSIONES BASADAS EN CIENCIA DE DATOS E INTELIGENCIA ARTIFICIAL
        </p>

      
        <div className='grid grid-cols-2 gap-1 sm:gap-1 md:gap-5 lg:gap-7 xl:2xl:gap-8 2xl:gap-8 px-2 sm:px-6 md:px-10 lg:px-20 xl:px-30 2xl:px-64'>   
          {/* Sección izquierda TEXTO*/}
          <div className='col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 flex flex-col justify-center'>
            <p className='text-justify text-zinc-500 text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-base'>Nuestro enfoque es utilizar la ciencia de datos, la inteligencia artificial y técnicas computacionales avanzadas para desarrollar <span className='font-montserrat_semibold'> sistemas automáticos de trading </span> que, con el respaldo de rigurosas metodologías científicas, permitan el <span className='font-montserrat_semibold'> crecimiento de capital de manera sistemática y consistente. </span></p>
            <p className='text-justify text-zinc-500 text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-base mt-5'>Hemos desarrollado un ecosistema tecnológico integral para construir <span className='font-montserrat_semibold'>estrategias financieras</span> con diferentes niveles de riesgo y rendimiento.</p>
            <p className='text-justify text-zinc-500 text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-base mt-5'>Asimismo, estamos trabajando en la creación de herramientas de visualización, seguimiento y control para hacer más fácil a nuestros socios conocer en todo momento información clave sobre cada estrategia.</p>
          </div>

        {/* Sección derecha IMAGEN */}
          <div className='col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 flex justify-center items-center'>
            <Lottie 
              animationData={animationData} 
              loop={true}
              className="
                w-[295px]  h-[295px]
                sm:w-[280px] sm:h-[280px]
                md:w-[280px] md:h-[280px]
                lg:w-[343px] lg:h-[343px]
                xl:w-[360px] xl:h-[360px]
                2xl:w-[420px] 2xl:h-[420px]
              "
            />
          </div>

        </div> 


    </div>

  )
}




/* 
<div className="pt-40 pb-40 bg-cyan-200">     

        <p className="text-black text-center font-montserrat_bold text-3xl mb-8 
                      max-w-2xl mx-auto leading-tight"> INVERSIONES BASADAS EN CIENCIA DE DATOS E INTELIGENCIA ARTIFICIAL
        </p>

        <div className='grid grid-cols-2 gap-8 px-10 sm:px-16 md:px-30 lg:px-36 xl:px-36 2xl:px-64' >   
          <div className='bg-primary-200 col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1'>Texto</div>
          <div className='bg-primary-400 col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1'>Imagen</div>  
          <div className='bg-primary-50 col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1'>Texto</div>          
        </div> 


</div> */


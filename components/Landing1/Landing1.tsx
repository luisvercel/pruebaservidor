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

/* =========================
   Hook para detectar dark mode
========================= */
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
};

export const Landing1 = () => {

  const isDark = useDarkMode();

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

    <section id='que-hacemos'>
      <div className="bg-white dark:bg-[#505658] pt-16 sm:pt-20 md:pt-36 lg:pt-36 xl:pt-36 2xl:pt-36 pb-16 sm:pb-20 md:pb-40 lg:pb-48 xl:pb-48 2xl:pb-48">      

        <p className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-24 2xl:px-40 text-center font-montserrat_bold text-3xl mx-auto text-[#242729] dark:text-white"> 
          UNA PLATAFORMA FINANCIERA PENSADA PARA TI
        </p>

        <p className='px-4 sm:px-6 md:px-10 lg:px-20 xl:px-24 2xl:px-40 dark:text-zinc-300 text-zinc-500 text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-base mb-16 mt-8 mx-auto font-montserrat_medium text-justify sm:text-center md:text-center lg:text-start'>
          Ofrecemos infraestructura financiera moderna que simplifica la gestión de pagos, transferencias electrónicas y servicios digitales, cumpliendo con los más altos estándares de seguridad y operación.
        </p>

        <div className='grid grid-cols-5 px-2 sm:px-6 md:px-10 lg:px-20 xl:px-30 2xl:px-64 gap-2 sm:gap-2 md:gap-2 lg:gap-3 xl:gap-3 2xl:gap-3 mt-20'> 

          {/* Elemento 1 */}
          <div className='col-span-5 sm:col-span-5 md:col-span-1 lg:col-span-1'>                
            <div className='grid grid-cols-4 gap-2'>
              <div className='col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4'>
                <img 
                  src={
                    isDark
                      ? "/imagenes/axn/icons/landing_1/dark/icon1_dark.svg"
                      : "/imagenes/axn/icons/landing_1/light/icon1.svg"
                  }
                  alt="Step_1"
                  className="mx-auto w-30 sm:w-[120px] md:w-48 lg:w-55 xl:w-auto mb-3 object-contain" 
                />
              </div>
              <div className='col-span-3 sm:col-span-3 md:col-span-4 flex flex-col justify-center'>
                <p className='dark:text-zinc-300 text-zinc-500 text-start text-[15px] lg:text-sm xl:text-base font-montserrat_regular'>
                  <span className='font-montserrat_bold'>Operación ágil y segura.</span><br/>
                  Procesos optimizados que garantizan rapidez, estabilidad y seguridad operativa.
                </p>
              </div>
            </div>              
          </div>

          {/* Elemento 2 */}
          <div className='col-span-5 sm:col-span-5 md:col-span-1 lg:col-span-1'>               
            <div className='grid grid-cols-4 gap-2'>
              <div className='col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4'>
                <img 
                  src={
                    isDark
                      ? "/imagenes/axn/icons/landing_1/dark/icon2_dark.svg"
                      : "/imagenes/axn/icons/landing_1/light/icon2.svg"
                  }
                  alt="Step_2"
                  className="mx-auto w-40 sm:w-[120px] md:w-48 lg:w-55 xl:w-auto mb-3 object-contain" 
                />
              </div>
              <div className='col-span-3 sm:col-span-3 md:col-span-4 flex flex-col justify-center'>
                <p className='dark:text-zinc-300 text-zinc-500 text-start text-[14px] lg:text-sm xl:text-base'>
                  <span className='font-montserrat_bold'>Integración tecnológica flexible.</span><br/>
                  Conectividad adaptable a distintos sistemas y necesidades empresariales.
                </p>
              </div>
            </div>
          </div>

          {/* Elemento 3 */}
          <div className='col-span-5 sm:col-span-5 md:col-span-1 lg:col-span-1'>
            <div className='grid grid-cols-4 gap-2'>
              <div className='col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4'>
                <img 
                  src={
                    isDark
                      ? "/imagenes/axn/icons/landing_1/dark/icon3_dark.svg"
                      : "/imagenes/axn/icons/landing_1/light/icon3.svg"
                  }
                  alt="Step_3"
                  className="mx-auto w-40 sm:w-[120px] md:w-48 lg:w-55 xl:w-auto mb-3 object-contain" 
                />
              </div>
              <div className='col-span-3 sm:col-span-3 md:col-span-4 flex flex-col justify-center'>
                <p className='dark:text-zinc-300 text-zinc-500 text-start text-[14px] lg:text-sm xl:text-base'>
                  <span className='font-montserrat_bold'>Control y trazabilidad en tiempo real.</span><br/>
                  Visibilidad inmediata de movimientos, estatus y registros financieros.
                </p>
              </div>
            </div>
          </div>

          {/* Elemento 4 */}
          <div className='col-span-5 sm:col-span-5 md:col-span-1 lg:col-span-1'>
            <div className='grid grid-cols-4 gap-2'>
              <div className='col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4'>
                <img 
                  src={
                    isDark
                      ? "/imagenes/axn/icons/landing_1/dark/icon4_dark.svg"
                      : "/imagenes/axn/icons/landing_1/light/icon4.svg"
                  }
                  alt="Step_4"
                  className="mx-auto w-40 sm:w-[120px] md:w-48 lg:w-55 xl:w-auto mb-3 object-contain" 
                />
              </div>
              <div className='col-span-3 sm:col-span-3 md:col-span-4 flex flex-col justify-center'>
                <p className='dark:text-zinc-300 text-zinc-500 text-start text-[14px] lg:text-sm xl:text-base'>
                  <span className='font-montserrat_bold'>Escalabilidad para el crecimiento.</span><br/>
                  Infraestructura que evoluciona conforme aumentan tus operaciones.
                </p>
              </div>
            </div>
          </div>

          {/* Elemento 5 */}
          <div className='col-span-5 sm:col-span-5 md:col-span-1 lg:col-span-1'>
            <div className='grid grid-cols-4 gap-2'>
              <div className='col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4'>
                <img 
                  src={
                    isDark
                      ? "/imagenes/axn/icons/landing_1/dark/icon5_dark.svg"
                      : "/imagenes/axn/icons/landing_1/light/icon5.svg"
                  }
                  alt="Step_5"
                  className="mx-auto w-40 sm:w-[120px] md:w-48 lg:w-55 xl:w-auto mb-3 object-contain" 
                />
              </div>
              <div className='col-span-3 sm:col-span-3 md:col-span-4 flex flex-col justify-center'>
                <p className='dark:text-zinc-300 text-zinc-500 text-start text-[14px] lg:text-sm xl:text-base'>
                  <span className='font-montserrat_bold'>Cumplimiento normativo.</span><br/>
                  Alineación con regulaciones y protección estricta de la información financiera.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>


  )
}

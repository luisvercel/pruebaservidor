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

export const Landing7 = () => {

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
    <div className="bg-white pt-32 sm:pt-20 md:pt-36 lg:pt-36 xl:pt-36 2xl:pt-36 pb-40">      


        <p className="px-10 sm:px-16 md:px-30 lg:px-36 xl:px-36 2xl:px-64 text-black text-center font-montserrat_bold text-3xl mx-auto"> 
          GESTIÓN DE ACTIVOS VÍA CUENTA MAESTRA
        </p>
        <p className='px-10 sm:px-16 md:px-30 lg:px-36 xl:px-36 2xl:px-64 text-black text-center text-zinc-500 text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-base mb-16 mt-8 mx-auto'>Nuestro modelo de negocio incluye la gestión de las operaciones de terceros a través de una cuenta MAM.</p>
      




        <div className='grid grid-cols-5 px-2 sm:px-6 md:px-10 lg:px-20 xl:px-30 2xl:px-64 gap-2 sm:gap-2 md:gap-2 lg:gap-3 xl:gap-3 2xl:gap-3 mt-20'> 
            {/* Elemento 1 */}
            <div className='col-span-5 sm:col-span-5 md:col-span-1 lg:col-span-1'>                
                <div className='grid grid-cols-4 gap-2'>
                    {/* Imagen */}
                    <div className='col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4'>
                        <img 
                          src="../imagenes/trading_icons/gestion_activos/step_1_phone.svg"
                          alt="Step_1"
                          className=" 
                            mx-auto   
                            w-30      
                            sm:w-[120px]     
                            md:w-48     
                            lg:w-55
                            xl:w-auto
                            mb-3
                            object-contain" 
                        />
                  </div>
                  {/* TXT debajo de Imagen */}
                  <div className='col-span-3 sm:col-span-3 md:col-span-4 flex flex-col justify-center'>
                    <p className='text-zinc-500 text-start text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-base'><span className='font-montserrat_bold'>1.</span>	Para invertir usando nuestras estrategias, el primer paso es crear una cuenta con el broker TradeView Markets en este link _____ y fondéala.</p>
                  </div>
                </div>              
            </div>

            {/* Elemento 2 */}
            <div className=' col-span-5 sm:col-span-5 md:col-span-1 lg:col-span-1'>               
                <div className='grid grid-cols-4 gap-2'>
                    {/* Imagen */}
                    <div className='col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4'>
                        <img 
                          src="../imagenes/trading_icons/gestion_activos/step_2_phone.svg"
                          alt="Step_2"
                          className=" 
                            mx-auto   
                            w-40      
                            sm:w-[120px]     
                            md:w-48     
                            lg:w-55
                            xl:w-auto
                            mb-3
                            object-contain" 
                        />
                  </div>
                  {/* TXT debajo de Imagen */}
                  <div className='col-span-3 sm:col-span-3 md:col-span-4 flex flex-col justify-center'>
                      <p className='text-zinc-500 text-start text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-base'><span className='font-montserrat_bold'>2.</span> Solicita a TradeView Markets que tu cuenta replique o siga nuestras estrategias financieras.</p>
                  </div>
                </div>
            </div>


            {/* Elemento 3 */}
            <div className='col-span-5 sm:col-span-5 md:col-span-1 lg:col-span-1'>
              <div className='grid grid-cols-4 gap-2'>
                    {/* Imagen */}
                    <div className='col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4'>
                        <img 
                          src="../imagenes/trading_icons/gestion_activos/step_3_phone.svg"
                          alt="Step_3"
                          className=" 
                            mx-auto   
                            w-40      
                            sm:w-[120px]     
                            md:w-48     
                            lg:w-55
                            xl:w-auto
                            mb-3
                            object-contain" 
                        />
                  </div>
                  {/* TXT debajo de Imagen */}
                  <div className='col-span-3 sm:col-span-3 md:col-span-4 flex flex-col justify-center'>
                      <p className='text-zinc-500 text-start text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-base'><span className='font-montserrat_bold'>3.</span> Nosotros no tenemos acceso al dinero de los inversores, permanece siempre en su cuenta con el bróker.</p>
                  </div>
                </div>
            </div>

            {/* Elemento 4 */}
            <div className='col-span-5 sm:col-span-5 md:col-span-1 lg:col-span-1'>
                <div className='grid grid-cols-4 gap-2'>
                    {/* Imagen */}
                    <div className='col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4'>
                        <img 
                          src="../imagenes/trading_icons/gestion_activos/step_4_phone.svg"
                          alt="Step_4"
                          className=" 
                            mx-auto   
                            w-40      
                            sm:w-[120px]     
                            md:w-48     
                            lg:w-55
                            xl:w-auto
                            mb-3
                            object-contain" 
                        />
                  </div>
                  {/* TXT debajo de Imagen */}
                  <div className='col-span-3 sm:col-span-3 md:col-span-4 flex flex-col justify-center'>
                      <p className='text-zinc-500 text-start text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-base'><span className='font-montserrat_bold'>4.</span> Los inversores mantienen el control completo de su cuenta en todo momento, por lo que pueden depositar y retirar su capital cuando lo decidan. </p>
                  </div>
                </div>
            </div>

            {/* Elemento 5 */}
            <div className='col-span-5 sm:col-span-5 md:col-span-1 lg:col-span-1'>
                <div className='grid grid-cols-4 gap-2'>
                    {/* Imagen */}
                    <div className='col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4'>
                        <img 
                          src="../imagenes/trading_icons/gestion_activos/step_5_phone.svg"
                          alt="Step_5"
                          className=" 
                            mx-auto   
                            w-40      
                            sm:w-[120px]     
                            md:w-48     
                            lg:w-55
                            xl:w-auto
                            mb-3
                            object-contain" 
                        />
                  </div>
                  {/* TXT debajo de Imagen */}
                  <div className='col-span-3 sm:col-span-3 md:col-span-4 flex flex-col justify-center'>
                      <p className='text-zinc-500 text-start text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-base'><span className='font-montserrat_bold'>5.</span> Sólo si obtienes rentabilidad aplicamos una comisión.</p>
                  </div>
                </div>
            </div>

        </div>















    </div>

  )
}





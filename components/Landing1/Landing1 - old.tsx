'use client'
import React, { useState, useEffect, } from 'react';
import Lottie from "lottie-react";
import animationData from "@/about_icon.json";
import config from '@/config/config';
import { normalizeText } from '../Utilidades';

export const Landing1 = () => {

  const [loading, setLoading] = useState(false);
  const [local, setLocal] = useState("");
  const [visitante, setVisitante] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {

    const fetchData = async () => {

      setLoading(true);

      const datasend = JSON.stringify({
        cantidad: "1"
      });

      try {
        const response = await fetch(config.baseUrlAPI + 'partidos/finalizados', {
          method: "POST",
          body: datasend
        });

        const result = await response.json();

        if (result[0].FECHA) setFecha(result[0].FECHA);
        if (result[0].LOCAL) setLocal(result[0].LOCAL);
        if (result[0].VISITANTE) setVisitante(result[0].VISITANTE);

      } catch (error) {
        console.error("Error en la obtención de datos:", error);
      }

    };

    fetchData();

    setLoading(false);
  }, []);
  
  return (

    /* Sección */
    <div className="sm:pt-0 md:pt-2 lg:pt-16 pb-40">
          
            {/* Inicio de elementos */}
            <div className='pt-20 grid grid-cols-2 gap-8 px-2 sm:px-6 md:px-10 lg:px-20 xl:px-30 2xl:px-64'> 

              
                {/* Columna izquierda — Imagen responsiva */}
                <div className="
                  col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 
                  rounded-2xl relative 
                  h-[260px] sm:h-[300px] md:h-[330px] lg:h-[620px] xl:h-[575px] 2xl:h-[540px]
                ">

                  <picture className="w-full h-full block overflow-hidden rounded-2xl">
                    {/* Imagen para pantallas grandes */}
                    <source 
                      media="(min-width: 1024px)" 
                      srcSet="/imagenes/trading_imgs/about_pc.png" 
                    />

                    {/* Imagen para tablets */}
                    <source 
                      media="(min-width: 640px)" 
                      srcSet="/imagenes/trading_imgs/about_tablet.png" 
                    />

                    {/* Imagen para móviles */}
                    <img
                      src="/imagenes/trading_imgs/about_phone.png"
                      alt="Acerca de nosotros"
                      loading="lazy"
                      className="
                        w-full h-full
                               
                        object-cover                       
                        object-[-16px_-12px]
                        sm:object-[-60px_-20px]
                        md:object-[-60px_-20px] 
                        lg:object-[-65px_-1px] 
                        xl:object-[-19px_-2px] 
                        2xl:object-[-30px_-12px]

                        scale-125          /* móvil */
                        sm:scale-125       /* tablet */
                        lg:scale-110       /* desktop */
                        xl:scale-98
                        2xl:scale-125
                      "
                    />
                  </picture>

                </div>  


              
              {/* Columna derecha TEXTO */}
              <div className='col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 content-center'>
                  <div>
                    <p className='text-black text-center sm:text-center md:text-center lg:text-start font-montserrat_bold text-3xl mb-8 mt-4 sm:mt-4 md:mt-0'>¿QUIÉNES SOMOS?</p>
                    <p className="text-zinc-500 text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-base text-justify font-montserrat_regular">Somos una empresa dedicada a desarrollar <span className='font-montserrat_semibold'>estrategias de inversión innovadoras</span> basadas en ciencia de datos, inteligencia artificial y trading algorítmico.</p>
                    <p className='text-zinc-500 text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-base text-justify mt-5 font-montserrat_regular'>Nuestro objetivo es <span className='font-montserrat_semibold'>hacer crecer el patrimonio de nuestros socios</span> de manera consistente y segura utilizando el rigor de la ciencia.</p>
                    <p className='text-zinc-500 text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-base text-justify mt-5 font-montserrat_regular mb-12'>Hemos creado un portafolio de estrategias con diferentes niveles de riesgo y de diversificación para cubrir las más diversas necesidades de inversión.</p>                
                  </div>

                  {/* Elemento 3 CUADROS */}
                  <div className="grid grid-cols-3 gap-3">

                    {/* Tarjeta 1 */}
                    <div className="rounded-2xl flex flex-col items-center justify-center 
                          col-span-3 sm:col-span-1 md:col-span-1 xl:col-span-1 2xl:col-span-1 border-1 border-black">

                            <div className='grid grid-cols-2 p-2 gap-2'>
                                <div className='col-span-1 sm:col-span-2 md:col-span-2 xl:col-span-2 2xl:col-span-2 flex justify-center'>
                                  <img 
                                    src="../imagenes/trading_icons/innovacion_svg_icon.svg"
                                    alt="Data Science"
                                    className="w-28 mb-3 object-contain" 
                                  />
                                </div>
                                <div className='col-span-1 sm:col-span-2 md:col-span-2 xl:col-span-2 2xl:col-span-2 content-center'> 
                                    <p className="text-sm text-zinc-500 font-montserrat_bold text-start sm:text-center md:text-center lg:text-center">
                                      Innovación basada en datos con AI y algoritmos
                                    </p>
                                </div>
                            </div>                   
                    </div>

                    {/* Tarjeta 2 */}
                    <div className="rounded-2xl flex flex-col items-center justify-center 
                          col-span-3 sm:col-span-1 md:col-span-1 xl:col-span-1 2xl:col-span-1 border-1 border-black">

                            <div className='grid grid-cols-2 p-2 gap-2'>
                                <div className='col-span-1 sm:col-span-2 md:col-span-2 xl:col-span-2 2xl:col-span-2 flex justify-center'>
                                  <img 
                                    src="../imagenes/trading_icons/crecimiento_svg_icon.svg"
                                    alt="Data Science"
                                    className="w-28 mb-3 object-contain" 
                                  />
                                </div>
                                <div className='col-span-1 sm:col-span-2 md:col-span-2 xl:col-span-2 2xl:col-span-2 content-center'> 
                                    <p className="text-zinc-500 text-sm font-montserrat_bold text-start sm:text-center md:text-center lg:text-center">
                                      Crecimiento sistemático y consistente
                                    </p>
                                </div>
                            </div>                   
                    </div>

                    {/* Tarjeta 3 */}
                    <div className="rounded-2xl flex flex-col items-center justify-center 
                          col-span-3 sm:col-span-1 md:col-span-1 xl:col-span-1 2xl:col-span-1 border-1 border-black">

                            <div className='grid grid-cols-2 p-2 gap-2'>
                                <div className='col-span-1 sm:col-span-2 md:col-span-2 xl:col-span-2 2xl:col-span-2 flex justify-center'>
                                  <img 
                                    src="../imagenes/trading_icons/portafolio_svg_icon.svg"
                                    alt="Data Science"
                                    className="w-28 mb-3 object-contain" 
                                  />
                                </div>
                                <div className='col-span-1 sm:col-span-2 md:col-span-2 xl:col-span-2 2xl:col-span-2 content-center'> 
                                    <p className="text-zinc-500 text-sm font-montserrat_bold text-start sm:text-center md:text-center lg:text-center">
                                      Portafolio diversificado y actualizado
                                    </p>
                                </div>

                            </div>                   
                    </div>


                  </div>

              </div>

            </div>

    </div>

  )
}

'use client'
import React from 'react';

export const Landing3 = () => {
  return (

    <section id='nosotros'>

          <div className="bg-titles pt-32 sm:pt-20 md:pt-36 pb-20 sm:pb-24 md:pb-28 lg:pb-32 ">

                <div className='
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-2
                  lg:grid-rows-2                  
                  gap-8
                  px-4 sm:px-6 md:px-10 lg:px-20 xl:px-24 2xl:px-40
                '>

                  {/* Elemento 1 */}
                  <div className='                    
                    order-1
                    sm:col-span-2
                    lg:col-span-1
                  '>
                    <p className="text-center lg:text-start font-montserrat_bold text-3xl text-white">
                      TECNOLOGÍA, RESPALDO Y TRANSPARENCIA
                    </p>

                    <p className="text-justify text-zinc-300 text-[15px] xl:text-base mt-10 font-montserrat_medium">
                      Nuestro enfoque combina innovación tecnológica con una visión financiera sólida,
                      permitiendo a nuestros clientes operar con mayor confianza, eficiencia y claridad
                      en cada transacción.
                    </p>
                  </div>


                  {/* Elemento 2 */}
                  <div className='           
                    order-2
                    lg:order-3
                  '>
                    <div className="mt-5 sm:mt-8 md:mt-10 lg:mt-8 xl:mt-3 2xl:-mt-4">
                      <img
                        src="/imagenes/axn/icons/quote_icon.svg"
                        alt=""
                        className="w-[290px] sm:w-[280px] md:w-[288px] lg:w-[295px] xl:w-[315px] 2xl:w-[365px]"
                      />
                    </div>

                    <p className="text-start text-zinc-500 font-montserrat_regular text-[14px] mt-2">
                      — CEO. Emilio González
                    </p>
                  </div>


                  {/* Elemento 3 */}
                  <div className='
                      order-3
                      lg:order-2
                      lg:row-span-2
                      flex
                      items-center
                      justify-center
                      py-8 sm:py-0
                    '>
                      <img
                        src="/imagenes/axn/landing_3/img_2xl.png"
                        alt=""
                        className="
                          w-[90%]
                          max-w-2xl
                          sm:w-full
                          object-contain
                          pointer-events-none
                          select-none
                        "
                      />
                  </div>


                </div>






          </div>
    </section>

  );
};

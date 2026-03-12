'use client'
import { Button } from '@heroui/react'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'

export const Welcome = () => {
  const [nombreusuario, setNombreUsuario] = useState("")

  useEffect(() => {
    setNombreUsuario(localStorage.getItem("nombreusuario_axnweb") + "" || "")
  }, [nombreusuario])

  return (
    <section id='inicio'>
      <div
        className={`
          min-h-[100dvh]
          bg-no-repeat bg-center bg-cover
          bg-home-mobile
          sm:bg-home-tablet
          lg:bg-home-desktop
          dark:bg-white
          relative
          flex
          flex-col
          justify-center
          overflow-hidden
          
        `}      
      >
        <div className="
          grid grid-cols-1 lg:grid-cols-1 gap-4
          px-2 sm:px-12 md:px-20 lg:px-32 xl:px-30 2xl:px-64
          pt-24 sm:pt-32 lg:pt-40
          items-center">
          {/* TEXTO */}
          <div className="max-w-[740px] w-full">
            <p className="text-base sm:text-xl md:text-xl lg:text-xl xl:text-xl font-montserrat_bold text-center sm:text-start text-primary-50 dark:text-[#34cacc]">
              SOLUCIONES FINANCIERAS DIGITALES QUE IMPULSAN {" "}
              <span className="text-primary-50 dark:text-[#34cacc]">TU CRECIMIENTO.</span>
            </p>
            <p className="mt-5 text-white text-[clamp(1.5rem,4vw,2.3rem)] font-montserrat_bold text-center sm:text-start">
              OPTIMIZAMOS TUS OPERACIONES FINANCIERAS CON TECNOLOGÍA{" "}
              <span className="text-white">SEGURA Y CONFIABLE</span>
            </p>
            <p className=" mt-7 dark:text-zinc-300 text-zinc-300 text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-lg font-montserrat_medium text-center sm:text-start">
            Facilitamos pagos, transferencias y servicios financieros diseñados para personas físicas, empresas y PyMEs que buscan eficiencia, control y escalabilidad.
            </p>
          
            <div className='grid grid-cols-1 justify-items-center sm:justify-items-start md:justify-items-start lg:justify-items-start'>
              <div className="mt-10 sm:mt-10 md:mt-12 xl:mt-16 2xl:mt-18">
                
                  <a href={nombreusuario === 'null' || nombreusuario === '' ? "/login" : "/miperfil"}
                    //variant="bordered"
                    color="default"
                    //disableRipple
                    className="
                      border-3
                      border-white
                      dark:border-[#34cacc]
                      dark:bg-[#34cacc]/10
                      relative  rounded-full px-14 shadow-xl
                      bg-background/30
                      after:content-[''] after:absolute after:rounded-full after:inset-0
                      after:bg-background/10 after:z-[-1] after:transition after:!duration-500
                      hover:after:scale-150 hover:after:opacity-0
                      pt-[10px] pb-[10px]
                    "
                    //size="lg"
                  >
                    <span className="text-white dark:text-white font-montserrat_bold text-sm hover:text-white">
                      ¡Comienza Ahora!
                    </span>
                  </a>
                
              </div>
            </div>
          
          </div>   
        </div>
      </div>
    </section>
  )
}
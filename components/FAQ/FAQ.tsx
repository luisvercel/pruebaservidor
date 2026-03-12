'use client'
import React from 'react'
import { Accordion, AccordionItem, Divider } from "@heroui/react";
// import { IoIosArrowDropdownCircle } from "react-icons/io";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

export const FAQ = () => {

  return (

    <div className="bg-white items-start justify-center dark:bg-gradient-to-bl from-[#812DE2] from-1% via-[#03004E] via-30% to-[#812DE2] to-100% pb-56">
        <div className='grid grid-cols-2 pt-32 gap-8'>

          {/* Título */}
          <div className='col-span-2 px-2 -mt-3'>
            <div className='leading-normal text-transparent bg-clip-text bg-gradient-to-r from-[#4646F9] to-pink-400'>
              <p className='font-montserrat_bold text-center text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl pt-12 pb-3'>Preguntas Frecuentes</p>
            </div>
          </div>

          {/* preguntas */}
          <div className='col-span-2 px-2 w-full max-w-screen-md mx-auto mt-10'>            

              <Accordion variant="splitted" 
              className="w-full ">              
                <AccordionItem
                  key="1"
                  aria-label="¿SportBet es un casino?"
                  title={
                    <p className="font-montserrat_semibold text-start text-primary-50 dark:text-[#9130F4] text-sm sm:text-base md:text-base lg:text-base xl:text-lg">
                      ¿SportBet es un casino?
                    </p>
                  }
                  className="rounded-2xl dark:bg-[#0b0b26]"
                  indicator={({ isOpen }) => (
                    <HiOutlineChevronDown
                      size="24px"
                      className={`transform transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-90 text-[#9130F4] dark:text-[#aaaaaa]" : "rotate-90 text-[#aaaaaa]"
                      }`}
                    />
                  )}
                >
                  <p className="font-montserrat_regular text-sm sm:text-base md:text-base lg:text-base xl:text-base text-[#999999] dark:text-[#aaaaaa] break-words">
                    SportBet no es un casino, <span className="font-montserrat_semibold">es una plataforma digital que conecta a personas para realizar juegos deportivas 1 a 1</span>, ¡tal como lo harías con un amigo! Apuesta por tu equipo favorito y si hay empate, solo pagas la comisión y recuperas tu dinero.
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="¿Cómo me registro?"
                  title={
                    <p className="font-montserrat_semibold text-start text-primary-50 dark:text-[#9130F4] text-sm sm:text-base md:text-base lg:text-base xl:text-lg">
                      ¿Cómo me registro?
                    </p>
                  }
                  className="rounded-2xl mt-6 dark:bg-[#0b0b26]"
                  indicator={({ isOpen }) => (
                    <HiOutlineChevronDown
                      size="24px"
                      className={`transform transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-90 text-[#9130F4] dark:text-[#aaaaaa]" : "rotate-90 text-[#aaaaaa]"
                      }`}
                    />
                  )}
                >
                  <p className="font-montserrat_regular text-sm sm:text-base md:text-base lg:text-base xl:text-base text-[#999999] dark:text-[#aaaaaa]  break-words">
                    Para crear tu cuenta en SportBet <span className="font-montserrat_semibold">debes ser mayor de edad y llenar el formulario con tus datos personales</span>. Elige un nombre de usuario y contraseña de al menos 6 dígitos. Recibirás un correo electrónico para verificar tu cuenta. Ábrelo, da clic en el enlace y listo.
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="¿Cómo fondeo mi cuenta?"
                  title={
                    <p className="font-montserrat_semibold text-start text-primary-50 dark:text-[#9130F4] text-sm sm:text-base md:text-base lg:text-base xl:text-lg">
                      ¿Cómo fondeo mi cuenta?
                    </p>
                  }
                  className="rounded-2xl mt-6 dark:bg-[#0b0b26]"
                  indicator={({ isOpen }) => (
                  <HiOutlineChevronDown
                    size="24px"
                    className={`transform transition-transform duration-300 ease-in-out ${
                      isOpen ? "rotate-90 text-[#9130F4] dark:text-[#aaaaaa]" : "rotate-90 text-[#aaaaaa]"
                    }`}
                  />
                )}
                >
                  <p className="font-montserrat_regular text-sm sm:text-base md:text-base lg:text-base xl:text-base text-[#999999] dark:text-[#aaaaaa] break-words">
                    Dirígete a la página &ldquo;Depositar a mi cuenta&ldquo; y selecciona una de las opciones disponibles para realizar el fondeo. <span className="font-montserrat_semibold">Puedes usar tarjeta o depósito en efectivo en banco.</span> Ingresa el monto y realiza tu pago.
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="4"
                  aria-label="¿Cuál es el monto de las comisiones?"
                  title={
                    <span className="font-montserrat_semibold text-start text-primary-50 dark:text-[#9130F4] text-sm sm:text-base md:text-base lg:text-base xl:text-lg">
                      ¿Cuál es el monto de las comisiones?
                    </span>
                  }
                  className="rounded-2xl mt-6 dark:bg-[#0b0b26]"
                  indicator={({ isOpen }) => (
                  <HiOutlineChevronDown
                    size="24px"
                    className={`transform transition-transform duration-300 ease-in-out ${
                      isOpen ? "rotate-90 text-[#9130F4] dark:text-[#aaaaaa]" : "rotate-90 text-[#aaaaaa]"
                    }`}
                  />
                )}
                >
                  <p className="font-montserrat_regular text-sm sm:text-base md:text-base lg:text-base xl:text-base text-[#999999] dark:text-[#aaaaaa] break-words">
                    El monto de la comisión depende del valor de el juego y cuántas juegos hayas realizado. Cuantas más juegos, menor comisión. <span className="font-montserrat_semibold">Las comisiones van del 3% al 10%.</span> Consulta la sección &ldquo;Comisiones&ldquo; para detalles.
                  </p>
                </AccordionItem>
              </Accordion>
   

            

          </div>       
        </div>
    </div>

  )
}

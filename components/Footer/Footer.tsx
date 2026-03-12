import React from 'react'
import config from '@/config/config';

export const Footer = ({ ruta = './' }) => {
    return (

        <div className="bg-black dark:bg-black">


{/*             <div className="grid grid-cols-3 gap-6 px-6 py-8">

                <div>
                <img src={config.baseUrlIMG + "/imagenes/logo_axn.png"} width="150" />
                <p className="mt-4 text-primary-900 text-sm">
                    Lorem ipsum dolor sit amet...
                </p>
                </div>

                <div>
                <p className="mb-3 text-white font-montserrat_bold">ENLACES</p>
                <p className="text-primary-900 text-sm">Enlace 1</p>
                <p className="text-primary-900 text-sm">Enlace 2</p>
                </div>

                <div>
                <p className="mb-3 text-white font-montserrat_bold">CONTACTO</p>
                <p className="text-primary-900 text-sm">Teléfono</p>
                <p className="text-primary-900 text-sm">Dirección</p>
                </div>

            </div> */}


            <div className=" bg-[#0c1312] dark:bg-[#0c1312] py-3">
                <div className="flex items-center justify-center gap-2">                  

                    <img
                    src={`${config.baseUrlIMG}/imagenes/logo_axn.png`}
                    alt="Logo AXN"
                    className="w-14 h-auto"
                    />

                    <p className='text-white text-[11px] sm:text-[11px] md:text-[12px]'>©</p>
                    <p className='text-white text-[11px] sm:text-[11px] md:text-[12px]'>2026 | Todos los derechos reservados.</p>
                </div>
            </div>

        </div>


    )
}
'use client'

import React, { useState } from 'react'
import { DashboardIcon } from '../icons/sidebar/dashboard'
import { ApuestasIcon } from '../icons/sidebar/apuestas'
import { SalirIcon } from '../icons/sidebar/salir'
import { MiBalance } from '../icons/sidebar/balance'
import { Historial } from '../icons/sidebar/historial'
import { MisFavoritos } from '../icons/sidebar/favoritos'
import config from '@/config/config'

interface MenuItem {
  key: string
  label: string
  href: string
  Icon: typeof DashboardIcon
}

export const MenuCuenta = ({ active = 'perfil' }) => {
  const [activeKey, setActiveKey] = useState<string>(active)

  const items: MenuItem[] = [
    { key: 'perfil', label: 'Dashboard', href: config.baseUrl + '/miperfil', Icon: DashboardIcon },
    { key: 'juegos', label: 'Movimientos', href: '../movimientos', Icon: MiBalance },
    { key: 'balance', label: 'Transferencias', href: '../transferencias', Icon: ApuestasIcon },
    //{ key: 'historial', label: 'Contratos Digitales***', href: '../contratos', Icon: Historial },
    { key: 'expediente', label: 'Expediente', href: '../expediente', Icon: Historial },
    { key: 'contactos', label: 'Contactos', href: '../contactos', Icon: Historial },
    { key: 'historialtransferencias', label: 'Historial Transferencias', href: '../historialtransferencias', Icon: Historial },
    { key: 'historialmovimientos', label: 'Historial Movimientos', href: '../historialmovimientos', Icon: Historial },
    { key: 'favoritos', label: 'Herramientas', href: '#', Icon: MisFavoritos },
    { key: 'salir', label: 'Salir', href: '../logout', Icon: SalirIcon },
  ]

  return (
  <>
    {/* ================= BASE (mobile) ================= */}
    <div className="bg-[#1D2223] block sm:hidden fixed top-0 left-0 w-full h-14 z-50 flex items-center justify-between px-4">
      
      {/* LOGO */}
      <img
        src="../imagenes/logo_axn_cont.png"
        alt="Logo AXN"
        className="h-5 w-auto"
      />


      {/* MENÚ DESPLEGABLE */}
      {activeKey === 'open' && (
        <div className="absolute top-14 left-0 w-full bg-titles shadow-xl">
          <div className="flex flex-col py-2">
            {items.map(item => (
              <a
                key={item.key}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3A4448]"
              >
                <item.Icon color="#34cacc" />
                <span className="font-montserrat_semibold text-sm">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>

  {/* ================= SM+ SIDEBAR CONFIG ================= */}
   {/* Menu Lateral color de fondo y elementos */}
    <div
      className="      
        hidden        
        sm:flex
        sm:h-[calc(100vh-45px)]
        h-full
        bg-[#f4f5f6]
        dark:bg-[#24272a]
        justify-start
        px-0 sm:px-0 md:px-0 lg:px-4 xl:px-5 2xl:px-7
        md:py-0 lg:py-5 xl:py-5 2xl:py-5               
        
      "
    >
      
    {/* Menu Lateral elementos */}
      <div
        className="
           lg:rounded-2xl
            xl:rounded-2xl
            2xl:rounded-2xl 
            h-full
            dark:shadow-xl
            bg-titles  
            dark:bg-[#333638]       
            flex flex-col
            py-4
            w-[72px]
            lg:w-[280px] xl:w-[320px]
            overflow-visible
        "
      >
        {/* LOGO */}
        <div className="mt-6 pb-10 flex justify-center">
          <img
            src="../imagenes/logo_axn_cont.png"
            alt="Logo AXN"
            className="sm:w-[41px] md:w-[45px] w-auto lg:hidden"
          />
          <img
            src="../imagenes/logo_axn.png"
            alt="Logo AXN"
            className="hidden lg:block h-12 w-auto"
          />
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-visible px-1 lg:px-3 lg:overflow-y-auto flex flex-col">

          {/* ITEMS PRINCIPALES */}
          <div className="flex flex-col gap-1">
            {items
              .filter(item => item.key !== 'salir')
              .map(item => {
                const isActive = item.key === activeKey
                const textColor = isActive ? 'text-white' : 'text-[#8C9296]'
                const iconColor = isActive ? '#34cacc' : '#8C9296'

                return (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => setActiveKey(item.key)}
                    className="mx-1"
                  >
                    <div
                      className={`
                        group
                        relative
                        flex items-center
                        justify-center lg:justify-start
                        gap-0 lg:gap-3
                        px-0 lg:px-4
                        py-3
                        rounded-xl lg:rounded-3xl
                        transition-colors
                        ${textColor}
                        ${isActive
                          ? 'bg-[#454E53] dark:bg-neutral-500'
                          : 'hover:bg-[#3A4448] dark:hover:bg-neutral-600'}
                      `}
                    >
                      <item.Icon color={iconColor} />

                      <span className="hidden lg:inline text-sm">
                        {item.label}
                      </span>

                      <span
                        className="
                          absolute
                          left-full
                          top-1/2
                          -translate-y-1/2
                          ml-3
                          whitespace-nowrap
                          rounded-md
                          bg-[#1D2223]
                          px-3 py-1.5
                          text-sm
                          text-white
                          shadow-xl
                          opacity-0
                          translate-x-2
                          transition-all duration-200
                          pointer-events-none
                          group-hover:opacity-100
                          group-hover:translate-x-0
                          lg:hidden
                          z-50
                        "
                      >
                        {item.label}
                      </span>
                    </div>
                  </a>
                )
              })}
          </div>




          {/* SALIR ICONO */}
          {items
            .filter(item => item.key === 'salir')
            .map(item => {
              const isActive = item.key === activeKey
              const textColor = isActive ? 'text-white' : 'text-[#8C9296]'
               const iconColor = isActive ? '#34cacc' : '#8C9296'

              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setActiveKey(item.key)}
                  className="mx-1 mt-auto pt-4"
                >
                  <div
                    className={`
                      group
                      relative
                      flex items-center
                      justify-center lg:justify-start
                      gap-0 lg:gap-3
                      px-0 lg:px-4
                      py-3
                      rounded-xl lg:rounded-3xl
                      transition-colors
                      ${textColor}
                      
                      hover:bg-[#3A4448] dark:hover:bg-neutral-600
                      
                    `}
                  >
                    <item.Icon color={iconColor} />

                      <span className="hidden lg:inline text-sm">
                        {item.label}
                      </span>

                    <span className="
                          absolute
                          left-full
                          top-1/2
                          -translate-y-1/2
                          ml-3
                          whitespace-nowrap
                          rounded-md
                          bg-[#1D2223]
                          px-3 py-1.5
                          text-sm
                          text-white
                          shadow-xl
                          opacity-0
                          translate-x-2
                          transition-all duration-200
                          pointer-events-none
                          group-hover:opacity-100
                          group-hover:translate-x-0
                          lg:hidden
                          z-50
                    ">
                      {item.label}
                    </span>
                  </div>
                </a>
              )
            })}
        </div>




      </div>
    </div>
  </>
)

}

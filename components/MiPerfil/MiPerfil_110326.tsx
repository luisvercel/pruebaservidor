"use client";
import CircleCharts from "@/components/ComponentesAxion/dashboard/CircleCharts";
import SingleLevelPieChart from "@/components/ComponentesAxion/dashboard/SingleLevelPieChart";

import React, { useState, useEffect } from 'react';
import {Divider} from "@heroui/react";
import { formatearFecha } from "../Utilidades";
export const MiPerfil = () => {

  const [nombre, setNombre] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");
  const [fechanacimiento, setFechaNacimiento] = useState("");
  const [idinterno, setIdInterno] = useState("");
  const [idcontrato, setIdContrato] = useState("");
  const [fechaRegistro, setFechaRegistro] = useState("");
  const [clabeKuspit, setClabeKuspit] = useState("");
  const [persona, setPersona] = useState("fisica");

  useEffect(() => {

    setNombre(localStorage.getItem("nombreusuario_axnweb") + "");

    setPersona( localStorage.getItem("persona_axnweb") + "" );

    if( localStorage.getItem("persona_axnweb") != 'moral' ){
      setPaterno(localStorage.getItem("paternog_axnweb") + "");
      setMaterno(localStorage.getItem("maternog_axnweb") + "");
    }

    setIdInterno(localStorage.getItem("idexternog_axnweb") + "");

    setEmail(localStorage.getItem("email_axnweb") + "");
    setDireccion(localStorage.getItem("direccion_axnweb") + "");
    setCelular(localStorage.getItem("celular_axnweb") + "");
    setFechaNacimiento(localStorage.getItem("fechanacimiento_axnweb") + "");
    setIdContrato(localStorage.getItem("idcontrato_axnweb") + "");
    setFechaRegistro(localStorage.getItem("fecharegistro_axnweb") + "");
    setClabeKuspit(localStorage.getItem("clabeKuspit_axnweb") + "");

  }, []);

    //Datos para pie chart principal
  const chartData = [
  { name: "Abonos", value: 1400, fill: "#22c55e" },
  { name: "Saldo Inicial", value: 3500, fill: "#3b82f6" },
  { name: "Inversiónes", value: 3200, fill: "#f59e0b" },
  { name: "Retiros", value: 450, fill: "#ef4444" },
];

  return (
    <div className="space-y-6">

     {/* Tarjeta Info 1 */}
      <div className="bg-white dark:bg-[#131919] rounded-xl mt-0 md:mt-0 lg:-mt-3 xl:-mt-3 2xl:-mt-3">
        {/* Elemento Datos de usuario */}
        <div className="relative grid grid-cols-5 p-4 gap-6">

            {/* Info Izquierda */}
            <div className="col-span-5 md:col-span-2 flex items-center gap-4">

              <img
                src="../imagenes/axn/svg_icons/user_icon.svg"
                alt="Descripción"
                className="w-14 h-14 object-contain flex-shrink-0"
              />

              <div className="flex flex-col">
                <p className="text-sm text-titles dark:text-white font-montserrat_regular"><span className="font-montserrat_bold">Nombre:</span> {paterno} {materno} {nombre} </p>
                
                <p className="text-sm text-titles dark:text-white font-montserrat_regular"><span className="font-montserrat_bold">ID Axion:</span> {idinterno}</p>
                
                <p className="text-sm text-titles dark:text-white font-montserrat_regular"><span className="font-montserrat_bold">No. de Contrato:</span> 
                {idcontrato === "0" || idcontrato === "null" ? <> Validando información</> : <> {idcontrato}</> }
                </p>

                <p className="text-sm text-titles dark:text-white font-montserrat_regular"><span className="font-montserrat_bold">Fecha de registro: </span> 
                { formatearFecha( fechaRegistro )}
                </p>

                {/* <p className="text-sm text-titles dark:text-white font-montserrat_regular"><span className="font-montserrat_bold">Saldo actual:</span> 
                {idcontrato === "0" || idcontrato === "null" ? <> Validando información</> : <> $500,000.00</> }
                </p> */}

                <p className="text-sm text-titles dark:text-white font-montserrat_regular"><span className="font-montserrat_bold">CLABE Axion:</span> 
                {idcontrato === "0" || idcontrato === "null" ? <> Validando información</> : <> {clabeKuspit}</> }</p>

              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block absolute left-[40%] top-4 bottom-4 w-px bg-zinc-300 dark:bg-[#3b3d3f]"></div>


            {/* Info Derecha */}
            <div className="col-span-5 md:col-span-3">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">

                  <p className="text-sm text-titles dark:text-white font-montserrat_regular">
                    <span className="font-montserrat_bold">Correo:</span>  {email} </p>

                  <p className="text-sm text-titles dark:text-white font-montserrat_regular">
                    <span className="font-montserrat_bold">
                      {persona === 'fisica' || persona === "null" ? "Celular: " : "Teléfono: " }
                      </span> 
                      {celular} </p>

                  <p className="text-sm text-titles dark:text-white font-montserrat_regular">
                    <span className="font-montserrat_bold">Dirección:</span>   {direccion} </p>

                  <p className="text-sm text-titles dark:text-white font-montserrat_regular">
                  <span className="font-montserrat_bold">Tipo de persona: </span>
                  {persona === 'fisica' || persona === "null"  ? "Física" : "Moral" }
                  </p>

                  <p className="text-sm text-titles dark:text-white font-montserrat_regular">
                    <span className="font-montserrat_bold">
                      {persona === 'fisica' || persona === "null"  ? "Fecha de nacimiento: " : "Fecha de Constitución: " }
                      </span> 
                      {formatearFecha(fechanacimiento)}</p>
                </div>
            </div>
            
        </div>    
            
      </div>



      {/* Tarjeta con Pie chart Principal */}
      <div className="bg-white dark:bg-[#131919] rounded-xl p-4">

        <p className="font-montserrat_bold text-titles dark:text-white">Gráfica de ejemplo</p>

        <div className="grid grid-cols-2 gap-6 ">

          {/* Componente PIE CHART */}
          <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1 2xl:col-span-1">
            <SingleLevelPieChart data={chartData} />
          </div>
          {/* Elemento DERECHO info */}
          <div className="rounded-2xl border-1  border-zinc-200 col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1 2xl:col-span-1 pl-10 py-4 space-y-2 content-center">
            <p className="text-start text-titles dark:text-white font-montserrat_bold text-base mb-5">Información de la Cuenta</p>
            <p className="text-start text-titles dark:text-white font-montserrat_regular text-xs sm:text-xs md:text-sm lg:text-sm"><span className="font-montserrat_bold">Saldo Inicial:</span> $3,500.00</p>
            <p className="text-start text-titles dark:text-white font-montserrat_regular text-xs sm:text-xs md:text-sm lg:text-sm"><span className="font-montserrat_bold">Abonos:</span> $1,400.00</p>
            <p className="text-start text-titles dark:text-white font-montserrat_regular text-xs sm:text-xs md:text-sm lg:text-sm"><span className="font-montserrat_bold">Retiros:</span> $450.00</p>
            <p className="pb-2 text-start text-titles dark:text-white font-montserrat_regular text-xs sm:text-xs md:text-sm lg:text-sm"><span className="font-montserrat_bold">Inversiones:</span> $3,200.00</p>

            <Divider className="mr-auto my-4 w-[250px] h-[1px] bg-zinc-300 dark:bg-zinc-600 rounded-full" />

            <p className="text-start text-titles dark:text-white font-montserrat_regular text-xs sm:text-xs md:text-sm lg:text-sm">
              <span className="font-montserrat_bold">Saldo Final:</span> $8,500.14
            </p>
          </div>

        </div>
        




      </div>



      {/* Tarjetas con Charts */}
      <div className="grid grid-cols-1 ">        
        <div>
          <CircleCharts />
        </div>

      </div>






    </div>
  )
}

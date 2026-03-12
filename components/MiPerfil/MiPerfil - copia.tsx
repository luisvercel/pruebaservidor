"use client";
import CircleCharts from "@/components/ComponentesAxion/dashboard/CircleCharts";
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {

    setNombre(localStorage.getItem("nombreusuario_axnweb") + "");
    setPaterno(localStorage.getItem("paternog_axnweb") + "");
    setMaterno(localStorage.getItem("maternog_axnweb") + "");

    setIdInterno(localStorage.getItem("idinternog_axnweb") + "");

    setEmail(localStorage.getItem("email_axnweb") + "");
    setDireccion(localStorage.getItem("direccion_axnweb") + "");
    setCelular(localStorage.getItem("celular_axnweb") + "");
    setFechaNacimiento(localStorage.getItem("fechanacimiento_axnweb") + "");
    setIdContrato(localStorage.getItem("idcontrato_axnweb") + "");

  }, []);

  return (
    <div className="space-y-6">

      {/* Tarjetas con Charts */}
      <div className="grid grid-cols-1 mt-0 md:mt-0 lg:-mt-3 xl:-mt-3 2xl:-mt-3">
        <div>
          <CircleCharts />
        </div>

      </div>

      {/* Tarjeta Info 1 */}
      <div className="bg-white dark:bg-[#131919] rounded-xl ">
        <p className="p-4         
          h-[110px] 
          font-montserrat_bold 
          text-titles
          dark:text-white
          shadow-none
          //hover:shadow-[0_2px_30px_rgba(127,139,146,0.18)]
          //dark:hover:shadow-[0_2px_30px_rgba(255,255,255,0.37)]
          transition-shadow
          ">
          Información

          <br></br>
          <span className="text-[25px]">Nombre: {paterno} {materno}, {nombre}</span><br></br>
          <span className="text-[20px]">Id. Axion: {idinterno}</span><br></br>
          <span className="text-[20px]">No. Contrato: {idcontrato}</span><br></br>

          <span>Email: {email}</span><br></br>
          <span>Dirección: {direccion}</span><br></br>
          <span>Celular: {celular}</span><br></br>
          <span>Fecha de Nacimiento: {fechanacimiento}</span><br></br>

        </p>
      </div>

    </div>
  )
}

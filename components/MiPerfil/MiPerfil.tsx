"use client";
import CircleCharts from "@/components/ComponentesAxion/dashboard/CircleCharts";
import SingleLevelPieChart from "@/components/ComponentesAxion/dashboard/SingleLevelPieChart";
import {Card, CardHeader, CardBody, CardFooter, Link, Image, Chip, cn} from "@heroui/react";
import {Icon} from "@iconify/react";

import React, { useState, useEffect } from 'react';
import {Divider} from "@heroui/react";
import { formatearFecha } from "../Utilidades";




type TrendCardProps = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "neutral" | "negative";
  trendType: "up" | "neutral" | "down";
  trendChipPosition?: "top" | "bottom";
  trendChipVariant?: "flat" | "light";
};

const data: TrendCardProps[] = [  {
    title: "Saldo Total",
    value: "$228,451",
    change: "33%",
    changeType: "positive",
    trendType: "up",
  },
  {
    title: "Saldo Inicial",
    value: "$71,887",
    change: "13.0%",
    changeType: "negative",
    trendType: "up",
  },
  {
    title: "Abonos",
    value: "$156,540",
    change: "0.0%",
    changeType: "neutral",
    trendType: "neutral",
  },

];

const data2: TrendCardProps[] = [  {
    title: "Retiros",
    value: "$345,892",
    change: "12.5%",
    changeType: "positive",
    trendType: "up",
    trendChipVariant: "flat",
    trendChipPosition: "bottom",
  },
  {
    title: "Inversiones",
    value: "$98,234",
    change: "18.3%",
    changeType: "negative",
    trendType: "up",
    trendChipVariant: "flat",
    trendChipPosition: "bottom",
  },
  {
    title: "Saldo Final",
    value: "$247,658",
    change: "15.2%",
    changeType: "neutral",
    trendType: "neutral",
    trendChipVariant: "flat",
    trendChipPosition: "bottom",
  },

];



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




const TrendCard = ({
  title,
  value,
  change,
  changeType,
  trendType,
  trendChipPosition = "top",
  trendChipVariant = "light",
}: TrendCardProps) => {
  return (
    <Card className="bg-white dark:bg-[#2b2e30] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.025)]">
      <div className="flex p-4">
        <div className="flex flex-col gap-y-2">
          <dt className="text-small text-default-500 font-medium">{title}</dt>
          <dd className="text-default-700 text-2xl font-semibold">{value}</dd>
        </div>
        <Chip
          className={cn("absolute right-4", {
            "top-4": trendChipPosition === "top",
            "bottom-4": trendChipPosition === "bottom",
          })}
          classNames={{
            content: "font-medium text-[0.65rem]",
          }}
          color={
            changeType === "positive" ? "success" : changeType === "neutral" ? "warning" : "danger"
          }
          radius="sm"
          size="sm"
          startContent={
            trendType === "up" ? (
              <Icon height={12} icon={"solar:arrow-right-up-linear"} width={12} />
            ) : trendType === "neutral" ? (
              <Icon height={12} icon={"solar:arrow-right-linear"} width={12} />
            ) : (
              <Icon height={12} icon={"solar:arrow-right-down-linear"} width={12} />
            )
          }
          variant={trendChipVariant}
        >
          {change}
        </Chip>
      </div>
    </Card>
  );
};





  return (
    <div className="space-y-6 ">



      <div className="grid grid-cols-2 mt-0 md:mt-0 lg:-mt-3 xl:-mt-3 2xl:-mt-3 gap-4">
          


          <div className="bg-white dark:bg-[#2b2e30] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.025)] rounded-xl p-4 col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1">
                             

                {/* Mensaje de bienvenida */}                    
                  <p className="text-start text-titles dark:text-white text-xl font-montserrat_regular">
                    ¡Hola {nombre}!
                  </p>
                  <p className="text-start text-titles dark:text-white text-xs mt-4">
                    Tu saldo actual es de:
                  </p>
                  <p className="text-start font-montserrat_semibold text-3xl">
                    {idcontrato === "0" || idcontrato === "null"
                      ? <>Validando información</>
                      : <>$500,000.00</>}
                  </p>
        
  
              {/* TARJETA */}
                <div className="relative mt-8 mb-10 max-w-[440px] min-h-[230px]  bg-[#e0e3e4] dark:bg-[#495256] rounded-2xl p-4 overflow-hidden h-[250px] mx-auto">
                {/* Imagen de fondo tipo máscara MODO LIGHTH */}
                  <img
                    src="/imagenes/axn/dashboard/tarjeta_logo_background_light.png"
                    alt=""
                    className="
                      absolute
                      right-40
                      -top-3
                      w-[500px]
                      opacity-20
                      pointer-events-none
                      block
                      dark:hidden
                    "
                  />
                {/* Imagen de fondo tipo máscara MODO DARK */}
                  <img
                      src="/imagenes/axn/dashboard/tarjeta_logo_background_dark.png"
                      alt=""
                      className="
                        absolute
                        right-40
                        -top-3
                        w-[500px]
                        opacity-20
                        pointer-events-none
                        hidden 
                        dark:block                        
                      "
                    />

                  {/* LOGO superior izquierdo */}
                    {/* Logo modo claro */}
                    <img
                      src="/imagenes/logo_axn_dark.png"
                      alt="Axion logo"
                      className="w-[100px] block dark:hidden mb-8"
                    />

                    {/* Logo modo oscuro */}
                    <img
                      src="/imagenes/logo_axn.png"
                      alt="Axion logo"
                      className="w-[100px] hidden dark:block mb-8"
                    />

                  {/* Contenido */}
                  <div className="relative z-10">
                    <p className="text-lg text-titles dark:text-[#b7c6cf] font-montserrat_semibold text-gray-900">
                      {paterno} {materno} {nombre}
                    </p>

                    <p className="text-xs text-gray-800 mt-2 text-titles dark:text-[#b7c6cf]">
                      ****
                    </p>

                    <p className="text-xs text-titles dark:text-[#b7c6cf] font-montserrat_regular"><span className="font-montserrat_bold">ID Axion:</span> {idinterno}
                    </p>

                    <p className="text-xs text-titles dark:text-[#b7c6cf] font-montserrat_regular"><span className="font-montserrat_bold">CLABE Axion:</span>  {idcontrato === "0" || idcontrato === "null" ? <> Validando información</> : <> {clabeKuspit}</> }</p>

                    <p className="text-xs  text-titles dark:text-[#b7c6cf] font-montserrat_regular"><span className="font-montserrat_bold">No. de Contrato:</span> 
                    {idcontrato === "0" || idcontrato === "null" ? <> Validando información</> : <> {idcontrato}</> }
                    </p>

                    <p className="text-xs  text-titles dark:text-[#b7c6cf] font-montserrat_regular"><span className="font-montserrat_bold">Fecha de registro: </span> 
                    { formatearFecha( fechaRegistro )}
                    </p>

                  </div>

                </div>

          </div>




          <div className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 grid grid-rows-2 gap-4">


              {/* Tarjeta Mis Datos */}
                <Card className="shadow-[0_20px_25px_-5px_rgba(0,0,0,0.025)] bg-white dark:bg-[#2b2e30]">
                  <CardHeader className="flex gap-3 bg-[#e0e3e4] dark:bg-[#495256] p-4">
                    <div className="flex flex-col">
                      <p className="text-xs text-start font-montserrat_medium text-titles dark:text-white">
                        Mis Datos
                      </p>
                    </div>
                  </CardHeader>

                  <CardBody className="p-4 space-y-3">
                    {/* Correo */}
                    <div className="flex items-start gap-3">
                      <img
                        src="/imagenes/axn/icons/dashboard/email.svg"
                        alt="correo"
                        className="w-5 h-5 mt-[2px]"
                      />
                      <p className="text-sm text-titles dark:text-white font-montserrat_regular">
                        <span className="font-montserrat_bold">Correo:</span> {email}
                      </p>
                    </div>
                    {/* Teléfono */}
                    <div className="flex items-start gap-3">
                      <img
                        src="/imagenes/axn/icons/dashboard/phone.svg"
                        alt="telefono"
                        className="w-5 h-5 mt-[2px]"
                      />
                      <p className="text-sm text-titles dark:text-white font-montserrat_regular">
                        <span className="font-montserrat_bold">
                          {persona === 'fisica' || persona === "null" ? "Celular: " : "Teléfono: "}
                        </span>
                        {celular}
                      </p>
                    </div>
                    {/* Dirección */}
                    <div className="flex items-start gap-3">
                      <img
                        src="/imagenes/axn/icons/dashboard/location.svg"
                        alt="direccion"
                        className="w-5 h-5 mt-[2px]"
                      />
                      <p className="text-sm text-titles dark:text-white font-montserrat_regular">
                        <span className="font-montserrat_bold">Dirección:</span> {direccion}
                      </p>
                    </div>
                    {/* Tipo de persona */}
                    <div className="flex items-start gap-3">
                      <img
                        src="/imagenes/axn/icons/dashboard/user.svg"
                        alt="tipo persona"
                        className="w-5 h-5 mt-[2px]"
                      />
                      <p className="text-sm text-titles dark:text-white font-montserrat_regular">
                        <span className="font-montserrat_bold">Tipo de persona:</span>
                        {persona === 'fisica' || persona === "null" ? " Física" : " Moral"}
                      </p>
                    </div>
                    {/* Fecha */}
                    <div className="flex items-start gap-3">
                      <img
                        src="/imagenes/axn/icons/dashboard/calendar.svg"
                        alt="fecha"
                        className="w-5 h-5 mt-[2px]"
                      />
                      <p className="text-sm text-titles dark:text-white font-montserrat_regular">
                        <span className="font-montserrat_bold">
                          {persona === 'fisica' || persona === "null"
                            ? "Fecha de nacimiento:"
                            : "Fecha de Constitución:"}
                        </span>
                        {formatearFecha(fechanacimiento)}
                      </p>
                    </div>
                  </CardBody>
                </Card>


              {/* Tarjeta Últimos Movimientos */}
                <Card className="shadow-[0_20px_25px_-5px_rgba(0,0,0,0.025)] bg-white dark:bg-[#2b2e30]">
                  
                  <CardHeader className="flex gap-3 bg-[#e0e3e4] dark:bg-[#495256]">
                    <div className="flex flex-col">
                      <p className="text-xs text-start font-montserrat_medium">
                        Últimos Movimientos
                      </p>
                    </div>
                  </CardHeader>

                  <CardBody className="space-y-3">

                    {/* Movimiento 1 */}
                    <div className="grid grid-cols-7 gap-2">

                        <div className="col-span-1 flex items-center justify-center">
                            {/* Icono modo light */}
                            <img
                              src="/imagenes/axn/icons/dashboard/icono_generico_transfer.svg"
                              alt="icon"
                              className="w-[40px] h-[40px] block dark:hidden"
                            />

                            {/* Icono modo dark */}
                            <img
                              src="/imagenes/axn/icons/dashboard/icono_generico_transfer_dark.svg"
                              alt="icon"
                              className="w-[40px] h-[40px] hidden dark:block"
                            />
                        </div>

                      <div className="col-span-4 flex flex-col justify-center">
                        <p className="text-start text-titles dark:text-white text-sm font-montserrat_bold">
                          Retiro de efectivo
                        </p>
                        <p className="text-start text-[#a0a8ad] text-xs font-montserrat_regular">
                          13/05/26 - 12:15:46 hrs.
                        </p>
                      </div>

                      <div className="col-span-2 flex flex-col items-center justify-center gap-1">
                        <p className="text-center text-titles dark:text-white text-sm font-montserrat_bold">
                          $1,355.35
                        </p>

                        <div className="bg-green-100 rounded-2xl w-[80px] flex items-center justify-center gap-1">
                          <div className="w-[6px] h-[6px] bg-green-500 rounded-full"></div>
                          <p className="text-center text-green-600 text-[10px] font-montserrat_medium">
                            Exitoso
                          </p>
                        </div>
                      </div>

                    </div>

                    <Divider className="my-2"/>


                    {/* Movimiento 2 */}
                    <div className="grid grid-cols-7 gap-2">

                         <div className="col-span-1 flex items-center justify-center">
                            {/* Icono modo light */}
                            <img
                              src="/imagenes/axn/icons/dashboard/icono_generico_transfer.svg"
                              alt="icon"
                              className="w-[40px] h-[40px] block dark:hidden"
                            />

                            {/* Icono modo dark */}
                            <img
                              src="/imagenes/axn/icons/dashboard/icono_generico_transfer_dark.svg"
                              alt="icon"
                              className="w-[40px] h-[40px] hidden dark:block"
                            />
                        </div>


                      <div className="col-span-4 flex flex-col justify-center">
                        <p className="text-start text-titles dark:text-white text-sm font-montserrat_bold">
                          Retiro de efectivo
                        </p>
                        <p className="text-start text-[#a0a8ad] text-xs font-montserrat_regular">
                          16/05/26 - 14:22:12 hrs.
                        </p>
                      </div>

                      <div className="col-span-2 flex flex-col items-center justify-center gap-1">
                        <p className="text-center text-titles dark:text-white text-sm font-montserrat_bold">
                          $2,000.00
                        </p>

                        <div className="bg-red-100 rounded-2xl w-[80px] flex items-center justify-center gap-1">
                          <div className="w-[6px] h-[6px] bg-red-500 rounded-full"></div>
                          <p className="text-center text-red-600 text-[10px] font-montserrat_medium">
                            Rechazado
                          </p>
                        </div>
                      </div>

                    </div>

                    <Divider className="my-2"/>


                    {/* Movimiento 3 */}
                    <div className="grid grid-cols-7 gap-2">

                        <div className="col-span-1 flex items-center justify-center">
                            {/* Icono modo light */}
                            <img
                              src="/imagenes/axn/icons/dashboard/icono_generico_transfer.svg"
                              alt="icon"
                              className="w-[40px] h-[40px] block dark:hidden"
                            />

                            {/* Icono modo dark */}
                            <img
                              src="/imagenes/axn/icons/dashboard/icono_generico_transfer_dark.svg"
                              alt="icon"
                              className="w-[40px] h-[40px] hidden dark:block"
                            />
                        </div>

                      <div className="col-span-4 flex flex-col justify-center">
                        <p className="text-start text-titles dark:text-white text-sm font-montserrat_bold">
                          Abono
                        </p>
                        <p className="text-start text-[#a0a8ad] text-xs font-montserrat_regular">
                          20/06/26 - 10:10:12 hrs.
                        </p>
                      </div>

                      <div className="col-span-2 flex flex-col items-center justify-center gap-1">
                        <p className="text-center text-titles dark:text-white text-sm font-montserrat_bold">
                          $4,500.00
                        </p>

                        <div className="bg-green-100 rounded-2xl w-[80px] flex items-center justify-center gap-1">
                          <div className="w-[6px] h-[6px] bg-green-500 rounded-full"></div>
                          <p className="text-center text-green-600 text-[10px] font-montserrat_medium">
                            Exitoso
                          </p>
                        </div>
                      </div>

                    </div>

                  </CardBody>
                </Card>



          </div>

      </div>




          {/* Tarjeta Info 1 */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

            <Card className="shadow-[0_20px_25px_-5px_rgba(0,0,0,0.025)] bg-white dark:bg-[#2b2e30] col-span-1">
              
              <CardHeader className="flex gap-3 bg-[#e0e3e4] dark:bg-[#495256] p-4">
                <div className="flex flex-col">
                  <p className="text-xs text-start font-montserrat_medium text-titles dark:text-white">
                    Mi Balance
                  </p>
                </div>
              </CardHeader>

              <CardBody className="p-4 space-y-3">         
                <SingleLevelPieChart data={chartData} />                  
              </CardBody>

            </Card>


            <dl className="grid grid-cols-2 gap-5 w-full">
              {data.map((props, index) => (
                <TrendCard key={`d1-${index}`} {...props} />
              ))}
              {data2.map((props, index) => (
                <TrendCard key={`d2-${index}`} {...props} />
              ))}
            </dl>

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

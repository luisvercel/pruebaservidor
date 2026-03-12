"use client";
import { Accordion, AccordionItem, Button } from "@heroui/react";
import React, { useState, useEffect } from 'react';
import { Card, Chip, cn } from "@heroui/react";
import { Icon } from "@iconify/react";
import { SubirDocumentoModal } from "../MiPerfil/SubirDoumentoModal";
import config from "../../config/config";
import { CalendarioRange } from "@/components/ComponentesAxion/contratos/RangeCalendar";

type TrendCardProps = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "neutral" | "negative";
  trendType: "up" | "neutral" | "down";
};

const cardsData: TrendCardProps[] = [
  {
    title: "Contratos Activos",
    value: "24",
    change: "12%",
    changeType: "positive",
    trendType: "up",
  },
  {
    title: "Contratos Firmados",
    value: "120",
    change: "8%",
    changeType: "positive",
    trendType: "up",
  },
  {
    title: "Contratos Pendientes",
    value: "6",
    change: "0%",
    changeType: "neutral",
    trendType: "neutral",
  },
  {
    title: "Contratos Vencidos",
    value: "3",
    change: "5%",
    changeType: "negative",
    trendType: "down",
  },
  {
    title: "Contratos Totales",
    value: "153",
    change: "10%",
    changeType: "positive",
    trendType: "up",
  },
];

interface Documentos {
  estatus: number;
  nombredocumento: string;
}

const TrendCard = ({
  title,
  value,
  change,
  changeType,
  trendType,
}: TrendCardProps) => {

  return (
    <Card className="relative bg-white dark:bg-[#131919] rounded-xl border border-transparent shadow-none p-4">
      <dt className="md:text-sm lg:text-xs xl:text-sm 2xl:text-sm text-default-500 font-montserrat_regular lg:max-w-[90px] xl:max-w-[90px] 2xl:max-w-[200px]">
        {title}
      </dt>
      <dd className="text-2xl font-montserrat_bold text-titles dark:text-white">
        {value}
      </dd>

      <Chip
        className="absolute top-4 right-4"
        classNames={{ content: "font-montserrat_semibold text-xs lg:text-[0.65rem] xl:text-xs" }}
        color={
          changeType === "positive"
            ? "success"
            : changeType === "neutral"
              ? "warning"
              : "danger"
        }
        radius="sm"
        size="sm"
        startContent={
          trendType === "up" ? (
            <Icon width={12} height={12} icon="solar:arrow-right-up-linear" />
          ) : trendType === "neutral" ? (
            <Icon width={12} height={12} icon="solar:arrow-right-linear" />
          ) : (
            <Icon width={12} height={12} icon="solar:arrow-right-down-linear" />
          )
        }
        variant="light"
      >
        {change}
      </Chip>
    </Card>
  );
};

export const MisContratosDigitales = () => {

  const [verModal, setVerModal] = useState(false);
  const [documentos, setDocumentos] = useState<Documentos[]>([]);

  const [nombre, setNombre] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");
  const [fechanacimiento, setFechaNacimiento] = useState("");
  const [idinterno, setIdInterno] = useState("");
  const [idcontrato, setIdContrato] = useState("");
  const [iddocumento, setIdDocumento] = useState("");
  const [nombredocumento, setNombreDocumento] = useState("");

  const [statusComprobanteDomiclio, setStatusComprobanteDomiclio] = useState( "*" );
  const [statusEstadoDeCuenta, setStatusEstadoDeCuenta] = useState( "*" );
  const [statusIdentificacionFrente, setStatusIdentificacionFrente] = useState( "*" );
  const [statusIdentificacionReverso, setStatusIdentificacionReverso] = useState( "*" );
  const [statusCURP, setStatusCURP] = useState( "*" );
  const [statusRFC, setStatusRFC] = useState( "*" );

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

    console.log(localStorage.getItem("token_axnweb"));
    console.log(localStorage.getItem("fechanacimiento_axnweb"));

    getDocumentos();

    getEstatusDocumento( "Comprobante domicilio" );

  }, []);

  const getDocumentos = async () => {

    const datasend = JSON.stringify({
      uuid: localStorage.getItem("uuidg_axnweb")
    });

    console.log(datasend);

    try {
      const response = await fetch(config.baseUrlAPI + "fisicas/estatus/documentos", {
        method: "POST",
        body: datasend,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      console.log("=> ", result);
      setDocumentos(result);

    } catch (error) {
      console.error(error);
    }
  };

  const getEstatusDocumento = (nombre: any) => {

    for (let i = 0; i < documentos.length; i++) {
      if (documentos[i].nombredocumento === nombre) {
        switch (documentos[i].estatus) {
          case 1: return "En revisión"; 
          case 2: return "No aprobado, volver a subir"; 
          default: return "Subida pendiente";
        }
      }
    }
    
    return "Subida pendiente";
  }

  const actualizarstatusdocumento = ( nombre:any ) => {
    switch( nombre ){
      case "Comprobante domicilio": setStatusComprobanteDomiclio( "En revisión" ); break;
      case "Estado de cuenta": setStatusEstadoDeCuenta( "En revisión" ); break;
      case "Identificación frente": setStatusIdentificacionFrente( "En revisión" ); break;
      case "Identificación reverso": setStatusIdentificacionReverso( "En revisión" ); break;
      case "CURP": setStatusCURP( "En revisión" ); break;
      case "RFC": setStatusRFC( "En revisión" ); break;
    }
  }

  return (
    <div className="space-y-6">

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {cardsData.map((card, index) => (
          <TrendCard key={index} {...card} />
        ))}
      </div>


      {/* Info 2 */}
      <div className="grid grid-cols-6 gap-5">

        <div className="col-span-2 sm:col-span-3 md:col-span-3 lg:col-span-2 xl:col-span-2 2xl:col-span-2 bg-white dark:bg-[#131919] rounded-xl">
          <p className="p-4 h-[110px] font-montserrat_bold text-titles dark:text-white">
            Información 6
          </p>
        </div>

        <div className="col-span-2 sm:col-span-3 md:col-span-3 lg:col-span-2 xl:col-span-2 2xl:col-span-2 bg-white dark:bg-[#131919]  rounded-xl">
          <p className="p-4 h-[110px] font-montserrat_bold text-titles dark:text-white">
            Información 7
          </p>
        </div>

        <div className="col-span-2 sm:col-span-6 md:col-span-6 lg:col-span-2 xl:col-span-2 2xl:col-span-2 bg-white dark:bg-[#131919]  rounded-xl">
          <p className="p-4 h-[110px] font-montserrat_bold text-titles dark:text-white">
            Información 8
          </p>
        </div>



      </div>

      {/* Calendario */}
            <div className="grid grid-cols-6 gap-5">
      
              <div className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3 bg-white dark:bg-[#131919] rounded-xl">
                <div className="p-4 flex justify-center items-center">
                <CalendarioRange />
                </div>
              </div>
      
      
              <div className="col-span-6 sm:col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3 bg-white dark:bg-[#131919]  rounded-xl">
                <p className="p-4 h-[110px] font-montserrat_bold text-titles dark:text-white">
                Información 7
                </p>
              </div>
           
      
            </div>


      {/* Info 3 */}
      <div className="bg-white dark:bg-[#131919] rounded-xl">
        <p className="p-4 h-[110px] font-montserrat_bold text-titles dark:text-white">
          <span className="text-[20px]">Id. Axion: {idinterno}</span><br></br>
          <span className="text-[20px]">No. Contrato: {idcontrato}</span><br></br>
          {idcontrato === '0' ? 
          <span className="text-danger">Contrato en revisión, aún no puede subir documentos</span>
          :null}
        </p>

        <div className="text-[18px]">

          {verModal ?
            <SubirDocumentoModal openvalue={true} setCambiarImagenPerfilView={setVerModal} setImgPerfil={null} iddocumento={iddocumento} nombredocumento={nombredocumento} actualizarstatusdocumento={actualizarstatusdocumento}></SubirDocumentoModal>
            : null}

          <p>Comprobante domicilio:</p>

          {statusComprobanteDomiclio === '*' ?
            <>
              Estatus: {getEstatusDocumento("Comprobante domicilio")} </> :
            <>Estatus*: {statusComprobanteDomiclio}
            </>
          }
          <br></br>

          {idcontrato != '0' ?
             
          <Button isDisabled={ getEstatusDocumento("Comprobante domicilio") === 'En revisión' || statusComprobanteDomiclio === 'En revisión' ? true:false } color="secondary" 
          onPress={() => { verModal ? setVerModal(false) : setVerModal(true), setIdDocumento("1"), setNombreDocumento("Comprobante domicilio") }}>Subir</Button>

          :null}

          <p><br></br>Estado de cuenta</p>
          {statusEstadoDeCuenta=== '*' ?
            <>
              Estatus: {getEstatusDocumento("Estado de cuenta")} </> :
            <>Estatus*: {statusEstadoDeCuenta}
            </>
          }
          <br></br>

          
          {idcontrato != '0' ?
             
          <Button isDisabled={ getEstatusDocumento("Estado de cuenta") === 'En revisión' || statusEstadoDeCuenta === 'En revisión' ? true:false } color="secondary" 
          onPress={() => { verModal ? setVerModal(false) : setVerModal(true), setIdDocumento("2"), setNombreDocumento("Estado de cuenta") }}>Subir</Button>

          :null}

          <p><br></br>Identificación frente</p>
          {statusIdentificacionFrente === '*' ?
            <>
              Estatus: {getEstatusDocumento("Identificación frente")} </> :
            <>Estatus*: {statusIdentificacionFrente}
            </>
          }
          <br></br>

          {idcontrato != '0' ?
             
          <Button isDisabled={ getEstatusDocumento("Identificación frente") === 'En revisión' || statusIdentificacionFrente === 'En revisión'? true:false } color="secondary" 
          onPress={() => { verModal ? setVerModal(false) : setVerModal(true), setIdDocumento("3"), setNombreDocumento("Identificación frente") }}>Subir</Button>

          :null}

          <p><br></br>Identificación reverso</p>

          {statusIdentificacionReverso === '*' ?
            <>
              Estatus: {getEstatusDocumento("Identificación reverso")} </> :
            <>Estatus*: {statusIdentificacionReverso}
            </>
          }
          <br></br>
          
          {idcontrato != '0' ?
             
          <Button isDisabled={ getEstatusDocumento("Identificación reverso") === 'En revisión' || statusIdentificacionReverso === 'En revisión'? true:false } color="secondary" 
          onPress={() => { verModal ? setVerModal(false) : setVerModal(true), setIdDocumento("4"), setNombreDocumento("Identificación reverso") }}>Subir</Button>

          :null}

          <p><br></br>CURP</p>
          {statusCURP === '*' ?
            <>
              Estatus: {getEstatusDocumento("CURP")} </> :
            <>Estatus*: {statusCURP}
            </>
          }
          <br></br>
          {idcontrato != '0' ?
             
          <Button isDisabled={ getEstatusDocumento("CURP") === 'En revisión' || statusCURP === 'En revisión'? true:false} color="secondary" 
          onPress={() => { verModal ? setVerModal(false) : setVerModal(true), setIdDocumento("5"), setNombreDocumento("CURP") }}>Subir</Button>

          :null}

          <p><br></br>RFC</p>
          {statusRFC === '*' ?
            <>
              Estatus: {getEstatusDocumento("RFC")} </> :
            <>Estatus*: {statusRFC}
            </>
          }
          <br></br>
          {idcontrato != '0' ?
             
          <Button isDisabled={ getEstatusDocumento("RFC") === 'En revisión' || statusRFC === 'En revisión' ? true:false } color="secondary" 
          onPress={() => { verModal ? setVerModal(false) : setVerModal(true), setIdDocumento("6"), setNombreDocumento("RFC") }}>Subir</Button>

          :null}

        </div>

      </div>


      <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Comprobante de domicilio">
          Estatus: Subida pendiente<br></br>
          <Button color="secondary" onPress={() => verModal ? setVerModal(false) : setVerModal(true)}>Subir</Button>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          Información Archivo
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          Información Archivo
        </AccordionItem>
      </Accordion>

    </div>
  );
};

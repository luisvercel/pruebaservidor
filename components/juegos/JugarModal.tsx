"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import config from "../../config/config";
import dynamic from 'next/dynamic'
import { formatearMiles } from '../Utilidades';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select,
    SelectItem,
    Checkbox
} from "@heroui/react";

import { formatearFechaDia } from '../Utilidades';
import { normalizeText } from '../Utilidades';
import { LoginCheck } from '../LoginCheck';

// Define las props del componente CountdownTimer
interface CountdownProps {
    targetDate: string
}

const CountdownTimer = dynamic<CountdownProps>(() =>
    import('../contador/Contador').then(mod => mod.default),
    { ssr: false }
);

export const ApostarModal = ({ openvalue, setView, partidoactual, fetchSlides }: any) => {

    const { onOpenChange } = useDisclosure();
    const [errordata, setErrorData] = useState(false);
    const [errormsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [openvaluemodal, setOpenValueModal] = useState(openvalue);
    const [sld, setSld] = useState( "0" );
    const [monto, setMonto] = useState( "0" );
    const [msgproceso, setMsgProceso] = useState( "" );

    const[ganador, setGanador] = useState( "" );
    const[goles, setGoles] = useState( "" );
    const[ambosanotan, setAmbosAnotan] = useState( "" );
    const[minutoprimergol, setMinutoPrimerGol] = useState( "" );
    const[publica, setPublica] = useState( "1" );

    const router = useRouter();

    useEffect(() => {  

        setSld( localStorage.getItem( "sld_csn" ) || "0" );
        if( parseFloat(localStorage.getItem( "sld_csn" ) || "0") > 10 ) setMonto( "10" );

    }, []);

    const seleccionAleatoria = () => {

        let num;
        
        //Ganador:
        num = Math.floor( Math.random()* (4 - 1) + 1 );
        switch( num ){
            case 1: setGanador( "local" ); break;
            case 2: setGanador( "visitante" ); break;
            case 3: setGanador( "empate" ); break;
        }

        num = Math.floor( Math.random()* (3 - 1) + 1 );
        switch( num ){
            case 1: setGoles( "2.5+" ); break;
            case 2: setGoles( "-2.5" ); break;
        }

        num = Math.floor( Math.random()* (3 - 1) + 1 );
        switch( num ){
            case 1: setAmbosAnotan( "Si" ); break;
            case 2: setAmbosAnotan( "No" ); break;
        }

        num = Math.floor( Math.random()* (7 - 1) + 1 );
        switch( num ){
            case 1: setMinutoPrimerGol( "0-14" ); break;
            case 2: setMinutoPrimerGol( "15-30" ); break;
            case 3: setMinutoPrimerGol( "31-45" ); break;
            case 4: setMinutoPrimerGol( "46-60" ); break;
            case 5: setMinutoPrimerGol( "61-75" ); break;
            case 6: setMinutoPrimerGol( "76-90" ); break;
        }

    }
    
    const limpiarSeleccion = () => {
        setGanador( "" );
        setGoles( "" );
        setAmbosAnotan( "" );
        setMinutoPrimerGol( "" );
    }

    const jugar = async () => {

        setMsgProceso( "" );

        if( parseFloat( sld ) < 10 ) return;

        //setLoading(true);

        if( !LoginCheck() ) return false;

        const datasend = JSON.stringify({
            token: localStorage.getItem("tokeng_csn"),
            NOMBREUSUARIO: localStorage.getItem("nombreusuario_axnweb"),
            IDUSUARIO: localStorage.getItem("idusuariog_csn"),
            IDPARTIDO: partidoactual.infopartido.ID,
            GANADOR: ganador,
            GOLES: goles,
            AMBOSANOTAN: ambosanotan,
            MINUTOPRIMERGOL: minutoprimergol,
            PUBLICA: publica,
        });

        console.log( datasend );
        //return;

        const baseURL = config.baseUrlAPI + "partidos/apostar";

        console.log(datasend);

        try {
            const response = await fetch(baseURL, {
                method: "POST",
                body: datasend,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json(); // No especificamos el tipo todavía

            console.log(result);

            if (result.auth) {

                if (result.auth === "ERRORNEW" || result.auth === "ERRORTOKEN")
                {
                    return false;
                }
                if (result.auth === "OKPROCCES") {

                    //console.log( "Apuesta colocada", result.APUESTAINFO.SLDNEW );
                    if( result.APUESTAINFO ){
                        localStorage.setItem( "sld_csn", result.APUESTAINFO.SLDNEW + "" || "0" );
                        setMsgProceso( "Su juego fue colocado: " + ganador.substring(0,1).toUpperCase() + " / " + goles + " / " + ambosanotan.substring(0,1) + " / " + minutoprimergol  );
                        //setView( false );
                        fetchSlides();
                    }else{
                        setMsgProceso( "ERROR!!! Su juego NO fue colocado. Ya cuenta con un juego en este partido con el equipo seleccionado." );
                    }                    

                }
                
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }

        setGanador("");
        setGoles("");
        setAmbosAnotan("");
        setMinutoPrimerGol("");

        setLoading(false);

    }

    return (
        <>

            <Modal
                isOpen={openvaluemodal}
                onOpenChange={onOpenChange}
                placement="top-center"
                hideCloseButton={true}
                size='5xl'
                className='bg-[#19181F] opacity-90'
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-white text-center">Quiniela</ModalHeader>

                            <hr className='color-white'></hr>

                            <ModalBody>

                                <div className={`grid grid-cols-1 md:grid-cols-1 gap-4 text-white`}>

                                    {/* Contenido */}

                                    {/* <div className="p-4 rounded-2xl bg-cover bg-center bg-no-repeat bg-[url('../public/imagenes/card_background.png')] flex grid-cols-3 content-center gap-2 justify-center shadow-[0_10px_30px_rgba(42,13,119,0.5)]"> */}
                                    <div className="p-4 rounded-2xl flex grid-cols-3 content-center gap-2 justify-center">

                                        {/* Logo equipo 1 */}
                                        <div className='content-center'>
                                            {partidoactual.infopartido.LOCAL != '' ?
                                                <img
                                                     className={
                                                        'w-[75px] sm:w-[125px] md:w-[140px] lg:w-[160px] xl:w-[170px] 2xl:w-[210px]'
                                                    }
                                                    src={config.baseUrlIMG + "imagenes/equipos/purple/" + normalizeText(partidoactual.infopartido.LOCAL) + ".svg"}
                                                    alt=" "
                                                />
                                                : null}
                                        </div>
                                        {/* Fin Logo equipo 1 */}
                                        <div className=' grid grid-cols-4 grid-rows-5 p-2'>
                                            {/* Logo liga BBVA */}
                                            <div className='col-span-4 content-start justify-self-center mb-4'>
                                                <img
                                                    className='w-[68px] sm:w-[115px] md:w-[112px] lg:w-[122px] xl:w-[132px] 2xl:w-[140px]'
                                                    src={config.baseUrlIMG + "imagenes/logo_liga_bbva.png"}
                                                    alt=" "
                                                />
                                            </div>
                                            {/* fin Logo liga BBVA */}
                                            {/* nombre de equipos */}
                                            <div className='col-span-4 content-center -mt-4'>
                                                <div className='grid grid-cols-3'>
                                                    <div className='content-center'>
                                                        <p className='font-montserrat_bold text-white text-end text-[17px] sm:text-[18px] md:text-md lg:text-2xl xl:text-3xl 2xl:text-[33px]'>{partidoactual.infopartido.LOCAL}</p>
                                                    </div>
                                                    {/* imagen vs */}
                                                    <div className='content-center justify-self-center'>
                                                        <img
                                                            className='w-[28px] sm:w-[35px] md:w-[40px] lg:w-[48px] xl:w-[55px] 2xl:w-[62px]'
                                                            src={config.baseUrlIMG + "imagenes/versus_icon.svg"}
                                                            alt="logo versus"
                                                        />
                                                    </div>
                                                    {/* fin imagen vs */}
                                                    <div className='content-center'>
                                                        <p className='font-montserrat_bold text-white text-start text-[17px] sm:text-[18px] md:text-md lg:text-2xl xl:text-3xl 2xl:text-[33px]'>{partidoactual.infopartido.VISITANTE}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* fin nombre de equipos */}
                                            {/* Fecha */}
                                            <div className='col-span-4 mb-10 -mt-1'>
                                                <p className='font-montserrat_regular text-white text-center text-[11px] sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base'>
                                                    {formatearFechaDia(partidoactual.infopartido.FECHA)}
                                                </p>
                                            </div>
                                            {/* fin de Fecha */}

                                            <div className='col-span-4 justify-self-center -mt-8'>
                                                <p className='text-center text-white font-montserrat_semibold text-[10px] sm:text-[10px] md:text-[12px] lg:text-[12px] xl:text-[12px] 2xl:text-[12px] py-1'>Faltan:</p>
                                                <div className='mt-3'>
                                                    <div className="w-85 sm:w-85 md:w-50 lg:w-60 xl:w-80 2xl:w-80 2xl:h-20 border border-gray-300 px-8 flex items-center justify-center">
                                                        <CountdownTimer targetDate={partidoactual.infopartido.FECHA} />
                                                    </div>
                                                    {/* <div className='text-white'>Selecciona o ingresa el monto que quieres jugar</div> */}
                                                </div>
                                            </div>
                                            {/* {parseFloat( sld ) >= 10 ? 
                                            <div className='col-span-4 content-center'>

                                                {msgproceso != '' ? 
                                                    <div className='text-danger text-center'>{msgproceso}</div>
                                                    :null}

                                                <p className='text-white text-center font-montserrat_semibold text-sm sm:text-sm md:text-md lg:text-base xl:text-base 2xl:text-base md:mt-2 lg:mt-4 xl:mt-7 2xl:mt-7'>
                                                    Selecciona o ingresa el monto que quieres jugar:
                                                    <div className='flex pl-[25%] pr-[25%]'>
                                                        <Input
                                                            placeholder={monto}
                                                            startContent={
                                                                <div className="pointer-events-none flex items-center">
                                                                    <span className="text-default-400 text-small">$</span>
                                                                </div>
                                                            }
                                                            type="number"
                                                            value={monto}
                                                            onChange={(e: any) => setMonto(e.target.value)}
                                                            min={10}
                                                            max={sld}
                                                        />
                                                    </div>
                                                </p>
                                            </div>
                                            :null } */}
                                        </div>

                                        {/* Logo equipo 2 */}
                                        <div className='content-center'>
                                            {partidoactual.infopartido.VISITANTE != '' ?
                                                <img
                                                    className={ 
                                                        'w-[75px] sm:w-[125px] md:w-[140px] lg:w-[160px] xl:w-[170px] 2xl:w-[210px]'
                                                    }
                                                    src={config.baseUrlIMG + "imagenes/equipos/purple/" + normalizeText(partidoactual.infopartido.VISITANTE) + ".svg"}
                                                    alt=" "
                                                />
                                                : null}
                                        </div>
                                        {/* Fin Logo equipo 2 */}

                                    </div>

                                </div>

                                {errordata && (
                                    <div className="flex py-2 px-1 justify-between text-sm text-red-500">{errormsg}</div>
                                )}

                            </ModalBody>

                            {!loading ?

                                <div className='justify-center items-center'>
                                    <div className=''>

                                        {msgproceso === '' ?
                                        <>
                                        
                                        <div className="flex gap-4 items-center p-5 mt-[-8%]">
                                            <Select className="max-w-xs" label="¿Quién gana este partido?" 
                                            onChange={(e)=>setGanador(e.target.value )}
                                            selectedKeys={[""+ganador]}>
                                                <SelectItem key="local">{partidoactual.infopartido.LOCAL}</SelectItem>
                                                <SelectItem key="visitante">{partidoactual.infopartido.VISITANTE}</SelectItem>
                                                <SelectItem key="empate">Empate</SelectItem>
                                            </Select>
                                            <Select className="max-w-xs" label="¿Goles en este partido?" 
                                            onChange={(e)=>setGoles(e.target.value )}
                                            selectedKeys={[""+goles]}>
                                                <SelectItem key="2.5+">2.5 o más</SelectItem>
                                                <SelectItem key="-2.5">Menos de 2.5</SelectItem>
                                            </Select>
                                            <Select className="max-w-xs" label="¿Ambos equipos anotan?" 
                                            onChange={(e)=>setAmbosAnotan(e.target.value )}
                                            selectedKeys={[""+ambosanotan]}>
                                                <SelectItem key="Si">Sí</SelectItem>
                                                <SelectItem key="No">No</SelectItem>
                                            </Select>
                                            <Select className="max-w-xs" label="¿Minuto del primer gol?" 
                                            onChange={(e)=>setMinutoPrimerGol(e.target.value )}
                                            selectedKeys={[""+minutoprimergol]}>
                                                <SelectItem key="0-14">0-14</SelectItem>
                                                <SelectItem key="15-30">15-30</SelectItem>
                                                <SelectItem key="31-45">31-45</SelectItem>
                                                <SelectItem key="46-60">46-60</SelectItem>
                                                <SelectItem key="61-75">61-75</SelectItem>
                                                <SelectItem key="76-90">76-90</SelectItem>
                                            </Select>
                                        </div>

                                        
                                        <div className='flex justify-center items-center'>                                            

                                            <Button radius="full"
                                                variant="flat"
                                                color='danger'
                                                className='bg-danger dark:bg-[#9130F4] dark:hover:bg-[#6220BD] hover:bg-danger-300 px-7 text-white opacity-100' onPress={() => { setOpenValueModal(false), setErrorData(false), setView(false) }}>
                                                <p className='font-montserrat_semibold '>CANCELAR</p>
                                            </Button>

                                            <span className='pl-5'> </span>

                                            <Button radius="full"
                                                variant="flat"
                                                color='warning'
                                                className='bg-warning dark:bg-warning dark:hover:bg-[#6220BD] hover:bg-warning-300 px-7 text-white opacity-100' onPress={() => { seleccionAleatoria() }}>
                                                <p className='font-montserrat_semibold '>SELECCIÓN ALEATORIA</p>
                                            </Button>

                                            <span className='pl-5'> </span>

                                            <Button radius="full"
                                                variant="flat"
                                                color='warning'
                                                className='bg-default dark:bg-default dark:hover:bg-[#6220BD] hover:bg-warning-300 px-7 text-black opacity-100' onPress={() => { limpiarSeleccion() }}>
                                                <p className='font-montserrat_semibold '>LIMPIAR</p>
                                            </Button>

                                            <span className='pl-5'> </span>

                                            <Button
                                                radius="full"
                                                variant="flat"
                                                className={
                                                    parseFloat( sld ) >= 15 && ganador != '' && goles != '' && ambosanotan != '' && minutoprimergol != '' ?
                                                    'bg-primary-50 dark:bg-[#9130F4] dark:hover:bg-[#6220BD] hover:bg-primary-300 px-7 text-white opacity-90':
                                                    'bg-primary-50 dark:bg-[#9130F4] dark:hover:bg-[#6220BD] hover:bg-primary-300 px-7 text-white opacity-10'
                                                }
                                                isDisabled={parseFloat( sld ) >= 15 && ganador != '' && goles != '' && ambosanotan != '' && minutoprimergol != '' ? false : true}
                                                onPress={()=>jugar()}
                                            >
                                                <p className='font-montserrat_semibold '>JUGAR</p>
                                            </Button>

                                        </div>

                                        </>
                                        :

                                            <div className='text-center mt-[-5%]'>

                                                <div className='text-warning text-xl'>{msgproceso}</div>

                                                <Button radius="full"
                                                    variant="flat"
                                                    color='danger'
                                                    className='bg-danger dark:bg-[#9130F4] dark:hover:bg-[#6220BD] hover:bg-danger-300 px-7 text-white opacity-100' onPress={() => { setOpenValueModal(false), setErrorData(false), setView(false), setMsgProceso("") }}>
                                                    <p className='font-montserrat_semibold '>CERRAR</p>
                                                </Button>

                                            </div>
                                            
                                            }

                                    </div>

                                </div> : <div>Cargando...</div>}

                                
                                
                            <div className='text-white text-center text-xs m-[2%]'>

                                {msgproceso === '' ? 
                                <>
                                <Checkbox defaultSelected color="default" 
                                 onChange={(e)=>{ publica === "1" ? setPublica( "0" ) : setPublica( "1" )  }}>
                                    <span className='text-white'>Hacer pública mi selección</span>
                                </Checkbox>
                                <br></br>
                                </>
                                :null}

                                {parseFloat(sld) >= 15 ?
                                    <><span className='font-montserrat_semibold'>${formatearMiles(sld)}</span> disponibles en tu balance.<br></br>
                                        Fondea tu cuenta <a href="#" className='text-danger'>aquí</a>.</>
                                    :
                                    <>Tu balance actual es de <span className='font-montserrat_semibold'>${formatearMiles(sld)}</span>.<br></br>
                                        Si quieres jugar, fondea tu cuenta <a href="#" className='text-danger'>aquí</a>.</>
                                }

                            </div>

                            <ModalFooter>
                                
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
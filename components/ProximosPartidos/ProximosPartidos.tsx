'use client'
import React, { useState, useEffect, ReactNode, } from 'react'
import { ChevronLeft, ChevronRight, Link } from 'lucide-react'
import { Divider } from '@heroui/react'
import config from '@/config/config';
import { Avatar, Button } from "@heroui/react";
import { formatearFechaSoloDia, formatearFechaSoloHora, normalizeText } from "../Utilidades";
import { ApostarModal } from '../juegos/JugarModal';
import { LoginCheck } from '../LoginCheck';
import TablaMisJuegos from '../Tablas/TablaMisJuegos';
import { IoEyeOffOutline } from "react-icons/io5";

interface Partidos {
  ID: string;
  FECHA: string;
  GANADOR: string;
  VISITANTE: string;
  JORNADA: string;
  ESTATUS: string;
}

export const ProximosPartidos = () => {

  // 2) Estados para la lógica del carrusel
  const [current, setCurrent] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(1)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  const [data, setData] = useState<Partidos[]>([]);
  const [partidoactual, setPartidoActual] = useState<Partidos[]>([]);
  const [slides, setSlides] = useState<ReactNode[]>([]);
  const [apostarview, setApostarView] = useState(false);
  const [sldactual, setSldActual] = useState("0");

  useEffect(() => {

    setSldActual(localStorage.getItem("sld_csn") + "");

  }, []);

  const fetchSlides = async () => {

    let idusuario = localStorage.getItem("idusuariog_csn") || "";
    let sld = localStorage.getItem("sld_csn") || "0";
    setSldActual(localStorage.getItem("sld_csn") + "");

    const datasend = JSON.stringify({
      cantidad: "10"
    });

    try {
      const response = await fetch(config.baseUrlAPI + 'partidos/partidosapuestas', {
        method: "POST",
        body: datasend
      });

      const result = await response.json();

      setData(result);

      console.log(result);

      // Genera dinámicamente los slides con .map()
      const newSlides = result.map((item: any, index: number) => (

        <div key={index} className="h-[62vh] rounded-2xl bg-cover bg-center bg-no-repeat bg-[url('../public/imagenes/mini_cards_background.png')] flex flex-col items-start gap-2 justify-start shadow-[0_5px_11px_rgba(42,13,119,0.3)]">
          <div className='grid grid-cols-1 gap-2 w-full'>
            {/* Elemento superior */}
            <div key="t1b1" className='grid grid-cols-2 gap-1 content-center mt-2 px-2'>
              {/* Bloque 1 */}
              <div className='grid grid-cols-3 gap-1'>
                {/* Ícono de Ticket */}
                <div className='justify-self-center col-span-1 content-center'>
                  <img
                    className='w-[50px] sm:w-[57px] md:w-[60px] lg:w-[55px] xl:w-[55px] 2xl:w-[60px]'
                    src="../imagenes/iconos/ticket_icon_blanco.svg"
                    alt="logo versus"
                  />
                </div>
                {/* Apuestas realizadas */}
                <div className='content-center col-span-2'>
                  <div>
                    <p className='text-start font-montserrat_bold text-white text-[21px]'>{item.totalapuestas}</p>
                  </div>
                  <div>
                    <p className='text-start font-montserrat_medium text-white text-[9px]'>Quinielas realizadas</p>
                  </div>
                </div>
                {/* Fin de Apuestas realizadas */}
              </div>

              {/* Bloque 2 */}
              <div className='grid grid-cols-1 gap-1'>
                <div className="grid grid-cols-2 gap-2 content-center">
                  <div className="flex items-center space-x-1">
                    {/* Ícono */}
                    <img
                      className="w-[16px] sm:w-[13px] md:w-[17px] lg:w-[15px] xl:w-[16px] 2xl:w-[18px]"
                      src="../imagenes/iconos/schedule_blanco.svg"
                      alt="ícono calendario"
                    />
                    <p className="text-white font-montserrat_medium text-[9px]">{formatearFechaSoloDia(item.infopartido.FECHA)}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {/* Ícono */}
                    <img
                      className="w-[16px] sm:w-[13px] md:w-[17px] lg:w-[15px] xl:w-[16px] 2xl:w-[18px]"
                      src="../imagenes/iconos/clock_blanco.svg"
                      alt="ícono calendario"
                    />
                    <p className="text-white font-montserrat_medium text-[9px]">{formatearFechaSoloHora(item.infopartido.FECHA)} Hrs.</p>
                  </div>
                </div>
                <div className='bg-primary-50 dark:bg-[#9130F4] rounded-2xl content-center'>
                  <p className='text-center font-montserrat_semibold text-white text-[9px]'>JORNADA {item.infopartido.JORNADA}</p>
                </div>
              </div>
            </div>

            {/* Sección 2 */}
            <div className='mt-5 px-2'>
              <div className='mb-4'>
                <Divider className='bg-white '></Divider>
              </div>

              <div className='grid grid-cols-5 gap-1'>
                <div className='col-span-2 content-center'>
                  <div className='grid grid-cols-3 gap-1'>
                    {/* Equipo 1 */}
                    <div className='col-span-1 content-center'>
                      <img
                        className='w-[75px] sm:w-[125px] md:w-[140px] lg:w-[160px] xl:w-[170px] 2xl:w-[210px]'
                        src={config.baseUrlIMG + "imagenes/equipos/purple/" + normalizeText(item.infopartido.LOCAL) + ".svg"}
                        alt="equipo 2 liga MX"
                      />
                    </div>
                    <div className='col-span-2 content-center'>
                      <p className='font-montserrat_bold text-white text-start text-[13px] sm:text-xs md:text-sm lg:text-xs'>{item.infopartido.LOCAL}</p>
                    </div>
                  </div>
                </div>
                {/* imagen vs */}
                <div className='col-span-1 content-center justify-self-center'>
                  <img
                    className='w-[40px] sm:w-[32px] md:w-[40px] lg:w-[40px] xl:w-[40px] 2xl:w-[40px]'
                    src="../imagenes/versus_icon.svg"
                    alt="logo versus"
                  />
                </div>
                <div className='col-span-2 content-center'>
                  {/* Equipo 2 */}
                  <div className='grid grid-cols-3 gap-1'>
                    <div className='col-span-2 content-center'>
                      <p className='font-montserrat_bold text-white text-end text-[13px] sm:text-xs md:text-sm lg:text-xs'>{item.infopartido.VISITANTE}</p>
                    </div>
                    <div className='col-span-1 content-center'>
                      <img
                        className='w-[75px] sm:w-[125px] md:w-[140px] lg:w-[160px] xl:w-[170px] 2xl:w-[210px]'
                        src={config.baseUrlIMG + "imagenes/equipos/purple/" + normalizeText(item.infopartido.VISITANTE) + ".svg"}
                        alt="equipo 2 liga MX"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='px-2'>
              <Divider className='bg-white my-3'></Divider>

            </div>

            <div className='flex text-center justify-center'>

              <div className='pr-5'><span className='text-white text-sm text-center justify-center'>Juega y gana hasta<br></br>
                <span className='text-warning text-2xl text-center justify-center'>
                  ${(parseInt(item.totalapuestas) + 1) * 15 * 0.4}
                </span>&nbsp;MXN</span>
              </div>

              <div className='pl-5'>
                <span className='text-white text-sm text-center justify-center'>Bolsa actual de <br></br>
                  <span className='text-success text-2xl text-center justify-center'>
                    ${(parseInt(item.totalapuestas)) * 15}
                  </span>&nbsp;MXN</span>
              </div>

            </div>

            {/* Sección 2 */}
            <div className='px-2 h-[28vh]'>
              {/* Título */}
              {/* <div>
                  <p className='text-center font-montserrat_bold text-white text-sm lg:text-xs xl:text-xs 2xl:text-xs'>{item.totalespera} QUINIELAS REALIZADAS</p>
                </div> */}
              {/* Títulos tablas */}

              <div className='grid grid-cols-6 pt-5  divide-x-2 divide-primary-900 dark:divide-[#130560]'>
                <div className='bg-primary-50/60 dark:bg-secondary/80  col-span-2 content-center'>
                  <p className='text-center text-white font-montserrat_medium text-[8px]'>#</p>
                </div>
                <div className='bg-primary-50/60 dark:bg-secondary/80 col-span-2 content-center'>
                  <p className='text-center text-white font-montserrat_medium text-[8px]'>Usuario</p>
                </div>
                <div className='bg-primary-50/60 dark:bg-secondary/80 col-span-2 content-center'>
                  <p className='text-center text-white font-montserrat_medium text-[8px]'>Combinación</p>
                </div>
                {/* <div className='bg-primary-50/60 dark:bg-secondary/80 col-span-2 content-center'>
                    <p className='text-center text-white font-montserrat_medium text-[8px]'>Monto</p>
                  </div> */}
              </div>
              {/* Fin de Títulos tablas */}

              {item.apuestas.map((item2: any, index2: number) => (

                <div key={index2} className='grid grid-cols-6 pt-4 gap-1'>
                  <div className='col-span-1 content-center'>
                    <p className='text-center text-white font-montserrat_semibold text-xs'>#{index2 + 1}</p>
                  </div>
                  <div className='col-span-1 content-center'>
                    {/* <Avatar
                      src={`https://isaibot.com/api_casino/public/imgsperfil/imgperfil_${item2.IDUSUARIO}.jpg`}
                      size='sm'
                    /> */}
                  </div>
                  <div className='col-span-2 content-center'>
                    <p className='text-center text-white font-montserrat_semibold text-[9px]'>{item2.NOMBREUSUARIO}</p>
                  </div>
                  <div className='border-1 border-white col-span-2 content-center rounded-md'>
                    <p className='flex justify-center items-center text-white font-montserrat_medium text-[9px]'>
                    {item2.PUBLICA === "1" ?
                      //item2.GANADOR.substring(0,1) + " " +  (item2.GOLES.substring(0,1) === '2' ? "+":"-") + " " + item2.AMBOSANOTAN.substring(0,1) + " " + (item2.MINUTOPRIMERGOL.substring(0,2) === '0-'?"0":item2.MINUTOPRIMERGOL.substring(0,2))+"'" 
                      //item2.GANADOR === "local" ? item.infopartido.LOCAL : item2.GANADOR === "visitante" ? item.infopartido.VISITANTE : "Empate"
                      item2.GANADOR.substring(0,1).toUpperCase() + " / " + item2.GOLES + " / " + item2.AMBOSANOTAN.substring(0,1) + " / " + item2.MINUTOPRIMERGOL 
                      :<IoEyeOffOutline className='text-center items-center' size={"15px"} />
                    }</p>
                  </div>
                  {/* <div className='col-span-2 content-center'>
                        <p className='text-center text-white font-montserrat_medium text-[9px]'>${item2.MONTOLOCAL != '0'  ? parseFloat(item2.MONTOLOCAL) : parseFloat(item2.MONTOVISITANTE)} MNX</p>
                      </div> */}
                </div>
              ))
              }

              {/* Fin de Usuario 1 */}

            </div>
            {/* Fin de Sección 2 */}

            {/* Botones */}
            <div className='grid grid-cols-1 mt-2 mb-1 px-1'>
              {/* Botón Contacto */}
              <div className='flex justify-center items-center ml-3'>

                {idusuario != "" ?
                  parseFloat(sld) >= 10 ?
                    <Button
                      className="bg-primary-50 dark:bg-[#9130F4] dark:hover:bg-[#6220BD] hover:bg-primary-300 px-7"
                      radius="full"
                      onPress={() => { setApostarView(true), setPartidoActual(item); }}>
                      <p className='text-white font-montserrat_semibold'>JUGAR</p>
                    </Button>
                    : null
                  :
                  <>
                    <a href='../login'>
                      <Button
                        className="bg-primary-50 dark:bg-[#9130F4] dark:hover:bg-[#6220BD] hover:bg-primary-300 px-7"
                        radius="full">
                        <p className='text-white font-montserrat_semibold'>JUGAR*</p>
                      </Button>
                    </a>
                  </>
                }
              </div>

              {/* Botón Ver más */}
              {/* <div className='flex justify-center items-center'>
                  <Button
                    radius="full"
                    variant="ghost"
                    className='px-7 dark:border-purple-500  dark:!hover:bg-secondary'>
                    <p className='text-white font-montserrat_semibold'>Ver más</p>
                  </Button>
                </div> */}
            </div>
          </div>


        </div>

      ));

      setSlides(newSlides);

    } catch (error) {
      console.error("Error en la obtención de datos:", error);
    }


  };

  useEffect(() => {

    fetchSlides();

  }, []);

  // 3) Ajustar itemsPerPage según ancho
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w >= 1024) setItemsPerPage(3) // desktop
      else if (w >= 640) setItemsPerPage(2) // tablet
      else setItemsPerPage(1) // móvil
      setCurrent(0)       // opcional: reiniciar al cambiar breakpoint
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])


  const lastIndex = Math.max(0, slides.length - itemsPerPage)
  const prev = () => setCurrent(i => (i === 0 ? lastIndex : i - 1))
  const next = () => setCurrent(i => (i === lastIndex ? 0 : i + 1))

  // ancho de cada slide en porcentaje
  const slideWidth = 100 / itemsPerPage

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return
    const distance = touchStartX - touchEndX
    const threshold = 50

    if (distance > threshold) next()
    else if (distance < -threshold) prev()

    setTouchStartX(null)
    setTouchEndX(null)
  }

  return (

    <div className="w-full flex flex-col items-center justify-center bg-white dark:bg-gradient-to-bl from-[#812DE2] from-1% via-[#03004E] via-30% to-[#812DE2] to-100% pb-56">

      {apostarview ?
        <ApostarModal openvalue={apostarview} setView={setApostarView} partidoactual={partidoactual} fetchSlides={fetchSlides}></ApostarModal>
        : null}

      <div className="w-full max-w-5xl pt-32 gap-8">
        {/* Título */}
        <div className="px-2 -mt-3">
          <div className="leading-normal text-transparent bg-clip-text bg-gradient-to-r from-[#4646F9] to-pink-400">
            <p className="font-montserrat_bold text-center text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl pt-12 pb-3">
              Próximos Partidos
            </p>

            {sldactual != "0" && sldactual != '' && sldactual != 'null' ? <div className='text-center'>Tu balance actual es de <span className='font-montserrat_semibold'>${sldactual}</span>.</div> : null}

            {parseFloat(sldactual) <= 0 ?
              <div className='text-center'>Si quieres jugar, fondea tu cuenta <a href="#" className='text-danger'>aquí</a>.</div>
              : null}

            {sldactual != "0" && sldactual != '' && sldactual != 'null' ? <div className='text-center'>Si quieres puedes agregar más saldo a tu cuenta <a href="#" className='text-danger'>aquí</a>.</div> : null}

            {sldactual === "0" || sldactual === '' || sldactual === 'null' ?
              <div className='text-center'>
                *Debe Iniciar sesión o registrarse para poder jugar.
              </div>
              : null}

          </div>

        </div>

        {/* Carrusel */}
        <div className="relative w-full max-w-5xl overflow-hidden mt-2 group">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${current * slideWidth}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((Slide, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 p-4"
                style={{ width: `${slideWidth}%` }}
              >
                <div className="w-[100%] sm:w-[101%] md:w-[100%] lg:w-[101%] xl:w-[103%] max-w-[400px] mx-auto"> {/* Aquí se ajusta el ancho visual de cada tarjeta */}
                  {Slide}
                </div>
              </div>
            ))}
          </div>

          {/* Flechas */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 dark:bg-white/50 dark:hover:bg-secondary/90 hover:bg-white dark:hover:bg-black p-2 rounded-full shadow    
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft size={29}
              className="text-primary-500 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300"
            />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 dark:bg-white/50 hover:bg-white dark:hover:bg-secondary p-2 rounded-full shadow   
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight size={29}
              className="text-primary-500 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300"
            />
          </button>
        </div>

      </div>

      <a href='../misjuegos'>

        <Button radius="full" variant="ghost" color='secondary' className='sm:px-8 md:px-10 lg:px-12 xl:px-12 2xl:px-12'>
          <p className='font-montserrat_semibold'>VER MIS JUEGOS</p>
        </Button>

      </a>

    </div>

  )
}

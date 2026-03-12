'use client'
import React, { useState, useEffect } from 'react';
import ReactECharts from "echarts-for-react";
import config from '@/config/config';
import { normalizeText } from '../Utilidades';

import {
  Button
} from "@heroui/react";

export const Landing3 = () => {

  const [loading, setLoading] = useState(false);
  const [local, setLocal] = useState("");
  const [visitante, setVisitante] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {

    const fetchData = async () => {

      setLoading(true);

      const datasend = JSON.stringify({
        cantidad: "1"
      });

      try {
        const response = await fetch(config.baseUrlAPI + 'partidos/finalizados', {
          method: "POST",
          body: datasend
        });

        const result = await response.json();

        if (result[0].FECHA) setFecha(result[0].FECHA);
        if (result[0].LOCAL) setLocal(result[0].LOCAL);
        if (result[0].VISITANTE) setVisitante(result[0].VISITANTE);

      } catch (error) {
        console.error("Error en la obtención de datos:", error);
      }

    };

    fetchData();

    setLoading(false);
  }, []);




      // GRÁFICA VERDE DE MUESTRA
      const miniChartVerde = {
        animation: true,
        xAxis: { show: false, type: "category" },
        yAxis: { show: false },
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        series: [
          {
            data: [2, 10, 8, 13, 10, 14, 18],  // Aquí van los datos
            type: "line",
            smooth: true,
            symbol: "none",
            lineStyle: {
              width: 3,
              color: "#00E676", // color verde
            },
            areaStyle: { opacity: 0 },
          },
        ],
      };

      // GRÁFICA AMARILLA DE MUESTRA
      const miniChartAmarilla = {
        animation: true,
        xAxis: { show: false, type: "category" },
        yAxis: { show: false },
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        series: [
          {
            data: [4, 5, 8, 13, 10, 11, 12],  // Aquí van los datos
            type: "line",
            smooth: true,
            symbol: "none",
            lineStyle: {
              width: 3,
              color: "#dde016", // color amarillo
            },
            areaStyle: { opacity: 0 },
          },
        ],
      };

      // GRÁFICA ROJA DE MUESTRA
      const miniChartRoja = {
        animation: true,
        xAxis: { show: false, type: "category" },
        yAxis: { show: false },
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        series: [
          {
            data: [13, 8, 10, 13, 10, 11, 10],  // Aquí van los datos
            type: "line",
            smooth: true,
            symbol: "none",
            lineStyle: {
              width: 3,
              color: "#eb0c3c", // color amarillo
            },
            areaStyle: { opacity: 0 },
          },
        ],
      };





  
  return (

    /* Sección */
    <div className="pt-28 sm:pt-20 md:pt-36 lg:pt-36 xl:pt-36 2xl:pt-36 pb-40 bg-titles -mb-12 ">      
      {/* Fin de Título de sección */}

        <div className='grid grid-cols-2 px-10 sm:px-16 md:px-30 lg:px-36 xl:px-36 2xl:px-64 gap-1 sm:gap-1 md:gap-5 lg:gap-7 xl:2xl:gap-8 2xl:gap-8'>         
          


        {/* Elemento izquierdo */}
        <div className='col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1 2xl:col-span-1 flex-col justify-center flex h-full items-start '> 
            <h2 className="text-black text-start font-montserrat_bold text-3xl">
              ASESORES INTELIGENTES
            </h2>
                <p className='mt-4 text-black font-montserrat_regular'>               
                 Nuestros bots operan de forma automática, siguiendo patrones, reglas y algoritmos desarrollados para buscar oportunidades reales en los mercados financieros. Tú conservas el control en todo momento: puedes activarlos, pausarlos o cambiar de bot cuando lo desees.
                </p>
                <Button
                    className="
                      mt-12
                      bg-[#FB8500]                
                      hover:bg-focus    
                      text-black                  
                      hover:text-white           
                      shadow-lg                  
                      transition-all duration-300
                      px-6 py-2                  
                    "
                    radius="full"
                  >
                    <p className="font-montserrat_semibold text-sm">
                      VER ESTADÍSTICAS
                    </p>
                </Button>

        </div>
        


        {/* Elemento derecho */}
        <div className='pt-12 pb-12  col-span-1 col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1 2xl:col-span-1 p-3 h-full'>
           {/* Tarjetas para bots */}
              <div className=' grid grid-cols-6 gap-3'>


                    {/* Tarjeta ATLAS */}
                    <div className="
                          relative rounded-2xl 
                          col-span-3 sm:col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-2 
                          h-52 
                          bg-black 
                          bg-[url('/imagenes/bots/atlas_png.png')] 
                          bg-no-repeat 
                          bg-cover 
                          
                          bg-[length:112%] 
                          sm:bg-[length:99%] 
                          md:bg-[length:122%]
                          lg:bg-[length:122%] 
                          xl:bg-[length:130%] 
                          2xl:bg-[length:150%] 
                          
                          bg-[-60px_-40px] 
                          sm:bg-[-65px_-55px] 
                          md:bg-[-80px_-45px] 
                          lg:bg-[-66px_-46px] 
                          xl:bg-[-70px_-48px] 
                          2xl:bg-[-95px_-60px]
                          "
                          >

                          {/* Gráfica */}
                          <div className="absolute top-3 right-3 text-right pointer-events-none">                          
                              <ReactECharts
                                option={miniChartVerde}
                                style={{ width: 70, height: 35 }}
                                className="pointer-events-none"
                              />
                            <p className="text-green-400 font-semibold text-xs  font-montserrat_bold -mt-2">+15%</p>
                          </div>
                          {/* Info */}
                          <div className="absolute bottom-3 left-3 text-white">
                            <h3 className="font-extrabold text-lg leading-tight tracking-wide font-montserrat_semibold">ATLAS</h3>
                            {/* Estrellas */}
                            <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">
                              ★★★★☆
                            </div>
                            {/* Texto breve */}
                            <p className="text-white/80 text-xs font-montserrat_regular">
                              Rendimiento en las últimas 3 semanas: +15%
                            </p>
                          </div>
                    </div>

                    {/* Tarjeta CRONOS */}
                    <div
                        className="
                          relative rounded-2xl 
                          col-span-3 sm:col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-2 
                          h-52 
                          bg-black
                          bg-[url('/imagenes/bots/cronos_png.png')] 
                          bg-no-repeat 
                          bg-cover 

                          bg-[length:117%]
                          sm:bg-[length:99%]
                          md:bg-[length:122%]
                          lg:bg-[length:122%]
                          xl:bg-[length:136%]
                          2xl:bg-[length:161%]

                          bg-[-60px_-40px]
                          sm:bg-[-65px_-55px]
                          md:bg-[-80px_-45px]
                          lg:bg-[-66px_-46px]
                          xl:bg-[-70px_-48px]
                          2xl:bg-[-106px_-63px]
                        "
                      >

                        {/* Gráfica */}
                        <div className="absolute top-3 right-3 text-right pointer-events-none">
                              <ReactECharts
                                option={miniChartAmarilla}
                                style={{ width: 70, height: 35 }}
                                className="pointer-events-none"
                              />                          
                          <p className="text-[#dde016] font-semibold text-xs mt-1 font-montserrat_bold -mt-2">
                            +8%
                          </p>
                        </div>
                        {/* Info */}
                        <div className="absolute bottom-3 left-3 text-white">
                          <h3 className="font-extrabold text-lg leading-tight tracking-wide font-montserrat_semibold">
                            CRONOS
                          </h3>
                          {/* Estrellas */}
                          <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">
                            ★★★☆☆
                          </div>
                          {/* Texto breve */}
                          <p className="text-white/80 text-xs font-montserrat_regular">
                            Rendimiento en las últimas 3 semanas: +8%
                          </p>
                        </div>
                    </div>

                    {/* Tarjeta SOBEK */}
                    <div className="
                      relative rounded-2xl 
                      col-span-3 sm:col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-2 
                      h-52 
                      bg-black
                      bg-[url('/imagenes/bots/sobek_png.png')] 
                      bg-no-repeat 
                      bg-cover 

                      bg-[length:119%] 
                      sm:bg-[length:106%] 
                      md:bg-[length:126%] 
                      lg:bg-[length:125%] 
                      xl:bg-[length:127%] 
                      2xl:bg-[length:148%] 
                     
                      bg-[-60px_-24px] 
                      sm:bg-[-70px_-30px] 
                      md:bg-[-80px_-22px] 
                      lg:bg-[-66px_-26px] 
                      xl:bg-[-70px_-43px] 
                      2xl:bg-[-88px_-30px]
                      "
                      >
                      
                        {/* Gráfica */}
                        <div className="absolute top-3 right-3 text-right pointer-events-none">
                              <ReactECharts
                                option={miniChartRoja}
                                style={{ width: 70, height: 35 }}
                                className="pointer-events-none"
                              />                          
                          <p className="text-[#eb0c3c] font-semibold text-xs mt-1 font-montserrat_bold -mt-2">
                            +2%
                          </p>
                        </div>
                        {/* Info */}
                        <div className="absolute bottom-3 left-3 text-white">
                          <h3 className="font-extrabold text-lg leading-tight tracking-wide font-montserrat_semibold">
                            SOBEK
                          </h3>
                          {/* Estrellas */}
                          <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">
                            ★☆☆☆☆
                          </div>
                          {/* Texto breve */}
                          <p className="text-white/80 text-xs font-montserrat_regular">
                            Rendimiento en las últimas 3 semanas: +2%
                          </p>
                        </div>                      
                    </div>

                    {/* Tarjeta ATLAS */}
                    <div className="
                          relative rounded-2xl 
                          col-span-3 sm:col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-2 
                          h-52 
                          bg-black 
                          bg-[url('/imagenes/bots/atlas_png.png')] 
                          bg-no-repeat 
                          bg-cover 
                          
                          bg-[length:112%] 
                          sm:bg-[length:99%] 
                          md:bg-[length:122%]
                          lg:bg-[length:122%] 
                          xl:bg-[length:130%] 
                          2xl:bg-[length:150%] 
                          
                          bg-[-60px_-40px] 
                          sm:bg-[-65px_-55px] 
                          md:bg-[-80px_-45px] 
                          lg:bg-[-66px_-46px] 
                          xl:bg-[-70px_-48px] 
                          2xl:bg-[-95px_-60px]
                          "
                          >

                          {/* Gráfica */}
                          <div className="absolute top-3 right-3 text-right pointer-events-none">                          
                              <ReactECharts
                                option={miniChartVerde}
                                style={{ width: 70, height: 35 }}
                                className="pointer-events-none"
                              />
                            <p className="text-green-400 font-semibold text-xs  font-montserrat_bold -mt-2">+15%</p>
                          </div>
                          {/* Info */}
                          <div className="absolute bottom-3 left-3 text-white">
                            <h3 className="font-extrabold text-lg leading-tight tracking-wide font-montserrat_semibold">ATLAS</h3>
                            {/* Estrellas */}
                            <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">
                              ★★★★☆
                            </div>
                            {/* Texto breve */}
                            <p className="text-white/80 text-xs font-montserrat_regular">
                              Rendimiento en las últimas 3 semanas: +15%
                            </p>
                          </div>
                    </div>
            
                     {/* Tarjeta CRONOS */}
                    <div
                        className="
                          relative rounded-2xl 
                          col-span-3 sm:col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-2 
                          h-52 
                          bg-black
                          bg-[url('/imagenes/bots/cronos_png.png')] 
                          bg-no-repeat 
                          bg-cover 

                          bg-[length:117%]
                          sm:bg-[length:99%]
                          md:bg-[length:122%]
                          lg:bg-[length:122%]
                          xl:bg-[length:136%]
                          2xl:bg-[length:161%]

                          bg-[-60px_-40px]
                          sm:bg-[-65px_-55px]
                          md:bg-[-80px_-45px]
                          lg:bg-[-66px_-46px]
                          xl:bg-[-70px_-48px]
                          2xl:bg-[-106px_-63px]
                        "
                      >

                        {/* Gráfica */}
                        <div className="absolute top-3 right-3 text-right pointer-events-none">
                              <ReactECharts
                                option={miniChartAmarilla}
                                style={{ width: 70, height: 35 }}
                                className="pointer-events-none"
                              />                          
                          <p className="text-[#dde016] font-semibold text-xs mt-1 font-montserrat_bold -mt-2">
                            +8%
                          </p>
                        </div>
                        {/* Info */}
                        <div className="absolute bottom-3 left-3 text-white">
                          <h3 className="font-extrabold text-lg leading-tight tracking-wide font-montserrat_semibold">
                            CRONOS
                          </h3>
                          {/* Estrellas */}
                          <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">
                            ★★★☆☆
                          </div>
                          {/* Texto breve */}
                          <p className="text-white/80 text-xs font-montserrat_regular">
                            Rendimiento en las últimas 3 semanas: +8%
                          </p>
                        </div>
                    </div>

                    {/* Tarjeta SOBEK */}
                    <div className="
                      relative rounded-2xl 
                      col-span-3 sm:col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-2 
                      h-52 
                      bg-black
                      bg-[url('/imagenes/bots/sobek_png.png')] 
                      bg-no-repeat 
                      bg-cover 

                      bg-[length:119%] 
                      sm:bg-[length:106%] 
                      md:bg-[length:126%] 
                      lg:bg-[length:125%] 
                      xl:bg-[length:127%] 
                      2xl:bg-[length:148%] 
                     
                      bg-[-60px_-24px] 
                      sm:bg-[-70px_-30px] 
                      md:bg-[-80px_-22px] 
                      lg:bg-[-66px_-26px] 
                      xl:bg-[-70px_-43px] 
                      2xl:bg-[-88px_-30px]
                      "
                      >
                      
                        {/* Gráfica */}
                        <div className="absolute top-3 right-3 text-right pointer-events-none">
                              <ReactECharts
                                option={miniChartRoja}
                                style={{ width: 70, height: 35 }}
                                className="pointer-events-none"
                              />                          
                          <p className="text-[#eb0c3c] font-semibold text-xs mt-1 font-montserrat_bold -mt-2">
                            +2%
                          </p>
                        </div>
                        {/* Info */}
                        <div className="absolute bottom-3 left-3 text-white">
                          <h3 className="font-extrabold text-lg leading-tight tracking-wide font-montserrat_semibold">
                            SOBEK
                          </h3>
                          {/* Estrellas */}
                          <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">
                            ★☆☆☆☆
                          </div>
                          {/* Texto breve */}
                          <p className="text-white/80 text-xs font-montserrat_regular">
                            Rendimiento en las últimas 3 semanas: +2%
                          </p>
                        </div>                      
                    </div>
                  


           </div>

        </div>




        </div> 
    </div>

  )
}

"use client";
import React, { useEffect, useRef, useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import { EmpateIcon } from "../icons/tabs/empate";
import { LocalIcon } from "../icons/tabs/local";
import { VisitanteIcon } from "../icons/tabs/visitante";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CountdownTimer = dynamic(
  () => import("../contador/Contador").then((mod) => mod.default),
  { ssr: false }
);

export const Seccion1 = () => {
  const [selectedTab, setSelectedTab] = useState<Record<number, string | null>>({});
  const [current, setCurrent] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const autoplayRef = useRef<number | null>(null);
  const autoplayDelay = 8000; //👈 tiempo de retardo de Carrusel
  const startXRef = useRef<number | null>(null);
  const deltaXRef = useRef<number>(0);

  // lista de partidos
  const partidos = [
    {
      id: 1,
      local: "PUEBLA",
      visitante: "CHIVAS",
      fecha: "Noviembre 19",
      hora: "20:00 hrs.",
      icono: "flama.svg",
      liga: "Liga MX Femenil",
      tipo: "Cuartos de Final",
      playeraLocal: "/imagenes/playeras/puebla.svg",
      playeraVisitante: "/imagenes/playeras/chivas.svg",
    },
    {
      id: 2,
      local: "PUMAS",
      visitante: "AMÉRICA",
      fecha: "Diciembre 2",
      hora: "21:00 hrs.",
      icono: "flama.svg",
      liga: "Liga MX",
      tipo: "Cuartos de Final",
      playeraLocal: "/imagenes/playeras/pumas.svg",
      playeraVisitante: "/imagenes/playeras/america.svg",
    },
    {
      id: 3,
      local: "JUÁREZ",
      visitante: "TIGRES",
      fecha: "Diciembre 8",
      hora: "15:00 hrs.",
      icono: "balon_soccer.svg",
      liga: "Liga MX",
      tipo: "Fase Regular",
      playeraLocal: "/imagenes/playeras/juarez.svg",
      playeraVisitante: "/imagenes/playeras/tigres.svg",
    },
    {
      id: 4,
      local: "LEÓN",
      visitante: "CRUZ AZUL",
      fecha: "Diciembre 10",
      hora: "19:00 hrs.",
      icono: "flama.svg",
      liga: "Liga MX",
      tipo: "Semifinal",
      playeraLocal: "/imagenes/playeras/leon.svg",
      playeraVisitante: "/imagenes/playeras/cruz_azul.svg",
    },
    {
      id: 5,
      local: "ATLAS",
      visitante: "SANTOS",
      fecha: "Diciembre 12",
      hora: "18:00 hrs.",
      icono: "balon_soccer.svg",
      liga: "Liga MX",
      tipo: "Fase Regular",
      playeraLocal: "/imagenes/playeras/atlas.svg",
      playeraVisitante: "/imagenes/playeras/santos.svg",
    },
    {
      id: 6,
      local: "TIJUANA",
      visitante: "NECAXA",
      fecha: "Diciembre 20",
      hora: "17:00 hrs.",
      icono: "flama.svg",
      liga: "Liga MX Femenil",
      tipo: "Gran Final",
      playeraLocal: "/imagenes/playeras/tijuana.svg",
      playeraVisitante: "/imagenes/playeras/necaxa.svg",
    },

  ];

    // Estilos personalizados según el tipo de partido
    const getTipoStyles = (tipo: string) => {
      switch (tipo.toLowerCase()) {
        case "fase regular":
          return "bg-[#6B21A8] border-[#B68BFC] text-white"; // Fase Regular
        case "semifinal":
          return "bg-[#FF8C00] border-[#B68BFC] text-white"; // Semifinal
        case "cuartos de final":
          return "bg-[#008fe4] border-[#B68BFC] text-white"; // Cuartos de Final
        default:
          return "bg-[#FE2D72] border-[#B68BFC] text-white"; // Final
      }
    };


  // detecta ancho pantalla y reinicia índice
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      if (w < 768) {
        setItemsPerPage(1);
      } else if (w >= 768 && w < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }

      setCurrent(0); // 🔥 Reinicia el índice al cambiar tamaño
    };

    
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // índice máximo
  const lastIndex = Math.max(0, partidos.length - itemsPerPage);

  // funciones navegación
  const prev = () => setCurrent((i) => (i === 0 ? lastIndex : i - 1));
  const next = () => setCurrent((i) => (i === lastIndex ? 0 : i + 1));

  // autoplay sincronizado
  useEffect(() => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
    }
    autoplayRef.current = window.setInterval(() => {
      setCurrent((i) => (i >= lastIndex ? 0 : i + 1));
    }, autoplayDelay);

    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [itemsPerPage, lastIndex]);

  // touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    deltaXRef.current = e.touches[0].clientX - startXRef.current;
  };
  const onTouchEnd = () => {
    const dx = deltaXRef.current;
    const threshold = 50;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    startXRef.current = null;
    deltaXRef.current = 0;
  };

  const slideWidth = 100 / itemsPerPage;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black dark:bg-gradient-to-bl from-[#812DE2] via-[#03004E] to-[#812DE2] text-white pb-20 pt-20 mt-12">
      {/* Encabezado */}
      <div className="pt-10 text-center px-2">
        <p className="text-white font-montserrat_bold text-4xl">
          PLANES
        </p>
        <p className="pt-2 text-white dark:text-[#B68BFC] font-montserrat_semibold text-xl">
          Explora nuestros planes y elige los bots que acompañarán tu camino.
        </p>
      </div>

      {/* Carrusel */}
      <div className="w-full max-w-6xl mt-12 relative group px-1">
        {/* Flechas */}
        <button
          onClick={prev}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="prev"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        <button
          onClick={next}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="next"
        >
          <ChevronRight className="text-white" size={24} />
        </button>

        {/* Vista del carrusel */}
        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * slideWidth}%)` }}
          >
            {partidos.map((match) => (
              <div
                key={match.id}
                className="flex-shrink-0 px-3 pt-6 pb-10 flex justify-center"
                style={{ width: `${slideWidth}%` }}
              >
                {/* Tarjeta */}
                <div className="bg-gradient-to-bl from-[#812be2]/95 via-[#812be2]/90 to-[#03004E] rounded-2xl p-3 shadow-[0_10px_30px_rgba(96,60,195,0.5)] max-w-[420px] md:max-w-[440px] lg:max-w-[380px] h-[400px] flex flex-col justify-between">
                  {/* Encabezado */}
                  <div className="grid grid-cols-4 gap-2 w-full">
                    <div className="col-span-4 grid grid-cols-2 items-center">
                    <div
                        className={`inline-flex items-center gap-2 rounded-2xl px-2 pr-3 py-1 border w-fit ${getTipoStyles(match.tipo)}`}
                      >
                        <img
                          src={`/imagenes/iconos/${match.icono}`}
                          alt="icon"
                          className="w-5"
                        />
                        <p className="text-xs">{match.tipo}</p>
                    </div>
                      <div className="inline-flex items-center justify-end gap-2 ml-auto">
                        <img
                          src="/imagenes/iconos/trofeo.svg"
                          alt="trofeo"
                          className="w-5"
                        />
                        <p className="text-xs text-white font-montserrat_bold">
                          {match.liga}
                        </p>
                      </div>
                    </div>

                    {/* Playeras */}
                    <div className="col-span-4 mt-4 grid grid-cols-3 items-center">
                      <div className="flex justify-center">
                        <img
                          src={match.playeraLocal}
                          alt="local"
                          className={`w-24 transition-all duration-500 ease-out ${
                            selectedTab[match.id] === "local" ||
                            selectedTab[match.id] === "empate"
                              ? "opacity-100 scale-150 drop-shadow-[0_0_15px_rgba(161,104,255,0.5)]"
                              : selectedTab[match.id] === null ||
                                selectedTab[match.id] === undefined
                              ? "opacity-30 grayscale scale-90"
                              : "opacity-40 scale-95"
                          }`}
                        />
                      </div>

                      <div className="flex flex-col items-center justify-center p-2 mt-[60px]">
                        <img
                          src="/imagenes/versus_icon.svg"
                          alt="versus"
                          className="w-16 mb-2"
                        />
                        <p className="text-[#C5A2FF] text-xs font-montserrat_medium">
                          {match.fecha}
                        </p>
                        <p className="text-white text-md font-montserrat_bold">
                          {match.hora}
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <img
                          src={match.playeraVisitante}
                          alt="visitante"
                          className={`w-24 transition-all duration-500 ease-out ${
                            selectedTab[match.id] === "visitante" ||
                            selectedTab[match.id] === "empate"
                              ? "opacity-100 scale-150 drop-shadow-[0_0_15px_rgba(161,104,255,0.5)]"
                              : selectedTab[match.id] === null ||
                                selectedTab[match.id] === undefined
                              ? "opacity-30 grayscale scale-90"
                              : "opacity-40 scale-95"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Nombres */}
                    <div className="col-span-4 grid grid-cols-3 mt-2">
                      <div className="flex justify-center">
                        <p className="text-xs text-white font-montserrat_bold">
                          {match.local}
                        </p>
                      </div>
                      <div></div>
                      <div className="flex justify-center">
                        <p className="text-xs text-white font-montserrat_bold">
                          {match.visitante}
                        </p>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="col-span-4 mt-7 flex justify-center pt-4">
                      <Tabs
                        selectedKey={selectedTab[match.id] ?? undefined}
                        onSelectionChange={(key) =>
                          setSelectedTab((prev) => ({
                            ...prev,
                            [match.id]: key.toString(),
                          }))
                        }
                        aria-label="Opciones"
                        variant="bordered"
                        classNames={{
                          base: "w-full flex justify-center",
                          tabList:
                            "border border-[#A168FF]/70 bg-[#2A0C3A]/40 rounded-xl w-full max-w-md shadow-sm backdrop-blur-sm",
                          tab: `
                            text-sm text-white font-montserrat_medium transition-all
                            data-[hover=true]:bg-[#9f4ffc]/40
                            data-[selected=true]:bg-[#812DE2]
                            rounded-xl px-2 py-2
                          `,
                        }}
                      >
                        <Tab
                          key="local"
                          title={
                            <div
                              className={`flex items-center gap-2 ${
                                selectedTab[match.id] === "local"
                                  ? "text-primary-200 [&_svg]:text-primary-200"
                                  : "text-[#707070] [&_svg]:text-[#707070]"
                              }`}
                            >
                              <LocalIcon />
                              <span>Local</span>
                            </div>
                          }
                        />
                        <Tab
                          key="empate"
                          title={
                            <div
                              className={`flex items-center gap-2 ${
                                selectedTab[match.id] === "empate"
                                  ? "text-primary-200 [&_svg]:text-primary-200"
                                  : "text-[#707070] [&_svg]:text-[#707070]"
                              }`}
                            >
                              <EmpateIcon />
                              <span>Empate</span>
                            </div>
                          }
                        />
                        <Tab
                          key="visitante"
                          title={
                            <div
                              className={`flex items-center gap-2 ${
                                selectedTab[match.id] === "visitante"
                                  ? "text-primary-200 [&_svg]:text-primary-200"
                                  : "text-[#707070] [&_svg]:text-[#707070]"
                              }`}
                            >
                              <VisitanteIcon />
                              <span>Visitante</span>
                            </div>
                          }
                        />
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-4 gap-2">
          {partidos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full ${
                i === current ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default 1;

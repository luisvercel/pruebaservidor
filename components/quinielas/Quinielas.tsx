"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import config from "../../config/config";
import { obtenerEstadosOrdenados } from "../Utilidades";


export default function Rank1Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Rank 1</h1>
    </div>
  );
}

export const Quinielas = ({ setSessionHandle, pagerouter }: any) => {
  const router = useRouter();
  const estados = obtenerEstadosOrdenados();

  // ---------- Tarjetas ----------
  const initialCards = [
    {
      id: "1",
      status: "Abierta",
      link: "/seccion2",
      tagBg: "bg-[#20CA0A]/40",
      tagBorder: "border-[#20CA0A]",
      participants: "328 Participantes",
      category: "• FIN DE SEMANA •",
      mainTitle: "¡JUEGA GRATIS!",
      subtitle: "y gana hasta:",
      prize: "$3,000.00 MN",
      jackpotAmount: "$6,100.00",
      jackpotImg: "/imagenes/iconos/jackpot/1.svg",
      jackpotContainerClass:
        "relative col-span-2 w-full max-w-[170px] h-auto aspect-square rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-md",
      jackpotBottomImgClass:
        "absolute -bottom-10 left-1/2 -translate-x-1/2 w-[165px] z-10 animate-float",
      mainJackpotImgClass: "w-[120px] -mt-10",
    },
    {
      id: "2",
      status: "En curso",
      link: "/rank1",
      tagBg: "bg-[#ffffff]/30",
      tagBorder: "border-[#ffffff]",
      participants: "328 Participantes",
      category: "• FIN DE SEMANA •",
      mainTitle: "¡JUEGA GRATIS!",
      subtitle: "y gana hasta:",
      prize: "$4,250.00 MN",
      jackpotAmount: "$10,300.00",
      jackpotImg: "/imagenes/iconos/jackpot/2.svg",
      jackpotContainerClass:
        "relative col-span-2 w-full max-w-[170px] h-auto aspect-square rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-md",
      jackpotBottomImgClass:
        "absolute -bottom-10 left-1/2 -translate-x-1/2 w-[165px] z-10 animate-float",
      mainJackpotImgClass: "w-[120px] -mt-10",
    },
    {
      id: "3",
      status: "Finalizada",
      link: " ",
      tagBg: "bg-primary-200/40",
      tagBorder: "border-primary-50",
      participants: "518 Participantes",
      category: "• SEMANAL •",
      mainTitle: "¡JUEGA GRATIS!",
      subtitle: "y gana hasta:",
      prize: "$3,850.00 MN",
      jackpotAmount: "$15,300.00",
      jackpotImg: "/imagenes/iconos/jackpot/3.svg",
      jackpotContainerClass:
        "relative col-span-2 w-full max-w-[170px] h-auto aspect-square rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-md",
      jackpotBottomImgClass:
        "absolute -bottom-10 left-1/2 -translate-x-1/2 w-[165px] z-10",
      mainJackpotImgClass: "w-[120px] -mt-10",
    },
    {
      id: "4",
      status: "En curso",
      link: " ",
      tagBg: "bg-[#ffffff]/30",
      tagBorder: "border-[#ffffff]",
      participants: "182 Participantes",
      category: "• FIN DE SEMANA •",
      mainTitle: "¡JUEGA GRATIS!",
      subtitle: "y gana hasta:",
      prize: "$2,400.00 MN",
      jackpotAmount: "$10,300.00",
      jackpotImg: "/imagenes/iconos/jackpot/2.svg",
      jackpotContainerClass:
        "relative col-span-2 w-full max-w-[170px] h-auto aspect-square rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-md",
      jackpotBottomImgClass:
        "absolute -bottom-10 left-1/2 -translate-x-1/2 w-[165px] z-10 animate-float",
      mainJackpotImgClass: "w-[120px] -mt-10",
    },
    {
      id: "5",
      status: "Finalizada",
      link: " ",
      tagBg: "bg-primary-200/40",
      tagBorder: "border-primary-50",
      participants: "322 Participantes",
      category: "• SEMANAL •",
      mainTitle: "¡JUEGA GRATIS!",
      subtitle: "y gana hasta:",
      prize: "$5,500.00 MN",
      jackpotAmount: "$8,850.00",
      jackpotImg: "/imagenes/iconos/jackpot/2.svg",
      jackpotContainerClass:
        "relative col-span-2 w-full max-w-[170px] h-auto aspect-square rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-md",
      jackpotBottomImgClass:
        "absolute -bottom-10 left-1/2 -translate-x-1/2 w-[165px] z-10",
      mainJackpotImgClass: "w-[120px] -mt-10",
    },
    {
      id: "6",
      status: "Abierta",
      link: "/seccion2",
      tagBg: "bg-[#20CA0A]/40",
      tagBorder: "border-[#20CA0A]",
      participants: "111 Participantes",
      category: "• FIN DE SEMANA •",
      mainTitle: "¡JUEGA GRATIS!",
      subtitle: "y gana hasta:",
      prize: "$1,800.00 MN",
      jackpotAmount: "$2,150.00",
      jackpotImg: "/imagenes/iconos/jackpot/1.svg",
      jackpotContainerClass:
        "relative col-span-2 w-full max-w-[170px] h-auto aspect-square rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-md",
      jackpotBottomImgClass:
        "absolute -bottom-10 left-1/2 -translate-x-1/2 w-[165px] z-10 animate-float",
      mainJackpotImgClass: "w-[120px] -mt-10",
    },
  ];

  const [filter, setFilter] = useState<"Todas" | "Abierta" | "En curso" | "Finalizada">("Todas");
  const handleFilterChange = (value: typeof filter) => setFilter(value);

  const onCardClick = (link: string) => {
    try {
      if (pagerouter && typeof pagerouter === "function") pagerouter(link);
      else router.push(link);
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };

  const filteredCards =
    filter === "Todas" ? initialCards : initialCards.filter((c) => c.status === filter);

  // Configuración dinámica por estado de Quiniela
  const stylesByStatus: Record<
    string,
    { bgImage: string; prizeColor: string; jackpotBg: string; jackpotBorder: string }
  > = {
    Abierta: {
      bgImage: "/imagenes/card_background.png",
      prizeColor: "#FFD700",
      jackpotBg: "rgba(145,48,244,0.95)", // color de fondo jackpot
      jackpotBorder: "#9f4ffc", // borde jackpot
    },
    "En curso": {
      bgImage: "/imagenes/card_background.png",
      prizeColor: "#FFD700",
      jackpotBg: "rgba(145,48,244,0.95)", // fondo jackpot
      jackpotBorder: "#9f4ffc", // borde jackpot
    },
    Finalizada: {
      bgImage: "/imagenes/card_background.png",
      prizeColor: "#9f4ffc",
      jackpotBg: "rgba(82,27,170,0.9)", // fondo jackpot
      jackpotBorder: "#321085", // borde jackpot
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black dark:bg-gradient-to-bl from-[#812DE2] via-[#03004E] to-[#812DE2] text-white pb-20 pt-20 mt-12">
      {/* Encabezado */}
      <div className="pt-9 text-center px-2">
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#4646F9] to-pink-400 font-montserrat_bold text-4xl">
          Quinielas
        </p>
        <p className="px-1 text-primary-600 dark:text-[#B68BFC] font-montserrat_regular text-md sm:text-lg md:text-lg lg:text-lg xl:text-lg">
          Pon a prueba tu intuición y compite en nuestras quinielas. Elige tus
          resultados favoritos, suma puntos y demuestra quién sabe más de deportes.
        </p>
      </div>

      {/* Filtros */}
      <div className="pt-6 w-full flex justify-center">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 w-full max-w-[800px] px-2 sm:px-6">
          {["Todas", "Abierta", "En curso", "Finalizada"].map((btn) => (
            <Button
              key={btn}
              radius="full"
              variant={filter === btn ? "solid" : "ghost"}
              color="secondary"
              className="w-full text-xs sm:text-sm md:text-base py-2 sm:py-3"
              onClick={() => handleFilterChange(btn as any)}
              aria-pressed={filter === btn}
            >
              <p className="font-montserrat_semibold">{btn.toUpperCase()}</p>
            </Button>
          ))}
        </div>
      </div>

      {/* Tarjetas */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 justify-items-center p-4 w-full max-w-[1300px] mx-auto">
        {filteredCards.map((card) => {
          const style = stylesByStatus[card.status];
          return (
            <div
                key={card.id}
                className="card-hover relative w-full aspect-[16/9] rounded-2xl bg-cover bg-center shadow-[0_10px_30px_rgba(42,13,119,0.1)] flex items-center justify-center grid grid-cols-5 p-2 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-[0_5px_20px_rgba(42,13,119,0.49)]"
                style={{ backgroundImage: `url(${style.bgImage})` }}
                onClick={() => onCardClick(card.link)}
              >
              {/* Lado izquierdo */}
              <div className="col-span-3">
                <div
                  className={`absolute top-3 left-3 ${card.tagBg} px-3 py-1 rounded-full border ${card.tagBorder}`}
                >
                  <p className="font-montserrat_medium text-white text-sm sm:text-[10px] md:text-[12px] lg:text-xs xl:text-xs">
                    {card.status}
                  </p>
                </div>
                <div className="pl-5 sm:pl-2 md:pl-6 lg:pl-7 xl:pl-6 mt-2 sm:mt-6 lg:-mt-2 ">
                  <p className="text-[#C285FF] font-montserrat_bold text-sm sm:text-[10px] md:text-[12px] lg:text-base xl:text-sm">
                    {card.category}
                  </p>
                  <p className="text-white font-montserrat_bold text-2xl sm:text-base md:text-lg lg:text-2xl xl:text-xl">
                    {card.mainTitle}
                  </p>
                  <p className="text-white font-montserrat_medium text-base sm:text-[10px] md:text-[11px] lg:text-sm xl:text-[12px]">
                    {card.subtitle}
                  </p>
                  {/* Color dinámico del monto */}
                  <p
                    className="font-montserrat_extrabold text-3xl sm:text-lg md:text-xl lg:text-3xl xl:text-2xl"
                    style={{ color: style.prizeColor }}
                  >
                    {card.prize}
                  </p>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 mb-1">
                  <img className="w-4" src="/imagenes/iconos/user_icon.svg" alt="User icon" />
                  <p className="text-white font-montserrat_semibold text-[10px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[10px]">
                    {card.participants}
                  </p>
                </div>
              </div>

              {/* Jackpot */}
              <div
                className={card.jackpotContainerClass}
                style={{
                  backgroundColor: style.jackpotBg,
                  border: `2px solid ${style.jackpotBorder}`,
                }}
              >
                <img
                  className={card.mainJackpotImgClass}
                  src="../imagenes/iconos/jackpot_titulo.png"
                  alt="Jackpot image"
                />
                <p className="font-montserrat_regular text-[11px] sm:text-[10px] md:text-[12px] lg:text-sm text-white mb-1">
                  Asegurado de:
                </p>
                <p className="font-montserrat_semibold text-[14px] sm:text-[13px] md:text-[15px] lg:text-base text-white mb-2">
                  {card.jackpotAmount}
                </p>
                <img src={card.jackpotImg} alt="Gold image" className={card.jackpotBottomImgClass} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

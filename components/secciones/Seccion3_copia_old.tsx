"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Magnus } from "@/components/icons/icons_trading/magnus";

const cards = [
  {
    title: "ESTRATEGIA OPTIMUS",
    description: "Estrategia que diversifica la inversión hasta en 5 instrumentos CFD de la categoría Forex. ",
    icon: "/imagenes/bots/conservador.png",
    iconSize: "w-[120px] h-[120px]",
    bullets: [
      { label: "Nivel de diversificación", value: "Bajo" },
      { label: "Monto mínimo de inversión", value: "500 dólares" },
     //  { label: "Tipo de estrategia", value: "Estable" },
    ],
  },
  {
    title: "ESTRATEGIA MAGNUS",
    description:
      "Estrategia que diversifica la inversión hasta en 10 instrumentos CFD de las categorías Forex e Índices. ",
    icon: "/imagenes/bots/intermedio.png",
    iconSize: "w-[135px] h-[135px]",
    bullets: [
      { label: "Nivel de diversificación", value: "Medio" },
      { label: "Monto mínimo de inversión", value: "1,000 dólares" },
      // { label: "Tipo de estrategia", value: "Balanceada" },
    ],
  },
  {
    title: "ESTRATEGIA SUMMUS",
    description:
      "Estrategia que diversifica hasta 20 instrumentos CFD: Forex, Índices, Metales y Crypto.",
    icon: "/imagenes/trading_icons/crecimiento_svg_icon.svg",
    iconSize: "w-[150px] h-[150px]",
    bullets: [
      { label: "Nivel de diversificación", value: "Alto" },
      { label: "Monto mínimo de inversión", value: "2,000 dólares" },
      // { label: "Tipo de estrategia", value: "Agresiva y diversificada" },
    ],
  },
];

const loopedCards = [...cards, ...cards, ...cards];

export default function CarouselBots() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [index, setIndex] = useState(cards.length);
  const [cardWidth, setCardWidth] = useState(420);
  const gap = 24;

  const [disableAnim, setDisableAnim] = useState<boolean>(false);

  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;
      if (w < 768) setCardWidth(300);
      else if (w < 1024) setCardWidth(360);
      else setCardWidth(420);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const autoplay = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 9000);
    return () => clearInterval(autoplay);
  }, []);

  useEffect(() => {
    const leftLimit = cards.length;
    const rightLimit = loopedCards.length - cards.length - 1;

    if (index > rightLimit) {
      setDisableAnim(true);
      setIndex(leftLimit - 1);
      requestAnimationFrame(() => {
        setDisableAnim(false);
        requestAnimationFrame(() => setIndex(leftLimit));
      });
    }

    if (index < leftLimit - 1) {
      setDisableAnim(true);
      setIndex(rightLimit + 1);
      requestAnimationFrame(() => {
        setDisableAnim(false);
        requestAnimationFrame(() => setIndex(rightLimit));
      });
    }
  }, [index]);

  const dragStart = useRef<number | null>(null);
  const dragging = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    dragStart.current = e.touches[0].clientX;
    dragging.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current || dragStart.current == null) return;
    const diff = e.touches[0].clientX - dragStart.current;
    if (Math.abs(diff) > 60) {
      diff < 0 ? setIndex((p) => p + 1) : setIndex((p) => p - 1);
      dragging.current = false;
      dragStart.current = null;
    }
  };
  const onTouchEnd = () => {
    dragging.current = false;
    dragStart.current = null;
  };

  const [translatePx, setTranslatePx] = useState(0);
  const [sidePadding, setSidePadding] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cw = container.clientWidth;
    const pad = Math.max(0, Math.floor((cw - cardWidth) / 2));
    setSidePadding(pad);

    const step = cardWidth + gap;
    setTranslatePx(-index * step);
  }, [index, cardWidth, gap]);

  const next = () => setIndex((p) => p + 1);
  const prev = () => setIndex((p) => p - 1);

  return (
    <div className="w-full flex flex-col items-center mt-20 select-none ">
      <p className="text-white text-center font-montserrat_bold text-3xl mb-3 pt-32 px-10 sm:px-16 md:px-30 lg:px-36 xl:px-36 2xl:px-64">
        NUESTRAS ESTRATEGIAS DE INVERSIÓN
      </p>

      <p className="text-center text-zinc-400 text-[15px] sm:text-[15px] md:text-[15px] lg:text-base xl:text-base mb-14 sm:mb-14 md:mb-20 lg:mb-24 xl:mb-24 2xl:mb-24 px-10 sm:px-16 md:px-30 lg:px-36 xl:px-36 2xl:px-64">
        Actualmente nuestro portafolio incluye las siguientes estrategias de inversión:
      </p>

      <div
        ref={containerRef}
        className="relative w-full max-w-[1200px] overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute left-0 top-0 h-full w-52 pointer-events-none 
            bg-gradient-to-r from-black via-black/70 to-transparent z-[30]">
        </div>

        <div className="absolute right-0 top-0 h-full w-52 pointer-events-none 
            bg-gradient-to-l from-black via-black/70 to-transparent z-[30]">
        </div>

        <div
          className="flex items-stretch"
          style={{
            paddingLeft: `${sidePadding}px`,
            paddingRight: `${sidePadding}px`,
            transform: `translateX(${translatePx}px)`,
            transition: disableAnim
              ? "none"
              : "transform 0.7s cubic-bezier(0.3,0.6,0.35,1)",
          }}
        >
          {loopedCards.map((card, i) => {
            const isActive = i === index;
            const isSide = i === index - 1 || i === index + 1;

            return (
              <div
                key={i}
                className="relative rounded-3xl flex-shrink-0 flex flex-col items-center text-center transition-all duration-500"
                style={{ width: `${cardWidth}px`, marginRight: `${gap}px` }}
              >
                <div
                  className={`w-full h-full rounded-3xl p-8 flex flex-col items-center text-center
                  ${
                    isActive
                      ? "bg-white shadow-2xl scale-100"
                      : isSide
                      ? "bg-neutral-900/80 scale-95"
                      : "bg-neutral-900/40 scale-90"
                  }
                `}
                >

                  {/* Ícono con tamaño personalizado */}
                  <img
                    src={card.icon}
                    className={`${card.iconSize} object-contain mb-4`}
                    alt={card.title}
                  />

                  {/* Título */}
                  <h3
                    className={`text-xl font-extrabold mb-2 font-montserrat_bold ${
                      isActive ? "text-black" : "text-white/90"
                    }`}
                  >
                    {card.title}
                  </h3>

                  {/* Descripción */}
                  <p
                    className={`text-sm mb-4 font-montserrat_regular ${
                      isActive ? "text-black/80" : "text-white/50"
                    }`}
                  >
                    {card.description}
                  </p>

                  {/* Bullets */}
                  <ul className="text-left space-y-1">
                    {card.bullets.map((b, idx) => (
                      <li
                        key={idx}
                        className={`text-sm font-montserrat_regular ${
                          isActive ? "text-black/70" : "text-white/50"
                        }`}
                      >
                        <span className="font-montserrat_semibold">{b.label}:</span> {b.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-6 mt-12 pb-32">
        <button
          onClick={prev}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-neutral-900 hover:bg-neutral-700 text-white shadow-md"
        >
          ←
        </button>

        <button
          onClick={next}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white hover:bg-neutral-200 text-black shadow-md"
        >
          →
        </button>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Card, Chip, cn } from "@heroui/react";
import { Icon } from "@iconify/react";
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
    {
    title: "Contratos en Proceso",
    value: "12",
    change: "0%",
    changeType: "neutral",
    trendType: "neutral",
  },
];

const TrendCard = ({
  title,
  value,
  change,
  changeType,
  trendType,
}: TrendCardProps) => {
  return (
    
    <Card className="relative bg-white dark:bg-[#131919] rounded-xl border border-transparent shadow-none p-4 ">
      <dt className="text-xs sm:text-sm md:text-xs lg:text-xs xl:text-sm 2xl:text-sm text-default-500 font-montserrat_regular lg:max-w-[90px] xl:max-w-[90px] 2xl:max-w-[200px]">
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
  return (
    <div className="space-y-6">

      {/* Tarjetas */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
        {cardsData.map((card, index) => (
          <TrendCard key={index} {...card} />
        ))}
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



      {/* Info 8 */}
      <div className="bg-white dark:bg-[#131919] rounded-xl">
        <p className="p-4 h-[110px] font-montserrat_bold text-titles dark:text-white">
          Información 8
        </p>
      </div>

    </div>
  );
};

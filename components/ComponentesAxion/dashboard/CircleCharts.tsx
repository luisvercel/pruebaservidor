// @ts-nocheck
"use client";

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
} from "recharts";

import {
  Card,
  Button,
  Select,
  SelectItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

import { Icon } from "@iconify/react";

/* -------------------------------------------------------------------------- */
/*                                   Data                                     */
/* -------------------------------------------------------------------------- */

const data = [
  {
    title: "Análisis 1",
    color: "warning",
    chartData: [
      { name: "Dato 1", value: 400, fill: "hsl(var(--heroui-warning-200))" },
      { name: "Dato 2", value: 300, fill: "hsl(var(--heroui-warning-400))" },
      { name: "Dato 3", value: 300, fill: "hsl(var(--heroui-warning-600))" },
      { name: "Dato 4", value: 200, fill: "hsl(var(--heroui-warning-800))" },
    ],
  },
  {
    title: "Análisis 2",
    color: "success",
    chartData: [
      { name: "Dato 5", value: 450, fill: "hsl(var(--heroui-success-200))" },
      { name: "Dato 6", value: 300, fill: "hsl(var(--heroui-success-400))" },
      { name: "Dato 7", value: 250, fill: "hsl(var(--heroui-success-600))" },
      { name: "Dato 8", value: 200, fill: "hsl(var(--heroui-success-800))" },
    ],
  },
  {
    title: "Análisis 3",
    color: "danger",
    chartData: [
      { name: "Dato 9", value: 350, fill: "hsl(var(--heroui-danger-200))" },
      { name: "Dato 10", value: 280, fill: "hsl(var(--heroui-danger-400))" },
      { name: "Dato 11", value: 220, fill: "hsl(var(--heroui-danger-600))" },
      { name: "Dato 12", value: 150, fill: "hsl(var(--heroui-danger-800))" },
    ],
  },
    {
    title: "Análisis 4",
    color: "success",
    chartData: [
      { name: "Dato 13", value: 450, fill: "#4dbbb8" },
      { name: "Dato 14", value: 300, fill: "#2c8183" },
      { name: "Dato 15", value: 250, fill: "#165056" },
      { name: "Dato 16", value: 200, fill: "#062a30" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                Main Component                               */
/* -------------------------------------------------------------------------- */

export default function CircleCharts() {
  return (
    <div className="w-full gap-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
      {data.map((item, index) => (
        <CircleChartCard key={index} {...item} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Card Component                                 */
/* -------------------------------------------------------------------------- */

function CircleChartCard({ title, chartData }) {
  return (
    <Card className="    
        min-h-[220px]
        dark:bg-[#131919]
        p-4
        border-0
        shadow-none
        //hover:shadow-[0_2px_30px_rgba(127,139,146,0.18)]
        transition-shadow"
        >
      {/* Header */}
      <div className="items-center justify-between ">
        <h3 className="font-montserrat_bold text-titles mb-3 dark:text-white">
          {title}
        </h3>

        <div className="flex items-center gap-2">
          <Select
            size="sm"
            className="min-w-[90px]"
            defaultSelectedKeys={["day"]}
          >
            <SelectItem key="day" className="dark:bg-[#2e3133]">Día</SelectItem>
            <SelectItem key="week">Semana</SelectItem>
            <SelectItem key="month">Mes</SelectItem>
          </Select>

          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <Icon icon="solar:menu-dots-bold" width={16} height={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="details">Detalles</DropdownItem>
              <DropdownItem key="export">Exportar</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>


      {/* Chart */}
      <ResponsiveContainer width="100%" height={120}>
        <PieChart>
          <Tooltip />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius="55%"
            paddingAngle={-15}
            strokeWidth={0}
          />
        </PieChart>
      </ResponsiveContainer>


      {/* Legend */}
      <div className="  
        text-tiny 
        text-default-500
        flex flex-wrap items-center 
        justify-center
        gap-x-4 gap-y-2
        p-4 
        lg:p-0
        "
        >
        
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span>{item.name}</span>
          </div>
        ))}

      </div>


    </Card>
  );
}

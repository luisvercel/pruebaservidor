"use client";

import React from "react";
import * as Recharts from "recharts";

const ResponsiveContainer = Recharts.ResponsiveContainer as any;

type ChartItem = {
  name: string;
  value: number;
  fill: string;
};

type SingleLevelPieChartProps = {
  data: ChartItem[];
  isAnimationActive?: boolean;
};

export default function SingleLevelPieChart({
  data,
  isAnimationActive = true,
}: SingleLevelPieChartProps) {

  const PieChart = Recharts.PieChart as any;
  const Pie = Recharts.Pie as any;
  const Tooltip = Recharts.Tooltip as any;

  const formatCurrency = (value: number) =>
    `$${value.toLocaleString("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="w-full h-[350px] sm:h-[380px] md:h-[435px] lg:h-[450px] xl:h-[355px] 2xl:h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius="70%"
            labelLine
            label={({ name, value, x, y, textAnchor, fill }: any) => (
              <text
                x={x}
                y={y}
                textAnchor={textAnchor}
                dominantBaseline="central"
                fill={fill}   
                className="
                  font-montserrat_medium
                  text-[10px]
                  sm:text-xs
                  md:text-sm
                  lg:text-base
                  xl:text-xs
                  2xl:text-base
                "
              >
                {name} {formatCurrency(value)}
              </text>
            )}

            isAnimationActive={isAnimationActive}
          />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

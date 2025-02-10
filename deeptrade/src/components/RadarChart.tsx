// components/CharacteristicsRadarChart.tsx
"use client";

import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from "recharts";
import { useAgent } from "@/app/hooks/useAgent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RadarChartProps {
  investor_name: string;
}

export default function CharacteristicsRadarChart({
  investor_name,
}: RadarChartProps) {
  // Retrieve investor profiles using the custom hook
  const { buffett, soros,  ackman, burry, hwang} = useAgent();

  // Select the correct investor based on the provided investor_name
  const investor = (() => {
    switch (investor_name) {
      case "Warren Buffett":
        return buffett;
      case "George Soros":
        return soros;
      case "Bill Ackman":
        return ackman;
      case "Michael Burry":
        return burry;
      case "Bill Hwang":
        return hwang;
      default:
        return buffett; // Fallback in case of no match
    }
  })();

  // Map string ratings to numerical values
  const ratingMap: Record<string, number> = {
    low: 1,
    medium: 2,
    high: 3,
  };

  // Define the five characteristics with keys matching those on the investor object
  const characteristics = [
    { key: "risk_tolerance", label: "Risk Tolerance" },
    { key: "trading_discipline", label: "Trading Discipline" },
    { key: "patience", label: "Patience" },
    { key: "adaptability", label: "Adaptability" },
    { key: "analytical_ability", label: "Analytical Ability" },
  ];

  const data = characteristics.map((char) => ({
    subject: char.label,
    rating: ratingMap[investor[char.key]],
  }));

  return (
    <>
  <div className="flex gap-8 items-start">
    <Card className="mb-8 max-w-[700px]">
      <CardHeader>
        <CardTitle className="flex items-center">
          Investor Characteristics Radar Chart
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadarChart width={700} height={500} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 3]}
            tickCount={4}
            tickFormatter={(value: number) => {
              if (value === 1) return "Low";
              if (value === 2) return "Medium";
              if (value === 3) return "High";
              return value;
            }}
          />
          <Radar
            name={investor_name}
            dataKey="rating"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Legend />
          <Tooltip />
        </RadarChart>
      </CardContent>
    </Card>

    <Card className="mb-8 max-w-[800px]">
      <CardHeader><strong>Description</strong></CardHeader>
      <CardContent>
        {investor.description}
      </CardContent>
    </Card>
  </div>
</>
  );
}

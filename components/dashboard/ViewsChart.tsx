// components/dashboard/ViewsChart.tsx
"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Eye, Touchpad, Percent } from "lucide-react";

export interface ChartData {
  date: string;
  visit: number;
  swipe: number;
}

interface ViewsChartProps {
  data: ChartData[];
  totalVisits: number;
  totalSwipes: number;
  timeRange: string;
  setTimeRange: (val: string) => void;
}

// Konfigurasi ChartConfig dengan warna Hex langsung
const chartConfig = {
  visit: {
    label: "Visited",
    color: "#9AC4FD", // Soft Blue
  },
  swipe: {
    label: "Swiped",
    color: "#447DFC", // Vibrant Blue
  },
} satisfies ChartConfig;

export default function ViewsChart({
  data,
  totalVisits,
  totalSwipes,
  timeRange,
  setTimeRange,
}: ViewsChartProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    const savedState = localStorage.getItem("views_chart_open");
    if (savedState !== null) {
      setIsOpen(savedState === "true");
    }
  }, []);

  const toggleCollapsible = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      localStorage.setItem("views_chart_open", String(newState));
      return newState;
    });
  };

  // Kalkulasi Conversion Rate (% Tamu yang lanjut Swipe Up)
  const conversionRate =
    totalVisits > 0 ? Math.round((totalSwipes / totalVisits) * 100) : 0;

  return (
    <Card className="pt-0 shadow-sm border transition-all duration-300">
      <CardHeader className="flex flex-col gap-3 space-y-0 border-b py-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-base font-semibold text-foreground">
            Analitik Interaksi Tamu
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Perbandingan tamu yang membuka link vs menggeser (swipe) undangan
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          {isOpen && (
            <Select
              value={timeRange}
              onValueChange={(val: string | null) => val && setTimeRange(val)}
            >
              <SelectTrigger
                className="w-32.5 h-8 text-xs rounded-lg"
                aria-label="Pilih rentang waktu"
              >
                <SelectValue placeholder="7 Hari Terakhir" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="7d" className="rounded-lg text-xs">
                  7 Hari Terakhir
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg text-xs">
                  30 Hari Terakhir
                </SelectItem>
                <SelectItem value="90d" className="rounded-lg text-xs">
                  90 Hari Terakhir
                </SelectItem>
              </SelectContent>
            </Select>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsible}
            title={isOpen ? "Sembunyikan Grafik" : "Tampilkan Grafik"}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 animate-in fade-in-50 duration-200">
          {/* Sub-Metrics Ringkasan Quick Stats dengan Warna Hex Disesuaikan */}
          <div className="grid grid-cols-3 gap-2 mb-6 p-3 bg-muted/40 rounded-xl border text-center sm:text-left">
            {/* Metric Visit (#9AC4FD) */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div
                className="p-1.5 rounded-md"
                style={{
                  backgroundColor: "rgba(154, 196, 253, 0.2)",
                  color: "#508CEB",
                }}
              >
                <Eye className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  Total Visits
                </p>
                <p className="text-sm font-bold text-foreground">
                  {totalVisits}
                </p>
              </div>
            </div>

            {/* Metric Swipe (#447DFC) */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div
                className="p-1.5 rounded-md"
                style={{
                  backgroundColor: "rgba(68, 125, 252, 0.15)",
                  color: "#447DFC",
                }}
              >
                <Touchpad className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  Total Swipes
                </p>
                <p className="text-sm font-bold text-foreground">
                  {totalSwipes}
                </p>
              </div>
            </div>

            {/* Metric Conversion Rate (Tetap Emerald) */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md dark:bg-emerald-950/50">
                <Percent className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  Conversion Rate
                </p>
                <p className="text-sm font-bold text-foreground">
                  {conversionRate}%
                </p>
              </div>
            </div>
          </div>

          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-65 w-full"
          >
            <AreaChart
              data={data}
              margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                {/* Gradasi Hex Direct #9AC4FD untuk Visit */}
                <linearGradient id="fillVisit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9AC4FD" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9AC4FD" stopOpacity={0.1} />
                </linearGradient>

                {/* Gradasi Hex Direct #447DFC untuk Swipe */}
                <linearGradient id="fillSwipe" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#447DFC" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#447DFC" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} strokeDasharray="3 3" />

              {/* Sumbu X */}
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={28}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("id-ID", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />

              {/* Sumbu Y */}
              <YAxis
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                style={{ fontSize: "11px" }}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />

              {/* Area 1: Visit (#9AC4FD) */}
              <Area
                dataKey="visit"
                type="natural"
                fill="url(#fillVisit)"
                stroke="#9AC4FD"
                strokeWidth={2}
              >
                <LabelList
                  dataKey="visit"
                  position="top"
                  offset={6}
                  className="font-semibold text-[10px]"
                  style={{ fill: "#60A5FA" }}
                />
              </Area>

              {/* Area 2: Swipe (#447DFC) */}
              <Area
                dataKey="swipe"
                type="natural"
                fill="url(#fillSwipe)"
                stroke="#447DFC"
                strokeWidth={2}
              >
                <LabelList
                  dataKey="swipe"
                  position="top"
                  offset={6}
                  className="font-semibold text-[10px]"
                  style={{ fill: "#2563EB" }}
                />
              </Area>

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}

"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { revenueData, expenseData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";

export function Overview() {
  const { t, language } = useLanguage();

  const processChartData = () => {
    const dataByMonth: { [key: string]: { name: string; revenue: number; expenses: number } } = {};

    const currentYear = new Date().getFullYear();
    const localeString = language === 'en' ? 'en-US' : (language === 'ja' ? 'ja-JP' : 'vi-VN');

    for(let i=0; i<12; i++){
      const monthName = new Date(currentYear, i, 1).toLocaleString(localeString, { month: 'short' });
      dataByMonth[monthName] = { name: monthName, revenue: 0, expenses: 0 };
    }
  
    revenueData.forEach((item) => {
      const month = new Date(item.date).toLocaleString(localeString, { month: "short" });
      if(dataByMonth[month]) {
        dataByMonth[month].revenue += item.amount;
      }
    });

    expenseData.forEach((item) => {
      const month = new Date(item.date).toLocaleString(localeString, { month: "short" });
      if(dataByMonth[month]) {
        dataByMonth[month].expenses += item.amount;
      }
    });

    return Object.values(dataByMonth);
  };

  const data = processChartData();

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => formatCurrency(value as number)}
        />
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))' }}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
          formatter={(value: number) => formatCurrency(value)}
        />
        <Legend 
          wrapperStyle={{fontSize: "0.8rem"}}
          formatter={(value, entry, index) => value === 'revenue' ? t('revenue') : t('expenses')}
        />
        <Bar
          dataKey="revenue"
          name={t('revenue')}
          fill="hsl(var(--accent))"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="expenses"
          name={t('expenses')}
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

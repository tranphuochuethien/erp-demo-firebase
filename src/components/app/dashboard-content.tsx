"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown, CircleDollarSign } from "lucide-react";
import { Overview } from "@/components/app/overview";
import { UpcomingAppointments } from "@/components/app/upcoming-appointments";
import { formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";
import type { Appointment } from "@/lib/data";

interface DashboardContentProps {
  totalRevenue: number;
  totalExpenses: number;
  profit: number;
  upcomingAppointments: Appointment[];
  appointmentData: Appointment[];
}

export function DashboardContent({
  totalRevenue,
  totalExpenses,
  profit,
  upcomingAppointments,
  appointmentData,
}: DashboardContentProps) {
  const { t } = useLanguage();

  return (
    <div className="flex-1 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t("dashboard")}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("totalRevenue")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("basedOnIncome")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("totalExpenses")}</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("basedOnExpenses")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("profit")}</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                profit >= 0 ? "text-accent" : "text-destructive"
              }`}
            >
              {formatCurrency(profit)}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("revenueMinusExpenses")}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t("financialOverview")}</CardTitle>
            <CardDescription>{t("monthlyRevenueVsExpenses")}</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>{t("upcomingAppointments")}</CardTitle>
            <CardDescription>
              {t("youHaveXAppointments", { count: upcomingAppointments.length })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingAppointments appointments={appointmentData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

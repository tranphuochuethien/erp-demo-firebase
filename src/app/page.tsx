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
import { revenueData, expenseData, appointmentData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = expenseData.reduce((acc, curr) => acc + curr.amount, 0);
  const profit = totalRevenue - totalExpenses;

  const upcomingAppointments = appointmentData.filter(
    (a) => new Date(a.date) >= new Date()
  );

  return (
    <div className="flex-1 space-y-6">
       <h1 className="text-3xl font-bold tracking-tight">Bảng điều khiển</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Dựa trên tất cả thu nhập đã ghi
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng chi phí</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">
              Dựa trên tất cả chi phí đã ghi
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lợi nhuận</CardTitle>
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
              Doanh thu trừ chi phí
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Tổng quan tài chính</CardTitle>
            <CardDescription>Doanh thu hàng tháng so với chi phí.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Các cuộc hẹn sắp tới</CardTitle>
            <CardDescription>
              Bạn có {upcomingAppointments.length} cuộc hẹn sắp tới.
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

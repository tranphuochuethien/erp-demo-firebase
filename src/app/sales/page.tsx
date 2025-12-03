"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { revenueData, type Revenue } from "@/lib/data";
import { formatCurrency, cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function SalesPage() {
  const revenueByCategory = React.useMemo(() => {
    const categoryMap: { [key: string]: number } = {};
    revenueData.forEach((item) => {
      if (categoryMap[item.category]) {
        categoryMap[item.category] += item.amount;
      } else {
        categoryMap[item.category] = item.amount;
      }
    });
    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));
  }, []);

  const topClients = React.useMemo(() => {
    const clientMap: { [key: string]: number } = {};
    revenueData.forEach((item) => {
      if (clientMap[item.source]) {
        clientMap[item.source] += item.amount;
      } else {
        clientMap[item.source] = item.amount;
      }
    });
    return Object.entries(clientMap)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Thống kê bán hàng</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Doanh thu theo danh mục</CardTitle>
            <CardDescription>
              Phân tích doanh thu từ các danh mục khác nhau.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {revenueByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                />
                 <Legend wrapperStyle={{fontSize: "0.8rem"}}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Khách hàng hàng đầu</CardTitle>
            <CardDescription>
              Những khách hàng đóng góp doanh thu cao nhất.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClients.map((client, index) => (
                <div key={index} className="flex items-center">
                  <Avatar className="h-10 w-10">
                     <AvatarImage
                      src={`https://picsum.photos/seed/${client.name.replace(
                        /\s/g,
                        ""
                      )}/100/100`}
                      alt="Avatar"
                      data-ai-hint="person portrait"
                    />
                    <AvatarFallback>
                      {client.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium leading-none">
                      {client.name}
                    </p>
                  </div>
                  <div className="ml-auto font-semibold text-accent">
                    {formatCurrency(client.total)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử giao dịch</CardTitle>
          <CardDescription>
            Danh sách chi tiết tất cả các giao dịch bán hàng.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nguồn</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead className="text-right">Ngày</TableHead>
                <TableHead className="text-right">Số tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.source}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">
                    {format(new Date(item.date), "d MMM, yyyy", { locale: vi })}
                  </TableCell>
                  <TableCell className="text-right text-accent font-semibold">
                    {formatCurrency(item.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

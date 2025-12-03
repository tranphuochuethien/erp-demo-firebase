import { revenueData, expenseData, appointmentData } from "@/lib/data";
import { DashboardContent } from "@/components/app/dashboard-content";

export default function DashboardPage() {
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = expenseData.reduce((acc, curr) => acc + curr.amount, 0);
  const profit = totalRevenue - totalExpenses;

  const upcomingAppointments = appointmentData.filter(
    (a) => new Date(a.date) >= new Date()
  );

  return (
    <DashboardContent
      totalRevenue={totalRevenue}
      totalExpenses={totalExpenses}
      profit={profit}
      upcomingAppointments={upcomingAppointments}
      appointmentData={appointmentData}
    />
  );
}

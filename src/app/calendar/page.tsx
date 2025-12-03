"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  appointmentData as initialAppointmentData,
  type Appointment,
} from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { vi } from "date-fns/locale";

const appointmentFormSchema = z.object({
  client: z.string().min(2, "Tên khách hàng là bắt buộc."),
  description: z.string().min(5, "Mô tả phải có ít nhất 5 ký tự."),
  date: z.date({ required_error: "Ngày hẹn là bắt buộc." }),
  time: z
    .string()
    .regex(
      /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i,
      "Vui lòng nhập thời gian hợp lệ (ví dụ: 02:00 PM)."
    ),
});

export default function CalendarPage() {
  const [appointments, setAppointments] = React.useState<Appointment[]>(initialAppointmentData);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
  });

  React.useEffect(() => {
    if (selectedDate) {
      form.setValue("date", selectedDate);
    }
  }, [selectedDate, form]);

  function onSubmit(values: z.infer<typeof appointmentFormSchema>) {
    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      ...values,
      date: format(values.date, "yyyy-MM-dd"),
    };
    setAppointments(
      [newAppointment, ...appointments].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    );
    toast({
      title: "Đã lên lịch cuộc hẹn",
      description: `Cuộc hẹn với ${newAppointment.client} vào ${format(
        new Date(newAppointment.date),
        "PPP", { locale: vi }
      )} lúc ${newAppointment.time}.`,
    });
    setDialogOpen(false);
    form.reset({date: selectedDate});
  }

  const appointmentsForSelectedDay = appointments.filter(
    (appointment) =>
      format(new Date(appointment.date), "yyyy-MM-dd") ===
      (selectedDate ? format(selectedDate, "yyyy-MM-dd") : "")
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-4">
        <CardContent className="p-0 flex justify-center">
          <Calendar
            locale={vi}
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="p-3"
          />
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              {selectedDate ? format(selectedDate, "d MMMM", { locale: vi }) : "Chọn một ngày"}
            </CardTitle>
            <CardDescription>
              {selectedDate ? format(selectedDate, "eeee", { locale: vi }) : ""}
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Mới
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Cuộc hẹn mới</DialogTitle>
                <DialogDescription>Lên lịch một cuộc hẹn mới.</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 py-4"
                >
                  <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Khách hàng</FormLabel>
                        <FormControl>
                          <Input placeholder="ví dụ: Jane Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="ví dụ: Họp khởi động dự án"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngày</FormLabel>
                        <p className="text-sm rounded-md border border-input p-2.5 bg-muted">
                          {field.value
                            ? format(field.value, "PPP", { locale: vi })
                            : "Chọn một ngày trên lịch"}
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thời gian</FormLabel>
                        <FormControl>
                          <Input placeholder="ví dụ: 02:30 CH" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Lên lịch hẹn</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {appointmentsForSelectedDay.length > 0 ? (
            <div className="space-y-4">
              {appointmentsForSelectedDay.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-start space-x-4 rounded-lg border bg-card text-card-foreground p-4 shadow-sm"
                >
                  <Avatar>
                    <AvatarImage
                      src={`https://picsum.photos/seed/${appointment.client.replace(
                        /\s/g,
                        ""
                      )}/100/100`}
                      alt="Avatar"
                      data-ai-hint="person portrait"
                    />
                    <AvatarFallback>
                      {appointment.client.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold">{appointment.time}</p>
                    <p className="text-sm">{appointment.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.client}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-10 h-full flex flex-col items-center justify-center">
              <CalendarIcon className="mx-auto h-12 w-12 opacity-50" />
              <p className="mt-4">Không có cuộc hẹn nào cho ngày này.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

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
import { useLanguage } from "@/components/providers/language-provider";

export default function CalendarPage() {
  const { t, locale } = useLanguage();
  const [appointments, setAppointments] = React.useState<Appointment[]>(
    initialAppointmentData
  );
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const appointmentFormSchema = z.object({
    client: z.string().min(2, t("clientNameRequired")),
    description: z.string().min(5, t("descriptionMin5")),
    date: z.date({ required_error: t("dateRequired") }),
    time: z
      .string()
      .regex(
        /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i,
        t("invalidTimeFormat")
      ),
  });

  const form = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      client: "",
      description: "",
      time: "",
    },
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
      title: t("appointmentScheduled"),
      description: t("appointmentScheduledDesc", {
        client: newAppointment.client,
        date: format(new Date(newAppointment.date), "PPP", { locale: locale }),
        time: newAppointment.time,
      }),
    });
    setDialogOpen(false);
    form.reset({ client: "", description: "", time: "", date: selectedDate });
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
            locale={locale}
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
              {selectedDate
                ? format(selectedDate, "d MMMM", { locale: locale })
                : t("selectDate")}
            </CardTitle>
            <CardDescription>
              {selectedDate
                ? format(selectedDate, "eeee", { locale: locale })
                : ""}
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                {t("new")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("newAppointment")}</DialogTitle>
                <DialogDescription>
                  {t("newAppointmentDesc")}
                </DialogDescription>
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
                        <FormLabel>{t("client")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("clientPlaceholder")}
                            {...field}
                          />
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
                        <FormLabel>{t("description")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("descriptionPlaceholder")}
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
                        <FormLabel>{t("date")}</FormLabel>
                        <p className="text-sm rounded-md border border-input p-2.5 bg-muted">
                          {field.value
                            ? format(field.value, "PPP", { locale: locale })
                            : t("selectDateOnCalendar")}
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
                        <FormLabel>{t("time")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("timePlaceholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">{t("scheduleAppointment")}</Button>
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
              <p className="mt-4">{t("noAppointmentsForDate")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

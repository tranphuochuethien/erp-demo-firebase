import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Appointment } from "@/lib/data";
import { format } from "date-fns";

export function UpcomingAppointments({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const upcoming = appointments
    .filter((a) => new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {upcoming.length > 0 ? (
        upcoming.map((appointment) => (
          <div className="flex items-center" key={appointment.id}>
            <Avatar className="h-9 w-9">
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
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {appointment.client}
              </p>
              <p className="text-sm text-muted-foreground">
                {appointment.description}
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="font-medium text-sm">{appointment.time}</p>
              <p className="text-xs text-muted-foreground">{format(new Date(appointment.date), "MMM d")}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground text-center py-8">
          No upcoming appointments.
        </p>
      )}
    </div>
  );
}

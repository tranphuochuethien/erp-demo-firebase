"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Calendar as CalendarIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/",
      label: "Bảng điều khiển",
      icon: LayoutDashboard,
    },
    {
      href: "/revenue",
      label: "Doanh thu",
      icon: TrendingUp,
    },
    {
      href: "/expenses",
      label: "Chi phí",
      icon: TrendingDown,
    },
    {
      href: "/calendar",
      label: "Lịch",
      icon: CalendarIcon,
    },
  ];

  return (
    <nav
      className={cn("flex flex-col px-2", className)}
      {...props}
    >
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <Link href={item.href}>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </nav>
  );
}

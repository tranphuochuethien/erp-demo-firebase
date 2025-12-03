"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Calendar as CalendarIcon,
  ShoppingBag,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/components/providers/language-provider";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const menuItems = [
    {
      href: "/",
      label: t("dashboard"),
      icon: LayoutDashboard,
    },
    {
      href: "/revenue",
      label: t("revenue"),
      icon: TrendingUp,
    },
    {
      href: "/expenses",
      label: t("expenses"),
      icon: TrendingDown,
    },
    {
      href: "/calendar",
      label: t("calendar"),
      icon: CalendarIcon,
    },
    {
        href: "/sales",
        label: t("sales"),
        icon: ShoppingBag,
    }
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

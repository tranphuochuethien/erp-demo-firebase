"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { vi, ja, enUS } from "date-fns/locale";

export type Language = "en" | "vi" | "ja";

const translations = {
  vi: {
    dashboard: "Bảng điều khiển",
    revenue: "Doanh thu",
    expenses: "Chi phí",
    calendar: "Lịch",
    sales: "Bán hàng",
    totalRevenue: "Tổng doanh thu",
    totalExpenses: "Tổng chi phí",
    profit: "Lợi nhuận",
    basedOnIncome: "Dựa trên tất cả thu nhập đã ghi",
    basedOnExpenses: "Dựa trên tất cả chi phí đã ghi",
    revenueMinusExpenses: "Doanh thu trừ chi phí",
    financialOverview: "Tổng quan tài chính",
    monthlyRevenueVsExpenses: "Doanh thu hàng tháng so với chi phí.",
    upcomingAppointments: "Các cuộc hẹn sắp tới",
    youHaveXAppointments: "Bạn có {count} cuộc hẹn sắp tới.",
    noAppointments: "Không có cuộc hẹn sắp tới.",
    language: "Ngôn ngữ",
    english: "Tiếng Anh",
    vietnamese: "Tiếng Việt",
    japanese: "Tiếng Nhật",
  },
  en: {
    dashboard: "Dashboard",
    revenue: "Revenue",
    expenses: "Expenses",
    calendar: "Calendar",
    sales: "Sales",
    totalRevenue: "Total Revenue",
    totalExpenses: "Total Expenses",
    profit: "Profit",
    basedOnIncome: "Based on all recorded income",
    basedOnExpenses: "Based on all recorded expenses",
    revenueMinusExpenses: "Revenue minus expenses",
    financialOverview: "Financial Overview",
    monthlyRevenueVsExpenses: "Monthly revenue vs expenses.",
    upcomingAppointments: "Upcoming Appointments",
    youHaveXAppointments: "You have {count} upcoming appointments.",
    noAppointments: "No upcoming appointments.",
    language: "Language",
    english: "English",
    vietnamese: "Vietnamese",
    japanese: "Japanese",
  },
  ja: {
    dashboard: "ダッシュボード",
    revenue: "収益",
    expenses: "経費",
    calendar: "カレンダー",
    sales: "販売",
    totalRevenue: "総収益",
    totalExpenses: "総経費",
    profit: "利益",
    basedOnIncome: "記録されたすべての収入に基づく",
    basedOnExpenses: "記録されたすべての経費に基づく",
    revenueMinusExpenses: "収益から経費を差し引いたもの",
    financialOverview: "財務概要",
    monthlyRevenueVsExpenses: "月次の収益と経費。",
    upcomingAppointments: "今後の予定",
    youHaveXAppointments: "{count} 件の予定があります。",
    noAppointments: "今後の予定はありません。",
    language: "言語",
    english: "英語",
    vietnamese: "ベトナム語",
    japanese: "日本語",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations["en"], params?: Record<string, string | number>) => string;
  locale: any;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi");

  const t = (key: keyof typeof translations["en"], params?: Record<string, string | number>) => {
    let text = translations[language][key] || translations["en"][key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  const getLocale = () => {
    switch (language) {
      case "vi":
        return vi;
      case "ja":
        return ja;
      case "en":
      default:
        return enUS;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, locale: getLocale() }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

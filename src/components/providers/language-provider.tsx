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
    addRevenue: "Thêm doanh thu",
    addRevenueDesc: "Ghi lại một nguồn thu nhập mới.",
    source: "Nguồn",
    sourcePlaceholder: "ví dụ: Khách hàng X",
    category: "Danh mục",
    categoryPlaceholderRevenue: "ví dụ: Phát triển web",
    amount: "Số tiền",
    date: "Ngày",
    pickDate: "Chọn một ngày",
    saveRevenue: "Lưu doanh thu",
    revenueHistory: "Lịch sử doanh thu",
    revenueHistoryDesc: "Nhật ký tất cả các nguồn thu nhập của bạn.",
    actions: "Hành động",
    toggleMenu: "Chuyển đổi menu",
    edit: "Chỉnh sửa",
    delete: "Xóa",
    revenueAdded: "Đã thêm doanh thu",
    revenueAddedDesc: "{amount} từ {source} đã được thêm.",
    sourceMin2: "Nguồn phải có ít nhất 2 ký tự.",
    categoryMin2: "Danh mục phải có ít nhất 2 ký tự.",
    amountPositive: "Số tiền phải là một số dương.",
    dateRequired: "Ngày là bắt buộc.",
    addExpense: "Thêm chi phí",
    addExpenseDesc: "Ghi lại một khoản chi phí kinh doanh mới.",
    itemService: "Mục/Dịch vụ",
    itemServicePlaceholder: "ví dụ: Đăng ký phần mềm",
    categoryPlaceholderExpense: "ví dụ: Phần mềm",
    saveExpense: "Lưu chi phí",
    expenseHistory: "Lịch sử chi phí",
    expenseHistoryDesc: "Nhật ký tất cả các chi phí kinh doanh của bạn.",
    item: "Mục",
    expenseAdded: "Đã thêm chi phí",
    expenseAddedDesc: "{amount} cho {item} đã được thêm.",
    itemMin2: "Tên mục phải có ít nhất 2 ký tự.",
    new: "Mới",
    newAppointment: "Cuộc hẹn mới",
    newAppointmentDesc: "Lên lịch một cuộc hẹn mới.",
    client: "Khách hàng",
    clientPlaceholder: "ví dụ: Jane Smith",
    description: "Mô tả",
    descriptionPlaceholder: "ví dụ: Họp khởi động dự án",
    time: "Thời gian",
    timePlaceholder: "ví dụ: 02:30 CH",
    scheduleAppointment: "Lên lịch hẹn",
    selectDateOnCalendar: "Chọn một ngày trên lịch",
    noAppointmentsForDate: "Không có cuộc hẹn nào cho ngày này.",
    clientNameRequired: "Tên khách hàng là bắt buộc.",
    descriptionMin5: "Mô tả phải có ít nhất 5 ký tự.",
    invalidTimeFormat: "Vui lòng nhập thời gian hợp lệ (ví dụ: 02:00 PM).",
    appointmentScheduled: "Đã lên lịch cuộc hẹn",
    appointmentScheduledDesc: "Cuộc hẹn với {client} vào {date} lúc {time}.",
    selectDate: "Chọn một ngày",
    salesStatistics: "Thống kê bán hàng",
    revenueByCategory: "Doanh thu theo danh mục",
    revenueByCategoryDesc: "Phân tích doanh thu từ các danh mục khác nhau.",
    topClients: "Khách hàng hàng đầu",
    topClientsDesc: "Những khách hàng đóng góp doanh thu cao nhất.",
    transactionHistory: "Lịch sử giao dịch",
    transactionHistoryDesc: "Danh sách chi tiết tất cả các giao dịch bán hàng."
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
    addRevenue: "Add Revenue",
    addRevenueDesc: "Record a new source of income.",
    source: "Source",
    sourcePlaceholder: "e.g., Client X",
    category: "Category",
    categoryPlaceholderRevenue: "e.g., Web Development",
    amount: "Amount",
    date: "Date",
    pickDate: "Pick a date",
    saveRevenue: "Save Revenue",
    revenueHistory: "Revenue History",
    revenueHistoryDesc: "A log of all your income sources.",
    actions: "Actions",
    toggleMenu: "Toggle menu",
    edit: "Edit",
    delete: "Delete",
    revenueAdded: "Revenue added",
    revenueAddedDesc: "{amount} from {source} has been added.",
    sourceMin2: "Source must be at least 2 characters.",
    categoryMin2: "Category must be at least 2 characters.",
    amountPositive: "Amount must be a positive number.",
    dateRequired: "A date is required.",
    addExpense: "Add Expense",
    addExpenseDesc: "Record a new business expense.",
    itemService: "Item/Service",
    itemServicePlaceholder: "e.g., Software Subscription",
    categoryPlaceholderExpense: "e.g., Software",
    saveExpense: "Save Expense",
    expenseHistory: "Expense History",
    expenseHistoryDesc: "A log of all your business expenses.",
    item: "Item",
    expenseAdded: "Expense added",
    expenseAddedDesc: "{amount} for {item} has been added.",
    itemMin2: "Item name must be at least 2 characters.",
    new: "New",
    newAppointment: "New Appointment",
    newAppointmentDesc: "Schedule a new appointment.",
    client: "Client",
    clientPlaceholder: "e.g., Jane Smith",
    description: "Description",
    descriptionPlaceholder: "e.g., Project kickoff meeting",
    time: "Time",
    timePlaceholder: "e.g., 02:30 PM",
    scheduleAppointment: "Schedule Appointment",
    selectDateOnCalendar: "Select a date on the calendar",
    noAppointmentsForDate: "No appointments for this date.",
    clientNameRequired: "Client name is required.",
    descriptionMin5: "Description must be at least 5 characters.",
    invalidTimeFormat: "Please enter a valid time (e.g., 02:00 PM).",
    appointmentScheduled: "Appointment Scheduled",
    appointmentScheduledDesc: "Appointment with {client} on {date} at {time}.",
    selectDate: "Select a date",
    salesStatistics: "Sales Statistics",
    revenueByCategory: "Revenue by Category",
    revenueByCategoryDesc: "An analysis of revenue from different categories.",
    topClients: "Top Clients",
    topClientsDesc: "The highest revenue-generating clients.",
    transactionHistory: "Transaction History",
    transactionHistoryDesc: "A detailed list of all sales transactions."
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
    addRevenue: "収益を追加",
    addRevenueDesc: "新しい収入源を記録します。",
    source: "ソース",
    sourcePlaceholder: "例：クライアントX",
    category: "カテゴリ",
    categoryPlaceholderRevenue: "例：ウェブ開発",
    amount: "金額",
    date: "日付",
    pickDate: "日付を選択",
    saveRevenue: "収益を保存",
    revenueHistory: "収益履歴",
    revenueHistoryDesc: "すべての収入源のログ。",
    actions: "アクション",
    toggleMenu: "メニューを切り替え",
    edit: "編集",
    delete: "削除",
    revenueAdded: "収益が追加されました",
    revenueAddedDesc: "{source} から {amount} が追加されました。",
    sourceMin2: "ソースは2文字以上である必要があります。",
    categoryMin2: "カテゴリは2文字以上である必要があります。",
    amountPositive: "金額は正の数である必要があります。",
    dateRequired: "日付は必須です。",
    addExpense: "経費を追加",
    addExpenseDesc: "新しい事業経費を記録します。",
    itemService: "項目/サービス",
    itemServicePlaceholder: "例：ソフトウェアのサブスクリプション",
    categoryPlaceholderExpense: "例：ソフトウェア",
    saveExpense: "経費を保存",
    expenseHistory: "経費履歴",
    expenseHistoryDesc: "すべての事業経費のログ。",
    item: "項目",
    expenseAdded: "経費が追加されました",
    expenseAddedDesc: "{item} の {amount} が追加されました。",
    itemMin2: "項目名は2文字以上である必要があります。",
    new: "新規",
    newAppointment: "新しい予定",
    newAppointmentDesc: "新しい予定をスケジュールします。",
    client: "クライアント",
    clientPlaceholder: "例：山田花子",
    description: "説明",
    descriptionPlaceholder: "例：プロジェクトキックオフ会議",
    time: "時間",
    timePlaceholder: "例：午後2時30分",
    scheduleAppointment: "予定をスケジュール",
    selectDateOnCalendar: "カレンダーで日付を選択",
    noAppointmentsForDate: "この日の予定はありません。",
    clientNameRequired: "クライアント名は必須です。",
    descriptionMin5: "説明は5文字以上である必要があります。",
    invalidTimeFormat: "有効な時間を入力してください（例：午後2時）。",
    appointmentScheduled: "予定がスケジュールされました",
    appointmentScheduledDesc: "{client} との予定は {date} の {time} です。",
    selectDate: "日付を選択",
    salesStatistics: "販売統計",
    revenueByCategory: "カテゴリ別収益",
    revenueByCategoryDesc: "異なるカテゴリからの収益の分析。",
    topClients: "トップクライアント",
    topClientsDesc: "最も収益を上げているクライアント。",
    transactionHistory: "取引履歴",
    transactionHistoryDesc: "すべての販売取引の詳細なリスト。"
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

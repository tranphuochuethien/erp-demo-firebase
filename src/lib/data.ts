export type Revenue = {
  id: string;
  date: string;
  source: string;
  category: string;
  amount: number;
};

export const revenueData: Revenue[] = [
  { id: '1', date: '2024-05-01', source: 'Client A', category: 'Web Development', amount: 2500 },
  { id: '2', date: '2024-05-03', source: 'Client B', category: 'Consulting', amount: 1500 },
  { id: '3', date: '2024-06-10', source: 'Client C', category: 'Web Development', amount: 3200 },
  { id: '4', date: '2024-06-15', source: 'Client A', category: 'Maintenance', amount: 500 },
  { id: '5', date: '2024-07-22', source: 'Client D', category: 'Design', amount: 1800 },
  { id: '6', date: '2024-07-25', source: 'Client B', category: 'Consulting', amount: 1700 },
];

export type Expense = {
  id: string;
  date: string;
  item: string;
  category: string;
  amount: number;
};

export const expenseData: Expense[] = [
  { id: '1', date: '2024-05-02', item: 'Software Subscription', category: 'Software', amount: 50 },
  { id: '2', date: '2024-06-05', item: 'Office Supplies', category: 'Supplies', amount: 120 },
  { id: '3', date: '2024-06-12', item: 'Freelancer Payment', category: 'Contractors', amount: 1000 },
  { id: '4', date: '2024-07-20', item: 'Cloud Hosting', category: 'Utilities', amount: 75 },
];

export type Appointment = {
  id: string;
  date: string;
  time: string;
  description: string;
  client: string;
};

const today = new Date();
const getFutureDate = (days: number) => {
    const future = new Date();
    future.setDate(today.getDate() + days);
    return future.toISOString().split('T')[0];
}


export const appointmentData: Appointment[] = [
    { id: '1', date: getFutureDate(1), time: '10:00 AM', description: 'Project Kickoff', client: 'Client A' },
    { id: '2', date: getFutureDate(2), time: '02:00 PM', description: 'Design Review', client: 'Client D' },
    { id: '3', date: getFutureDate(4), time: '11:30 AM', description: 'Follow-up call', client: 'Client B' },
    { id: '4', date: getFutureDate(10), time: '09:00 AM', description: 'Quarterly Review', client: 'Client C' },
];

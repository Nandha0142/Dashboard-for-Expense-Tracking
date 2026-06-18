export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
}

export interface Category {
  name: string;
  icon: string;
  color: string;
  budget: number;
}

export interface MonthlyPoint {
  month: string;
  income: number;
  expense: number;
}

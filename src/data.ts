import type { Category, MonthlyPoint, Transaction } from './types';

export const categories: Category[] = [
  { name: 'Food & Dining', icon: '🍽️', color: '#f97316', budget: 600 },
  { name: 'Groceries', icon: '🛒', color: '#22c55e', budget: 500 },
  { name: 'Transport', icon: '🚗', color: '#3b82f6', budget: 300 },
  { name: 'Shopping', icon: '🛍️', color: '#ec4899', budget: 400 },
  { name: 'Entertainment', icon: '🎬', color: '#a855f7', budget: 200 },
  { name: 'Bills & Utilities', icon: '💡', color: '#eab308', budget: 350 },
  { name: 'Health', icon: '💊', color: '#ef4444', budget: 250 },
  { name: 'Salary', icon: '💼', color: '#14b8a6', budget: 0 },
  { name: 'Other', icon: '📦', color: '#64748b', budget: 200 },
];

export const initialTransactions: Transaction[] = [
  { id: 't1', type: 'income', amount: 5200, category: 'Salary', description: 'Monthly salary', date: '2025-01-02' },
  { id: 't2', type: 'expense', amount: 1200, category: 'Bills & Utilities', description: 'Rent', date: '2025-01-03' },
  { id: 't3', type: 'expense', amount: 86.4, category: 'Groceries', description: 'Whole Foods', date: '2025-01-04' },
  { id: 't4', type: 'expense', amount: 42.5, category: 'Food & Dining', description: 'Dinner with friends', date: '2025-01-05' },
  { id: 't5', type: 'expense', amount: 60, category: 'Transport', description: 'Gas refill', date: '2025-01-06' },
  { id: 't6', type: 'expense', amount: 129.99, category: 'Shopping', description: 'Winter jacket', date: '2025-01-08' },
  { id: 't7', type: 'expense', amount: 15.99, category: 'Entertainment', description: 'Movie streaming', date: '2025-01-09' },
  { id: 't8', type: 'income', amount: 5200, category: 'Salary', description: 'Monthly salary', date: '2025-02-02' },
  { id: 't9', type: 'expense', amount: 1200, category: 'Bills & Utilities', description: 'Rent', date: '2025-02-03' },
  { id: 't10', type: 'expense', amount: 142.2, category: 'Groceries', description: 'Weekly groceries', date: '2025-02-05' },
  { id: 't11', type: 'expense', amount: 38, category: 'Food & Dining', description: 'Lunch', date: '2025-02-06' },
  { id: 't12', type: 'expense', amount: 75, category: 'Transport', description: 'Uber rides', date: '2025-02-10' },
  { id: 't13', type: 'expense', amount: 210, category: 'Shopping', description: 'Shoes', date: '2025-02-12' },
  { id: 't14', type: 'expense', amount: 49.99, category: 'Entertainment', description: 'Concert tickets', date: '2025-02-14' },
  { id: 't15', type: 'expense', amount: 95, category: 'Health', description: 'Gym membership', date: '2025-02-15' },
  { id: 't16', type: 'income', amount: 5200, category: 'Salary', description: 'Monthly salary', date: '2025-03-02' },
  { id: 't17', type: 'expense', amount: 1200, category: 'Bills & Utilities', description: 'Rent', date: '2025-03-03' },
  { id: 't18', type: 'expense', amount: 165.75, category: 'Groceries', description: 'Costco run', date: '2025-03-05' },
  { id: 't19', type: 'expense', amount: 54.3, category: 'Food & Dining', description: 'Brunch', date: '2025-03-08' },
  { id: 't20', type: 'expense', amount: 120, category: 'Transport', description: 'Car service', date: '2025-03-10' },
  { id: 't21', type: 'expense', amount: 320, category: 'Shopping', description: 'New headphones', date: '2025-03-12' },
  { id: 't22', type: 'expense', amount: 12.99, category: 'Entertainment', description: 'Music subscription', date: '2025-03-14' },
  { id: 't23', type: 'income', amount: 5200, category: 'Salary', description: 'Monthly salary', date: '2025-04-02' },
  { id: 't24', type: 'expense', amount: 1200, category: 'Bills & Utilities', description: 'Rent', date: '2025-04-03' },
  { id: 't25', type: 'expense', amount: 198.5, category: 'Groceries', description: 'Weekly groceries', date: '2025-04-05' },
  { id: 't26', type: 'expense', amount: 72, category: 'Food & Dining', description: 'Dinner out', date: '2025-04-07' },
  { id: 't27', type: 'expense', amount: 55, category: 'Transport', description: 'Train pass', date: '2025-04-09' },
  { id: 't28', type: 'expense', amount: 89.99, category: 'Shopping', description: 'Books', date: '2025-04-11' },
  { id: 't29', type: 'expense', amount: 240, category: 'Health', description: 'Dental checkup', date: '2025-04-13' },
  { id: 't30', type: 'income', amount: 5200, category: 'Salary', description: 'Monthly salary', date: '2025-05-02' },
  { id: 't31', type: 'expense', amount: 1200, category: 'Bills & Utilities', description: 'Rent', date: '2025-05-03' },
  { id: 't32', type: 'expense', amount: 176.8, category: 'Groceries', description: 'Weekly groceries', date: '2025-05-05' },
  { id: 't33', type: 'expense', amount: 61.2, category: 'Food & Dining', description: 'Pizza night', date: '2025-05-07' },
  { id: 't34', type: 'expense', amount: 48, category: 'Transport', description: 'Gas', date: '2025-05-09' },
  { id: 't35', type: 'expense', amount: 150, category: 'Shopping', description: 'Home decor', date: '2025-05-11' },
  { id: 't36', type: 'expense', amount: 29.99, category: 'Entertainment', description: 'Game purchase', date: '2025-05-13' },
  { id: 't37', type: 'income', amount: 5200, category: 'Salary', description: 'Monthly salary', date: '2025-06-02' },
  { id: 't38', type: 'expense', amount: 1200, category: 'Bills & Utilities', description: 'Rent', date: '2025-06-03' },
  { id: 't39', type: 'expense', amount: 210.3, category: 'Groceries', description: 'Weekly groceries', date: '2025-06-05' },
  { id: 't40', type: 'expense', amount: 88.5, category: 'Food & Dining', description: 'Sushi dinner', date: '2025-06-07' },
  { id: 't41', type: 'expense', amount: 90, category: 'Transport', description: 'Uber + gas', date: '2025-06-09' },
  { id: 't42', type: 'expense', amount: 175, category: 'Shopping', description: 'Clothes', date: '2025-06-11' },
  { id: 't43', type: 'expense', amount: 45, category: 'Health', description: 'Pharmacy', date: '2025-06-13' },
];

export const monthlyData: MonthlyPoint[] = [
  { month: 'Jan', income: 5200, expense: 1554.88 },
  { month: 'Feb', income: 5200, expense: 1755.19 },
  { month: 'Mar', income: 5200, expense: 2088.04 },
  { month: 'Apr', income: 5200, expense: 1856.48 },
  { month: 'May', income: 5200, expense: 1666.99 },
  { month: 'Jun', income: 5200, expense: 1808.8 },
];

export function getCategory(name: string): Category | undefined {
  return categories.find((c) => c.name === name);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

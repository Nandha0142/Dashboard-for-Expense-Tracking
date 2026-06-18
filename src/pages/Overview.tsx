import { useMemo } from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import StatCard from '../components/StatCard';
import SpendingChart from '../components/SpendingChart';
import CategoryDonut from '../components/CategoryDonut';
import TransactionList from '../components/TransactionList';
import { categories, formatCurrency, getCategory, monthlyData } from '../data';
import type { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function Overview({ transactions, onDelete }: Props) {
  const totals = useMemo(() => {
    let income = 0, expense = 0;
    transactions.forEach((t) => (t.type === 'income' ? (income += t.amount) : (expense += t.amount)));
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const donutData = useMemo(() => {
    const map = new Map<string, number>();
    transactions.filter((t) => t.type === 'expense').forEach((t) => map.set(t.category, (map.get(t.category) ?? 0) + t.amount));
    return [...map.entries()]
      .map(([name, value]) => ({ name, value, color: getCategory(name)?.color ?? '#64748b' }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const recent = useMemo(() => [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6), [transactions]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Balance" value={formatCurrency(totals.balance)} delta={8.2} icon={Wallet} accent="from-indigo-500 to-violet-600" subtitle="vs last period" />
        <StatCard title="Total Income" value={formatCurrency(totals.income)} delta={4.1} icon={TrendingUp} accent="from-emerald-500 to-teal-600" subtitle="this year" />
        <StatCard title="Total Expenses" value={formatCurrency(totals.expense)} delta={-2.3} icon={TrendingDown} accent="from-rose-500 to-pink-600" subtitle="vs last period" />
        <StatCard title="Savings Rate" value={`${((totals.balance / totals.income) * 100).toFixed(1)}%`} delta={5.6} icon={PiggyBank} accent="from-amber-500 to-orange-600" subtitle="of income" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">Income vs Expenses</h3>
              <p className="text-xs text-slate-400">Last 6 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Income</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Expense</span>
            </div>
          </div>
          <SpendingChart data={monthlyData} />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-2 font-semibold text-slate-800">Spending by Category</h3>
          <CategoryDonut data={donutData} total={totals.expense} />
          <div className="mt-2 space-y-2">
            {donutData.slice(0, 4).map((d) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name}
                </span>
                <span className="font-medium text-slate-800">{formatCurrency(d.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TransactionList transactions={recent} onDelete={onDelete} compact />
    </div>
  );
}

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingUp, TrendingDown, Lightbulb, AlertTriangle } from 'lucide-react';
import { categories, formatCurrency, getCategory, monthlyData } from '../data';
import type { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

export default function InsightsPage({ transactions }: Props) {
  const spentByCat = useMemo(() => {
    const map = new Map<string, number>();
    transactions.filter((t) => t.type === 'expense').forEach((t) => map.set(t.category, (map.get(t.category) ?? 0) + t.amount));
    return map;
  }, [transactions]);

  const barData = useMemo(
    () =>
      [...spentByCat.entries()]
        .map(([name, value]) => ({ name, value, color: getCategory(name)?.color ?? '#64748b' }))
        .sort((a, b) => b.value - a.value),
    [spentByCat],
  );

  const avgMonthlyExpense = monthlyData.reduce((s, m) => s + m.expense, 0) / monthlyData.length;
  const avgMonthlyIncome = monthlyData.reduce((s, m) => s + m.income, 0) / monthlyData.length;
  const savingsRate = ((avgMonthlyIncome - avgMonthlyExpense) / avgMonthlyIncome) * 100;

  const topCategory = barData[0];
  const overBudget = categories
    .filter((c) => c.budget > 0 && (spentByCat.get(c.name) ?? 0) > c.budget)
    .map((c) => ({ ...c, spent: spentByCat.get(c.name) ?? 0 }));

  const insights = [
    {
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      title: 'Strong savings rate',
      body: `You're saving ${savingsRate.toFixed(1)}% of your income on average — well above the recommended 20%.`,
    },
    {
      icon: Lightbulb,
      color: 'from-amber-500 to-orange-600',
      title: 'Top spending category',
      body: topCategory ? `${topCategory.name} is your biggest expense at ${formatCurrency(topCategory.value)} across all time.` : '',
    },
    {
      icon: TrendingDown,
      color: 'from-indigo-500 to-violet-600',
      title: 'Average monthly spend',
      body: `You spend an average of ${formatCurrency(avgMonthlyExpense)} per month against ${formatCurrency(avgMonthlyIncome)} income.`,
    },
    {
      icon: AlertTriangle,
      color: 'from-rose-500 to-pink-600',
      title: overBudget.length ? 'Budget alerts' : 'On track',
      body: overBudget.length
        ? `${overBudget.length} categor${overBudget.length > 1 ? 'ies' : 'y'} over budget: ${overBudget.map((c) => c.name).join(', ')}.`
        : 'All categories are within their budgets. Great job staying disciplined!',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {insights.map((ins) => {
          const Icon = ins.icon;
          return (
            <div key={ins.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${ins.color} shadow-sm`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{ins.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{ins.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="font-semibold text-slate-800">Spending by Category</h3>
          <p className="text-xs text-slate-400">Total expenses across all transactions</p>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={barData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} interval={0} angle={-20} textAnchor="end" height={60} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
              formatter={(v: any) => [formatCurrency(v), 'Spent']}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {barData.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import { useMemo } from 'react';
import BudgetProgress from '../components/BudgetProgress';
import { categories } from '../data';
import type { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

export default function BudgetsPage({ transactions }: Props) {
  const spentByCat = useMemo(() => {
    const map = new Map<string, number>();
    transactions.filter((t) => t.type === 'expense').forEach((t) => map.set(t.category, (map.get(t.category) ?? 0) + t.amount));
    return map;
  }, [transactions]);

  const totalBudget = categories.filter((c) => c.budget > 0).reduce((s, c) => s + c.budget, 0);
  const totalSpent = categories.filter((c) => c.budget > 0).reduce((s, c) => s + (spentByCat.get(c.name) ?? 0), 0);
  const pct = Math.min((totalSpent / totalBudget) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-indigo-100">Total Monthly Budget</p>
            <p className="mt-1 text-3xl font-bold">${totalBudget.toLocaleString()}</p>
            <p className="mt-1 text-sm text-indigo-100">${totalSpent.toLocaleString(undefined, { maximumFractionDigits: 0 })} spent · ${Math.max(totalBudget - totalSpent, 0).toLocaleString()} remaining</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{pct.toFixed(0)}%</p>
            <p className="text-xs text-indigo-100">used</p>
          </div>
        </div>
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-white transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {categories.filter((c) => c.budget > 0).map((c) => (
          <BudgetProgress key={c.name} category={c} spent={spentByCat.get(c.name) ?? 0} />
        ))}
      </div>
    </div>
  );
}

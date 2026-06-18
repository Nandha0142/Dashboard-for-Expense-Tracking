import type { Category } from '../types';
import { formatCurrency } from '../data';

interface Props {
  category: Category;
  spent: number;
}

export default function BudgetProgress({ category, spent }: Props) {
  const pct = category.budget > 0 ? Math.min((spent / category.budget) * 100, 100) : 0;
  const over = spent > category.budget && category.budget > 0;
  const remaining = Math.max(category.budget - spent, 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl text-lg" style={{ backgroundColor: category.color + '1a' }}>
            {category.icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{category.name}</p>
            <p className="text-xs text-slate-400">Budget {formatCurrency(category.budget)}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-slate-800">{formatCurrency(spent)}</p>
          <p className={`text-xs font-medium ${over ? 'text-rose-500' : 'text-emerald-600'}`}>
            {over ? `Over by ${formatCurrency(spent - category.budget)}` : `${formatCurrency(remaining)} left`}
          </p>
        </div>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            backgroundColor: over ? '#ef4444' : category.color,
          }}
        />
      </div>
    </div>
  );
}

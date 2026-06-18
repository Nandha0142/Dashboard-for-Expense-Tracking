import { Trash2, ArrowDownLeft, ArrowUpRight, Search } from 'lucide-react';
import type { Transaction } from '../types';
import { categories, formatCurrency, formatDate, getCategory } from '../data';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  compact?: boolean;
}

export default function TransactionList({ transactions, onDelete, compact }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h3 className="font-semibold text-slate-800">Recent Transactions</h3>
        <span className="text-xs text-slate-400">{transactions.length} items</span>
      </div>
      <ul className="divide-y divide-slate-100">
        {transactions.map((t) => {
          const cat = getCategory(t.category) ?? categories[categories.length - 1];
          const isIncome = t.type === 'income';
          return (
            <li key={t.id} className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50/70">
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg"
                style={{ backgroundColor: cat.color + '1a' }}
              >
                {cat.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{t.description}</p>
                <p className="text-xs text-slate-400">{t.category} · {formatDate(t.date)}</p>
              </div>
              <div className={`flex items-center gap-1.5 text-sm font-semibold ${isIncome ? 'text-emerald-600' : 'text-slate-800'}`}>
                {isIncome ? <ArrowDownLeft className="h-4 w-4 text-emerald-500" /> : <ArrowUpRight className="h-4 w-4 text-rose-500" />}
                {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
              </div>
              {!compact && (
                <button
                  onClick={() => onDelete(t.id)}
                  className="opacity-0 transition-opacity group-hover:opacity-100 text-slate-400 hover:text-rose-500"
                  aria-label="Delete transaction"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

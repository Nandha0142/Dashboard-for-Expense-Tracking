import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import TransactionList from '../components/TransactionList';
import { categories } from '../data';
import type { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionsPage({ transactions, onDelete }: Props) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [catFilter, setCatFilter] = useState('all');

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => (filter === 'all' ? true : t.type === filter))
      .filter((t) => (catFilter === 'all' ? true : t.category === catFilter))
      .filter((t) =>
        query.trim()
          ? t.description.toLowerCase().includes(query.toLowerCase()) || t.category.toLowerCase().includes(query.toLowerCase())
          : true,
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [transactions, query, filter, catFilter]);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search transactions..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div className="flex gap-2">
            <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400">
              <option value="all">All categories</option>
              {categories.map((c) => (<option key={c.name} value={c.name}>{c.name}</option>))}
            </select>
            <div className="grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-1">
              {(['all', 'income', 'expense'] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>{f}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <TransactionList transactions={filtered} onDelete={onDelete} />
    </div>
  );
}

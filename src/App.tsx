import { useState } from 'react';
import { Bell, Plus, Search } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import TransactionsPage from './pages/TransactionsPage';
import BudgetsPage from './pages/BudgetsPage';
import InsightsPage from './pages/InsightsPage';
import AddTransactionModal from './components/AddTransactionModal';
import { initialTransactions } from './data';
import type { Transaction } from './types';

const viewTitles: Record<string, { title: string; subtitle: string }> = {
  overview: { title: 'Overview', subtitle: 'Welcome back, here’s your financial summary' },
  transactions: { title: 'Transactions', subtitle: 'All your income and expenses in one place' },
  budgets: { title: 'Budgets', subtitle: 'Track spending against your monthly limits' },
  insights: { title: 'Insights', subtitle: 'Smart analysis of your spending habits' },
};

function App() {
  const [view, setView] = useState('overview');
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = (t: Omit<Transaction, 'id'>) => {
    setTransactions((prev) => [{ ...t, id: `t${Date.now()}` }, ...prev]);
  };

  const handleDelete = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const meta = viewTitles[view];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar active={view} onChange={setView} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{meta.title}</h2>
            <p className="hidden text-xs text-slate-400 sm:block">{meta.subtitle}</p>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search..."
                className="w-56 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <button className="relative grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-500/30 transition-all hover:bg-indigo-500 hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </button>

          <div className="flex items-center gap-3 pl-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
              AM
            </div>
            <div className="hidden xl:block">
              <p className="text-sm font-semibold text-slate-800">Alex Morgan</p>
              <p className="text-xs text-slate-400">alex@fintrack.io</p>
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2 md:hidden">
          {Object.entries(viewTitles).map(([id, m]) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                view === id ? 'bg-indigo-500/15 text-indigo-600' : 'text-slate-500'
              }`}
            >
              {m.title}
            </button>
          ))}
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {view === 'overview' && <Overview transactions={transactions} onDelete={handleDelete} />}
          {view === 'transactions' && <TransactionsPage transactions={transactions} onDelete={handleDelete} />}
          {view === 'budgets' && <BudgetsPage transactions={transactions} />}
          {view === 'insights' && <InsightsPage transactions={transactions} />}
        </main>
      </div>

      <AddTransactionModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAdd} />
    </div>
  );
}

export default App;

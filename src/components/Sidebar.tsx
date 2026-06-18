import { Wallet, LayoutDashboard, ArrowLeftRight, PiggyBank, Settings, TrendingUp } from 'lucide-react';

interface SidebarProps {
  active: string;
  onChange: (view: string) => void;
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'budgets', label: 'Budgets', icon: PiggyBank },
  { id: 'insights', label: 'Insights', icon: TrendingUp },
];

export default function Sidebar({ active, onChange }: SidebarProps) {
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-slate-900 text-slate-300 border-r border-slate-800">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
          <Wallet className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">FinTrack</h1>
          <p className="text-[11px] text-slate-400">Expense Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-500/15 text-indigo-300 shadow-inner'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              {item.label}
              {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" />}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 transition-all">
          <Settings className="h-[18px] w-[18px]" />
          Settings
        </button>
        <div className="mt-3 rounded-xl bg-gradient-to-br from-indigo-600/20 to-violet-600/10 border border-indigo-500/20 p-4">
          <p className="text-xs text-slate-300 font-medium">Upgrade to Pro</p>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Unlock budgets, reports & receipts.</p>
          <button className="mt-3 w-full rounded-lg bg-indigo-500 hover:bg-indigo-400 py-1.5 text-xs font-semibold text-white transition-colors">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}

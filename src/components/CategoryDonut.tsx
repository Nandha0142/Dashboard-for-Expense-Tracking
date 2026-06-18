import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

export interface DonutDatum {
  name: string;
  value: number;
  color: string;
}

interface Props {
  data: DonutDatum[];
  total: number;
}

export default function CategoryDonut({ data, total }: Props) {
  return (
    <div className="relative h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={62}
            outerRadius={92}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-medium text-slate-400">Total Spent</span>
        <span className="text-2xl font-bold text-slate-900">${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
      </div>
    </div>
  );
}

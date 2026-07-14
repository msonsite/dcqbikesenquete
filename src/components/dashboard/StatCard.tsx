interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
}

export function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-dcq-gray-border bg-white p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
        {title}
      </p>
      <p className="mt-2 text-4xl font-bold text-dcq-black">{value}</p>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}

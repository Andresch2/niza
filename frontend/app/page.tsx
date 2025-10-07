
import StatCard from "@/components/StatCard";
import TransactionsCard from "@/components/TransactionsCard";
import { getSummary } from "@/lib/api";
export default async function Page() {
  const s = await getSummary();
  const money = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(s.total_value);
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Panel</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Valor total del inventario" value={money} right={<span aria-hidden>💵</span>} />
        <StatCard title="Artículos con poco stock" value={s.low_stock_count} right={<span aria-hidden>⚠️</span>} />
        <StatCard title="Por vencer pronto" value={s.expiring_count} right={<span aria-hidden>📅</span>} />
        <TransactionsCard items={s.recent_transactions} />
      </section>
      <article className="rounded-2xl border bg-white h-64 grid place-content-center text-gray-400">(Gráfico para siguiente sprint)</article>
    </section>
  );
}

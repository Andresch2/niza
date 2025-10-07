
export default function TransactionsCard({ items }: { items: string[] }) {
  return (
    <article className="rounded-2xl shadow-sm border bg-white p-4">
      <h3 className="text-sm text-gray-700 mb-2">Transacciones recientes</h3>
      <ul className="list-disc list-inside space-y-1 text-sm">
        {items.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </article>
  );
}

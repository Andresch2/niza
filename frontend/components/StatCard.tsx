
type Props = { title: string; value: string | number; note?: string; right?: React.ReactNode };
export default function StatCard({ title, value, note, right }: Props) {
  return (
    <article className="rounded-2xl shadow-sm border bg-white p-4">
      <section className="flex items-start justify-between">
        <p className="text-sm text-gray-600">{title}</p>
        {right}
      </section>
      <p className="text-2xl font-semibold mt-2">{value}</p>
      {note ? <p className="text-xs text-gray-500 mt-1">{note}</p> : null}
    </article>
  );
}

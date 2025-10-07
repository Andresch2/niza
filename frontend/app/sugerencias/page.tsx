
"use client";
import { useEffect, useState } from "react";
import { getSuggestions, patchSuggestion } from "@/lib/api";
import type { Suggestion } from "@/lib/types";
export default function SugerenciasPage() {
  const [rows, setRows] = useState<Suggestion[]>([]);
  const load = async () => setRows(await getSuggestions());
  useEffect(() => { load(); }, []);
  const act = async (id: number, action: 'approve' | 'reject') => {
    await patchSuggestion(id, action);
    await load();
  };
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Alertas y sugerencias</h1>
      <article className="rounded-2xl shadow-sm border bg-white p-4">
        <header className="mb-3">
          <h2 className="text-lg font-semibold">Sugerencia de reordenamiento (ML)</h2>
        </header>
        <section className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-3">NOMBRE DEL MEDICAMENTO</th>
                <th className="text-left p-3">CANTIDAD SUGERIDA</th>
                <th className="text-left p-3">RAZÓN</th>
                <th className="text-left p-3">ESTADO</th>
                <th className="text-left p-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{s.product_name}</td>
                  <td className="p-3">{s.suggested_qty} unidades</td>
                  <td className="p-3">{s.reason}</td>
                  <td className="p-3">{s.status === 'PENDING' ? 'Pendiente' : s.status === 'APPROVED' ? 'Aprobada' : 'Rechazada'}</td>
                  <td className="p-3">
                    <section className="flex gap-3">
                      <button onClick={() => act(s.id, 'approve')} className="text-emerald-600 hover:underline">Aprobar</button>
                      <button onClick={() => act(s.id, 'reject')} className="text-rose-600 hover:underline">Rechazar</button>
                    </section>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </article>
    </section>
  );
}

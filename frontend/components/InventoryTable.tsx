
"use client";
import { useMemo } from "react";
import type { Product } from "@/lib/types";
export default function InventoryTable({ data }: { data: Product[] }) {
  const rows = useMemo(() => data, [data]);
  return (
    <section className="overflow-x-auto rounded-2xl border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="text-left p-3">NOMBRE DE LA MARCA</th>
            <th className="text-left p-3">NOMBRE GENÉRICO</th>
            <th className="text-left p-3">Dosis</th>
            <th className="text-left p-3">CATEGORÍA</th>
            <th className="text-left p-3">STOCK ACTUAL</th>
            <th className="text-left p-3"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.code}</td>
              <td className="p-3">{p.dose ?? "-"}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">{p.stock_current} unidades</td>
              <td className="p-3">
                <section className="flex gap-3">
                  <button className="text-emerald-600 hover:underline">Vista</button>
                  <button className="text-amber-600 hover:underline">Editar</button>
                  <button className="text-rose-600 hover:underline">Borrar</button>
                </section>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

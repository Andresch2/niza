
"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/types";
import InventoryTable from "@/components/InventoryTable";

export default function InventarioPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setData(await getProducts(q, cat)); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Gestión de inventario</h1>
      <section className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
        <label className="grid items-center rounded-2xl border bg-white px-3">
          <span className="sr-only">Buscar por nombre o código</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} className="h-11 outline-none" aria-label="Buscar por nombre o código" />
        </label>
        <label className="grid items-center rounded-2xl border bg-white px-3">
          <span className="sr-only">Filtrar por categoría</span>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="h-11 outline-none">
            <option value="">Todas</option>
            <option value="A">A</option><option value="B">B</option><option value="C">C</option>
          </select>
        </label>
      </section>
      <section className="flex justify-end">
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl">Agregar nuevo medicamento</button>
      </section>
      {loading ? (
        <article className="rounded-2xl border bg-white p-6 text-gray-500">Cargando…</article>
      ) : (
        <InventoryTable data={data} />
      )}
      <section className="flex justify-end gap-2">
        <button className="rounded-xl border px-3 py-2">Previo</button>
        <button className="rounded-xl border px-3 py-2">Siguiente</button>
      </section>
      <section className="flex justify-end gap-2">
        <button onClick={load} className="text-sm text-blue-600 hover:underline">Actualizar listado</button>
        <button onClick={() => { setQ(""); setCat(""); load(); }} className="text-sm text-gray-600 hover:underline">Limpiar filtros</button>
      </section>
    </section>
  );
}

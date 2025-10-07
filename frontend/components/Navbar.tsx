
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="w-full bg-[#173D7A] text-white">
      <section className="max-w-6xl mx-auto px-4">
        <header className="flex items-center justify-between h-14">
          <ul className="flex items-center gap-6">
            <li className="font-semibold tracking-wide">Droguería Niza I</li>
            <li><Link href="/" className="px-2 py-1 rounded hover:bg-white/10">Panel</Link></li>
            <li><Link href="/inventario" className="px-2 py-1 rounded hover:bg-white/10">Inventario</Link></li>
            <li><Link href="/alertas" className="px-2 py-1 rounded hover:bg-white/10">Alertas</Link></li>
            <li><Link href="/sugerencias" className="px-2 py-1 rounded hover:bg-white/10">Sugerencias</Link></li>
          </ul>
          <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-xl">cerrar sesión</button>
        </header>
      </section>
    </nav>
  );
}

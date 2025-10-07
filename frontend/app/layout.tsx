
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
export const metadata = { title: "Inventario MVP", description: "Droguería" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 min-h-dvh">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}


import { getAlerts } from "@/lib/api";
export default async function AlertasPage() {
  const alerts = await getAlerts();
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Alertas y sugerencias</h1>
      <article className="rounded-2xl shadow-sm border bg-white p-4">
        <h2 className="text-lg font-semibold mb-2">Artículos que caducan / Poco stock</h2>
        <section className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-3">NOMBRE DEL MEDICAMENTO</th>
                <th className="text-left p-3">DETALLE</th>
                <th className="text-left p-3">TIPO</th>
                <th className="text-left p-3">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((a: any) => (
                <tr key={a.id} className="border-t">
                  <td className="p-3">{a.product_name}</td>
                  <td className="p-3">{a.message}</td>
                  <td className="p-3">{a.type === 'EXPIRY' ? 'Caducidad' : 'Bajo stock'}</td>
                  <td className="p-3">{a.is_read ? 'Leída' : 'Pendiente'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </article>
    </section>
  );
}

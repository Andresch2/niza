
const API = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000';
async function fetchJSON(path: string, init?: RequestInit) {
  const res = await fetch(`${API}${path}`, { cache: 'no-store', ...init });
  if (!res.ok) throw new Error(`[API ${res.status}] ${path}`);
  return res.json();
}
export const getSummary = () => fetchJSON('/inventory/summary');
export const getProducts = (q = '', category = '') => fetchJSON(`/products?search=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}`);
export const getAlerts = () => fetchJSON('/alerts?only_unread=false');
export const getSuggestions = () => fetchJSON('/suggestions');
export const patchSuggestion = (id: number, action: 'approve'|'reject') => fetchJSON(`/suggestions/${id}/${action}`, { method: 'PATCH' });

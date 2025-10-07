
export type Summary = { total_value: number; low_stock_count: number; expiring_count: number; recent_transactions: string[]; };
export type Product = { id: number; code: string; name: string; dose?: string | null; category: string; stock_current: number; };
export type Alert = { id: number; type: 'LOW_STOCK' | 'EXPIRY'; product_name: string; batch_code?: string | null; message: string; created_at: string; is_read: boolean; };
export type Suggestion = { id: number; product_name: string; suggested_qty: number; reason: string; status: 'PENDING' | 'APPROVED' | 'REJECTED'; };

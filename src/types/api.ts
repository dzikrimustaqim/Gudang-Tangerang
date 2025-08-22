export interface Item {
  id: string;
  serial_number: string;
  category_id: string;
  category: Category;
  brand: string;
  model: string;
  condition: 'Layak pakai' | 'Rusak sebagian' | 'Rusak/Hilang';
  description?: string;
  entry_date?: string;
  exit_date?: string;
  current_location: 'Gudang' | 'OPD';
  current_opd_id?: string;
  current_opd?: OPD;
  specific_location?: string;
  is_active: boolean;
  transactions?: Transaction[];
}

export interface Transaction {
  id: string;
  item_id: string;
  item?: Item;
  direction: 'Gudang → OPD' | 'OPD → Gudang' | 'OPD → OPD';
  source_opd_id?: string;
  source_opd?: OPD;
  target_opd_id?: string;
  target_opd?: OPD;
  specific_location?: string;
  notes?: string;
  transaction_date: string;
  processed_by?: string;
}

export interface OPD {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateItemRequest {
  serial_number: string;
  category_id: string;
  brand: string;
  model: string;
  condition: 'Layak pakai' | 'Rusak sebagian' | 'Rusak/Hilang';
  description?: string;
  specific_location?: string;
}

export interface CreateTransactionRequest {
  item_id: string;
  direction: 'Gudang → OPD' | 'OPD → Gudang' | 'OPD → OPD';
  source_opd_id?: string;
  target_opd_id?: string;
  specific_location?: string;
  notes?: string;
  processed_by?: string;
}

export interface CreateOPDRequest {
  name: string;
  description?: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface DashboardSummary {
  total_items: number;
  items_in_warehouse: number;
  items_in_opd: number;
  total_transactions: number;
  items_by_condition: Record<string, number>;
  items_by_category: Array<{ category_name: string; count: number }>;
  items_by_opd: Array<{ opd_name: string; count: number }>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total_count: number;
  page: number;
  limit: number;
  total_pages: number;
}
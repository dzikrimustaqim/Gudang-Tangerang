import type {
  Item,
  Transaction,
  OPD,
  Category,
  CreateItemRequest,
  CreateTransactionRequest,
  CreateOPDRequest,
  CreateCategoryRequest,
  DashboardSummary,
  PaginatedResponse
} from '@/types/api';

const API_BASE_URL = 'http://localhost:8080/api/v1';

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Dashboard
  async getDashboardSummary(): Promise<DashboardSummary> {
    return this.request<DashboardSummary>('/dashboard/summary');
  }

  async getRecentTransactions(): Promise<Transaction[]> {
    return this.request<Transaction[]>('/dashboard/recent-transactions');
  }

  // Items
  async getItems(params?: Record<string, string | number>): Promise<PaginatedResponse<Item>> {
    const queryString = params ? new URLSearchParams(params as Record<string, string>).toString() : '';
    return this.request<PaginatedResponse<Item>>(`/items${queryString ? `?${queryString}` : ''}`);
  }

  async getItem(id: string): Promise<Item> {
    return this.request<Item>(`/items/${id}`);
  }

  async createItem(data: CreateItemRequest): Promise<Item> {
    return this.request<Item>('/items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateItem(id: string, data: Partial<CreateItemRequest>): Promise<Item> {
    return this.request<Item>(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteItem(id: string): Promise<void> {
    return this.request<void>(`/items/${id}`, {
      method: 'DELETE',
    });
  }

  async searchItems(query: string): Promise<Item[]> {
    return this.request<Item[]>(`/items/search?q=${encodeURIComponent(query)}`);
  }

  // Transactions
  async getTransactions(params?: Record<string, string | number>): Promise<PaginatedResponse<Transaction>> {
    const queryString = params ? new URLSearchParams(params as Record<string, string>).toString() : '';
    return this.request<PaginatedResponse<Transaction>>(`/transactions${queryString ? `?${queryString}` : ''}`);
  }

  async createTransaction(data: CreateTransactionRequest): Promise<Transaction> {
    return this.request<Transaction>('/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTransaction(id: string, data: Partial<CreateTransactionRequest>): Promise<Transaction> {
    return this.request<Transaction>(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTransaction(id: string): Promise<void> {
    return this.request<void>(`/transactions/${id}`, {
      method: 'DELETE',
    });
  }

  // OPDs
  async getOPDs(): Promise<OPD[]> {
    return this.request<OPD[]>('/opds');
  }

  async createOPD(data: CreateOPDRequest): Promise<OPD> {
    return this.request<OPD>('/opds', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateOPD(id: string, data: Partial<CreateOPDRequest>): Promise<OPD> {
    return this.request<OPD>(`/opds/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteOPD(id: string): Promise<void> {
    return this.request<void>(`/opds/${id}`, {
      method: 'DELETE',
    });
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>('/categories');
  }

  async createCategory(data: CreateCategoryRequest): Promise<Category> {
    return this.request<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCategory(id: string, data: Partial<CreateCategoryRequest>): Promise<Category> {
    return this.request<Category>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: string): Promise<void> {
    return this.request<void>(`/categories/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();
import apiClient from './apiClient';
import type { GroceryItem } from '@/typings/services/GroceryItem';
import type { GroceryList } from '@/typings/services/GroceryList';
import type { SaveGroceryListRequest } from '@/typings/services/SaveGroceryListRequest';
import type { ApiResponse } from '@/typings/services/ApiResponse';

// Re-export types for convenience
export type { GroceryItem, GroceryList, SaveGroceryListRequest, ApiResponse };

class GroceryListsService {
  async getGroceryLists(): Promise<ApiResponse<GroceryList[]>> {
    const response = await apiClient.get('/grocery-lists');
    return response.data;
  }

  async saveGroceryList(listData: SaveGroceryListRequest): Promise<ApiResponse<GroceryList>> {
    const response = await apiClient.post('/grocery-lists', listData);
    return response.data;
  }

  async getGroceryList(id: string): Promise<ApiResponse<GroceryList>> {
    const response = await apiClient.get(`/grocery-lists/${id}`);
    return response.data;
  }

  async deleteGroceryList(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/grocery-lists/${id}`);
    return response.data;
  }
}

export const groceryListsService = new GroceryListsService();

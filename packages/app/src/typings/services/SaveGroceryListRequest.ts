import type { GroceryItem } from './GroceryItem';

interface SaveGroceryListRequest {
  items: GroceryItem[];
  name?: string;
  savedAt?: string;
}

export type { SaveGroceryListRequest };

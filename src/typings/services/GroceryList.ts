import type { GroceryItem } from './GroceryItem';

interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  savedAt: string;
  createdAt: string;
}

export type { GroceryList };

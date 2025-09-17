interface GroceryItem {
  id: string;
  name: string;
  amount: string;
  unit: string;
  checked: boolean;
  aisle?: string;
}

export type { GroceryItem };

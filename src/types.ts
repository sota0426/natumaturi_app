export type Category = { id: number; name: string };
export type MenuItem = {
  id: number;
  categoryId: number;
  categoryName: string;
  name: string;
  price: number;
  stock: number;
};

export type MenuForm = {
  categoryId: string;
  name: string;
  price: string;
  stock: string;
};

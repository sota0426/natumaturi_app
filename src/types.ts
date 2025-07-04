export type Category = { 
  id: number ; 
  name: string 
};

export type MenuItem = {
  id: number  | "" ;
  categoryId: number ;
  categoryName: string;
  name: string;
  price: number | "" ;
  stock: number | "" ;
};

export interface CartItem extends MenuItem  {
  quantity: number;
}

export type MenuForm = {
  categoryId: number  ;
  name: string;
  price: number | "" ;
  stock: number | "" ;
};

export interface CartContextType {
  cartItems: CartItem[];
  isOrderCompleted: boolean;
  orderSubmit: () => void;
  proceedToNextOrder: () => void;
  addToCart: (menu: MenuItem) => void;
  removeFromCart: (menuId: number) => void;
  receivedAmount:number;
  clearCart: () => void;
}

export interface Sale {
  timestamp: string;
  items: CartItem[];
  total: number;
  refunded?: boolean;
}

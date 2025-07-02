// hooks/CartContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { MenuItem } from "@/types";

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (menu: MenuItem) => void;
  removeFromCart: (menuId: number) => void;
  clearCart: (onClear?: (items: CartItem[]) => void) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (menu: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === menu.id);
      if (existing) {
        return prev.map((item) =>
          item.id === menu.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...menu, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (menuId: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === menuId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = (onClear?: (items: CartItem[]) => void) => {
    setCartItems((prev) => {
      if (onClear) {
        onClear(prev);
      }
      return [];
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

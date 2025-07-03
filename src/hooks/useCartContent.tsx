// hooks/CartContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { CartContextType, CartItem, MenuItem } from "@/types";
import { useLocalStorage } from "./useLocalStorage";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const { menus, categories, saveToLocalStorage } = useLocalStorage();
  const [receivedAmount, setReceivedAmount] = useState<number>(0); // 必要なら

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

  const clearCart = () => {
    const confirmed = window.confirm("カートを空にしますか？");
    if (confirmed) {
      setCartItems([]);
      setIsOrderCompleted(false);
      setReceivedAmount(0);
    }
  };

  const orderSubmit = () => {
    try {
      // １．在庫を更新
      const updatedMenus = menus.map((menu) => {
        const cartItem = cartItems.find((item) => item.id === menu.id);
        if (cartItem) {
          return {
            ...menu,
            stock: (menu.stock ?? 0) - cartItem?.quantity,
          };
        }
        return menu;
      });

      // ２．会計履歴を保存
      const now = new Date();
      const timestamp = `${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;

      const history = JSON.parse(localStorage.getItem("salesHistory") || "[]");
      const newHistory = [
        ...history,
        {
          timestamp: timestamp,
          items: cartItems,
          total: cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          refunded:false,
        },
      ];
      localStorage.setItem("salesHistory", JSON.stringify(newHistory));

      // ３．メニューの在庫を保存
      saveToLocalStorage(categories, updatedMenus);

      // ４．注文完了状態に設定
      setIsOrderCompleted(true);
    } catch (error) {
      console.error("注文時にエラーが発生しました", error);
    }
  };

  const proceedToNextOrder = () => {
    setCartItems([]);
    setIsOrderCompleted(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isOrderCompleted,
        orderSubmit,
        proceedToNextOrder,
        addToCart,
        removeFromCart,
        receivedAmount,
        clearCart,
      }}
    >
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
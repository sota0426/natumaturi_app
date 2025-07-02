import React, { useEffect, useRef, useState } from 'react';
import { Category, MenuForm } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCart } from '@/hooks/CartContext';

interface Props {
  category: Category;
  onCollectSoldOutMenus?: (menus: MenuForm[]) => void;
}


export const AccountCategoryBlock: React.FC<Props> = ({ 
  category,
  onCollectSoldOutMenus
 }) => {
  const { menus } = useLocalStorage();
  const { addToCart, removeFromCart, cartItems } = useCart();
  const [tempStockMap, setTempStockMap] = useState<Record<number, number>>({});

  useEffect(() => {
    if (Array.isArray(menus)) {
      const initialStock: Record<number, number> = {};
      menus.forEach(menu => {
        initialStock[menu.id] = menu.stock;
      });
      setTempStockMap(initialStock);
    }
  }, [menus]);
  

  // カート内数をマッピング
  const cartItemCountMap: Record<number, number> = {};
  cartItems.forEach(item => {
    cartItemCountMap[item.id] = (cartItemCountMap[item.id] || 0) + 1;
  });

  const safeMenus = Array.isArray(menus) ? menus : [];
  const filteredMenus = safeMenus.filter(m => m.categoryId === category.id);

  // メニューに仮在庫とカート数を付加
  const enrichedMenus = filteredMenus.map(menu => ({
    ...menu,
    stock: tempStockMap[menu.id] ?? menu.stock,
    cartCount: cartItemCountMap[menu.id] ?? 0,
  }));

  // 売り切れ（カートに入ってない & 在庫0）
  const soldOutMenus = enrichedMenus.filter(m => m.stock === 0 && m.cartCount === 0);

  // 通常表示メニュー
  const availableMenus = enrichedMenus.filter(m => !(m.stock === 0 && m.cartCount === 0));

  // 前回の売り切れリストのキーを保持
const prevSoldOutKeyRef = useRef<string>('');
const onCollectSoldOutMenusRef = useRef<typeof onCollectSoldOutMenus>();


    // 🔥 売り切れメニューを親に報告
useEffect(() => {
  if (!onCollectSoldOutMenus) return;

  // 同じ内容なら通知をスキップ
  onCollectSoldOutMenusRef.current = onCollectSoldOutMenus;

  const key = soldOutMenus.map(m => m.id).join(',');
  if (key !== prevSoldOutKeyRef.current) {
    prevSoldOutKeyRef.current = key;
    onCollectSoldOutMenus(soldOutMenus);
  }
}, [soldOutMenus, onCollectSoldOutMenus]);


  

  const purchase = (id: number) => {
    const stock = tempStockMap[id] ?? 0;
    if (stock > 0) {
      setTempStockMap(prev => ({ ...prev, [id]: stock - 1 }));
      const menu = filteredMenus.find(m => m.id === id);
      if (menu) addToCart(menu);
    }
  };

  const cancel = (id: number) => {
    const countInCart = cartItemCountMap[id] ?? 0;
    if (countInCart > 0) {
      setTempStockMap(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
      removeFromCart(id);
    }
  };



// 追加: メニューが0件なら何も描画しない
  if(availableMenus.length === 0){
    return null
  }




  const renderMenuItem = (menu: typeof enrichedMenus[0]) => (
    <div
      key={menu.id}
      className="bg-white border border-gray-200 rounded-lg px-4 py-4 hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1 min-w-0">
          <span className="text-gray-800 font-semibold text-lg block truncate">{menu.name}</span>
        </div>
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
              価格
            </span>
            <span className="text-green-700 font-bold text-lg whitespace-nowrap">
              ¥{menu.price.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
              menu.stock > 10 ? 'bg-blue-100 text-blue-800'
              : menu.stock > 5 ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
            }`}>
              在庫
            </span>
            <span className={`font-bold text-lg whitespace-nowrap ${
              menu.stock > 10 ? 'text-blue-700'
              : menu.stock > 5 ? 'text-yellow-700'
              : 'text-red-700'
            }`}>
              {menu.stock}個
            </span>
          </div>

          <div className="flex gap-3 text-sm">
            <button
              onClick={() => purchase(menu.id)}
              disabled={menu.stock === 0}
              className={`px-3 py-2 font-medium rounded-lg transition-colors duration-200 border whitespace-nowrap ${
                menu.stock === 0
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-blue-50 text-green-600 hover:bg-blue-100 hover:text-green-800 border-blue-200'
              }`}
            >
              +1
            </button>
            <button
              onClick={() => cancel(menu.id)}
              disabled={menu.cartCount === 0}
              className={`px-3 py-2 font-medium rounded-lg transition-colors duration-200 border whitespace-nowrap ${
                menu.cartCount === 0
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 border-red-200'
              }`}
            >
              -1
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6 shadow-sm">
      {/* 通常カテゴリ表示 */}
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
        <span className="bg-blue-100 text-blue-700 rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold">
          🍽
        </span>
        {category.name}
        <span className="text-sm text-gray-500 ml-auto">
          {availableMenus.length} 件のメニュー
        </span>
      </h3>

      <div className="space-y-2">
        {availableMenus.map(renderMenuItem)}
      </div>

    </div>
  );
};

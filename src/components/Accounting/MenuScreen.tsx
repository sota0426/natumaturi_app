import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage'; 
import { AccountCategoryBlock } from './AccountCategoryBlock';
import { MenuForm } from '@/types';

export const MenuScreen = () => {
  const [hideSoldOut, setHideSoldOut] = useState(false);
  const [soldOutMenus, setSoldOutMenus] = useState<MenuForm[]>([]);
  const { categories, menus } = useLocalStorage();  // メニュー情報も取得

  const toggleSoldOut = () => {
    setHideSoldOut(!hideSoldOut);
  };

  const collectSoldOutMenus = (menus: MenuForm[]) => {
    setSoldOutMenus((prev) => {
      const ids = new Set(prev.map(m => m.id));
      const newOnes = menus.filter(m => !ids.has(m.id));
      return [...prev, ...newOnes];
    });
  };

  // hideSoldOut の状態を反映したカテゴリごとのメニュー数でフィルター
  const filteredCategories = categories.filter(category => {
    const filteredMenus = menus.filter(menu => 
      menu.categoryId === category.id && 
      // 売り切れ非表示なら stock > 0 のメニューだけ残す
      (!hideSoldOut ? true : menu.stock > 0)
    );
    return filteredMenus.length > 0;
  });

  return (
    <div className="menu-screen px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">【注文メニュー】</h1>

      <button
        onClick={toggleSoldOut}
        className="mb-6 px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition"
      >
        {hideSoldOut ? 'すべて表示' : '売り切れ商品を非表示'}
      </button>

      {!hideSoldOut && soldOutMenus.length > 0 && (
        <div className="mb-10 border-t pt-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">売り切れ商品</h2>
          <div className="space-y-2 opacity-60 mb-6">
            {soldOutMenus.map((menu) => (
              <div
                key={menu.id}
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center"
              >
                <span className="text-gray-700 font-medium truncate">{menu.name}</span>
                <span className="text-red-600 font-semibold">売り切れ</span>
              </div>
            ))}
          </div>
        </div>
      )}      

      {filteredCategories.map((cat) => (
        <AccountCategoryBlock 
          key={cat.id} 
          category={cat}
          onCollectSoldOutMenus={collectSoldOutMenus}
        />
      ))}

    </div>
  );
};

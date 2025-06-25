// components/MenuList.tsx
import React from 'react';
import { Category, MenuItem } from '@/types';
import { CategoryBlock } from './CategoryBlock';

interface MenuListProps {
  categories: Category[];
  menus: MenuItem[];
  onAddMenu: (menu: MenuItem) => void;
  onUpdateMenu: (menu: MenuItem) => void;
  onDeleteMenu: (menu: MenuItem) => void;
}

export const MenuList: React.FC<MenuListProps> = ({
  categories,
  menus,
  onAddMenu,
  onUpdateMenu,
  onDeleteMenu,
}) => {
  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

    <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
            <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3">
              🍔
            </span>
        メニュー登録
      </h2>
          <div className="text-sm text-gray-600 mb-3 flex items-center gap-2">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
              💡 ヒント
            </span>
            編集はエンターキーで続けて登録が行えます。
          </div>  

      {categories.length === 0 ? (
        <p>カテゴリがありません。</p>
      ) : (
        categories.map((cat) => (
          <CategoryBlock
            key={cat.id}
            category={cat}
            menus={menus}
            onAddMenu={onAddMenu}
            onUpdateMenu={onUpdateMenu}
            onDeleteMenu={onDeleteMenu}
          />
        ))
      )}
    </section>
  );
};

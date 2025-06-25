import { Category, MenuItem } from '@/types';
import React from 'react';
import { CategoryBlock } from './CategoryBlock';

interface MenuListProps {
  categories: Category[];
  menus: MenuItem[];
  onEditMenu: (menu: MenuItem) => void;
  onUpdateMenu: () => void;
  onDeleteMenu: (menu: MenuItem) => void;
  onMoveMenu: (categoryId: number, index: number, direction: 'up' | 'down') => void;
  editingMenuId: number | null;
  menuForm: MenuItem;
  setMenuForm: (form: MenuItem) => void;
  onCancelEdit: () => void;
}

export const MenuList: React.FC<MenuListProps> = (props) => {
  const { categories } = props;

  return (
    <section className="bg-neutral-300 rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-4">【登録済みメニュー】</h2>

      {categories.length === 0 ? (
        <p>カテゴリがありません。</p>
      ) : (
        categories.map((cat) => (
          <CategoryBlock key={cat.id} category={cat} {...props} />
        ))
      )}
    </section>
  );
};

import { Category, MenuItem } from '@/types';
import React from 'react';
import { MenuRow } from './MenuRow';

interface Props {
  category: Category;
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

export const CategoryBlock: React.FC<Props> = ({ category, menus, ...rest }) => {
  const filteredMenus = menus.filter((m) => m.categoryId === category.id);

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">
        {category.id} - {category.name}
      </h3>

      {filteredMenus.length === 0 ? (
        <p className="text-gray-500">メニューがありません。</p>
      ) : (
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-0 py-1">No</th>
              <th className="border px-2 py-1">メニュー名</th>
              <th className="border px-2 py-1">金額</th>
              <th className="border px-2 py-1">残数</th>
              <th className="border px-2 py-1">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenus.map((menu, idx) => (
              <MenuRow
                key={`${menu.categoryId}-${menu.id}`}
                categoryId={category.id}
                menu={menu}
                index={idx}
                isFirst={idx === 0}
                isLast={idx === filteredMenus.length - 1}
                {...rest}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

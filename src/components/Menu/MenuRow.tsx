import { MenuItem } from '@/types';
import React from 'react';
import { MenuActions } from './MenuAction';


interface Props {
  categoryId: number;
  menu: MenuItem;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onEditMenu: (menu: MenuItem) => void;
  onUpdateMenu: () => void;
  onDeleteMenu: (menu: MenuItem) => void;
  onMoveMenu: (categoryId: number, index: number, direction: 'up' | 'down') => void;
  editingMenuId: number | null;
  menuForm: MenuItem;
  setMenuForm: (form: MenuItem) => void;
  onCancelEdit: () => void;
}

export const MenuRow: React.FC<Props> = ({
  menu,
  categoryId,
  index,
  isFirst,
  isLast,
  editingMenuId,
  menuForm,
  setMenuForm,
  onUpdateMenu,
  onCancelEdit,
  ...actions
}) => {
  const isEditing = editingMenuId === menu.id;

  return (
    <tr>
      <td className="border px-2 py-1">{categoryId}{menu.id}</td>
      <td className="border px-2 py-1">
        {isEditing ? (
          <input
            type="text"
            value={menuForm.name}
            onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
            className="border px-1 py-0.5 rounded w-full"
          />
        ) : (
          menu.name
        )}
      </td>
      <td className="border px-2 py-1 text-right">
        {isEditing ? (
          <input
            type="number"
            value={menuForm.price}
            onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
            className="border px-1 py-0.5 rounded w-full text-right"
          />
        ) : (
          `¥${menu.price}`
        )}
      </td>
      <td className="border px-2 py-1 text-right">
        {isEditing ? (
          <input
            type="number"
            value={menuForm.stock}
            onChange={(e) => setMenuForm({ ...menuForm, stock: e.target.value })}
            className="border px-1 py-0.5 rounded w-full text-right"
          />
        ) : (
          menu.stock
        )}
      </td>
      <td className="border px-2 py-1 text-center space-x-1">
        {isEditing ? (
          <>
            <button
              onClick={onUpdateMenu}
              className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600"
            >
              保存
            </button>
            <button
              onClick={onCancelEdit}
              className="px-2 py-1 rounded bg-gray-400 text-white hover:bg-gray-500"
            >
              キャンセル
            </button>
          </>
        ) : (
          <MenuActions
            menu={menu}
            index={index}
            categoryId={categoryId}
            isFirst={isFirst}
            isLast={isLast}
            {...actions}
          />
        )}
      </td>
    </tr>
  );
};

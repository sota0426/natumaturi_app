// components/MenuList.tsx
import React from 'react';
import type { Category, MenuItem } from '../types';

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


export const MenuList: React.FC<MenuListProps> = ({
  categories,
  menus,
  onEditMenu,
  onDeleteMenu,
  onMoveMenu,
  onCancelEdit,
  onUpdateMenu,
  editingMenuId,
  menuForm,
  setMenuForm,
  
}) => {
  return (
    <section className="bg-neutral-300 rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-4">【登録済みメニュー】</h2>
      {categories.length === 0 && <p>カテゴリがありません。</p>}
      {categories.map((cat) => {
        const filteredMenus = menus.filter((m) => m.categoryId === cat.id);
        return (
          <div key={cat.id} className="mb-6">
            <h3 className="font-semibold mb-2">{cat.id} - {cat.name}</h3>
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

       {filteredMenus.map((menu, idx) => {
  const isEditing = editingMenuId === menu.id;

  return (
    <tr key={`${menu.categoryId}-${menu.id}`}>
      <td className="border px-2 py-1">{menu.categoryId}{menu.id}</td>

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
          <>
            <button
              onClick={() => onMoveMenu(cat.id, idx, 'up')}
              disabled={idx === 0}
              className={`px-2 py-1 rounded ${idx === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
            >
              ▲
            </button>
            <button
              onClick={() => onMoveMenu(cat.id, idx, 'down')}
              disabled={idx === filteredMenus.length - 1}
              className={`px-2 py-1 rounded ${idx === filteredMenus.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
            >
              ▼
            </button>
            <button
              onClick={() => onEditMenu(menu)}
              className="px-2 py-1 rounded bg-yellow-300 hover:bg-yellow-400"
            >
              編集
            </button>
            <button
              onClick={() => {
                if (confirm(`メニュー「${menu.name}」を削除してもよろしいですか？`)) {
                  onDeleteMenu(menu);
                }
              }}
              className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              削除
            </button>
          </>
        )}
      </td>
    </tr>
  );
})}

                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </section>
  );
};
// components/CategoryBlock.tsx
import React, { useState } from 'react';
import { Category, MenuItem } from '@/types';
import { MenuFormInline } from './MenuFormInline';

interface Props {
  category: Category;
  menus: MenuItem[];
  onAddMenu: (menu: MenuItem) => void;
  onUpdateMenu: (menu: MenuItem) => void;
  onDeleteMenu: (menu: MenuItem) => void;
}

export const CategoryBlock: React.FC<Props> = ({
  category,
  menus,
  onAddMenu,
  onUpdateMenu,
  onDeleteMenu,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<MenuItem>({
    id: "",
    name: '',
    price: "",
    stock: "",
    categoryId: category.id,
  });

  const handleAdd = () => {
    onAddMenu({ ...form, id: Date.now() });
    setForm({ ...form, name: '', price: '', stock: '' });
    setIsAdding(false);
  };

  const handleUpdate = () => {
    if (editingId !== null) {
      onUpdateMenu(form);
      setEditingId(null);
      setForm({ ...form, name: '', price: '', stock: '' });
    }
  };

  return (
    <div className="mb-6 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">
        {category.name}
      </h3>

      {menus.filter(m => m.categoryId === category.id).map((menu) =>
        editingId === menu.id ? (
          <MenuFormInline
            key={menu.id}
            menuForm={form}
            setMenuForm={setForm}
            onSubmit={handleUpdate}
            onCancel={() => setEditingId(null)}
            isEditing={true}
          />
        ) : (
          <div key={menu.id} className="flex gap-2 items-center mb-1">
            <span>{menu.name}</span>
            <span>¥{menu.price}</span>
            <span>残: {menu.stock}</span>
            <button onClick={() => {
              setEditingId(menu.id);
              setForm(menu);
            }} className="text-blue-500 text-sm underline">編集</button>
            <button onClick={() => onDeleteMenu(menu)} className="text-red-500 text-sm underline">削除</button>
          </div>
        )
      )}

      {isAdding ? (
        <MenuFormInline
          menuForm={form}
          setMenuForm={setForm}
          onSubmit={handleAdd}
          onCancel={() => setIsAdding(false)}
          isEditing={false}
        />
      ) : (
        <button
          onClick={() => {
            setForm({ 
              id: "", 
              name: '', 
              price: '', 
              stock: '', 
              categoryId: category.id 
          });
            setIsAdding(true);
          }}
          className="text-sm text-blue-500 underline mt-2"
        >
          ＋追加する
        </button>
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Category, MenuItem } from '@/types';
import { useMenuManagement } from '@/hooks/useMenuManagement';

interface Props {
  onCancel: () => void;
  isEditing: boolean;
  category: Category;
  menu:MenuItem;
  onSubmitSuccess: () => void;
}

export const MenuFormInline: React.FC<Props> = ({
  onCancel,
  isEditing,
  category,
  menu,
  onSubmitSuccess
}) => {
  const { AddMenu, UpdateAndSave } = useMenuManagement();

  const [form, setForm] = useState<MenuItem>({
    id: menu.id || "",
    categoryId: menu.categoryId || category.id,
    categoryName: menu.categoryName || "",
    name: menu.name || "",
    price: menu.price || "",
    stock: menu.stock || "",
  });


  const handleSubmit = () => {
    if (!form.name || !form.price || !form.stock) return;

    AddMenu({
      categoryId: category.id,
      name: form.name,
      price: form.price,
      stock: form.stock,
    });

    onSubmitSuccess();
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-3 items-end bg-gray-50 p-4 rounded-lg border border-gray-200 mb-3">
      <input
        type="text"
        placeholder="メニュー名"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="flex-1 min-w-[150px] border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <input
        type="number"
        placeholder="金額"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: Number(e.target.value) })
        }
        className="w-28 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <input
        type="number"
        placeholder="残数"
        value={form.stock }
        onChange={(e) =>
          setForm({ ...form, stock: Number(e.target.value) })
        }
        className="w-28 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <button
        onClick={handleSubmit}
        disabled={!form.name || !form.price || !form.stock}
        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
          !form.name || !form.price || !form.stock
            ? 'bg-gray-300 text-white cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {isEditing ? '更新' : '登録'}
      </button>

      <button
        onClick={onCancel}
        className="text-sm text-gray-500 hover:text-gray-700 underline"
      >
        キャンセル
      </button>
    </div>
  );
};

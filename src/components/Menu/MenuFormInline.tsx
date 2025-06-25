// components/MenuFormInline.tsx
import React, { useRef, useEffect } from 'react';
import { MenuItem } from '@/types';
import { cn } from '@/lib/utils';

interface Props {
  menuForm: MenuItem;
  setMenuForm: (form: MenuItem) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

export const MenuFormInline: React.FC<Props> = ({
  menuForm,
  setMenuForm,
  onSubmit,
  onCancel,
  isEditing
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex gap-2 items-end mb-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="メニュー名"
        value={menuForm.name}
        onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
        className="border p-1 rounded w-32"
      />
      <input
        type="number"
        placeholder="金額"
        value={menuForm.price}
        onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
        className="border p-1 rounded w-20"
      />
      <input
        type="number"
        placeholder="残数"
        value={menuForm.stock}
        onChange={(e) => setMenuForm({ ...menuForm, stock: e.target.value })}
        className="border  p-1 rounded w-20"
      />
      <button 
        onClick={onSubmit} 
        className={cn(
          "bg-green-600 text-white px-2 py-1 rounded",
          
        )}
        disabled={!menuForm.name || !menuForm.price || !menuForm.stock}
      >
        {isEditing ? '更新' : '登録'}
      </button>

      <button 
        onClick={onCancel} 
        className="text-sm text-gray-500 underline"
      >
        キャンセル
      </button>
    </div>
  );
};

// components/MenuFormInline.tsx
import React, { useState } from 'react';
import { Category, MenuItem } from '@/types';
import { useMenuData } from '@/hooks/useMenuData';

interface Props {
  onCancel: () => void;
  isEditing: boolean;
  category:Category;
  onSubmitSuccess: () => void;
}

export const MenuFormInline: React.FC<Props> = ({
  onCancel,
  isEditing,
  category,
  onSubmitSuccess
}) => {

  
    const { AddMenu,UpdateAndSave } = useMenuData();

    const [form, setForm] = useState<MenuItem>({
      id: "",
      categoryId: category.id,
      categoryName:"",
      name: '',
      price: "" ,
      stock: "" ,
    });

  const handleSubmit = () => {
    if(!form.price || !form.stock) return;
    AddMenu({
      categoryId: category.id,
      name: form.name,
      price: form.price,
      stock: form.stock,
    });

    // 保存が成功したら呼び出す
    onSubmitSuccess();
  };
  


  return (
    <div className="flex gap-2 items-end mb-2">
      <input
        type="text"
        placeholder="メニュー名"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-1 rounded w-32"
      />

      <input
        type="number"
        placeholder="金額"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        className="border p-1 rounded w-20"
      />

      <input
        type="number"
        placeholder="残数"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
        className="border  p-1 rounded w-20"
      />


      <button 
        onClick={()=>{
          handleSubmit();
        }} 
        className="bg-green-600 text-white px-2 py-1 rounded"
        disabled={!form.name || !form.price || !form.stock}
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


// components/MenuForm.tsx
import React, { useRef } from 'react';
import type { Category, MenuForm as MenuFormType } from '../../types';

interface FormField {
  name: string;
  label: string;
  input: JSX.Element;
}

interface MenuFormProps {
  categories: Category[];
  menuForm: MenuFormType;
  setMenuForm: (form: MenuFormType) => void;
  editingMenuId: number | null;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const MenuForm: React.FC<MenuFormProps> = ({
  categories,
  menuForm,
  setMenuForm,
  editingMenuId,
  onSubmit,
  onKeyDown,
}) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
    
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === 'Enter' && (e.target as HTMLInputElement).name === 'stock') {
      e.preventDefault(); // ← デフォルト動作（form submit など）を防ぐ
      onSubmit(); // ← 登録処理を実行
      nameInputRef.current?.focus(); // ← メニュー名にフォーカス
    }

    onKeyDown(e); // ← 親の onKeyDown を呼ぶ（必要に応じて）
  };


  const getFormFields = (): FormField[] => [

    {
      name: 'categoryId',
      label: 'カテゴリ',
      input: (
        <select
          key="categoryId"
          name="categoryId"
          value={menuForm.categoryId}
          onChange={(e) => setMenuForm({ ...menuForm, categoryId: e.target.value })}
          className="border p-2 rounded"
          onKeyDown={onKeyDown}
          disabled={editingMenuId !== null}
        >
          <option value="">選択</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.id} - {c.name}</option>
          ))}
        </select>
      )
    },
    {
      name: 'name',
      label: 'メニュー名',
      input: (
        <input
          key="name"
          ref={nameInputRef}
          type="text"
          name="name"
          value={menuForm.name}
          onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
          className="border p-2 rounded"
          onKeyDown={onKeyDown}
        />
      )
    },
    {
      name: 'price',
      label: '金額',
      input: (
        <input
          key="price"
          type="number"
          name="price"
          value={menuForm.price}
          onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
          className="border p-2 rounded"
          onKeyDown={onKeyDown}
        />
      )
    },
    {
      name: 'stock',
      label: '残数',
      input: (
        <input
          key="stock"
          type="number"
          name="stock"
          value={menuForm.stock}
          onChange={(e) => setMenuForm({ ...menuForm, stock: e.target.value })}
          className="border p-2 rounded"
          onKeyDown={handleKeyDown}
        />
      )
    }
  ];

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
            エンターキーで続けて登録が行えます。
          </div>      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {getFormFields().map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-1 font-medium">{field.label}</label>
            {field.input}
          </div>
        ))}
      </div>
      <div className="mt-4 space-x-2">
        <button
          onClick={()=>{
            onSubmit();
            nameInputRef.current?.focus();
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={!menuForm.categoryId || !menuForm.name || !menuForm.price || !menuForm.stock}
        >
          登録
        </button>
      </div>
      <div
        className='mt-3'
      >


      </div>

    </section>
  );
};
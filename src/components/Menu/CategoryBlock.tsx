// components/CategoryBlock.tsx
import React, { useState } from 'react';
import { Category  } from '@/types';
import { MenuFormInline } from './MenuFormInline';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useMenuManagement } from '@/hooks/useMenuManagement';

interface Props {
  category: Category;
}

export const CategoryBlock: React.FC<Props> = ({
  category,
}) => {

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | "">("");

  const { menus} = useLocalStorage();
  const { DeleteMenu } = useMenuManagement();
  


  return (
    <div className="mb-6 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">
        {category.name}
      </h3>

      {menus.filter(m => m.categoryId === category.id).map((menu) =>
        editingId === menu.id ? (
          <MenuFormInline
            key={menu.id}
            menu={menu}
            category={category}        
            onCancel={() => setIsAdding(false)}
            isEditing={false}
            onSubmitSuccess={() => setIsAdding(false)}
          />
        ) : (
          <div key={menu.id} className="flex gap-2 items-center mb-1">
            <span>{menu.name}</span>
            <span>¥{menu.price}</span>
            <span>残: {menu.stock}</span>

            <button 
              onClick={() => setEditingId(menu.id)} 
              className="text-blue-500 text-sm underline"
            >
              編集
            </button>
            
            <button 
              onClick={() => DeleteMenu(menu.id)} 
              className="text-red-500 text-sm underline"
            >
              削除
            </button>
          </div>
        )
      )}


      {isAdding ? (
        <MenuFormInline
          category={category}        
          onCancel={() => setIsAdding(false)}
          isEditing={false}
          onSubmitSuccess={() => setIsAdding(false)}
        />
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="text-sm text-blue-500 underline mt-2"
        >
          ＋追加する
        </button>
      )}
    </div>
  );
};

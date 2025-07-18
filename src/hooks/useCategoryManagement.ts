
// hooks/useCategoryManagement.ts
import {  useState } from 'react';
import type { Category, MenuItem } from '../types';
import { useMenuManagement } from './useMenuManagement';

export const useCategoryManagement = (
  categories: Category[],
  menus: MenuItem[],
) => {
  
  const [newCategory, setNewCategory] = useState('');
  const { UpdateAndSave } = useMenuManagement();

  const handleAddCategory = () => {
    if (newCategory && !categories.find((c) => c.name === newCategory)) {
      const newCats = [...categories, { id: categories.length + 1, name: newCategory }];
      UpdateAndSave(newCats, menus);
      setNewCategory('');
    }
  };
  

  const moveCategory = (index: number, direction: 'up' | 'down') => {
    const newList = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newList.length) return;
    [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];
    UpdateAndSave(newList, menus);
  };
 // カテゴリ削除関数を追加
  const handleDeleteCategory = (categoryId: number) => {
    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    const updatedMenus = menus.filter(menu => menu.categoryId !== categoryId);
    UpdateAndSave(updatedCategories, updatedMenus);
  };

  // ドラッグ&ドロップでの並び替え関数を追加
  const handleReorderCategories = (startIndex: number, endIndex: number) => {
    const newCategories = [...categories];
    const [draggedItem] = newCategories.splice(startIndex, 1);
    newCategories.splice(endIndex, 0, draggedItem);
    UpdateAndSave(newCategories, menus);
  };

  return {
    newCategory,
    setNewCategory,
    handleAddCategory,
    moveCategory,
    handleDeleteCategory,
    handleReorderCategories,
  };
};
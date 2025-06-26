// MenuPage.tsx (メインコンポーネント)
'use client';

import MenuUploader from '@/components/Menu/MenuUploader';
import { CategorySection } from '@/components/Menu/CategorySection';
import { MenuList } from '@/components/Menu/MenuList';
import { useCategoryManagement } from '@/hooks/useCategoryManagement';
import { useMenuData } from '@/hooks/useMenuData';
import React from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';


const MenuPage = () => {
  const { updateAndSave } = useMenuData();
    const { categories, menus} = useLocalStorage();
    
  const {
   newCategory,
    setNewCategory,
    handleAddCategory,
    moveCategory,
    handleDeleteCategory,
    handleReorderCategories,
  } = useCategoryManagement(categories, menus, updateAndSave);



  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <CategorySection
        categories={categories}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        onAddCategory={handleAddCategory}
        onMoveCategory={moveCategory}
        onDeleteCategory={handleDeleteCategory}
        onReorderCategories={handleReorderCategories}
      />

      <MenuList />
      <MenuUploader  />
    </div>
  );
};

export default MenuPage;
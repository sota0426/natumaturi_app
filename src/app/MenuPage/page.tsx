// MenuPage.tsx (メインコンポーネント)
'use client';

import MenuUploader from '@/components/Menu/MenuUploader';
import { CategorySection } from '@/components/Menu/CategorySection';

import { MenuList } from '@/components/Menu/MenuList';
import { useCategoryManagement } from '@/hooks/useCategoryManagement';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useMenuData } from '@/hooks/useMenuData';
import { useMenuManagement } from '@/hooks/useMenuManagement';
import React from 'react';


const MenuPage = () => {
  const { categories, menus, updateAndSave } = useMenuData();
  
  const {
   newCategory,
    setNewCategory,
    handleAddCategory,
    moveCategory,
    handleDeleteCategory,
    handleReorderCategories,
  } = useCategoryManagement(categories, menus, updateAndSave);

  const {
    menuForm,
    setMenuForm,
    editingMenuId,
    handleAddOrUpdateMenu,
    startEditMenu,
    deleteMenu,
    moveMenu,
    cancelEdit,
  } = useMenuManagement(categories, menus, updateAndSave);


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

    <MenuList
      categories={categories}
      menus={menus}
      onAddMenu={handleAddOrUpdateMenu}
      onUpdateMenu={handleAddOrUpdateMenu}
      onDeleteMenu={deleteMenu}
      onMoveMenu={moveMenu}
      editingMenuId={editingMenuId}
      menuForm={menuForm}
      setMenuForm={setMenuForm}
      onCancelEdit={cancelEdit}
      onEditMenu={startEditMenu}
    />


           <MenuUploader  />
    </div>
  );
};

export default MenuPage;
// MenuPage.tsx (メインコンポーネント)
'use client';

import { CategorySection } from '@/hooks/CategorySection';
import { MenuForm } from '@/hooks/MenuForm';
import { MenuList } from '@/hooks/MenuList';
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

  const { handleKeyDown } = useKeyboardNavigation(handleAddOrUpdateMenu);

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

      <MenuForm
        categories={categories}
        menuForm={menuForm}
        setMenuForm={setMenuForm}
        editingMenuId={editingMenuId}
        onSubmit={handleAddOrUpdateMenu}
        onCancel={cancelEdit}
        onKeyDown={handleKeyDown}
      />

      <MenuList
        categories={categories}
        menus={menus}
        onEditMenu={startEditMenu}
        onUpdateMenu={handleAddOrUpdateMenu} // 追加
        editingMenuId={editingMenuId}        // 追加
        menuForm={menuForm}                  // 追加
        setMenuForm={setMenuForm}            // 追加
        onCancelEdit={cancelEdit}            
        onDeleteMenu={deleteMenu}
        onMoveMenu={moveMenu}
      />
      
    </div>
  );
};

export default MenuPage;
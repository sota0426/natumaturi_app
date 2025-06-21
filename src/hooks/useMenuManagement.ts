// hooks/useMenuManagement.ts
import { useState } from 'react';
import type { Category, MenuItem, MenuForm } from '../types';

export const useMenuManagement = (
  categories: Category[],
  menus: MenuItem[],
  updateAndSave: (cats: Category[], menuList: MenuItem[]) => void
) => {
  const [menuForm, setMenuForm] = useState<MenuForm>({
    categoryId: '',
    name: '',
    price: '',
    stock: '',
  });
  const [editingMenuId, setEditingMenuId] = useState<number | null>(null);

  const handleAddOrUpdateMenu = () => {
    const { categoryId, name, price, stock } = menuForm;
    const category = categories.find((c) => c.id === parseInt(categoryId));
    if (!category || !name || !price || !stock) return;

    if (editingMenuId !== null) {
      // 編集更新
      const updatedMenus = menus.map((m) =>
        m.id === editingMenuId && m.categoryId === category.id
          ? { ...m, name, price: Number(price), stock: Number(stock) }
          : m
      );
      updateAndSave(categories, updatedMenus);
      setEditingMenuId(null);
    } else {
      // 新規登録
      const newMenu: MenuItem = {
        id: 0, // 後で再割当てされる
        categoryId: category.id,
        categoryName: category.name,
        name,
        price: Number(price),
        stock: Number(stock),
      };
      updateAndSave(categories, [...menus, newMenu]);
    }

    // カテゴリは維持し、他はリセット
    setMenuForm((prev) => ({
      categoryId: prev.categoryId,
      name: '',
      price: '',
      stock: '',
    }));
  };

  const startEditMenu = (menu: MenuItem) => {
    setEditingMenuId(menu.id);
    setMenuForm({
      categoryId: String(menu.categoryId),
      name: menu.name,
      price: String(menu.price),
      stock: String(menu.stock),
    });
  };

  const deleteMenu = (menu: MenuItem) => {
    const filtered = menus.filter(
      (m) => !(m.id === menu.id && m.categoryId === menu.categoryId)
    );
    updateAndSave(categories, filtered);
    // 編集中だったらリセット
    if (editingMenuId === menu.id) {
      setEditingMenuId(null);
      setMenuForm((prev) => ({
        categoryId: prev.categoryId,
        name: '',
        price: '',
        stock: '',
      }));
    }
  };
  
  const moveMenu = (categoryId: number, index: number, direction: 'up' | 'down') => {
    const filteredMenus = menus.filter((m) => m.categoryId === categoryId);
    const newList = [...filteredMenus];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newList.length) return;
    [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];
    
    const others = menus.filter((m) => m.categoryId !== categoryId);
    updateAndSave(categories, [...others, ...newList]);
  };

  const cancelEdit = () => {
    setEditingMenuId(null);
    setMenuForm((prev) => ({
      categoryId: prev.categoryId,
      name: '',
      price: '',
      stock: '',
    }));
  };

  return {
    menuForm,
    setMenuForm,
    editingMenuId,
    handleAddOrUpdateMenu,
    startEditMenu,
    deleteMenu,
    moveMenu,
    cancelEdit,
  };
};
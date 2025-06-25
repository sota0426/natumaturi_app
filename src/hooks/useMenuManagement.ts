import { useState } from 'react';
import type { Category, MenuItem, MenuForm } from '../types';

export const useMenuManagement = (
  categories: Category[],
  menus: MenuItem[],
  updateAndSave: (cats: Category[], menuList: MenuItem[]) => void
) => {
  const [menuForm, setMenuForm] = useState<MenuForm>({
    categoryId: null,
    name: '',
    price: null,
    stock: null,
  });

  const [editingMenuId, setEditingMenuId] = useState<number | null>(null);

  const handleAddOrUpdateMenu = () => {
    const { categoryId, name, price, stock } = menuForm;
    const category = categories.find((c) => c.id === parseInt(categoryId));
    if (!category || !name.trim() || !price || !stock) return;

    if (editingMenuId !== null) {
      // 編集更新
      const updatedMenus = menus.map((m) =>
        m.id === editingMenuId
          ? {
              ...m,
              name: name.trim(),
              price: Number(price),
              stock: Number(stock),
            }
          : m
      );
      updateAndSave(categories, updatedMenus);
      setEditingMenuId(null);
    } else {
      // 新規登録
      const maxId = menus.length ? Math.max(...menus.map((m) => m.id)) : 0;
      const newMenu: MenuItem = {
        id: maxId + 1,
        categoryId: category.id,
        categoryName: category.name,
        name: name.trim(),
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
      categoryId: menu.categoryId,
      name: menu.name,
      price: menu.price,
      stock: menu.stock,
    });
  };

  const deleteMenu = (menu: MenuItem) => {
    const filtered = menus.filter((m) => !(m.id === menu.id));
    updateAndSave(categories, filtered);

    if (editingMenuId === menu.id) {
      cancelEdit();
    }
  };

  const moveMenu = (
    categoryId: number,
    index: number,
    direction: 'up' | 'down'
  ) => {
    const categoryMenus = menus.filter((m) => m.categoryId === categoryId);
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= categoryMenus.length) return;

    const reordered = [...categoryMenus];
    [reordered[index], reordered[targetIndex]] = [
      reordered[targetIndex],
      reordered[index],
    ];

    const others = menus.filter((m) => m.categoryId !== categoryId);
    updateAndSave(categories, [...others, ...reordered]);
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

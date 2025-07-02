// hooks/useMenuManagement.ts
import type { Category, MenuItem } from '../types';
import { useLocalStorage } from './useLocalStorage';

export const useMenuManagement = () => {
  const {
    categories,
    menus,
    setCategories,
    setMenus,
    saveToLocalStorage,
  } = useLocalStorage();

  // カテゴリIDを再割り当て（必要なら）
  const reassignCategoryIds = (cats: Category[]) => {
    return cats.map((cat, i) => ({ ...cat, id: i + 1 }));
  };

  // 全データ保存（IDを保持）
  const UpdateAndSave = (updatedCats: Category[], updatedMenus: MenuItem[]) => {
    const newCats = reassignCategoryIds(updatedCats); // category.id の再整理だけ行う
    setCategories(newCats);
    setMenus(updatedMenus);
    saveToLocalStorage(newCats, updatedMenus);
  };

  // メニュー追加
  const AddMenu = (form: {
    categoryId: number;
    name: string;
    price: number;
    stock: number;
  }) => {
    const { categoryId, name, price, stock } = form;

    const category = categories.find((c) => c.id === categoryId);
    if (!category || !name.trim() || !price || !stock) return;

    const maxId = menus.length ? Math.max(...menus.map((m) => m.id)) : 0;

    const newMenu: MenuItem = {
      id: maxId + 1,
      categoryId: category.id,
      categoryName: category.name,
      name: name.trim(),
      price,
      stock,
    };

    UpdateAndSave(categories, [...menus, newMenu]);
  };

  // メニュー編集
  const UpdateMenu = (updatedMenu: MenuItem) => {
    const updatedMenus = menus.map((menu) =>
      menu.id === updatedMenu.id ? { ...updatedMenu } : menu
    );
    UpdateAndSave(categories, updatedMenus);
  };

  // メニュー削除
  const DeleteMenu = (menuId: number) => {
    const updatedMenus = menus.filter((m) => m.id !== menuId);
    UpdateAndSave(categories, updatedMenus);
  };

  return {
    UpdateMenu,
    UpdateAndSave,
    AddMenu,
    DeleteMenu,
  };
};

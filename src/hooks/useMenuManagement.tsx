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

  const reassignCategoryIds = (cats: Category[]) => {
    return cats.map((cat, i) => ({ ...cat, id: i + 1 }));
  };

  const reassignMenuIds = (menus: MenuItem[], cats: Category[]) => {
    let newMenus: MenuItem[] = [];
    cats.forEach((cat) => {
      const filtered = menus.filter((m) => m.categoryName === cat.name);
      filtered.forEach((m, i) => {
        newMenus.push({
          ...m,
          categoryId: cat.id,
          id: i + 1,
        });
      });
    });
    return newMenus;
  };

  const UpdateAndSave = (updatedCats: Category[], updatedMenus: MenuItem[]) => {
    const newCats = reassignCategoryIds(updatedCats);
    const newMenus = reassignMenuIds(updatedMenus, newCats);
    setCategories(newCats);
    setMenus(newMenus);
    saveToLocalStorage(newCats, newMenus);
  };



  const AddMenu = (form: {
    categoryId: number;
    name: string;
    price: number;
    stock: number;
  }) => {
    const { categoryId, name, price, stock } = form;

    const category = categories?.find((c) => c.id === categoryId);
    alert(JSON.stringify(category)); // デバッグ用

    if (!category || !name.trim() || !price || !stock) {
      return;
    }

    const maxId = menus.length ? Math.max(...menus.map((m) => m.id)) : 0;
    const newMenu: MenuItem = {
      id: maxId + 1,
      categoryId: category.id,
      categoryName: category.name,
      name: name.trim(),
      price,
      stock,
    }
    UpdateAndSave(categories, [...menus, newMenu]);
  };


  const DeleteMenu = (menuId:number)=>{
    const updatedMenus = menus.filter((m)=> m.id !== menuId);
    UpdateAndSave(categories,updatedMenus);
  }



  return {
    UpdateAndSave,
    AddMenu,
    DeleteMenu
  };
};


// hooks/useMenuData.ts
import type { Category, MenuItem } from '../types';
import { useLocalStorage } from './useLocalStorage';

export const useMenuData = () => {
  const { categories, menus, setCategories, setMenus, saveToLocalStorage } = useLocalStorage();

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

  const updateAndSave = (updatedCats: Category[], updatedMenus: MenuItem[]) => {
    const newCats = reassignCategoryIds(updatedCats);
    const newMenus = reassignMenuIds(updatedMenus, newCats);
    setCategories(newCats);
    setMenus(newMenus);
    saveToLocalStorage(newCats, newMenus);
  };

  return {
    categories,
    menus,
    updateAndSave,
  };
};
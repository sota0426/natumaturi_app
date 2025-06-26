// hooks/useLocalStorage.ts
import { Category, MenuItem } from '@/types';
import { useEffect, useState } from 'react';


export const useLocalStorage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    const storedCats = localStorage.getItem('categories');
    const storedMenus = localStorage.getItem('menus');

    if (storedCats) setCategories(JSON.parse(storedCats));
    if (storedMenus) setMenus(JSON.parse(storedMenus));
  }, []);


  
  const saveToLocalStorage = (cats: Category[], menuList: MenuItem[]) => {
    localStorage.setItem('categories', JSON.stringify(cats));
    localStorage.setItem('menus', JSON.stringify(menuList));

  };

  return {
    categories,
    menus,
    setCategories,
    setMenus,
    saveToLocalStorage,
  };
};
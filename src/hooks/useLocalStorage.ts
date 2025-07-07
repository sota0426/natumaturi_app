'use client';

import { Category, MenuItem } from '../types';
import { useEffect, useState } from 'react';

export const useLocalStorage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedCats = localStorage.getItem('categories');
        const storedMenus = localStorage.getItem('menus');

        if (storedCats) {
          const parsedCats = JSON.parse(storedCats);
          setCategories(Array.isArray(parsedCats) ? parsedCats : []);
        }
        if (storedMenus) {
          const parsedMenus = JSON.parse(storedMenus);
          setMenus(Array.isArray(parsedMenus) ? parsedMenus : []);
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        setCategories([]);
        setMenus([]);
      } finally {
        setIsLoaded(true);
      }
    }
  }, []);

  const saveToLocalStorage = (cats: Category[], menuList: MenuItem[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('categories', JSON.stringify(cats || []));
        localStorage.setItem('menus', JSON.stringify(menuList || []));

        setCategories(Array.isArray(cats) ? cats : []);
        setMenus(Array.isArray(menuList) ? menuList : []);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  };

  
  // メニュー関連の操作メソッド
  const addMenu = (newMenu: MenuItem) => {
    // バリデーション: newMenuが有効かチェック
    if (!newMenu || !newMenu.name || typeof newMenu.price === 'undefined') {
      console.error('Invalid menu data for adding:', newMenu);
      return;
    }

    const currentMenus = Array.isArray(menus) ? menus : [];
    // IDが存在しない場合は新しいIDを生成
    const menuWithId = {
      ...newMenu,
      id: newMenu.id || Date.now() + Math.random()
    };
    const updatedMenus = [...currentMenus, menuWithId];
    saveToLocalStorage(categories, updatedMenus);
  };

  const updateMenu = (updatedMenu: MenuItem) => {
    // バリデーション: updatedMenuが有効かチェック
    if (!updatedMenu || typeof updatedMenu.id === 'undefined') {
      console.error('Invalid menu data:', updatedMenu);
      return;
    }

    const currentMenus = Array.isArray(menus) ? menus : [];
    const updatedMenus = currentMenus.map(menu => 
      menu.id === updatedMenu.id ? { ...menu, ...updatedMenu } : menu
    );
    saveToLocalStorage(categories, updatedMenus);
  };

  const deleteMenu = (menuId: number) => {
    // バリデーション: menuIdが有効かチェック
    if (typeof menuId === 'undefined' || menuId === null) {
      console.error('Invalid menu ID for deletion:', menuId);
      return;
    }

    const currentMenus = Array.isArray(menus) ? menus : [];
    const updatedMenus = currentMenus.filter(menu => menu.id !== menuId);
    saveToLocalStorage(categories, updatedMenus);
  };

  // カテゴリ関連の操作メソッド
  const addCategory = (newCategory: Category) => {
    const currentCategories = Array.isArray(categories) ? categories : [];
    const updatedCategories = [...currentCategories, newCategory];
    saveToLocalStorage(updatedCategories, menus);
  };

  const updateCategory = (updatedCategory: Category) => {
    const currentCategories = Array.isArray(categories) ? categories : [];
    const updatedCategories = currentCategories.map(cat => 
      cat.id === updatedCategory.id ? updatedCategory : cat
    );
    saveToLocalStorage(updatedCategories, menus);
  };

  const deleteCategory = (categoryId: number) => {
    const currentCategories = Array.isArray(categories) ? categories : [];
    const currentMenus = Array.isArray(menus) ? menus : [];
    const updatedCategories = currentCategories.filter(cat => cat.id !== categoryId);
    // カテゴリを削除する時は、そのカテゴリのメニューも削除
    const updatedMenus = currentMenus.filter(menu => menu.categoryId !== categoryId);
    saveToLocalStorage(updatedCategories, updatedMenus);
  };

  return {
    categories: Array.isArray(categories) ? categories : [],
    menus: Array.isArray(menus) ? menus : [],
    isLoaded,
    setCategories,
    setMenus,
    saveToLocalStorage,
    // 操作メソッド
    addMenu,
    updateMenu,
    deleteMenu,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
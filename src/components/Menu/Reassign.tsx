import { Category, MenuItem } from "../../types";


export  const reassignCategoryIds = (cats: Category[]) => {
    return cats.map((cat, i) => ({ ...cat, id: i + 1 }));
  };

export  const reassignMenuIds = (menus: MenuItem[], cats: Category[]) => {
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

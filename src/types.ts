export type Category = { 
  id: number| null ; 
  name: string 
};

export type MenuItem = {
  id: number| null ;
  categoryId: number| null ;
  categoryName: string;
  name: string;
  price: number| null ;
  stock: number| null ;
};

export type MenuForm = {
  categoryId: number | null ;
  name: string;
  price: number| null ;
  stock: number| null ;
};

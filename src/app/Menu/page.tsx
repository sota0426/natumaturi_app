// MenuPage.tsx (メインコンポーネント)
'use client';

import MenuUploader from '@/components/Menu/MenuUploader';
import { CategorySection } from '@/components/Menu/CategorySection';
import { MenuList } from '@/components/Menu/MenuList';
import React from 'react';


const MenuPage = () => {

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <CategorySection />
      <MenuList />
      <MenuUploader  />
    </div>
  );
};

export default MenuPage;
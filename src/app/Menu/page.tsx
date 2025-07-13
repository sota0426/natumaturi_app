// MenuPage.tsx (メインコンポーネント)
'use client';

import MenuUploader from '../../components/Menu/MenuUploader';
import { CategorySection } from '../../components/Menu/CategorySection';
import { MenuList } from '../../components/Menu/MenuList';
import React from 'react';
import ExcelTemplateDownloader from '@/components/Menu/ExcelTemplateDownloader';


const MenuPage = () => {

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 max-w-7xl mx-auto space-y-10">

      <CategorySection />
      <MenuList />  
      <ExcelTemplateDownloader />      
      <MenuUploader  />
    </div>
  );
};

export default MenuPage;
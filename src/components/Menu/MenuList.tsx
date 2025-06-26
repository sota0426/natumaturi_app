import React from 'react';
import { CategoryBlock } from './CategoryBlock';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const MenuList = () => {
  const { categories, menus } = useLocalStorage();

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3">
            🍔
          </span>
          メニュー登録
        </h2>

        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {menus.length} 件
        </span>
      </div>

      {/* ヒント */}
      <div className="text-sm text-gray-600 mb-4 flex items-center gap-2">
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
          💡 ヒント
        </span>
        編集はエンターキーで続けて登録が行えます。
      </div>

      {/* カテゴリリスト */}
      {categories.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-4">📂</div>
          <p className="text-lg mb-2">カテゴリがまだありません</p>
          <p className="text-sm">カテゴリ管理からカテゴリを追加してください</p>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((cat) => (
            <CategoryBlock 
              key={cat.id} 
              category={cat} 
            />
          ))}
        </div>
      )}
    </section>
  );
};

import React, { useState } from 'react';
import { Category } from '../../types';
import { MenuFormInline } from './MenuFormInline';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface Props {
  category: Category;
}

export const CategoryBlock: React.FC<Props> = ({ category }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | ''>('');
  const { 
    menus,
    isLoaded,
    deleteMenu,
    updateMenu,
    addMenu
  } = useLocalStorage();

  // データがロードされるまで待機
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // menusが確実に配列であることを保証
  const safeMenus = Array.isArray(menus) ? menus : [];
  const filteredMenus = safeMenus.filter(m => m.categoryId === category.id);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
        <span className="bg-blue-100 text-blue-700 rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold">
          🍽
        </span>
        {category.name}
        <span className="text-sm text-gray-500 ml-auto">
          {filteredMenus.length} 件のメニュー
        </span>
      </h3>

      <div className="space-y-2">
        {filteredMenus.map(menu =>
          editingId === menu.id ? (
            <MenuFormInline
              key={menu.id}
              menu={menu}
              category={category}
              onCancel={() => setEditingId('')}
              isEditing={true}
              onSubmitSuccess={(updatedMenu) => {
                console.log('Updating menu:', updatedMenu);
                updateMenu(updatedMenu);
                setEditingId('');
              }}
            />
          ) : (
            <div
              key={menu.id}
              className="bg-white border border-gray-200 rounded-lg px-4 py-4 hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* メニュー名 */}
                <div className="flex-1 min-w-0">
                  <span className="text-gray-800 font-semibold text-lg block truncate">{menu.name}</span>
                </div>
                
                {/* 価格と在庫を統一したレイアウト */}
                <div className="flex items-center gap-6 flex-shrink-0">
                  {/* 金額の表示 */}
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                      価格
                    </span>
                    <span className="text-green-700 font-bold text-lg whitespace-nowrap">
                      ¥{menu.price.toLocaleString()}
                    </span>
                  </div>
                  
                  {/* 残数の表示 */}
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
                      menu.stock > 10 
                        ? 'bg-blue-100 text-blue-800' 
                        : menu.stock > 5 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      在庫
                    </span>
                    <span className={`font-bold text-lg whitespace-nowrap ${
                      menu.stock > 10 
                        ? 'text-blue-700' 
                        : menu.stock > 5 
                        ? 'text-yellow-700' 
                        : 'text-red-700'
                    }`}>
                      {menu.stock}個
                    </span>
                  </div>
                  
                  {/* ボタン */}
                  <div className="flex gap-3 text-sm">
                    <button
                      onClick={() => setEditingId(menu.id)}
                      className="px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 font-medium rounded-lg transition-colors duration-200 border border-blue-200 whitespace-nowrap"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => deleteMenu(menu.id)}
                      className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 font-medium rounded-lg transition-colors duration-200 border border-red-200 whitespace-nowrap"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-6">
        {isAdding ? (
          <MenuFormInline
            category={category}
            onCancel={() => setIsAdding(false)}
            isEditing={false}
            onSubmitSuccess={(newMenu) => {
              console.log('Adding menu:', newMenu);
              addMenu(newMenu);
              setIsAdding(false);
            }}
          />
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            メニューを追加
          </button>
        )}
      </div>
    </div>
  );
};
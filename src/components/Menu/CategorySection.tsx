import React, { useState } from 'react';
import { useCategoryManagement } from '../../hooks/useCategoryManagement';
import { useLocalStorage } from '../../hooks/useLocalStorage';



export const CategorySection= () => {

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false); // デフォルトで表示状態

  const { categories, menus} = useLocalStorage();
    
    const {
    newCategory,
    setNewCategory,
    handleAddCategory,
    moveCategory,
    handleDeleteCategory,
    handleReorderCategories,
  } = useCategoryManagement(categories, menus);



  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      handleReorderCategories(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const confirmDelete = (categoryId: number, categoryName: string) => {
    if (window.confirm(`カテゴリ「${categoryName}」を削除しますか？\n※このカテゴリのメニューも削除されます。`)) {
      handleDeleteCategory(categoryId);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3">
              📋
            </span>
            カテゴリ管理
          </h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isOpen 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="currentColor"
              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            >
              <path d="M4 6l4 4 4-4H4z"/>
            </svg>
            {isOpen ? '非表示' : '表示'}
          </button>
        </div>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {categories.length} 件
        </span>
      </div>

      {/* 非表示時の簡潔な表示 */}
      {!isOpen && categories.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span
                key={category.id}
                className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200 flex items-center gap-2"
              >
                <span className="bg-gray-200 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </span>
                {category.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {isOpen &&(
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="新しいカテゴリ名を入力してください"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCategory();
              }
            }}
          />
          <button
            onClick={handleAddCategory}
            disabled={!newCategory.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <span className="text-lg">＋</span>
            追加
          </button>
        </div>
      </div>
      )}



      {isOpen &&categories.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-lg mb-2">カテゴリがまだありません</p>
          <p className="text-sm">上のフォームから最初のカテゴリを追加してください</p>
        </div>
      )}

      {isOpen &&categories.length !== 0 && (
        <div className="space-y-2">
          <div className="text-sm text-gray-600 mb-3 flex items-center gap-2">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
              💡 ヒント
            </span>
            ドラッグ&ドロップで順序を変更できます
          </div>
          
          {categories.map((category, index) => (
            <div
              key={category.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-move
                ${draggedIndex === index 
                  ? 'opacity-50 border-blue-400 bg-blue-50' 
                  : dragOverIndex === index 
                    ? 'border-blue-400 bg-blue-50 scale-105' 
                    : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center gap-4">
                {/* ドラッグハンドル */}
                <div className="text-gray-400 hover:text-gray-600 cursor-move">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="3" cy="3" r="1"/>
                    <circle cx="3" cy="8" r="1"/>
                    <circle cx="3" cy="13" r="1"/>
                    <circle cx="8" cy="3" r="1"/>
                    <circle cx="8" cy="8" r="1"/>
                    <circle cx="8" cy="13" r="1"/>
                  </svg>
                </div>
                
                {/* 順序番号 */}
                <div className="bg-gray-100 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                
                {/* カテゴリ名 */}
                <span className="font-medium text-gray-800 text-lg">
                  {category.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* 矢印ボタン（バックアップ操作用） */}
                <div className="flex gap-1 opacity-60">
                  <button
                    disabled={index === 0}
                    onClick={() => moveCategory(index, 'up')}
                    className={`p-2 rounded-md transition-colors ${
                      index === 0 
                        ? 'opacity-30 cursor-not-allowed' 
                        : 'hover:bg-gray-200 text-gray-600'
                    }`}
                    title="上に移動"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 4l-4 4h8l-4-4z"/>
                    </svg>
                  </button>
                  <button
                    disabled={index === categories.length - 1}
                    onClick={() => moveCategory(index, 'down')}
                    className={`p-2 rounded-md transition-colors ${
                      index === categories.length - 1 
                        ? 'opacity-30 cursor-not-allowed' 
                        : 'hover:bg-gray-200 text-gray-600'
                    }`}
                    title="下に移動"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 12l4-4H4l4 4z"/>
                    </svg>
                  </button>
                </div>

                {/* 削除ボタン */}
                <button
                  onClick={() => confirmDelete(category.id, category.name)}
                  className="p-2 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                  title="削除"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 5.883 16h4.234a2 2 0 0 0 1.992-1.84L12.962 3.5h.538a.5.5 0 0 0 0-1H11Zm-9.5 1h9l-.84 10.5a1 1 0 0 1-.996.92H5.336a1 1 0 0 1-.996-.92L3.5 3.5Z"/>
                    <path d="M6.5 5.5a.5.5 0 0 1 1 0v6a.5.5 0 0 1-1 0v-6Zm2 0a.5.5 0 0 1 1 0v6a.5.5 0 0 1-1 0v-6Z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
import { MenuItem } from '@/types';
import React from 'react';

interface Props {
  menu: MenuItem;
  categoryId: number;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onEditMenu: (menu: MenuItem) => void;
  onDeleteMenu: (menu: MenuItem) => void;
  onMoveMenu: (categoryId: number, index: number, direction: 'up' | 'down') => void;
}

export const MenuActions: React.FC<Props> = ({
  menu,
  categoryId,
  index,
  isFirst,
  isLast,
  onEditMenu,
  onDeleteMenu,
  onMoveMenu,
}) => {
  return (
    <>
      <button
        onClick={() => onMoveMenu(categoryId, index, 'up')}
        disabled={isFirst}
        className={`px-2 py-1 rounded ${isFirst ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
      >
        ▲
      </button>
      <button
        onClick={() => onMoveMenu(categoryId, index, 'down')}
        disabled={isLast}
        className={`px-2 py-1 rounded ${isLast ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
      >
        ▼
      </button>
      <button
        onClick={() => onEditMenu(menu)}
        className="px-2 py-1 rounded bg-yellow-300 hover:bg-yellow-400"
      >
        編集
      </button>
      <button
        onClick={() => onDeleteMenu(menu)}
        className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
      >
        削除
      </button>
    </>
  );
};

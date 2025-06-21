
// hooks/useKeyboardNavigation.ts
import { KeyboardEvent } from 'react';

export const useKeyboardNavigation = (
  onSubmit: () => void
) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();

    const formOrder = ['categoryId', 'name', 'price', 'stock'];
    const currentName = (e.target as HTMLInputElement | HTMLSelectElement).name;
    const currentIndex = formOrder.indexOf(currentName);

    if (currentIndex < formOrder.length - 1) {
      // 次の要素にフォーカス
      const nextName = formOrder[currentIndex + 1];
      const nextElem = document.querySelector(`[name=${nextName}]`) as HTMLElement;
      nextElem?.focus();
    } else {
      // 最後の項目なら登録ボタン押下相当
      onSubmit();
    }
  };

  return { handleKeyDown };
};

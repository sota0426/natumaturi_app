import { useCart } from '../../hooks/useCartContent';
import React from 'react';
import { Checkout } from './Checkout';
import { OrderCompletionScreen } from './OrderCompletionScreen';


export const CartPreview: React.FC = () => {
  const { cartItems, isOrderCompleted } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-6 rounded-lg border shadow-md">
      <h2 className="text-xl font-bold mb-4">🛒 購入カート</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">カートは空です。</p>
      ) : (
        <>
          <ul className="space-y-3 mb-4">
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between items-center text-2xl">
                <span className="text-gray-800">{item.name} × {item.quantity}</span>
                <span className="text-green-700 font-semibold">¥{(item.price * item.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>

        </>
      )}

              {/* 会計処理コンポーネント */}
          <Checkout 
            total={total} 
          />
   

      {/* 注文完了画面（モーダル） */}
      {isOrderCompleted && <OrderCompletionScreen/>}
    </div>
  );
};

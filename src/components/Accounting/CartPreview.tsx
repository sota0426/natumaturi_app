import { useCart } from '@/hooks/useCartContent';
import React from 'react';
import { Checkout } from './Checkout';
import { OrderCompletionScreen } from './OrderCompletionScreen';


export const CartPreview: React.FC = () => {
  const { cartItems, clearCart, isOrderCompleted,orderSubmit } = useCart();

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


          <div className="text-right font-bold text-3xl text-gray-800 mb-4">
            合計: ¥{total.toLocaleString()}
          </div>



        </>
      )}

              {/* 会計処理コンポーネント */}
          <Checkout total={total} onSubmit={orderSubmit} />
   
          <button
            onClick={clearCart}
            className="mt-10 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition"
          >
            カートを空にする
          </button>
      {/* 注文完了画面（モーダル） */}
      {isOrderCompleted && <OrderCompletionScreen/>}
    </div>
  );
};

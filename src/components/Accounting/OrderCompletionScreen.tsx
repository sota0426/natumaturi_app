// components/OrderCompletionScreen.tsx

import { useCart } from "../../hooks/useCartContent";

export const OrderCompletionScreen = () => {
  const { cartItems, proceedToNextOrder, receivedAmount } = useCart(); // 預り金も取得

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const change = receivedAmount - total;




  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">注文完了</h2>
            <p className="text-gray-600">ご注文ありがとうございました</p>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">注文内容</h3>
            <div className="space-y-2 text-sm">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>￥{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 mt-2 space-y-1 text-sm">
              <div className="flex justify-between font-bold">
                <span>合計</span>
                <span>￥{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>預り金</span>
                <span>￥{receivedAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>おつり</span>
                <span>￥{change >= 0 ? change.toLocaleString() : "0"}</span>
              </div>
            </div>
          </div>


            <button
              onClick={proceedToNextOrder}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              次の注文に進む
            </button>

        </div>
      </div>
    </div>
  );
};

import { useState } from "react";

type Props={
  total:number;
  onSubmit:()=>void;
}

export const Checkout:React.FC<Props>=({total,onSubmit})=>{
  const [deposit ,setDeposit] = useState(0);

  const handleDigitInput =(digit:number)=>{
    setDeposit(prev => prev * 10 + digit);
  };

  const handleClear = ()=>{
    setDeposit(0);
  }

  const handleSubmit =()=>{    
          onSubmit();
          setDeposit(0);
  }


  const change = deposit - total;

  return(
    <div className="border-t pt-4 mt-4">
          <div className="text-right font-bold text-3xl text-gray-800 mb-4">
            合計: ¥{total.toLocaleString()}
          </div>      
      <div className="mb-4 text-gray-700 font-mesium text-2xl">
        預り金：￥{deposit.toLocaleString()}
      </div>

      <div className="text-gray-800 mb-4 text-2xl">
        おつり：
        <span className="font-bold text-green-700">
          {change >=0 ? `￥${change.toLocaleString()}` : "不足しています"}
        </span>
      </div>

      <div className="mt-20 grid grid-cols-3 gap-2 mb-4">
        {[7,8,9,4,5,6,1,2,3].map((num,idx)=>(
          <button
            key={idx}
            onClick={()=>handleDigitInput(num)}
            className="py-2 bg-gray-200 hover:bg-gray-300 rounded text-lg"
          >
            {num}
          </button>
        ))}
        <button 
            className="py-2 bg-gray-200 hover:bg-gray-300 rounded text-lg"
          onClick={()=>{
            handleDigitInput(0);
            handleDigitInput(0);
          }}
        >
          00
          </button>        
        <button 
            className="py-2 bg-gray-200 hover:bg-gray-300 rounded text-lg"
            onClick={()=>handleDigitInput(0)}
        >
        0
        </button>
        <button 
          className="py-2 bg-gray-200 hover:bg-gray-300 rounded text-lg "
          onClick={()=>handleClear()}
        >
          Clear
        </button>
      </div>



      <button
        onClick={handleSubmit}
        disabled={change < 0}
        className={`px-4 py-2 rounded text-white transition mb-3 ${
          change >=0 ? 'bg-red-500 hover:bg-red-600':'bg-gray-400 cursor-not-allowed'
        }`} 
      >
        注文完了（次の注文へ進む）
      </button>

    </div>
  )

}








import { useCart } from "@/hooks/useCartContent";
import { useMemo, useState } from "react";

type Props={
  total:number;
}

const denominations = [1,5,10,50,100,500,1000,5000,1000];  

export const Checkout:React.FC<Props>=({total})=>{

const [counts, setCounts] = useState<Record<number, number>>({
  1: 0,
  5: 0,
  10: 0,
  50: 0,
  100: 0,
  500: 0,
  1000: 0,
  5000: 0,
  10000: 0,
});

  const {clearCart,orderSubmit}=useCart()

  const deposit = useMemo(() => {
  return Object.entries(counts).reduce((sum, [k, v]) => sum + Number(k) * v, 0);
}, [counts]);


  const change = deposit - total;

  const handleDigitInput =(digit:number)=>{
    setCounts(prev=>({
      ...prev,
      [digit]:prev[digit]+1
    }))
  };

  const handleCartClear =()=>{
    clearCart();
    handleClear();
  }

  const handleClear = ()=>{
    setCounts(
      denominations.reduce((acc,d)=>{
        acc[d]=0;
        return acc;
      },{} as Record<number,number>)
    );
  };

const handleSubmit = () => {
  // 注文を送信、支払い情報も渡す
  orderSubmit(deposit)
  handleClear();
};



  return(
    <div className="border-t pt-4 mt-4">
          <div className="text-right font-bold text-3xl text-gray-800 mb-4">
            合計: ¥{total.toLocaleString()}
          </div>      
      <div className="mb-4 text-gray-700 font-mesium text-2xl">
        預り金：￥{deposit.toLocaleString()}
      </div>

      <div className="text-gray-800 mb-4 text-2xl">
        おつり：
        <span className="font-bold text-green-700">
          {change >=0 ? `￥${change.toLocaleString()}` : "不足しています"}
        </span>
      </div>


      <div className="mt-20 grid grid-cols-2 gap-2 mb-4">
        {[10000,5000,1000,500,100,500,10,50,1,5].map((num,idx)=>(
          <button
            key={idx}
            onClick={()=>handleDigitInput(num)}
            className='py-2 bg-gray-200 hover:bg-gray-300 rounded text-lg'
            disabled={total === 0}
                  >
            
            {num}円
          </button>
        ))}
      </div>
      <div className="flex justify-between">


      <button
        onClick={handleSubmit}
        disabled={change < 0}
        className={`px-4 py-2 rounded text-white transition ${
          (total > 0 && change >= 0) ? 'bg-red-500 hover:bg-red-600':'bg-gray-400 cursor-not-allowed'
        }`} 
      >
        注文完了
      </button>

        <button 
          className="px-4 py-4 pl-4 bg-gray-200 hover:bg-gray-300 rounded text-lg "
          onClick={()=>handleClear()}
        >
          Clear
        </button>


    </div>
          <button
            onClick={handleCartClear}
            className="text-right mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition"
          >
            カートを空にする
          </button>
    </div>
  )

}
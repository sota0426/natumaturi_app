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


  const change = deposit - total;

  return(
    <div className="border-t pt-4 mt-4">
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
        onClick={onSubmit}
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
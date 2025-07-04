"use client"

import { Button } from "../ui/button";

interface Props{
  onExport :()=>void;
  onClear:()=>void;
}

const SaleHistoryHeader=({onExport,onClear}:Props)=>{
  return(
    <div className="flex justify-between items-center ">
      <Button 
        variant="default" 
        className="bg-green-500 hover:bg-green-600"
        onClick={onExport}
      >
        エクセルに出力
      </Button>
      <Button
        variant="default" 
        className="bg-black"
        onClick={onExport}
      >
        履歴を全削除
      </Button>
    </div>
  )
}

export default SaleHistoryHeader;
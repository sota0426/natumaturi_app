"use client";

import { Button } from "@/components/ui/button";
import { CartItem, MenuItem } from "@/types";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

interface Sale {
  timestamp: string;
  items: CartItem[];
  total: number;
  refunded?: boolean;
}

export default function SaleHistory() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [allMenus, setAllMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    const storedSales = localStorage.getItem("salesHistory");
    const storedMenus = localStorage.getItem("menus");
    if (storedSales) setSales(JSON.parse(storedSales));
    if (storedMenus) setAllMenus(JSON.parse(storedMenus));
  }, []);

  const handleRefund = (index: number) => {
    const confirmed = window.confirm("この会計を払い戻ししますか？");
    if (!confirmed) return;

    const saleToRefund = sales[index];
    const menus = JSON.parse(localStorage.getItem("menus") || "[]");
    const updatedMenus = menus.map((menu: MenuItem) => {
      const refundedItem = saleToRefund.items.find((item) => item.id === menu.id);
      if (refundedItem) {
        return { ...menu, stock: (menu.stock ?? 0) + refundedItem.quantity };
      }
      return menu;
    });
    localStorage.setItem("menus", JSON.stringify(updatedMenus));

    const updatedSales = [...sales];
    updatedSales[index].refunded = true;
    localStorage.setItem("salesHistory", JSON.stringify(updatedSales));
    setSales(updatedSales);
  };

  const handleClearHistory = ()=>{
    const confirmed = window.confirm("会計履歴をすべて削除しますか？　この操作は取り消せません")
    if(!confirmed) return;

    localStorage.removeItem("salesHistory");
    setSales([]);
    window.confirm("会計履歴を削除しました")    
  }

  const handleExport = () => {
    const headers = ["No", "日時", "合計", ...allMenus.map((m) => m.name), "払い戻し済み"];

    const exportData = [...sales].map((sale, i) => {
      const row: any = {
        No: sales.length - i,
        日時: sale.timestamp,
        合計: sale.total,
        払い戻し済み: sale.refunded ? "はい" : "いいえ",
      };

      allMenus.forEach((menu) => {
        const soldItem = sale.items.find((item) => item.id === menu.id);
        row[menu.name] = soldItem ? soldItem.quantity : "";
      });

      return row;
    });

    // 小計行の追加
    const subtotal: any = {
      No: "小計",
      日時: "",
      合計: "",
      払い戻し済み: "",
    };
    allMenus.forEach((menu) => {
      subtotal[menu.name] = sales
        .filter((s) => !s.refunded)
        .reduce((sum, s) => {
          const item = s.items.find((i) => i.id === menu.id);
          return sum + (item?.quantity || 0);
        }, 0);
    });

    exportData.unshift(subtotal);

    const worksheet = XLSX.utils.json_to_sheet(exportData, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "会計履歴");

    XLSX.writeFile(workbook, "会計履歴.xlsx");
  };

  // 小計を準備
  const subtotalMap: Record<number, number> = {};
  let totalAmount:number = 0;

  allMenus.forEach((menu) => (subtotalMap[menu.id] = 0));
  sales.forEach((sale) => {
    if (!sale.refunded) {
      totalAmount += sale.total;
      sale.items.forEach((item) => {
        subtotalMap[item.id] += item.quantity;
      });
    }
  });


  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">会計履歴</h1>
      <div className="flex justify-between items-center">

        <Button 
          variant="default" 
          className="bg-green-500 hover:bg-green-600" 
          onClick={handleExport}
          >
          エクセルに出力
        </Button>
        <Button 
          variant="default" 
          className="bg-black" 
          onClick={handleClearHistory}
        >
          履歴を全削除
        </Button>
      </div>

      {sales.length === 0 ? (
        <p>会計履歴がありません。</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-sm">
                <th className="border px-2 py-1">No</th>
                <th className="border px-2 py-1">日時</th>
                <th className="border px-2 py-1">合計</th>
                {allMenus.map((menu) => (
                  <th key={menu.id} className="border px-2 py-1">
                    {menu.name}
                  </th>
                ))}
                <th className="border px-2 py-1">払い戻し</th>
                <th className="border px-2 py-1">操作</th>
              </tr>
            </thead>
            <tbody>
              {/* 小計行 */}
              <tr className="bg-yellow-100 font-semibold">
                <td className="border px-2 py-1 text-center">小計</td>
                <td className="border px-2 py-1 text-center" colSpan={1}></td>
                <td className="border px-2 py-1 text-center">{totalAmount}</td>
                {allMenus.map((menu) => (
                  <td key={menu.id} className="border px-2 py-1 text-center">
                    {subtotalMap[menu.id] || ""}
                  </td>
                ))}
                <td className="border px-2 py-1 text-center" colSpan={2}></td>
              </tr>


              {[...sales].slice().reverse().map((sale, index) => {
                const realIndex = sales.length - 1 - index; // 本当のインデックス

                return (
                  <tr key={realIndex} className={sale.refunded ? "bg-gray-400" : ""}>
                    <td className="border px-2 py-1 text-center">{realIndex}</td>
                    <td className="border px-2 py-1 text-center">
                      {new Date(sale.timestamp).toLocaleString()}
                    </td>
                    <td className="border px-2 py-1 text-center">¥{sale.total}</td>

                    {allMenus.map((menu) => {
                      const item = sale.items.find((i) => i.id === menu.id);
                      return (
                        <td key={menu.id} className="border px-2 py-1 text-center">
                          {item ? item.quantity : ""}
                        </td>
                      );
                    })}

                    <td className="border px-2 py-1 text-center">
                      {sale.refunded === true ? "はい" : "いいえ"}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {sale.refunded !== true && (
                        <Button
                          variant="destructive"
                          onClick={() => handleRefund(realIndex)} // ← 正しい配列上のインデックスを渡す
                          className="text-xs px-2 py-1"
                        >
                          払い戻し
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })
              }


              
            </tbody>
          </table>
        </div>
      )}


    </div>
  );
}

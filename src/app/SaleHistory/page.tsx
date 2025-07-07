"use client";

import SaleHistoryHeader from "@/components/SaleHistory/SaleHistoryHeader";
import SaleTable from "@/components/SaleHistory/SaleTable";
import { CartItem, MenuItem } from "@/types";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";


export interface Sale {
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
    if (!window.confirm("この会計を払い戻ししますか？")) return;

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

  const handleClearHistory = () => {
    if (!window.confirm("会計履歴をすべて削除しますか？　この操作は取り消せません")) return;
    localStorage.removeItem("salesHistory");
    setSales([]);
    window.confirm("会計履歴を削除しました");
  };

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

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">会計履歴</h1>
      <SaleHistoryHeader 
        onExport={handleExport} 
        onClear={handleClearHistory} 
      />
      {sales.length === 0 ? <p>会計履歴がありません。</p> : <SaleTable sales={sales} allMenus={allMenus} onRefund={handleRefund} />}
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function MenuUploader() {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [excelFile, setExcelFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setMenus, setCategories, saveToLocalStorage } = useLocalStorage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setExcelFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!excelFile) {
      alert("Excelファイルを選択してください");
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      if (!data) {
        alert("ファイルの読み込みに失敗しました");
        setIsLoading(false);
        return;
      }

      const workbook = XLSX.read(data, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

      try {
        const menuItems = jsonData.map((row) => ({
          id: Number(row.id),
          categoryId: Number(row.categoryId),
          categoryName: row.categoryName,
          name: row.name,
          price: Number(row.price),
          stock: Number(row.stock),
        }));

        const categoriesMap = new Map();
        menuItems.forEach((item) => {
          if (!categoriesMap.has(item.categoryId)) {
            categoriesMap.set(item.categoryId, {
              id: item.categoryId,
              name: item.categoryName,
            });
          }
        });
        const categories = Array.from(categoriesMap.values());

        saveToLocalStorage(categories, menuItems);
        setCategories(categories);
        setMenus(menuItems);
        
        localStorage.removeItem("salesHistory");
        location.reload();
        alert("メニュー登録が完了しました");
      } catch (error) {
        console.error(error);
        alert("Excelデータの解析に失敗しました");
      } finally {
        setIsLoading(false);
        setShowDialog(false);
      }
    };

    reader.readAsBinaryString(excelFile);
  };

  const handleClear = () => {
    if (confirm("すべての登録メニューを削除します。よろしいですか？")) {
      localStorage.removeItem("salesHistory");
      setCategories([]);
      setMenus([]);
      saveToLocalStorage([], []);
      setExcelFile(null);
      location.reload();
      alert("登録メニューを削除しました");
    }
  };

  return (
    <div className="space-y-4">
      {/* カスタムファイルアップロードボタン */}
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept=".xlsx,.xls"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isLoading}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          Excelファイルを選択
        </Button>
        <span className="text-sm text-muted-foreground">
          {excelFile ? excelFile.name : "ファイル未選択"}
        </span>
      </div>

      {/* 操作ボタン */}
      <div className="flex gap-2">
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogTrigger asChild>
            <Button disabled={isLoading || !excelFile}>
              メニュー登録（Excelから）
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>確認</AlertDialogTitle>
              <AlertDialogDescription>
                既存のメニューをすべて削除して、新しいExcelデータで登録します。よろしいですか？
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                キャンセル
              </Button>
              <Button onClick={handleUpload} disabled={isLoading || !excelFile}>
                {isLoading ? "処理中..." : "はい、実行します"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button variant="destructive" onClick={handleClear} disabled={isLoading}>
          登録メニューをすべて削除
        </Button>
      </div>
    </div>
  );
}

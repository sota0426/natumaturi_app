// components/Menu/ExcelTemplateDownloader.tsx

"use client";

import { Button } from "../ui/button";
import { generateExcelTemplate } from "../utils/excelTemplate";

export default function ExcelTemplateDownloader() {
  const handleDownload = () => {
    const blob = generateExcelTemplate();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "menu_template.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
  <Button 
    onClick={handleDownload}
    className="bg-green-500 hover:bg-green-700"
    >   
      メニュー登録用ファイルのダウンロード
  </Button>);
}

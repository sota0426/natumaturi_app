import { MenuForm } from "@/types";

export const parseCsv = async (file: File): Promise<MenuForm[]> => {
  const text = await file.text();
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map((line) => {
    const values = line.split(',');
    const obj: any = {};
    headers.forEach((header, i) => {
      obj[header.trim()] = values[i].trim();
    });

    return {
      categoryId: obj.categoryId,
      name: obj.name,
      price: obj.price,
      stock: obj.stock,
    };
  });
};

export const downloadSampleCsv = () => {
  const headers = 'categoryId,name,price,stock\n';
  const sample = '1,sampleMenu,500,10\n';
  const blob = new Blob([headers + sample], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'sample_menu.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

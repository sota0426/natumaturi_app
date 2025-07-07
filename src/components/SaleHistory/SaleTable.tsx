import { MenuItem, Sale } from "../../types";
import SaleRow from "./SaleRow";
import SubtotalRow from "./SubtotalRow";

interface Props {
  sales: Sale[];
  allMenus: MenuItem[];
  onRefund: (index: number) => void;
}

export default function SaleTable({ sales, allMenus, onRefund }: Props) {
  const subtotalMap: Record<number, number> = {};
  let totalAmount = 0;

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

          {[...sales].slice().reverse().map((sale, i) => (
            <SaleRow
              key={i}
              sale={sale}
              index={sales.length - 1 - i}
              menus={allMenus}
              onRefund={onRefund}
            />
          ))}
          <SubtotalRow totalAmount={totalAmount} allMenus={allMenus} subtotalMap={subtotalMap} />
        </tbody>
      </table>
    </div>
  );
}

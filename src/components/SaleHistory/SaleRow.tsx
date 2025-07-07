
import { MenuItem, Sale } from "@/types";
import { Button } from "../ui/button";

interface Props {
  sale: Sale;
  index: number;
  menus: MenuItem[];
  onRefund: (index: number) => void;
}

export default function SaleRow({ sale, index, menus, onRefund }: Props) {
  return (
    <tr key={index} className={sale.refunded ? "bg-gray-400" : ""}>
      <td className="border px-2 py-1 text-center">{index+1}</td>
      <td className="border px-2 py-1 text-center">{new Date(sale.timestamp).toLocaleString()}</td>
      <td className="border px-2 py-1 text-center">¥{sale.total}</td>
      {menus.map((menu)=>{
        const item = sale.items.find((i)=>i.id === menu.id);
        return(
          <td key={menu.id} className="border px-2 py-1 text-center">
            {item ? item.quantity : ""}
          </td>
        );
      })}
      <td className="border px-2 py-1 text-center">{sale.refunded ? "済" : ""}</td>
      <td className="border px-2 py-1 text-center">
        {!sale.refunded && (
          <Button 
            variant="destructive"
            onClick={()=>onRefund(index)}
            className="text-xs px-2 py-1"
          >
            払い戻し
          </Button>
        )}
      </td>
    </tr>
  );
}

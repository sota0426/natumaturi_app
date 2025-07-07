import { MenuItem } from "../../types";

interface Props{
  totalAmount:number;
  allMenus:MenuItem[];
  subtotalMap:Record<number,number>;
}

export default function SubtotalRow({
  totalAmount,
  allMenus,
  subtotalMap
}:Props){
  return(
    <tr className="bg-yellow-100 font-semibold">
      <td className="border px-2 py-1 text-center">小計</td>
      <td className="border px-2 py-1 text-center" colSpan={1}></td>
      <td className="border px-2 py-1 text-center">{totalAmount}</td>
      {allMenus.map((menu)=>(
        <td key={menu.id} className="border px-2 py-1 text-center">
          {subtotalMap[menu.id] || ""}
        </td>
      ))}
      <td className="border px-2 py-1 text-center" colSpan={2}></td>
    </tr>
  )

}
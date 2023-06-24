"use client";

import { addRadixToNumber } from "@/app/utils/util";
import { OrderProps } from "@/components/types/types";
import { Barlow } from "next/font/google";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import "./preview.scss";

const barlow = Barlow({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});
const MAX_CHAR = 15;
export default function PreviewPage() {
  const [orderList, setOrders] = useState<OrderProps[]>([]);
  const [note, setNote] = useState("");
  const [load, setLoad] = useState(true);
  useLayoutEffect(() => {
    if (load) {
      let orders = localStorage.getItem("userOrders");
      if (!!orders) {
        let newOrders: OrderProps[] = JSON.parse(orders);
        setOrders([...newOrders]);
      }
      setLoad(false);
    }
  }, []);

  useLayoutEffect(() => {
    if(!load){
      let newOrders = JSON.stringify(orderList)
      let newOrderQuantity = orderList.reduce((acc,curr) => acc + +curr.amount,0)
      localStorage.setItem('userOrders', newOrders)
      localStorage.setItem('orderAmount', newOrderQuantity+'')
    }
  }, [orderList])

  function onChangeNote(change: string) {
    if (change.length <= MAX_CHAR) {
      setNote(change);
    }
  }

  function deleteOrder(index:number){
    let newOrder = [...orderList]
    newOrder.splice(index,1)
    setOrders([...newOrder])
  }
  function changeOrderAmount(type:'INCREMENT'|'DECREMENT', index:number){
    let newOrder = [...orderList]
    if(type === 'DECREMENT'){
      if(+newOrder[index].amount <= 1){
        deleteOrder(index)
      }else{
        newOrder[index].amount = +newOrder[index].amount - 1;
        setOrders([...newOrder])
      }
    }else if(type === 'INCREMENT'){
      newOrder[index].amount = +newOrder[index].amount + 1;
      setOrders([...newOrder])
    }
  }

  return (
    <div className="order-table w-full shadow-lg bg-white flex flex-col lg:flex-row rounded-[10px]">
      <div className="w-full lg:w-[70%] border-b lg:border-r py-[30px] px-[25px]">
        <table className="w-full text-[#404040]">
          <tbody>
            <tr className="text-left font-normal text-[15px]">
              <th colSpan={2} className="font-normal">
                Menu Item
              </th>
              <th className="font-normal">Quantity</th>
              <th className="font-normal text-right min-w-[120px]">Sub Total</th>
              <th></th>
            </tr>
            {orderList.map((order,index) => {
              return (
                <tr key={order.title+index} className="text-[14px] font-light">
                  <td className="w-[74px]" style={{paddingRight: '10px'}}>
                    <div className="aspect-[3/2] h-[40px] bg-neutral-500 "></div>
                  </td>
                  <td className="max-w-[240px] w-full">
                    <div>
                      <p className="mb-1">{order.title}</p>
                      {
                        order.extras?.map((extra,index) => (
                          <p key={extra.title+index} className="text-xs text-[#919191]">{`${extra.amount} x ${extra.title}`}</p>
                        ))
                      }
                    </div>
                  </td>
                  <td>
                    <div className="w-full flex px-1 justify-between text-[17px] text-[#ed7801] border rounded-[5px] items-center">
                      <button
                        className="text-xl leading-[10px]"
                        onClick={() => changeOrderAmount("DECREMENT",index)}
                      >
                        -
                      </button>
                      <p className="text-[#000000]">{order.amount}</p>
                      <button
                        className="text-xl leading-[10px]"
                        onClick={() => changeOrderAmount("INCREMENT",index)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-right">Rp. {addRadixToNumber(+order.total_price * +order.amount)}</td>
                  <td className="min-w-[30px]">
                    <div className="w-full grid place-content-center mt-0.5">
                      <button onClick={() => deleteOrder(index)}>
                        <img src="https://bkdelivery.co.id/static/website/img/cart-remove1x.2d89a8db571c.png" alt="bin icon" loading="lazy" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pt-[25px] pb-[15px] ">
          <Link
            href="/menus"
            className={`text-xl font-normal text-[#ed7801] ${barlow.className}`}
          >
            Continue Shopping
          </Link>
        </div>
        <p className={`text-xs font-bold mb-1 ${barlow.className}`}>Add text</p>
        <input
          type="text"
          className={`font-light text-sm border w-full py-3 px-2 rounded-[5px]`}
          value={note}
          onChange={(e) => onChangeNote(e.target.value)}
          placeholder="Add notes to your order here..."
        />
        <div className="w-full font-light text-xs text-[#b7b7b7] flex justify-end mt-2.5 mb-10">
          {note.length}/15
        </div>
      </div>
      <div className="w-full lg:w-[30%] py-[30px] px-[25px] text-[#404040]">
        <p className="font-light text-sm">Order Subtotal*</p>
        <h1 className="text-3xl">Rp. {addRadixToNumber(orderList.reduce((acc,curr) => acc + +curr.amount * +curr.total_price,0))}</h1>
        <p className="font-light text-xs mt-4 text-[#909090]">
          *Price might change due to your delivery location.
        </p>
        <Link href="/cart/delivery" className='block w-full py-[7px] rounded-[5px] mt-6 h-min text-center text-white text-xl bg-[#ed7801]'>Continue</Link>
      </div>
    </div>
  );
}

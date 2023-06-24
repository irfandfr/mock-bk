'use client'

import { addRadixToNumber } from "@/app/utils/util";
import { Barlow } from "next/font/google"
import Link from "next/link";
import { useLayoutEffect, useState } from "react"
import { OrderProps } from "../types/types"

interface OrderListProp{
  orderAmount? : number
}
//import google font
const barlow = Barlow({
  weight: ["400","600"],
  subsets: ["latin"],
});

export default function OrderList({orderAmount}:OrderListProp){
  const [orderList, setOrders] = useState<OrderProps[]>([])
  const [load, setLoad] =useState(true)
  useLayoutEffect(() => {
    setLoad(true)
    let orders = localStorage.getItem('userOrders')
    if(!!orders){
      let newOrders : OrderProps[] = JSON.parse(orders)
      console.log(newOrders)
      setOrders([...newOrders])
    }
    setLoad(false)
  }, [orderAmount])
  return(
    <div className="w-full px-[15px] py-[25px] pt-[20px] relative">
      <span className="absolute w-0 h-0 border-transparent border-[15px] border-t-0 border-b-white right-[14px] top-[-14px]"></span>
      {load ? <></>:
        <>
          <div className={`${barlow.className}`}>
            {
              orderList.length === 0 && <p className="text-[#919191]">Your cart is empty...</p>
            }
            {
              orderList.filter((i,index) => index < 3).map((order,index) => {
                return(
                  <div key={order.title+index} className='flex justify-between align-start pb-3 h-[80px] border-b mb-2'>
                    <div className="aspect-[4/3] bg-black h-full mr-2"></div>
                    <p className="text-[12px] mr-auto break-words">{order.title}</p>
                    <p className="text-[12px] mr-8 shrink-0">x {order.amount}</p>
                    <p className="text-[12px] text-right w-[60px] shrink-0">Rp. {addRadixToNumber(+order.total_price * (+order.amount))}</p>
                  </div>
                )
              })
            }
            {
              orderList.length > 3 && !!orderAmount &&
              <div className="w-full pt-3.5 pb-5 border-b">
                <p className="text-[12px] text-center">And {orderAmount - orderList.filter((i,idx) => idx < 3).reduce((acc,curr) => acc + +curr.amount,0)} more items...</p>
              </div>
            }
            <div className="w-full flex justify-between items-center mt-2">
              <p className="uppercase font-semibold">subtotal</p>
              <p className="text-lg">Rp. {addRadixToNumber(orderList.reduce((acc,curr) => acc+ (+curr.total_price), 0))}</p>
            </div>
          </div>
          <Link href="/cart/preview" className='block w-full py-[7px] rounded-[5px] mt-6 h-min text-center text-white bg-[#ed7801]'>Go to Cart</Link>
        </>
      }
    </div>
  )
}
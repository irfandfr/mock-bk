"use client";

import { addRadixToNumber } from "@/app/utils/util";
import InputText from "@/components/InputText/InputText";
import { OrderProps } from "@/components/types/types";
import { flame } from "@/style/fonts/fonts";
import { Barlow } from "next/font/google";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

const barlow = Barlow({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const paymentMethods = [
  {
    name: "dana",
    image:
      "https://bkdelivery.co.id/static/website/img/DANA-logo1x.6fb8c465dc9f.png",
  },
  {
    name: "ovo",
    image: "https://bkdelivery.co.id/static/website/img/OVO.e12152c36de0.png",
  },
  {
    name: "gopay",
    image: "https://bkdelivery.co.id/static/website/img/gopay.f42e2033836e.png",
  },
];

export default function PaymentPage() {
  const [orderList, setOrders] = useState<OrderProps[]>([]);
  const [deliveryDetails, setDetails] = useState({
    name: "",
    phone: "",
    location: "",
  });
  const [finish, setFinish] = useState(false);
  const [load, setLoad] = useState(true);
  const [paymentMethod, setPayment] = useState("");
  const router = useRouter();

  useLayoutEffect(() => {
    if (load) {
      let orders = localStorage.getItem("userOrders");
      if (!!orders) {
        let newOrders: OrderProps[] = JSON.parse(orders);
        setOrders([...newOrders]);
      }else{
        router.push('/menus')
      }
      let details = localStorage.getItem("deliveryDetails");
      if (!!details) {
        setDetails({ ...JSON.parse(details) });
      } else {
        router.push("/cart/delivery");
      }
      setLoad(false);
    }
  }, []);

  function finishOrder() {
    setFinish(true);
    localStorage.removeItem("userOrders");
    localStorage.removeItem("deliveryDetails");
    localStorage.removeItem("orderAmount");
  }

  return (
    <div
      className={`w-full shadow-lg bg-white flex flex-col lg:flex-row rounded-[10px] mb-40 ${flame.className}`}
    >
      {load ? (
        <div className="mt-10 mb-20 w-full grid place-content-center">
          <div className="animate-spin h-8 w-8 rounded-full border-slate-700  border-4 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {finish && (
            <dialog
              className="w-full h-full fixed z-30 top-0 left-0 bg-neutral-800/40 grid place-content-center"
              open={false}
            >
              <div className="bg-white rounded-[5px] shadow-lg p-10">
                <h2 className="text-2xl text-[#ed7801]">
                  Your Order Have Been Placed!
                </h2>
                <p className="font-light mt-1 mb-3">
                  Please finish the payment so we can deliver our delicious
                  meals!
                </p>
                <button
                  onClick={() => window.location.href = "/menus"}
                  className={`font-normal block w-full py-[7px] rounded-[5px] mt-6 h-min text-center text-white text-xl bg-[#ed7801]`}
                >
                  Finish
                </button>
              </div>
            </dialog>
          )}
          <div className="py-[30px] px-[25px] border-b lg:border-r w-full lg:w-[50%] text-[#020101]">
            <h5 className="text-sm w-full border-b pb-2.5">Order Summary</h5>
            {orderList.map((order, index) => {
              return (
                <div
                  key={order.title + index}
                  className={`font-light flex-col w-full py-3 border-b`}
                >
                  <div className="w-full flex">
                    <p className="text-xs mr-auto">{`${order.amount} pcs ${order.title}`}</p>
                    <p className="text-xs mr-8">{`x ${order.amount}`}</p>
                    <p className="text-xs text-right min-w-[80px]">{`Rp. ${addRadixToNumber(
                      +order.amount * +order.total_price
                    )}`}</p>
                  </div>
                  <div className="w-full text-[11px] text-[#919191]">
                    {order.extras?.map((extra, index) => {
                      return (
                        <p
                          key={extra.title + index}
                          className="text-xs"
                        >{`${extra.amount} x ${extra.title}`}</p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <table className={`w-full text-sm font-light mt-[15px]`}>
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td className="text-right">
                    Rp.{" "}
                    {addRadixToNumber(
                      orderList.reduce(
                        (acc, curr) => acc + +curr.total_price,
                        0
                      )
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Delivery fee</td>
                  <td className="text-right">Rp. {addRadixToNumber(5000)}</td>
                </tr>
                <tr>
                  <td>PPN</td>
                  <td className="text-right">
                    Rp.{" "}
                    {addRadixToNumber(
                      orderList.reduce(
                        (acc, curr) => acc + +curr.total_price,
                        0
                      ) * 0.1
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Delivery Surcharge</td>
                  <td className="text-right">
                    Rp.{" "}
                    {addRadixToNumber(
                      orderList.reduce(
                        (acc, curr) => acc + +curr.total_price,
                        0
                      ) * 0.01
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="uppercase text-xl font-normal">total</td>
                  <td className="text-right text-xl font-normal">
                    Rp.{" "}
                    {addRadixToNumber(
                      orderList.reduce(
                        (acc, curr) => acc + +curr.total_price,
                        0
                      ) *
                        1.11 +
                        5000
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="py-[30px] font-light px-[25px] w-full lg:w-[50%] text-[#404040]">
            <h2 className={` text-xs mb-1`}>Deliver to</h2>
            <p className="text-xs">{deliveryDetails.location}</p>
            <div className="flex gap-3 mt-6 mb-10">
              {paymentMethods.map((payment, index) => {
                return (
                  <button
                    key={payment.name + index}
                    onClick={() => setPayment(payment.name)}
                    className={`${
                      paymentMethod === payment.name && "border-[#ed7801]"
                    } w-full block border rounded-[5px] h-[35px] flex items-center justify-center relative`}
                  >
                    <img
                      className={` ${
                        paymentMethod === payment.name ? "block" : "hidden"
                      } h-4 w-4 absolute top-[-6px] right-[-6px]`}
                      src="https://bkdelivery.co.id/static/website/img/tick-orange1x.ca55a4d92e3f.png"
                      alt="check-mark"
                      loading="lazy"
                    />
                    <img
                      className={`h-auto max-h-[70%]`}
                      src={payment.image}
                      alt={`${payment.name}'s logo`}
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
            <button
              onClick={finishOrder}
              className={`font-normal block w-full py-[7px] rounded-[5px] mt-6 h-min text-center text-white text-xl bg-[#ed7801]`}
            >
              Place My Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

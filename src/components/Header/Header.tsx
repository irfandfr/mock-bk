"use client";

import { flame } from "@/style/fonts/fonts";
import { Barlow } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import OrderList from "../OrderList/OrderList";
import "./header.scss";

interface NavItemProp {
  title: string;
  subtitle: string;
  link: string;
}
function NavItem({ title, subtitle, link }: NavItemProp) {
  return (
    <a href={link} className="flex flex-col mr-[40px]">
      <span className="subtitle">{subtitle}</span>
      <span className="title ">{title}</span>
    </a>
  );
}

const navs: NavItemProp[] = [
  { title: "Order", subtitle: "Delivery", link: "/menus" },
  { title: "Promotions", subtitle: "Get Fresh", link: "/news" },
];
//import google font
const barlow = Barlow({
  weight: ["400", "500"],
  subsets: ["latin"],
});

interface HeaderProp {
  orderAmount: number | undefined;
}
export default function Header({ orderAmount }: HeaderProp) {
  const pathname = usePathname();
  const amountRef = useRef<{ prev: number | undefined; new: number }>({
    prev: undefined,
    new: 0,
  });
  const [newNotification, setNotification] = useState(false);
  useLayoutEffect(() => {
    if (typeof amountRef.current.prev === "undefined") {
      amountRef.current.prev = orderAmount;
    } else if (orderAmount && amountRef.current.prev !== orderAmount) {
      amountRef.current.new = orderAmount - amountRef.current.prev;
      amountRef.current.prev = orderAmount;
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 1500);
    }
  }, [orderAmount]);
  return (
    <header
      className={`${flame.className} header fixed top-0 lg:absolute w-full h-[76px] lg:flex justify-center`}
    >
      <div className="header-bg h-full z-10 w-full flex justify-center">
        <div className="content h-full w-[960px] flex relative items-center">
          <Link href="/" className="absolute top-[10px] left-[-125px]">
            <img
              className="h-[90px] w-[90px]"
              src="https://bkdelivery.co.id/static/website/img/logo_2022.38d01a7c7dd3.png"
              srcSet="https://bkdelivery.co.id/static/website/img/logo_2022.38d01a7c7dd3.png,
                      https://bkdelivery.co.id/static/website/img/logo_2022_x2.6bb6d972f0a5.png 2x"
            ></img>
          </Link>
          <nav className="flex justify-center mr-auto">
            {navs.map(({ title, subtitle, link }, index) => {
              return (
                <NavItem
                  key={title + index}
                  title={title}
                  subtitle={subtitle}
                  link={link}
                />
              );
            })}
          </nav>
          {!pathname.includes("cart") && (
            <div className="absolute group top-0 right-[-80px] h-full w-[60px] flex items-center justify-center bg-[#ed7801]">
              {!!orderAmount && orderAmount > 0 && (
                <span
                  className={`absolute top-[24%] left-[58%] rounded-full h-[17px] w-[17px] text-[#ffffff] bg-red-600 flex items-center justify-center text-[14px] ${barlow.className}`}
                >
                  {orderAmount}
                </span>
              )}
              <Link href="/cart/preview">
                <img
                  src="https://bkdelivery.co.id/static/website/img/BK_TopCart1x.5b5f4dd7b2a4.png"
                  alt="image of a cart"
                  loading="lazy"
                />
              </Link>
              <div className="absolute right-0 top-[72px] w-[360px] bg-white rounded-[10px] drop-shadow-md z-20 hidden group-hover:block">
                <OrderList orderAmount={orderAmount} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={`absolute transition ease-in-out ${newNotification ? 'translate-y-[32px]' : 'translate-y-0' } w-full z-0 left-0 bottom-0 
        font-normal py-1 grid place-content-center bg-green-500 text-white ${barlow.className}`}
      >
        {amountRef.current.new} item added to the cart
      </div>
    </header>
  );
}

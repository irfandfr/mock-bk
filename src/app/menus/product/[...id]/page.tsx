"use client";

import { flame } from "@/style/fonts/fonts";
import { Barlow } from "next/font/google";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useReducer, useState } from "react";
import { BillingActionType, BillingProps, billingReducer } from "./reducers";
import "./product.scss";
import { addRadixToNumber } from "@/app/utils/util";
import { AddOrderContext } from "@/app/layout";
import { OrderProps } from "@/components/types/types";

interface PriceSetProp {
  base: string | number;
  meal: string | number;
  upsize: string | number;
}

interface ProductProps {
  title: string;
  description: string;
  price: string | number | PriceSetProp;
  extra?: {
    title: string;
    price: string | number;
    id: string;
  }[];
}


const productData: { [key: string]: ProductProps } = {
  "11": {
    title: "Cheese Burger King",
    description:
      "Burget King Cheese Burger Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida quam in risus viverra, quis convallis nibh pellentesque.",
    price: {
      base: 25000,
      meal: 40000,
      upsize: 45000,
    },
    extra: [
      { title: "Vanilla Ice Cream", price: "9000", id: "111" },
      { title: "Cooler Vanilla Ice Cream", price: "13000", id: "112" },
      { title: "Vanilla Ice Cream (Special)", price: "20000", id: "113" },
    ],
  },
  "12": {
    title: "Menu set 1",
    description:
      "Vivamus molestie eu nisl sed laoreet. Donec rutrum lectus et maximus tincidunt",
    price: "60000",
    extra: [
      { title: "Vanilla Ice Cream", price: "9000", id: "111" },
      { title: "Cooler Vanilla Ice Cream", price: "13000", id: "112" },
      { title: "Vanilla Ice Cream (Special)", price: "20000", id: "113" },
    ],
  },
  "21": {
    title: "Milkshake",
    description:
      "Suspendisse dolor quam, dictum ut enim et, lobortis volutpat.",
    price: "13000",
  },
  "22": {
    title: "Burger King Chicken",
    description: "Sed in dolor ac leo mattis venenatis. Phasellus molestie",
    price: {
      base: "13000",
      meal: "20000",
      upsize: "25000",
    },
  },
};

const initBilling: BillingProps = {
  total_meal: 0,
  base: 0,
  amount: 1,
  meal_type: "base",
  extra: {},
};
//import google font
const barlow = Barlow({
  weight: "400",
  subsets: ["latin"],
});
export default function ProductPage() {
  const pathname = usePathname();
  const [productInfo, setProduct] = useState<ProductProps | undefined>(
    undefined
  );
  const [billing, dispatch] = useReducer(billingReducer, { ...initBilling });
  const addOrder = useContext(AddOrderContext)

  useEffect(() => {
    let productId = pathname.split("/").splice(-2)[0];
    if (!!productData[productId]) {
      let price: number;
      let meal_type: "base" | "meal";
      let product = structuredClone(productData[productId]);
      if (typeof product.price === "object") {
        price =
          typeof product.price.meal === "string"
            ? parseInt(product.price.meal)
            : product.price.meal;
        meal_type = "meal";
      } else {
        price =
          typeof product.price === "string"
            ? parseInt(product.price)
            : product.price;
        meal_type = "base";
      }
      setProduct(product);
      dispatch({
        type: BillingActionType.INIT,
        payload: { price: price, meal_type: meal_type },
      });
    }
  }, []);

  function setMeal(
    meal_type: "upsize" | "meal",
    { base, meal, upsize }: PriceSetProp
  ) {
    let priceSet = { base: +base, meal: +meal, upsize: +upsize };
    dispatch({
      type: BillingActionType.SET_MEAL,
      payload: { meal_type: meal_type, priceSet: priceSet },
    });
  }

  function submitOrder(){
    if(!!productInfo){
      let order = localStorage.getItem('userOrders')
      let orderAmount = localStorage.getItem('orderAmount')
      let newOrder : OrderProps[] = []
      let modifier = billing.meal_type === 'upsize' ? ' Medium' : billing.meal_type === 'meal' ? ' Reguler' : ''
      if(!!order){
        newOrder = JSON.parse(order)
      }
      let extras =!!billing.extra ? Object.keys(billing.extra).map(id => {return{title: billing.extra[id].title, amount:billing.extra[id].amount}}) : undefined
      newOrder.push({
        title : productInfo.title + modifier,
        total_price : billing.total_meal,
        amount: billing.amount,
        extras: extras
      })
      localStorage.setItem('userOrders', JSON.stringify(newOrder))
      localStorage.setItem('orderAmount', !!orderAmount ? +orderAmount + billing.amount+'' : billing.amount+'' )
      addOrder && addOrder(billing.amount)
    }
  }

  return (
    <div className={`product-item w-full flex ${flame.className} mb-14`}>
      {productInfo && (
        <>
          <div className="w-[63%] px-5 py-9">
            <h2 className="text-[30px] text-center text-[#502314]">
              {productInfo.title}
            </h2>
            <p className="text-[14px] font-light text-center mt-2.5 mb-5 px-5 text-[#404040]">
              {productInfo.description}
            </p>
            <div className="flex justify-space-between mb-5">
              <img
                src="https://media-order.bkdelivery.co.id/thumb/group_photo/2023/3/15/kyhwcbzvlkeiqyjncprjjg_product_list.jpg"
                alt="mock image of a menu, may not reflect accurately"
                className="image w-full max-h-[290px] bg-black aspect-square mr-[2%]"
              />
              <div className="w-[50%] text-[#404040]">
                {typeof productInfo.price === "object" && (
                  <>
                    {}
                    <button
                      onClick={() => {
                        if (typeof productInfo.price === "object") {
                          setMeal("meal", productInfo.price);
                        }
                      }}
                      className={`flex flex-col border text-left rounded-[10px] w-full p-3 pt-2.5 mb-[22px] ${
                        (billing.meal_type === "meal" ||
                          billing.meal_type === "upsize") &&
                        "border-green-600"
                      }`}
                    >
                      <span className="uppercase text-[14px] text-[#666666]">
                        Make it meal
                      </span>
                      <span className="font-light text-[13px]">
                        Fries & Drink
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        if (typeof productInfo.price === "object") {
                          setMeal("upsize", productInfo.price);
                        }
                      }}
                      className={`flex text-left flex-col border rounded-[10px] w-full p-3 pt-2.5 ${
                        billing.meal_type === "upsize" && "border-green-600"
                      }`}
                    >
                      <span className="uppercase text-[14px] text-[#666666]">
                        Upsize my meal
                      </span>
                      <span className="font-light text-[13px]">
                        Rp.{" "}
                        {addRadixToNumber(
                          +productInfo.price.upsize - +productInfo.price.meal
                        )}
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>
            {!!productInfo.extra && (
              <>
                <h5 className="text-[21px] mt-[16px] mb-2.5">Add Extras</h5>
                {productInfo.extra.map(({ title, price, id }, index) => {
                  return (
                    <div
                      key={"extra" + index}
                      className="w-full py-[7px] px-[20px] rounded-[5px] border flex mb-2.5 "
                    >
                      <img
                        src="https://media-order.bkdelivery.co.id/thumb/product_photo/2023/2/7/htwvxxeqrgcg54w4e3ert5_product_list.jpg"
                        className="image w-14 bg-black mr-4"
                        loading="lazy"
                      />
                      <div className="w-full flex justify-between items-center">
                        <div>
                          <p className="font-light text-[12px] text-[#404040]">
                            {title}
                          </p>
                          <span className="font-light text-[11px] text-[#707070]">
                            Rp. {addRadixToNumber(price)}
                          </span>
                        </div>
                        {!!billing.extra[id] ? (
                          <div className="min-w-[60px] flex justify-between text-[12px] text-[#ed7801] items-center">
                            <button
                              className="text-[24px] leading-[18px]"
                              onClick={() =>
                                dispatch({
                                  type: BillingActionType.DECREASE_EXTRA,
                                  payload: { id: id },
                                })
                              }
                            >
                              -
                            </button>
                            <p className="font-light text-[#000000]">
                              {billing.extra[id].amount}
                            </p>
                            <button
                              className="text-[24px] leading-[18px]"
                              onClick={() =>
                                dispatch({
                                  type: BillingActionType.INCREASE_EXTRA,
                                  payload: { id: id },
                                })
                              }
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              dispatch({
                                type: BillingActionType.ADD_EXTRA,
                                payload: {
                                  price:
                                    typeof price === "number"
                                      ? price
                                      : parseInt(price),
                                  title: title,
                                  id: id,
                                },
                              })
                            }
                            className="rounded-full flex items-center justify-center h-[22px] w-[22px] text-[#ffffff] bg-[#ed7801] leading-[0px]"
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div className="w-1 border-r border-r-neutral-800 opacity-20"></div>
          <div className="w-[37%] px-5 py-9">
            <h2 className="text-[28px] text-[#404040]">
              Rp. {addRadixToNumber(billing.total_meal)}
            </h2>
            <div
              className={`${barlow.className} text-[#8b542f] text-xs flex mt-2.5 mb-5`}
            >
              {!!productInfo.extra && (
                <>
                  <span className="min-w-[50px] block">ADD ON</span>
                  {Object.keys(billing.extra).length > 0 ? (
                    <div>
                      {Object.keys(billing.extra)
                        .sort((a, b) => parseInt(a) - parseInt(b))
                        .map((id) => {
                          return (
                            <p
                              key={id}
                            >{`${billing.extra[id].amount} ${billing.extra[id].title}`}</p>
                          );
                        })}
                    </div>
                  ) : (
                    <span>-</span>
                  )}
                </>
              )}
            </div>
            <div className="w-full flex px-4 justify-between text-[17px] text-[#ed7801] border rounded-[5px] py-1 items-center">
              <button
                className="text-[30px] leading-[20px]"
                onClick={() => dispatch({ type: BillingActionType.DECREASE })}
              >
                -
              </button>
              <p className="text-[#000000]">{billing.amount}</p>
              <button
                className="text-[30px] leading-[20px]"
                onClick={() => dispatch({ type: BillingActionType.INCREASE })}
              >
                +
              </button>
            </div>
            <button 
              onClick={submitOrder}
              className="w-full rounded-[5px] text-[#ffffff] p-2.5 bg-[#ed7801] mt-[25px]">
              Add to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

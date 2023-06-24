'use client'

import MenuCard from "@/components/MenuCard/MenuCard";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

interface CategoryProp {
  title: string;
  link: string;
  id: string
}

const categories: CategoryProp[] = [
  { title: "king of the week", link: "/menus/category/king-of-the-week",id:'1' },
  { title: "king's chicken", link: "/menus/category/kings-chicken",id:'2' },
  { title: "special menu", link: "/menus/category/special-menu",id:'3' },
];

export default function CategoryPage(){
  const pathName = usePathname()
  const [pageId, setPageId] = useState('')
  useLayoutEffect(() => {
    let id = categories.find(category => category.link === pathName)?.id
    if(!!id){
      setPageId(id)
    }
  }, [pathName])
  return(
    <div className="product-item grid grid-cols-2 gap-[20px] w-full">
      <MenuCard image="" title="Cheese Burger King" price={40000} link={`/menus/product/11/${pageId}`}/>
      <MenuCard image="" title="menu set 1" price={60000} link={`/menus/product/12/${pageId}`}/>
      <MenuCard image="" title="Milk Shake" price={15000} link={`/menus/product/21/${pageId}`}/>
      <MenuCard image="" title="Fries" price={20000} link={`/menus/product/22/${pageId}`}/>
    </div>
  )
}
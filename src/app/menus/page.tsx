import MenuCard from "@/components/MenuCard/MenuCard"

export default function Menu(){
  return(
    <div className="product-item grid grid-cols-2 gap-[20px] w-full">
      <MenuCard image="" title="Cheese Burger King" price={40000} link="menus/product/11/1"/>
      <MenuCard image="" title="menu set 1" price={60000} link="menus/product/12/1"/>
      <MenuCard image="" title="Milk Shake" price={15000} link="menus/product/21/1"/>
      <MenuCard image="" title="Burger King Chicken" price={20000} link="menus/product/22/1"/>
    </div>
  )
}
import Carousel from "@/components/Carousel/Carousel"
import MenuCard from "@/components/MenuCard/MenuCard"
import { flame } from "@/style/fonts/fonts"
import './home.scss'

export default function Home() {
  return (
    <main className={`${flame.className} homepage items-center mb-[45px]`}>
      <Carousel />
      <h1 className="text-3xl font-semibold py-6 text-center">Our Menus</h1>
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-[19px]">
        {new Array(12).fill('').map((v,index) => {
          return(<MenuCard key={v+index} title="Placeholder Menus" link="/menus"/>)
        })}
      </div>
    </main>
  )
}

import { addRadixToNumber } from '@/app/utils/util'
import { flame } from '@/style/fonts/fonts'
import Link from 'next/link'
import './menucard.scss'

interface MenuProp{
  image?: string
  title: string
  link: string
  price? : string | number
  isSpicy?: boolean
}

export default function MenuCard({image,title,link,price, isSpicy}:MenuProp){
  return(
    <div className={`menu-card bg-white p-5 w-full rounded-[10px] ${flame.className}`}>
      <Link href={link}>
        <img src='https://media-order.bkdelivery.co.id/thumb/group_photo/2023/3/15/kyhwcbzvlkeiqyjncprjjg_product_list.jpg' alt="mock image of a menu" className='bg-black w-full aspect-[4/3]' loading='lazy' />
          {!!price ? (
            <div className='menu-description'>
              <h4 className='capitalize text-[23px]'>{title}</h4>
              <span>Rp. {addRadixToNumber(price)}</span>
            </div>
          ): (
            <div className='grid grid-cols-2 auto-rows-min mt-2.5'>
              <h3 className='font-semibold text-[21px]'>{title}</h3>
              <button className='w-full py-[7px] rounded-[5px] h-min'>Order</button>
            </div>
          )}
      </Link>
    </div>
  )
}
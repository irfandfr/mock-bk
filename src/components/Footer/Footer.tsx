import { flame } from '@/style/fonts/fonts'
import { Barlow } from 'next/font/google'
import Link from 'next/link'
import React from 'react'
import './footer.scss'

interface FooterNavs{
  title : string
  link? : string
}

const barlow = Barlow({
  weight: '600',
  subsets: ['latin']
})

const navs : FooterNavs[]= [{title: 'About Us'},{title: 'Kebijakan Privasi'},{title: 'Syarat dan Ketentuan'}, {title: 'TM & © 2023 Burger King Corporation. Used Under License. All rights reserved.'}]
export default function Footer(){
  return(
    <footer className={`footer flex justify-center w-full h-[125px] mt-auto ${flame.className}`}>
      <div className='content py-[12px]'>
        <h5>BURGER KING® DELIVERY</h5>
        <div className='flex mt-[5px] items-center'>
          <div className='text-lg mr-[15px]'>15000 25</div>
          <div className={`${barlow.className} text-sm`}>guestservice@burgerking.co.id</div>
        </div>
        <nav className='navs text-xs font-light mt-2.5'>
          {navs.map(({title,link},index) =>{
            return(
              <React.Fragment key={title+index}>
                {!!link ? <Link className='hover:bg-white' href={link}>{title}</Link> : <span>{title}</span>}
                {index + 1 !== navs.length && <span className='mr-[12px] ml-[12px]'>|</span>}
              </React.Fragment>
            )
          })}
        </nav>
      </div>
    </footer>
  )
}
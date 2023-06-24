'use client'

import './globals.scss'
import { Inter } from 'next/font/google'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { createContext, useLayoutEffect, useState } from 'react'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Index - Burger King',
  description: 'Mock app of Burgerking Delivery WebApp',
}


export const AddOrderContext = createContext<((amount : number) => void) | undefined>(undefined)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [orderAmount, setAmount] = useState<number | undefined>(undefined)
  useLayoutEffect(() => {
    if(!orderAmount && orderAmount !== 0){
      let orderAmount = localStorage.getItem('orderAmount')
      if(!!orderAmount){
        setAmount(+orderAmount)
      }else{
        setAmount(0)
      }
    }
  }, [])

  function addAmount(amount: number){
    setAmount(p => !p ? amount : p+amount)
  }

  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <body className={`${inter.className} min-h-screen w-full flex flex-col items-center`}>
        <Header orderAmount={orderAmount}/>
        <AddOrderContext.Provider value={addAmount}>
          {children}
        </AddOrderContext.Provider>
        <Footer />
      </body>
    </html>
  )
}

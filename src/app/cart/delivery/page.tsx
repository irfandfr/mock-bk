'use client'

import InputText from "@/components/InputText/InputText"
import { flame } from "@/style/fonts/fonts"
import { Barlow } from "next/font/google"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const barlow = Barlow({
  weight: ['400','500','600'],
  subsets: ['latin']
})
export default function DeliveryPage(){
  const inputRefs = useRef({name:'',phone:'',location:''})
  const router = useRouter()

  function redirectNext(){
    if(inputRefs.current.name && inputRefs.current.phone && inputRefs.current.location){
      localStorage.setItem('deliveryDetails', JSON.stringify(inputRefs.current))
      router.push('/cart/payment')
    }
  }

  function updateRef(type:'name'|'phone'|'location', value: string){
    inputRefs.current[type] = value
  }
  
  return(
    <div className={`w-full shadow-lg bg-white flex flex-col lg:flex-row rounded-[10px] mb-40 ${barlow.className}`}>
      <div className="py-[30px] px-[25px] border-b lg:border-r w-full lg:w-[40%]">      
        <h3 className="font-semibold uppercase mb-2.5">Customer Details</h3>
        <InputText placeholder="Full Name" className="mb-2.5" onChange={(e) => updateRef('name',e.target.value)}/>
        <InputText placeholder="Phone Number" className="mb-2.5" onChange={(e) => updateRef('phone',e.target.value)}/>
      </div>
      <div className="py-[30px] px-[25px] w-full lg:w-[60%] text-[#404040]">
        <h2 className={`${flame.className} text-xl mb-5 text-[#8b542f]`}>Lokasi Pengantaran</h2>
        <h5 className="text-md font-semibold">Berikan Alamat Lengkap</h5>
        <p className="text-sm font-semibold mb-4">Tambahkan catatan atau acuan jika perlu (contoh: "di sebelah salon")</p>
        <textarea onChange={(e) => updateRef('location',e.target.value)} className={`mb-2.5 w-full font-light text-sm border w-full py-3 px-2 rounded-[5px] ${flame.className}`} cols={30} rows={10} placeholder="Isi Alamat disini"></textarea>
        <button onClick={redirectNext} className={`${flame.className} block w-full py-[7px] rounded-[5px] mt-6 h-min text-center text-white text-xl bg-[#ed7801]`}>Continue</button>
      </div>
    </div>
  )
}
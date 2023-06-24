import { flame } from "@/style/fonts/fonts"
import { LegacyRef } from "react"

interface InputTextProp{
  value? : string
  onChange? : (e? : any) => void
  placeholder? : string
  ref? : LegacyRef<HTMLInputElement>
  className?:string
}

export default function InputText({value, onChange,placeholder,ref,className}: InputTextProp){
  return(
    <input
      type="text"
      className={`font-light text-sm border w-full py-3 px-2 rounded-[5px] ${flame.className} ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      ref={ref}
    />
  )
}
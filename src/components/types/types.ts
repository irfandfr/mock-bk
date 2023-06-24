export interface OrderProps{
  title : string
  total_price : string | number
  amount: string | number
  extras?: {
   title: string
   amount: string | number
  }[]  
 }
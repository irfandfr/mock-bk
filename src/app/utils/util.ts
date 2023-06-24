export const addRadixToNumber = (number:number | string,radix:string = ',') : string => {
  let numberString = number+'';
  let res = numberString.split('')
 	for(let i = 3; i < numberString.length ; i+=3){
    res.splice(numberString.length - i, 0 , radix)
  }
  return res.join('')
}
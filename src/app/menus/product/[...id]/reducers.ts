/**
 * This file contains properties for Billing Reducers
 */

export interface BillingProps{
  total_meal : number
  base: number
  amount : number
  meal_type: 'base'|'meal'|'upsize'
  extra :{
    [key:string] : {
      title: string
      price : number
      amount: number
    }
  }
}

export enum BillingActionType{
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  SET_MEAL = 'SET_BASE',
  ADD_EXTRA = 'ADD_ITEM',
  INCREASE_EXTRA = 'INCREASE_EXTRA',
  DECREASE_EXTRA = 'DECREASE_EXTRA',
  INIT = 'INIT'
}

export interface BillingAction{
  type : BillingActionType
  payload? : {price?: number, priceSet?:{base: number, meal: number, upsize: number}, meal_type?: 'base'|'meal'|'upsize', title?: string, id?: string}
}

export function billingReducer(state: BillingProps, action: BillingAction){
  const {type, payload} = action;
  switch(type){
    case BillingActionType.INIT:
      {
        if(!!payload && payload.meal_type && payload.price){
          return{
            ...state,
            total_meal: payload.price,
            base: payload.price,
            meal_type: payload.meal_type
          }
        }else{
          return state
        }
      }
    case BillingActionType.INCREASE:{
      return{
        ...state,
        amount : state.amount + 1
      }
    }
    case BillingActionType.DECREASE:{
      if(state.amount > 1){
        return{
          ...state,
          amount : state.amount - 1
        }
      }else{
        return state
      }
    }
    case BillingActionType.ADD_EXTRA:{
      if(!!payload && payload.id && payload.price && typeof payload.price === 'number' && payload.title){
        return{
          ...state,
          total_meal : state.total_meal + payload.price ,
          extra : {
            ...state.extra,
            [payload.id]:{
              price: payload.price,
              title: payload.title,
              amount: 1
            }
          }
        }
      }else{
        return state
      }
    }
    case BillingActionType.INCREASE_EXTRA:{
      if(!!payload && payload.id){
        return{
          ...state,
          total_meal : state.total_meal + state.extra[payload.id].price,
          extra :{
            ...state.extra,
            [payload.id]: {
              ...state.extra[payload.id],
              amount : state.extra[payload.id].amount + 1
            }
          }
        }
      }else{ 
        return state
      }
    }
    case BillingActionType.DECREASE_EXTRA:{
      if(!!payload && payload.id && state.extra[payload.id].amount > 1){
        return{
          ...state,
          total_meal : state.total_meal - state.extra[payload.id].price,
          extra :{
            ...state.extra,
            [payload.id]: {
              ...state.extra[payload.id],
              amount : state.extra[payload.id].amount - 1
            }
          }
        }
      }else if(!!payload && payload.id && state.extra[payload.id].amount <= 1){
        state = {
          ...state,
          total_meal : state.total_meal - state.extra[payload.id].price,
        }
        delete state.extra[payload.id]
        return {...state}
      }else{ 
        return state
      }
    }
    case BillingActionType.SET_MEAL:{
      if(!!payload && payload.priceSet && payload.meal_type){
        let newPrice = state.total_meal - state.base
        if(payload.meal_type !== state.meal_type){
          state.meal_type = payload.meal_type
          state.base = payload.priceSet[payload.meal_type]
        }
        else if(payload.meal_type === state.meal_type && state.meal_type === 'upsize'){
          state.meal_type = 'meal'
          state.base = payload.priceSet['meal']
        }else if(payload.meal_type === state.meal_type && state.meal_type === 'meal'){
          state.meal_type = 'base'
          state.base = payload.priceSet['base']
        }
        return{
          ...state,
          total_meal : newPrice + state.base
        }
      }else{
        return state
      }
    }
    default : return state
  }
}

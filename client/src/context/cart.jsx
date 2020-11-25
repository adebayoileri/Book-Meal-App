import {useContext, createContext} from "react";

export const CartContext = createContext();

export const useCart = () =>{
  return useContext(CartContext)
}
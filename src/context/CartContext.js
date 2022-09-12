import React, { createContext, useState } from 'react'

export const cartContext = createContext ();

const CartProvider = (props) => {

    const [cart, setCart] = useState([]);

    const isInCart = (prod) => {
      if (cart.find(i => i.id === prod.id)) {
        return true;
      }
      else{return false}
    }
    
    const addItem = (item, cantidad) => {
      if (isInCart(item)) {
        const newCart = cart;
        let indice = cart.indexOf(cart.find(j => j.id === item.id));
        newCart[indice].cantidad += cantidad;
        setCart(newCart);
        }
      else {
      setCart([...cart, {...item, cantidad}]);
      }
    }

    // Armar una función que sea para agregar la cantidad a un producto que ya tengo.
    // Map devuelve un array y permite transformar (para sumar la cantidad).

    const removeItem = (item) => {
      if(isInCart(item)) {
        const newCart = [...cart];     // No se puede hacer una copia con newCart = cart porque lo que se hace es crear un alias, apuntar a un mismo lugar en memoria.
        let indice = cart.indexOf(cart.find(j => j.id === item.id));
        newCart.splice(indice, 1);
        setCart(newCart);
        console.log("Eliminaste un producto. Tu carrito ahora: ", cart);
      }
    }

    const clear = () => {
      setCart([]);
    }

  return (
    <>
        <cartContext.Provider value = {{cart, addItem, removeItem, clear}}>
            {props.children}
        </cartContext.Provider>
    </>
  )
}

export default CartProvider;
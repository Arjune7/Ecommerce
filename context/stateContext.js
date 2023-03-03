import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const Context = createContext();

export function StateContext({ children }) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty === 1) return prevQty;
      return prevQty - 1;
    });
  };

  const onRemove= (product)=>{
    const UpdatedCartItems= cartItems.filter((item)=> item._id!=product._id);
    const foundProduct= cartItems.find((item)=> item._id===product._id);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - foundProduct.quantity * foundProduct.price
    );
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity);
    setCartItems(UpdatedCartItems);
  }

  const onAdd = (product, quantity) => {
    console.log(cartItems);
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + quantity * product.price
    );
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

    if (checkProductInCart) {
      const UpdatedCartItems = cartItems.map((item) => {
        if (item._id === product._id)
          return {
            ...item,
            quantity: item.quantity + quantity
          }
        else
          return item;  
      });
      setCartItems(UpdatedCartItems);
    } else {
      product.quantity= quantity;

      setCartItems([
        ...cartItems,
        product
      ]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  };

  const changeCartItemQty= (product, value)=>{
    let quantity= 0;
    if(value==="inc") quantity= 1;
    else if(value==="dec") quantity=-1;
 
    let minQtyLimit= false;  

    const UpdatedCartItems = cartItems.map((item) => {
      if (item._id === product._id){
        if (value === "dec" && item.quantity===1){
          minQtyLimit= true;
          return {
            ...item,
            quantity: item.quantity,
          };
        } 
        return {
          ...item,
          quantity: item.quantity + quantity,
        };
      }
      else{
        return item;
      }
    });
    if(!minQtyLimit){
      setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + quantity * product.price
      );
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);
      setCartItems(UpdatedCartItems);
    }
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        qty,
        setShowCart,
        incQty,
        decQty,
        onAdd,
        changeCartItemQty,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantity
      }}
    >
      {children}
    </Context.Provider>
  );
}




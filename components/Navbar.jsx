import React, { useContext } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import {Cart} from './'
import { Context } from "context/stateContext";


function Navbar() {
  const {showCart, setShowCart, totalQuantity}= useContext(Context);

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Sound Store</Link>
      </p>

      <button type="button" className="cart-icon" onClick={()=>setShowCart(!showCart)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantity}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
}

export default Navbar;

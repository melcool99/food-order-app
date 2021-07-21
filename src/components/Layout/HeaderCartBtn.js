import React from "react";
import classes from "./HeaderCartBtn.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartBtn = (props) => {
  const cartCtx = useContext(CartContext)
  const numberOfCartItems = cartCtx.items.reduce( (curNumber, item) => {return curNumber + item.amount}, 0 )
  

  return (
    <button
      id="cartbtn"
      onClick={props.onClick}
      type="button"
      className={classes.button}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartBtn;

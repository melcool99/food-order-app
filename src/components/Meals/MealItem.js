import React from "react";
import classes from "./MealItem.module.css";
import {useContext} from 'react'
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

const MealItem = (props) => {
  

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id:props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })
  }
  
  const cartCtx = useContext(CartContext)

  

  return <><li className={classes.meal} key={props.id}>
  <div>
    <h3>{props.name}</h3>
    <div className={classes.description}>{props.description}</div>
    <div className={classes.price}>${props.price.toFixed(2)}</div>
  </div>
  <div>
    <MealItemForm  id={props.id} addToCartHandler={addToCartHandler}/>
  </div>
</li></>;
};

export default MealItem;
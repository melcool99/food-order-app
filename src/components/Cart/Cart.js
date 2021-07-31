import React from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CheckoutForm from "./CheckoutForm";
import useFetch from "../hooks/useFetch";

const Cart = (props) => {
  const [order, setOrder] = useState(false);
  const [orderSubmiting, setOrderSubmiting] = useState(false);
  const [orderSubmited, setOrderSubmited] = useState(false);
  const { handleRequests: sendRequests } = useFetch();

  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const showOrderForm = (value) => {
    setOrder(!order);
  };

  const submitOrderHandler = (userData) => {
    setOrderSubmiting(true);
    sendRequests({
      url: `https://react-http-a3776-default-rtdb.europe-west1.firebasedatabase.app/orders.json`,
      method: "POST",
      body: { user: userData, orderedItems: cartCtx.items },
    });

    setOrderSubmiting(false);
    setOrderSubmited(true);
    cartCtx.clearCart()
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      {hasItems && <button onClick={showOrderForm}>Order</button>}
      <button
        className={classes["button--alt"]}
        onClick={props.hideCartHandler}
      >
        Close
      </button>
    </div>
  );

  const ModalView = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>total amount</span>
        <span>{totalAmount}</span>
      </div>
      {order && (
        <CheckoutForm
          onCancel={props.hideCartHandler}
          cartItems={cartItems}
          onConfirmOrder={submitOrderHandler}
        />
      )}
      {!order && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.hideCartHandler}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal hideCartHandler={props.hideCartHandler}>
      {!orderSubmiting && !orderSubmited && ModalView}
      {orderSubmiting && isSubmittingModalContent}
      {orderSubmited && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

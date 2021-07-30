import React, { useRef, useState } from "react";

import classes from "./CheckoutForm.module.css";

const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.trim().length === 5

const CheckoutForm = (props) => {
  const [formValidity, setFormValidity]  = useState({
    name:true,
    street: true,
    city:true,
    postalCode:true
  })
  const nameInputRef =useRef()
  const streetInputRef= useRef()
  const zipInputRef= useRef()
  const cityInputRef= useRef()

  const submitOrderHandler = (e) => {
    e.preventDefault()
    const enteredName = nameInputRef.current.value
    const enteredAddress = streetInputRef.current.value
    const enteredPostalCode = zipInputRef.current.value
    const enteredCity = cityInputRef.current.value

    const enteredNameisValid = !isEmpty(enteredName)
    const enteredAddressIsValid =!isEmpty(enteredAddress)
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode)
    const enteredCityIsValid =!isEmpty(enteredCity)

    setFormValidity({
      name:enteredNameisValid,
      street:enteredAddressIsValid,
      city:enteredCityIsValid,
      postalCode:enteredPostalCodeIsValid
    })

    const formIsValid = 
      enteredNameisValid && enteredAddressIsValid && enteredPostalCodeIsValid && enteredCityIsValid

    if (!formIsValid) {
      return
    }
    // submit form data
    props.onConfirmOrder({
      name:enteredName,
      street: enteredAddress,
      city: enteredCity,
      postalCode:enteredPostalCode
    })
  }
  return (
    <form  onSubmit={submitOrderHandler} className={classes.form}>
      <div className={`${classes.control} ${formValidity.name?'': classes.invalid}`}>
        <label htmlFor="Name">Your Name</label>
        <input type="text" id="name" name='name' ref={nameInputRef} />
        {!formValidity.name && <p>Please enter a valid name!</p> }
      </div>
      <div className={`${classes.control} ${formValidity.street?'': classes.invalid}`}>
        <label htmlFor="Street"> Street Address</label>
        <input type="text" id='street' name='street' ref={streetInputRef}/>
        {!formValidity.street && <p>Please enter a valid address</p> }
      </div>
      <div className={`${classes.control} ${formValidity.postalCode?'': classes.invalid}`}>
        <label htmlFor="Postal Code">Postal Code </label>
        <input type="text" name='postalcode' id='postalcode' ref={zipInputRef} />
        {!formValidity.postalCode && <p>Please enter a valid Zip (5 characters long)</p> }
      </div>
      <div className={`${classes.control} ${formValidity.city?'': classes.invalid}`}>
        <label htmlFor="City">City</label>
        <input type="text" name='city' id='city' ref={cityInputRef}/>
        {!formValidity.city && <p>Please enter a valid city</p> }
      </div>
      <div className={classes.actions}>
      <button >Confirm</button>
      <button type='button' onClick={props.onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default CheckoutForm;

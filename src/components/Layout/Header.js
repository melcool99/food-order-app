import React from "react";
import HeaderCartBtn from "./HeaderCartBtn";
import classes from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";


const Header = (props) => {


  
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartBtn onClick={props.showCartHandler}/>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImg} alt="A table with food" />
      </div>
    </>
  );
};

export default Header;

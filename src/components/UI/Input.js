import React from "react";
import classes from "../UI/Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} onChange={props.onChange} onBlur={props.onBlur}/>
    </div>
  );
});
export default Input;

import "./Input.css";
import classes from '../Login/Login.module.css'
import React, { useRef, useImperativeHandle } from "react";

// we maked this reusable input component we will import in login and call by pasing these values what we will write there it will reflect here like if there id = 'email' then here also id will be same
const Input = React.forwardRef((props, ref) => {

    const inputRef = useRef();
    const activate = () => {// ye fn sirf focus method ke liye h jo focus krta h kisi chij pr
        inputRef.current.focus();
    }

    useImperativeHandle(ref, () => {
        return {
            focus: activate//ye focus ki jagah koi bhi variable le sakte the pr ye activate hamesha jo fn rahega jisko bahr se access krna h jaise uper activate fn h.
        }
    })
    //useImperativeHandle hook with React.forwardRef allow krta h ki is component ka koi bhi function agar access krna ho bahr ya parent component me to hm ref ki help leke kr sakte h, jb bhi useRef ka use krte h kis component ka fn use krne ke liye to ye Imperative hook use krte h to ref as a param accept krta h aur ref ko component me bhi dena padta h aur component ko wrap krna padta h React.forwardRef se taki ref activate ho for accessing

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={/*enteredEmail*/ props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
//React forwardRef is a feature that allows you to pass a ref to a child component from a parent component. It's often used when accessing the underlying DOM node or component instance of a child component from the parent component
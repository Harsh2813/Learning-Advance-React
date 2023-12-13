import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// Here we changed used useEffect for checking form validation and so that our page do not throw again in loggin in page if reloads. Then by commenting useEffect we used useReducer instead of useState. we commented code of useState

const emailReducer = (state, action) =>{// this takes state as initial state and after dispatching the action React passed the latest state to this state and then it updates the current state and passed to below useReducer and by destructuring we set current/updated state to emailState. the action used here in emailReducer as second param tells what action we taken and after calling dispatch this action will run .

  if(action.type === 'USER_INPUT'){//We handled here action which we dispatched below by checking action type
    return {value: action.val, isValid: action.val.includes('@')};//if type matches we returned updated value and 
  }// validity by checking if entered value includes @ sign then it returns true for isValid.

  if(action.type === 'INPUT_BLUR'){//NOTE:- for this action type in dispatch belowe we didn't pass entered value because we already did above for USERINPUT type action so we just checked here for form valid or not but we have to use value: and isValid key and we can't pass value:'' simply ths because it will reset value to empty so we taken previous updated value by using state.value becuase last time jb user input kiya tha to state me update hui thi latest value to usi ko wapas rakh liye yha state.value use krke value me hi action.val liye the aur. Now this is the main this why we used useReducer because React guarantee that the state updates to latest value and pass always updated value, this was not possible with useState where were depend on another state for other state
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value:'', isValid: false};// returning if nothing updated
}

const passwordReducer = (state, action) =>{
  if(action.type === 'INPUT_PASSWORD'){
    return {value: action.val, isValid: action.val.trim().length>6};//NOTE- we are returning object in emailState arry so emailState is array of object with value and isValid key so for accessing it we have do like this below-
  }//ex- for emailState we use emailState.value and emailState.isValid & for password passwordState.value or isValid
  if(action.type === 'INPUT_PASS_BLUR'){
    return {value: state.value, isValid: state.value.trim().length>6};
  }
  return {value:'', isValid: null};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //this emailstate is like state of useState and its initial value is we passed as second arg of useReducer where value is empty and isValid is false by default, then dispatch is used to dispatch the action for setting/updating emailState like setState so and useReducer first arg takes a reducer fn which we define outside of compo.
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value:'', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value:'', isValid: null});

  const {isValid: emailIsValid} = emailState;// emailState ki isValid value ko emailIsValid me de diye and same for
  const {isValid: passwordIsValid} = passwordState;//password now agar ye isValid property useEfect dependecy me diy
  useEffect(() => {// first time ye useEffect run hoga & check karega form valid ka agr mail me @ aur password >6 h0
    const identifier = setTimeout(() => {// is settimeour ki vajah se turant serFormValid run ni ho rha isiliye return me clearTimeout kr rhe taki ye setTime na ho abhi jaise hi user stop karega typing 3 sec baad valid chek hoga
      console.log('checking form validity')
      setFormIsValid(
        //enteredEmail.includes('@') && enteredPassword.trim().length > 6//this line when we used useState
        emailIsValid && passwordIsValid
      );
    }, 300);
    return ()=>{// this we used cleanUp fn of useEffect we have to use return like this inside first args of useEffect and whatever we are adding above we can remove here in return and return takes a fn.
      console.log('cleanUp')
      clearTimeout(identifier);
    }
    //This useEffect is used to debounce form validation. It delays the form validation check by 300 milliseconds after the user stops typing, preventing the validation function from running on every keystroke and improving performance. The clean-up function ensures that any previously scheduled validation checks are canceled when the dependencies change.
  }, [emailIsValid, passwordIsValid])//if isValid property of email and pass change then useEffecct will run

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});//we gave action of useInput type and gave payload of value of entered in input field as val
    //setEnteredEmail(event.target.value);

    /*setFormIsValid(
      emailState.value.includes('@') && passwordState.isValid//emailState has array of object which we returned from reducer fn that's why for accessing values using key of object like emailState.value or isValid and same for passwordState useReducer also.
      //enteredEmail.includes('@') && event.target.value.trim().length > 6
    );*/
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'INPUT_PASSWORD', val: event.target.value});

    /*setFormIsValid(//this setFormIsValid is useState we used with useReducer hook
      emailState.isValid && passwordState.value.trim().length > 6
      //enteredEmail.includes('@') && event.target.value.trim().length > 6
    )*/
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type:'INPUT_BLUR'})// we just want to check for email is valid or not by @ sign value already taken in above emailChangeHandler fn.

    //setEmailIsValid(enteredEmail.includes('@'));
  };//NOTE- Reason we used useReducer instead of useState that here we using useState of emailIsValid by setEmailIsValid for updating but for updating this we depends on another useState of enteredEmail so it is not gaurantee that enteredEmail provides updated value here or it got update before this emailIsValid useState so obviously we are not getting proper updated values and also we had to use too many useStates

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_PASS_BLUR'})// dispatch always pass action or inside it we denote as action
    //setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, /*enteredPassword*/passwordState.value);//NOTE for useReducer we changed enteredEmail to emailState.value and in place of this (enteredEmail.includes('@') and emailIsValid, we used emailState.isValid because we changed from useState to useReducer
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={/*enteredEmail*/emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

/** Flow of code --------------
We started with making form and taking input by passing functions and we commented all useState code ans started useReducer. 
Now we created Reducer hook for email and pass lets underStand for email password flow also same
const [emailState, dispatchEmail] = useReducer(emailReducer, {value:'', isValid: null});
emailState ko initial value di {value:'', isValid: null} ye as object for emailReducer fn ko component ke uper liye(sara sb kuchh code se sath h logic hm sirf code flow samajh rhe) fir discpatch fn me action diye aur direct ye reducer fn action handle kiya fir value return ki to emailState me value gyi fir ye emailState and passWord ki value hmne form submit krne me as props function onLogin me pass kr diya, pehle setFormISValid me ye emailState ki values use kr rhe the pr fir useEffect me use kiye, hmne useEffect ke uper assignment destructing ki jisme isValid ki true ya false value ko emailIsValid me di fir useEffect me pass kiye fir agar ye isValid property change hui dependency me mtlb true se false ya vice versa to hi useEffect chalega.
 */
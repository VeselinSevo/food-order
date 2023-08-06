import React, { useReducer, useState } from 'react';
import classes from './Checkout.module.css';


const inputsReducer = (prevState, action) => {

    if(action.type === 'UPDATE') {

        const {name, value} = action
        let updatedValue = value;

        switch (name) {
            case 'name':
              // Allow only alphabets and spaces in the name
              updatedValue = value.replace(/[^A-Za-z\s]/g, '');
              break;
            case 'email':
               
              // You can add email validation here if needed
              break;
            case 'address':
              // Allow any characters in the address field
              break;
            case 'postal':
              // Allow only digits in the postalCode
              updatedValue = value.replace(/\D/g, '');
              break;
            default:
              break;
          }
          
          return {
            ...prevState,
            [name]: updatedValue,
          };
        }   
        
        return prevState
}

const Checkout = props => {

const [inputs, dispachInputs] =  useReducer(inputsReducer, {
    name: '',
    email: '',
    address: '',
    postal: ''
})

const [isTouched, setIsTouched] =  useState({
    name: false,
    email: false,
    address: false,
    postal: false
})

const isNameValid = inputs.name.length > 5 
const isEmailValid = inputs.email.length > 5 && inputs.email.includes('@')
const isAddressValid = inputs.address.length > 5 
const isPostalValid = inputs.postal.length > 4

const nameError = !isNameValid && isTouched.name
const emailError = !isEmailValid && isTouched.email
const addressError = !isAddressValid && isTouched.address
const postalError = !isPostalValid && isTouched.postal

 const nameControlClasses = `${classes.control} ${
    !nameError ? '' : classes.invalid
  }`;
  const emailControlClasses = `${classes.control} ${
    !emailError ? '' : classes.invalid
  }`;
  const addresCodeControlClasses = `${classes.control} ${
    !addressError ? '' : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    !postalError ? '' : classes.invalid
  }`;


const onSumbitHandler = (e) => {
    e.preventDefault()
    const isFormValid = isNameValid && isEmailValid && isAddressValid && isPostalValid
    if(isFormValid) {
        console.log('sent')
        props.onSubmit(inputs)
    }

}

const onChangeHandler = (e) => {
    dispachInputs({type: 'UPDATE', name: e.target.name ,value: e.target.value})
}

const onBlurHandler = (e) => {
    setIsTouched(prevState => {
        return {
            ...prevState,
            [e.target.name] : true
        }
    })
}

return (
<form className={classes.form} onSubmit={onSumbitHandler}>
    <div className={nameControlClasses}>
      <label htmlFor='name'>Your Name</label>
      <input value={inputs.name} type='text'  name='name' id='name' onChange={onChangeHandler} onBlur={onBlurHandler}/>
      {nameError && <p>Please enter a valid name!</p>}
    </div>
    <div className={emailControlClasses}>
      <label htmlFor='email'>Email</label>
      <input value={inputs.email} type='text' name='email' id='email' onChange={onChangeHandler} onBlur={onBlurHandler}/>
      {emailError && <p>Please enter a valid email!</p>}
    </div>
    <div className={addresCodeControlClasses}>
      <label htmlFor='address'>Adress</label>
      <input value={inputs.address} type='text' name='address' id='address' onChange={onChangeHandler} onBlur={onBlurHandler}/>
      {addressError && <p>Please enter a valid adress!</p>}
    </div>
    <div className={postalControlClasses}>
      <label htmlFor='postal'>Postal Code</label>
      <input value={inputs.postal} type='text' name='postal' id='postal' onChange={onChangeHandler} onBlur={onBlurHandler}/>
      {postalError && (
        <p>Please enter a valid postal code (5 characters long)!</p>
      )}
    </div>
    <div className={classes.actions}>
      <button className={classes.cancel} type='button' onClick={props.onCancel}>
        Cancel
      </button>
      <button className={classes.submit}>Confirm</button>
    </div>
  </form>
  )
};

export default Checkout;
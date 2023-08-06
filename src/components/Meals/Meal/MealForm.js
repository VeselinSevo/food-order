import React from "react";
import { useRef, useState } from "react";
import classes from "./MealForm.module.css";
import Input from "../../UI/Input";

const MealForm = (props) => {

    const [amountIsValid, setAmountIsValid] =  useState(true)

    const amountInputRef = useRef()


    const submiHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value

        if(enteredAmount.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5) {
            setAmountIsValid(false)
            return
        }

        console.log(amountInputRef.current.value)
        const enteredAmountNumber = +amountInputRef.current.value //transforms string to number
        console.log(enteredAmountNumber)
        props.onAddToCart(enteredAmountNumber)
    }
    
    return (
        <form className={classes.form} onSubmit={submiHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                id="amount"
                input={{
                    type: "number",
                    min: "1",
                    max: "5",
                    defaultValue: "1",
                }}
            />
            {!amountIsValid && <div>Please select amount from 1 to 5</div>}
            <button>+ Add</button>
        </form>
    );
};

export default MealForm;

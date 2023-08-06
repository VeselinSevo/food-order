import React, { useState } from "react";
import classes from './Meal.module.css'
import MealForm from "./MealForm";

import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const Meal = props => {

    const cartCtx = useContext(CartContext)

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.mealData.id,
            name: props.mealData.name,
            price: props.mealData.price.toFixed(2),
        }, amount)
    }

   

    
 
    return (
        <li className={classes.meal} key={props.mealData.id}>
            <h3>{props.mealData.name}</h3>
            <div className={classes.description}>{props.mealData.description}</div>
            <div className={classes.price}>{props.mealData.price}$</div>
            <MealForm onAddToCart={addToCartHandler}/>
        </li>
    )
}

export default Meal

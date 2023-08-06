import React, { useContext, useEffect, useState } from 'react';
import classes from "./HeaderCartButton.module.css"
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {

    const [isCartHighlighted, setIsCartHighlighted] = useState(false)
    const cartCtx = useContext(CartContext)


    const btnClasses = `${classes.button} ${isCartHighlighted ? classes.bump : ''}`

    const { items } = cartCtx


    useEffect(() => {

        if(items.length === 0) {
            return
        } 
        setIsCartHighlighted(true)

        const timer = setTimeout(() => {
            setIsCartHighlighted(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])




   const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount}
    , 0)

  return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span className={classes}>
            Your Cart
        </span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
        
    </button>
  );
};

export default HeaderCartButton;



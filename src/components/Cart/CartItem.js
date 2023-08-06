import React from 'react';
import classes from '../Cart/CartItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CartItem = props => {

  return (
    <li className={classes['cart-item']} key={props.id}>
        <div className={classes.name}>{props.name}</div>
        <span className={classes.amount}>{props.amount}</span>
        <div className={classes.price}>{props.price}</div>
        <div className={classes.actions}>
            <button onClick={() => props.onDecrement(props.id)}>-</button>
            <button onClick={() => props.onAdd(props.item)}>+</button>
            <button onClick={() => props.onRemove(props.id)}>
                <FontAwesomeIcon icon="fa-solid fa-trash" size="xs"/>
            </button>
        </div>
      </li>
  );
};

export default CartItem;
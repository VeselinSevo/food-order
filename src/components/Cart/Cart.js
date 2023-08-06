import React, { useState } from 'react';
import classes from "./Cart.module.css"
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import PromoContext from '../../store/promo-context'
import Checkout from './Checkout';
import useHttp from '../hooks/use-http';

const Cart = props => {

  const {
    isLoading,
    sendRequest: sendOrder,
    resetLoadingandSetError,
    hasError
  } = useHttp()

  const promoCtx  = useContext(PromoContext)
  const cartCtx  = useContext(CartContext)

  const [promoInput, setPromoInput] = useState('')
  const [showCheckout, setShowCheckout] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)


  const priceClasses = `${classes.total} ${promoCtx.isCodeValid ? classes['new-price'] : ''}`

  const showCheckoutHandler = () => {
    console.log(showCheckout)
    setShowCheckout(true)
  }

  const hasItems = cartCtx.items.length > 0

  const checkIfCodeIsValidHandler = () => {
    promoCtx.verifyCode(promoCtx.enteredCode)
  }

  const promoInputHandler = e => {
    setPromoInput(e.target.value)
    

    promoCtx.enterCode(e.target.value)

    console.log(promoCtx.enteredCode)
  }

  const cartItemAddHandler = item => {
    cartCtx.addItem(item, 1)
  }

  const cartItemDecrementHandler = id => {
    cartCtx.decrementItem(id, 1)
  }

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  }


  const applyCodeHandler = () => {
    checkIfCodeIsValidHandler()
    cartCtx.applyCode(promoCtx.enteredCode === promoCtx.promoCode)
  }


  const submitOrderHandler = async (userData) => {


    const price = cartCtx.discountedTotalAmount ? cartCtx.discountedTotalAmount : cartCtx.totalAmount

    const requestParams = {
      url: 'https://food-delivery-e976e-default-rtdb.firebaseio.com/orders.json',
      method: 'POST',
      body: {
        user: userData,
        orderedItems: cartCtx.items,
        price: price
      },
      
    }

    try {
      const data = await sendOrder(requestParams)
    } catch (error) {
      console.log(error.message)
    }

    setDidSubmit(true)
    cartCtx.removeCart()
  }


  const cartItems = cartCtx.items.map(item => {
    return (

      <CartItem key={item.id} item={item} id={item.id} name={item.name} amount={item.amount} price={item.price} onDecrement={cartItemDecrementHandler} onRemove={cartItemRemoveHandler} onAdd={cartItemAddHandler}/>
    )
  })

  const actions = <div className={classes.actions}>      
      {hasItems && <button className={classes['button--alt']} onClick={cartCtx.removeCart}>Empty Cart</button>}
      <button className={classes['button--alt']} onClick={props.hideCart}>Close</button>
      {hasItems && <button className={classes.button} onClick={showCheckoutHandler}>Order</button>}
    </div>


  const cartModalContent = <>
  <div className={classes.cart}>
        <ul>
          {cartItems}
        </ul>
    
      <div className={priceClasses}>
        <span>Total Amount</span>
        <span>{promoCtx.isCodeValid ? cartCtx.discountedTotalAmount.toFixed(2) : cartCtx.totalAmount.toFixed(2)}$</span>
      </div>

      {
      hasItems && <div className={classes['promo-section']}>
          <div className={classes['promo-input']}>
            <input value={promoCtx.enteredCode} onChange={(e) => promoInputHandler(e)} type="text"></input>
            <button onClick={applyCodeHandler}>Submit promo code</button>
          </div>
        </div>
      }

      {!showCheckout && actions}
      {showCheckout && <Checkout onCancel={props.hideCart} onSubmit={submitOrderHandler}/>}
    </div>
    </>



  const isSubmitingModalContent = <p>Sending order data..</p>
  const didSubmitModalContent = <>
    <p>Successfuly sent the order!</p>
    <button className={classes['button--alt']} onClick={props.hideCart}>Close</button>
  </>

  return (
    <Modal showModal={props.showCart} onClose={props.hideCart}>
      {!isLoading && !didSubmit && cartModalContent}
      {isLoading && isSubmitingModalContent}
      {!isLoading && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
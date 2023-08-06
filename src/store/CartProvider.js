import { useContext, useEffect, useReducer, useState } from 'react'
import CartContext from './cart-context'
import PromoContext from './promo-context'


const defaultCartState = {
    items: [],
    totalAmount: 0,
    discountedTotalAmount: 0
}

const cartReducer = (state, action) => {

    if (action.type === 'ADD') {
        let updatedTotalAmount = state.totalAmount + action.item.price * action.amount
        return {
            items: [...state.items, { ...action.item, amount: action.amount }],
            totalAmount: updatedTotalAmount,
            discountedTotalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'INCREMENT') {
        let updatedTotalAmount = state.totalAmount + action.item.price * action.amount
   
        const idx = state.items.findIndex(item => item.id === action.item.id);

        const updatedCartItem = {
            ...action.item,
            amount: state.items[idx].amount + action.amount
        }
        

        const updatedItems = [...state.items]
        updatedItems[idx] = updatedCartItem

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            discountedTotalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'REMOVE') {
        let updatedTotalAmount = state.totalAmount;


        let items = [ ...state.items ];
        const itemIdx = items.findIndex(item => item.id === action.id);
        const item = { ...state.items[itemIdx] };

        items = items.filter(item => item.id !== action.id);
        updatedTotalAmount -= Number(item.price).toFixed(2);

        return {
            items: items,
            totalAmount: updatedTotalAmount,
            discountedTotalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'DECREMENT') {
        let updatedTotalAmount = state.totalAmount;
        updatedTotalAmount = updatedTotalAmount.toFixed(2)


        let items = [ ...state.items ];
        const itemIdx = items.findIndex(item => item.id === action.id);
        const item = { ...state.items[itemIdx] };
        //moze ovde items[itemInx]

        
        item.amount -= action.amount;
        updatedTotalAmount -= item.price * action.amount;
        items[itemIdx] = item;
    

        return {
            items: items,
            totalAmount: updatedTotalAmount,
            discountedTotalAmount: updatedTotalAmount
        }
    }
    

    if (action.type === 'REMOVE_ITEM') {
        let updatedTotalAmount = state.totalAmount;
   

        let items = [...state.items]

        const targetedItemIndex = state.items.findIndex(item => item.id === action.id)
        const targetedItem = items[targetedItemIndex]
        items = items.filter(item => item.id !== action.id)
        console.log(targetedItem)
        console.log(targetedItem.price, targetedItem.amount)
        updatedTotalAmount -= targetedItem.price * targetedItem.amount

        
        return {
            items: items,
            totalAmount: updatedTotalAmount,
            discountedTotalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'REMOVE_CART') {
        return defaultCartState
    }

    if (action.type === 'APPLY_CODE') {
        let updatedTotalAmount = state.totalAmount;
        let discountedTotalAmount
        if(action.isCodeValid) {
            discountedTotalAmount = state.totalAmount - 10
        } else {
            discountedTotalAmount = updatedTotalAmount
        }
        

        return {
            items: state.items,
            totalAmount: updatedTotalAmount,
            discountedTotalAmount: discountedTotalAmount
        }
    }
    return defaultCartState
}

const CartProvider = props => {

    const promoCtx = useContext(PromoContext)

    const [cartState, dispachCartAction] = useReducer(cartReducer, defaultCartState) 

    const addItemToCartHandler = (item, amount) => {
        const existingCartItem = cartContext.items.find(cartItem => cartItem.id === item.id)
        if (existingCartItem) {
            dispachCartAction({type: 'INCREMENT', item: item, amount: amount})
        } else {
            dispachCartAction({type: 'ADD', item: item, amount: amount})
        }
        applyCodeHandler(promoCtx.isCodeValid)
    }

  
    const decramentItemHandler = (id, amount) => {
        const targetedItem = cartContext.items.find(cartItem => cartItem.id === id);
        if (targetedItem && targetedItem.amount === 1) {
            dispachCartAction({type: 'REMOVE', id: id})
        } else {
            dispachCartAction({type: 'DECREMENT', id: id, amount})
        }
        applyCodeHandler(promoCtx.isCodeValid)
    }

    const removeCartHandler = () => {
        dispachCartAction({type: 'REMOVE_CART'})
    }

    const removeItemFromCartHandler = (id) => {
        dispachCartAction({type: 'REMOVE_ITEM', id: id})
        applyCodeHandler(promoCtx.isCodeValid)
    }

    const applyCodeHandler = (isCodeValid) => {
        dispachCartAction({type: 'APPLY_CODE', isCodeValid})
    }
    

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        decrementItem: decramentItemHandler,
        removeCart: removeCartHandler,
        removeItem: removeItemFromCartHandler,
        applyCode: applyCodeHandler,
        discountedTotalAmount: cartState.discountedTotalAmount,
    }


    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider
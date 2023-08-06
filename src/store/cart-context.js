import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    discountedTotalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    removeCart: () => {},
    applyCode: () => {},
})

export default CartContext
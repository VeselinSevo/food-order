import React from "react";

const PromoContext = React.createContext({
    isGenerated: false,
    promoCode: '',
    generateCode: () => {},
    isCodeValid: false,
    enteredCode: '',
    enterCode: (enteredValue) => {},
    verifyCode: (enteredCode) => {}
})

export default PromoContext
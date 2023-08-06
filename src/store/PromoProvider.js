import { useState } from 'react';
import PromoContext from './promo-context'



const PromoProvider =  props => {

    const [promoCode, setPromoCode] = useState('')
    const [isGenerated, setIsGenerated] = useState(false);


    const [enteredCode, setEnteredCode] = useState('')
    const [isCodeValid, setIsCodeValid] = useState(false)


    const generateCodeHandler = props => {
        console.log(123)
        const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude confusing characters like 'I', 'O', '0', '1'
        const promoCodeLength = 6;
        let promoCodeValue = '';
    
        for (let i = 0; i < promoCodeLength; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
        promoCodeValue += characters[randomIndex];
        }

        setPromoCode(promoCodeValue)
        setIsGenerated(true)
    }

    const enterCodeHandler = enteredValue => {
        setEnteredCode(enteredValue)
    }

    const verifyCodeHandler = enteredCode => {
        if(enteredCode === promoCode && enteredCode !== ''){
            setIsCodeValid(true)
        } else {
            setIsCodeValid(false)
        }
    }

    const promoContext = {
        isGenerated: isGenerated,
        promoCode: promoCode,
        generateCode: generateCodeHandler,

        isCodeValid: isCodeValid,
        enteredCode: enteredCode,
        enterCode: enterCodeHandler,
        verifyCode: verifyCodeHandler
    }



    return (
        <PromoContext.Provider value={promoContext}>
            {props.children}
        </PromoContext.Provider>
    )
}

export default PromoProvider
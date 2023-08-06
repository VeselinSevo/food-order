import { useState } from "react"

const useInput = (verifyInputFn) => {


    const [enteredValue, setEnteredValue] = useState('')
    const [isTouched, setIsTouched] = useState(false)

    const isValid = verifyInputFn(enteredValue)
    const error = !verifyInputFn(enteredValue) && isTouched


    const onChangeHandler = (e) => {
        setEnteredValue(e.target.value)
    }

    const onBlurHandler = () => {
        setIsTouched(true)
    }

    const reset = () => {
        setEnteredValue('')
        setIsTouched(false)
    }


    return (
        enteredValue,
        isTouched,
        isValid,
        error,
        reset,
        onChangeHandler,
        onBlurHandler
    )

}
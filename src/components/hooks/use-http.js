import { useState, useCallback } from "react"

const useHttp = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState()

    const sendRequest = useCallback(async (requestParams, responseParsingFn) => {
        setHasError(null)
        setIsLoading(true)
        console.log(requestParams)
        const response = await fetch(requestParams.url, {
            method: requestParams.method ? requestParams.method : 'GET',
            headers: requestParams.headers ? requestParams.headers : {},
            body: requestParams.body ? JSON.stringify(requestParams.body) : null
        })

        if(!response.ok) {
            throw new Error('Something went wrong')
        }

        
        const jsonResponse = await response.json()

        console.log(jsonResponse)

        let data;
        if(responseParsingFn) {
            data = responseParsingFn(jsonResponse)
        } else {
            data = jsonResponse
        }
      
        const timer = setTimeout(() => {
            setIsLoading(false)
            return () => {
                clearTimeout(timer)
            }
        }, 300)
        
        return data
    }, [])

    const resetLoadingandSetError = useCallback((error) => {
        setIsLoading(false)
        setHasError(error.message)
    }, [])

    return {
        isLoading,
        sendRequest,
        resetLoadingandSetError,
        hasError
    }

} 

export default useHttp
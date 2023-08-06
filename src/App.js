import React, {useState} from "react";
import Header from "./components/Layout/Header";
import HeroText from "./components/Layout/HeroText";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import PromoProvider
 from "./store/PromoProvider";


import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faTrash, faToggleOn, faToggleOff, } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faTrash, faToggleOn, faToggleOff)


function App() {

  const [cartIsShown, setCartIsShown] = useState(false)

    const showCartHandler = () => {
      setCartIsShown(true)
    }

    const hideCartHandler = () => {
      setCartIsShown(false)
    }



    return (
      <PromoProvider>
      <CartProvider>
        <Header showCart={showCartHandler} hideCart={hideCartHandler}/>
        <main>
          <HeroText />
          <Meals />
          {cartIsShown && <Cart showCart={showCartHandler} hideCart={hideCartHandler}/>}
        </main>
        
      </CartProvider>
      </PromoProvider>
    );
}

export default App;

import React from "react";
import classes from "./Header.module.css"
import CoverImage from "./CoverImage";
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
    return (
        <>
            <header className={classes.header}>
                <h1>Food Delivery</h1>
                <HeaderCartButton onClick={props.showCart}/>
            </header>
            <CoverImage />
        </>
    )
    
}

export default Header

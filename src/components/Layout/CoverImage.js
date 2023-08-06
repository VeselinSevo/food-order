import React from "react";
import coverImage from "../../assets/food.png"
import classes from "./Header.module.css"

const CoverImage = props => {
    return (
        <div className={classes['main-image']}>
            <img src={coverImage} alt="Restourant!" />
        </div>
    )
    
}

export default CoverImage
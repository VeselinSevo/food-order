import React, { useContext, useState } from 'react';
import classes from './HeroText.module.css'
import PromoContext from '../../store/promo-context'

const HeroText = () => {
  const promoCtx = useContext(PromoContext)

  const generatePromoCodeHandler = props => {
    promoCtx.generateCode()
  }

  return (
    <section className={classes['hero-text']}>
        <h2>We deliver your food.</h2>
        {promoCtx.promoCode === '' ? <button className={classes['hero-button']} onClick={generatePromoCodeHandler}>Generate promo code</button> : ''}
        <p>{promoCtx.promoCode}</p>
    </section>
  );
};

export default HeroText;
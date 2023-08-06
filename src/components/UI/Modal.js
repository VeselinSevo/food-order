import React from 'react';
import reactDom from 'react-dom';
import classes from './Modal.module.css'

const Backdrop = props => {
    return (
      <div className={classes.backdrop} onClick={props.onClose}>

      </div>
    );
};
  
const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <h3>Your Cart</h3>
            <div>{props.children}</div>
        </div>

    );
};

const portalLocation = document.getElementById('overlays')


const Modal = props => {
    return (
        <>
            {reactDom.createPortal(<Backdrop onClose={props.onClose}/>, portalLocation)}
            {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalLocation)}
            
        </>
    );
};

export default Modal;
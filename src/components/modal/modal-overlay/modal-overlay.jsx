import React from 'react';
import style from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay=(props) => {
    return (
        <div className={style.over_lay} onClick={props.onClose}></div>
    )
}

ModalOverlay.propsTypes = {
    onClose: PropTypes.func.isRequired
}

export default  ModalOverlay;

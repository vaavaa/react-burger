import React from 'react';
import ReactDOM from "react-dom";
import style from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import {ESC_KEY_CODE} from "../../utils/config";

const Modal = (props) => {
    const {onClose, children, caption} = props;
    const handleEscKey = (e) => {
        if (e.keyCode === ESC_KEY_CODE) {
            onClose(e);
        }
    }
    React.useEffect(() => {
        document.addEventListener('keyup', handleEscKey);
        return () => {
            document.removeEventListener('keyup', handleEscKey);
        }
    })

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <section className={style.modal_view+' pt-10 pr-10 pl-10 pb-15'}>
                <section className={style.header}>
                    <h3 className={style.caption +' text text_type_main-large'}>{caption}</h3>
                    <div className={style.close} onClick={onClose}>
                        <CloseIcon type={"primary"} />
                    </div>
                </section>
                {children}
            </section>
        </>,
        document.getElementById('modal-root-element')
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    caption: PropTypes.string
}
export default  Modal;

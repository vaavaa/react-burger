import React from 'react';
import style from './order-details.module.css';
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import done from '../../images/order-details/done.png'

const OrderDetails = () => {
    return(
        <div className={style.order + ' pb-15 '}>
            <h3 className={style.caption +' text text_primary_ligth text_type_digits-large '}>
                034536
            </h3>
            <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
            <div className={style.status + ' mt-15 mb-15 '}>
                <img src={done} alt="done"/>
                <CheckMarkIcon type="primary" />
            </div>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default  OrderDetails;

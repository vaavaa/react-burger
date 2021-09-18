import style from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from "./ingredients/ingredients";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useState} from "react";
import PropTypes from "prop-types";
import {ingredients_model} from "../../models/common_models";


const BurgerConstructor = (props) =>{
    const text = props.data[props.buns].name;
    const price = props.data[props.buns].price;
    const bun_image = props.data[props.buns].image;
    const [modal, setModal] = useState(false);

    const handleOpen = () => {
        setModal(!modal);
    }

    return (
        <div className={style.constructor_content}>
            <section className={style.constructor_ingredients}>
                <span className={style.top_bottom_buns + ' pl-10 '} >
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={text+'(верх)'}
                        price={price}
                        thumbnail={bun_image}/>
                </span>
                <Ingredients data={props.data} ids={props.ids}/>
                <span className={style.top_bottom_buns + ' pl-10 '} >
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={text+'(низ)'}
                        price={price}
                        thumbnail={bun_image}/>
                </span>
            </section>
            <div className={"mt-10 " + style.constructor_info}>
                <span className="text text_type_digits-medium mr-10"><span>1670</span><CurrencyIcon
                    type="primary"/></span>
                <Button type="primary" size="medium" onClick={handleOpen}>
                    Оформить заказ
                </Button>
            </div>
            {modal &&
            <Modal onClose={handleOpen}>
                <OrderDetails data={props.ids} />
            </Modal>
            }
        </div>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredients_model.isRequired).isRequired
}
export default BurgerConstructor;

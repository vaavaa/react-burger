import style from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {
    CONSTRUCTOR_ADD_BUN,
    CONSTRUCTOR_ADD_INGREDIENT,
    MODAL_CLOSED,
    postOrderToServer
} from "../../services/actions/burger-constructor";
import {useDrop} from "react-dnd";
import {v4 as uuidv4} from 'uuid';
import React, {useMemo} from "react";
import IngredientElement from "./ingredient-element/ingredient-element";
import {useHistory} from "react-router-dom";

const BurgerConstructor = () => {
    //Стейты перебрались в redux
    const {isAuth, ingredients, bun, order, modalBit} = useSelector(state => ({
        ingredients: state.burgerConstructor.ingredients,
        bun: state.burgerConstructor.bun,
        order: state.burgerConstructor.order,
        modalBit: state.burgerConstructor.modalBit,
        isAuth:state.userData.isAuth
    }));

    const dispatch = useDispatch();
    const history = useHistory();


    const moveIngredient = (ingredient) => {
        dispatch({
            type: CONSTRUCTOR_ADD_INGREDIENT,
            item: {...ingredient, uuid: uuidv4()}
        })
    }
    const moveBuns = (buns) => {
        dispatch({
            type: CONSTRUCTOR_ADD_BUN,
            item: buns
        })
    }

    const [{isHoverIngredients}, dropIngredients] = useDrop({
        accept: 'ingredients',
        collect: monitor => ({
            isHoverIngredients: monitor.isOver()
        }),
        drop(item) {
            moveIngredient(item);
        }
    });

    const [{isHoverBunsTop}, dropBunTop] = useDrop({
        accept: 'buns',
        collect: monitor => ({
            isHoverBunsTop: monitor.isOver()
        }),
        drop(item) {
            moveBuns(item);
        }
    });
    const [{isHoverBunsBottom}, dropBunBottom] = useDrop({
        accept: 'buns',
        collect: monitor => ({
            isHoverBunsBottom: monitor.isOver()
        }),
        drop(item) {
            moveBuns(item);
        }
    });

    const totalPrice = useMemo(() => {
        let price = ingredients.reduce((acc, item) => {
            return item.data.price + acc;
        }, 0);
        price += bun && bun.data.price * 2;
        return price;
    }, [ingredients, bun])

    const handleOpen = () => {
        if (!bun) return alert('Выберите булочку сначала. Без булочки не бывает бургеров.');
        if (!isAuth) history.push('/login');
        //Булочку укажем два раза потому что булочка у нас двойная
        const ids = [...ingredients.map(item => item.data._id), bun.data._id, bun.data._id];
        //Отправляем данные на сервер
        dispatch(postOrderToServer(ids));
    }
    const handleClose = () => {
        dispatch({
            type: MODAL_CLOSED
        })
    }
    return (
        <div className={style.constructor_content}>
            <section className={style.constructor_ingredients}>
                <span ref={dropBunTop}
                      className={`${style.top_bottom_buns} pl-10 ${isHoverBunsTop ? style.is_hovering : ''}`}>
                   {bun ? (
                       <ConstructorElement
                           text={`${bun.data.name} (сверху)`}
                           price={bun.data.price}
                           thumbnail={bun.data.image}
                           type="top"
                           isLocked={true}
                       />
                   ) : (
                       <div className={`${style.bun_empty} text text_type_main-default`}>
                           <p>Выберите булочку</p>
                       </div>
                   )}
                </span>
                <div ref={dropIngredients}
                     className={`${style.wrapper_ingredients} ${isHoverIngredients ? style.is_hovering : ''}`}>
                    {ingredients.length > 0 ? (
                            ingredients.map((item, index) => {
                                return <IngredientElement key={item.uuid} index={index} data={item}/>
                            })
                        ) : ( <p>Выберите ингредиенты</p> )}
                </div>
                <span ref={dropBunBottom}
                      className={`${style.top_bottom_buns} pl-10 ${isHoverBunsBottom ? style.is_hovering : ''}`}>
                   {bun ? (
                       <ConstructorElement
                           text={`${bun.data.name} (снизу)`}
                           price={bun.data.price}
                           thumbnail={bun.data.image}
                           type="bottom"
                           isLocked={true}
                       />
                   ) : (
                       <div className={`${style.bun_empty} text text_type_main-default`}>
                           <p>Выберите булочку</p>
                       </div>
                   )}
                </span>
            </section>
            {(ingredients || bun) && (
                <div className={"mt-10 " + style.constructor_info}>
                <span className="text text_type_digits-medium mr-10">
                    <span>{totalPrice}</span>
                    <CurrencyIcon type="primary"/></span>
                    <Button type="primary" size="medium" onClick={handleOpen}>
                        Оформить заказ
                    </Button>
                </div>)}
            {modalBit && order && (
                <Modal onClose={handleClose}>
                    <OrderDetails id={order}/>
                </Modal>)}
        </div>
    );
};

export default BurgerConstructor;

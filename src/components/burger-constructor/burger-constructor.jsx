import style from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from "./ingredients/ingredients";
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
import {useMemo} from "react";

const BurgerConstructor = () => {

    const {ingredients, bun, order, modalBit} = useSelector(state => ({
        ingredients: state.burgerConstructor.ingredients,
        bun: state.burgerConstructor.bun,
        order: state.burgerConstructor.order,
        modalBit: state.burgerConstructor.modalBit
    }));
    const dispatch = useDispatch();

    const moveIngredient = (ingredient) => {
        dispatch({
            type: ingredient.type === 'bun' ? CONSTRUCTOR_ADD_BUN : CONSTRUCTOR_ADD_INGREDIENT,
            item: {...ingredient, uuid: uuidv4()}
        })
    }
    const [{isHover}, dropTarget] = useDrop({
        accept: 'ingredients',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            moveIngredient(item);
        }
    });

    const totalPrice = useMemo(() => {
        let price = ingredients.reduce((acc, item) => {
            return item.price + acc;
        }, 0);
        price += bun && bun.price * 2;
        return price;
    }, [ingredients, bun])

    const handleOpen = () => {
        if (!bun) return alert('Выберите булочку сначала. Без булочки не бывает бургеров.');
        //Булочку укажем два раза потому что булочка у нас двойная
        const ids = [...ingredients.map(item => item._id), bun._id, bun._id];
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
            <section ref={dropTarget} className={style.constructor_ingredients}>
                <span className={`${style.top_bottom_buns} pl-10 ${isHover ? style.is_hovering : ''}`}>
                   {bun ? (
                       <ConstructorElement
                           text={`${bun.name} (сверху)`}
                           price={bun.price}
                           thumbnail={bun.image}
                           type="top"
                           isLocked={true}
                       />
                   ) : (
                       <div className={`${style.bun_empty} text text_type_main-default`}>
                           <p>Выберите булочку</p>
                       </div>
                   )}
                </span>
                <Ingredients data={ingredients}/>
                <span className={`${style.top_bottom_buns} pl-10 ${isHover ? style.is_hovering : ''}`}>
                   {bun ? (
                       <ConstructorElement
                           text={`${bun.name} (снизу)`}
                           price={bun.price}
                           thumbnail={bun.image}
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
            {modalBit &&
            <Modal onClose={handleClose}>
                <OrderDetails data={order}/>
            </Modal>
            }
        </div>
    );
};

export default BurgerConstructor;

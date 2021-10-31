import style from "./ingredient-card.module.css";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ingredient_model} from "../../../models/common_models";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";

const IngredientCard = (props) => {
    const {ingredients, bun} = useSelector(state => state.burgerConstructor);
    const {image, price, name, _id, type} = props.data;
    let counter = ingredients.filter((item) => item.data._id === _id).length;
    let counter_ux = '';

    if (type === 'bun'
        && bun
        && bun.data._id === _id) {
        counter_ux = 2;
    } else if (type !== 'bun' && counter) {
        counter_ux = counter
    } else {
        counter_ux = '';
    }

    const [{opacity}, ref_ingredient] = useDrag({
        type: type === 'bun' ? 'buns' : 'ingredients',
        item: {...props},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    return (
        <div ref={ref_ingredient} draggable className={style.card} style={{opacity: opacity}} onClick={props.onOpen} id={_id}>
            <div className={style.counter}>
                {counter_ux && <Counter count={counter_ux} size="default"/>}
            </div>
            <img className={style.img} src={image} alt="burger"/>
            <div className={style.price}>
                <span className="text text_type_digits-default">
                  {price}
                </span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={style.caption + 'text text_type_main-default'}>
                {name}
            </p>
        </div>
    )
}

IngredientCard.propTypes = ingredient_model.isRequired;
export default IngredientCard

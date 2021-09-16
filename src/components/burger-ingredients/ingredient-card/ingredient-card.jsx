import style from "./ingredient-card.module.css";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ingredient_model} from "../../../models/common_models";

const IngredientCard = (props) => {
    let counter = 0;
    return (
        <div className={style.card} onClick={props.onOpen} id={props.data._id}>
            <div className={style.counter}>
                {
                    counter !== 0 ? <Counter count={counter} size="default"/> : ""
                }
            </div>
            <img className={style.img} src={props.data.image} alt="burger"/>
            <div className={style.price}>
                <span className="text text_type_digits-default">
                  {props.data.price}
                </span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={style.caption + 'text text_type_main-default'}>
                {props.data.name}
            </p>
        </div>
    )
}

// IngredientCard.propTypes = ingredient_model.isRequired;
export default IngredientCard

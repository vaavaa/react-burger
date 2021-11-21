import style from "./ingredient-card.module.css";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ingredientModel} from "../../../models/common-models";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {useMemo} from "react";

const IngredientCard = (props) => {
    const location = useLocation();
    const {ingredients, bun} = useSelector(state => state.burgerConstructor);
    const {image, price, name, _id, type} = props.data;

    let counter = useMemo(() => {
        return ingredients.filter((item) => item.data._id === _id).length;
    }, [ingredients, _id])
    let counterUx;


    if (type === 'bun'
        && bun
        && bun.data._id === _id) {
        counterUx = 2;
    } else if (type !== 'bun' && counter) {
        counterUx = counter
    } else {
        counterUx = '';
    }

    const [{opacity}, refIngredient] = useDrag({
        type: type === 'bun' ? 'buns' : 'ingredients',
        item: {...props},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    return (
        <Link ref={refIngredient} draggable className={style.link}
              to={{pathname: `/ingredients/${_id}`, state: {background: location}}}
              onClick={props.onOpen} style={{opacity: opacity}} id={_id}>
            <div className={style.card}>
                <div className={style.counter}>
                    {counterUx && <Counter count={counterUx} size="default"/>}
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
        </Link>
    )
}

IngredientCard.propTypes = ingredientModel.isRequired;
export default IngredientCard

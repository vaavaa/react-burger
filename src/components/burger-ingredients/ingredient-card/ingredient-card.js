import style from "../burger-ingredients.module.css";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useState} from "react";

export const IngredientCard = (props) => {
    const [chosenItems, setСhosenItems] = useState(0);
    const [chosenBuns, setchosenBuns] = useState(0);
    var counter = 0

    if (props.data.type === 'bun') {
        if (chosenBuns) {
            counter = chosenBuns._id === props.data._id ? 1 : 0
        }
    } else {
        if (chosenItems) {
            counter = chosenItems.filter((item) => item._id === props.data._id).length
        }
    }
    return (
        <div>
            <div style={{position: 'relative'}}>
                {
                    counter !== 0 ? <Counter count={counter}/> : ""
                }
            </div>
            <img className={style.img} src={props.data.image} alt="burger"/>
            <div className={style.total}>
        <span className="text text_type_digits-default">
          {props.data.price}
        </span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default">
                {props.data.name}
            </p>
        </div>
    )
}

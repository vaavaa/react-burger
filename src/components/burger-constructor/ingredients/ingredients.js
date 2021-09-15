import style from "./ingredients.module.css";
import IngredientElement from "./ingredient-element/ingredient-element"

const Ingredients = (props) => (
    <div className={style.wrapper_ingredients}>
        {props.ids.map((item, index) => {
            return <IngredientElement key={index} data={props.data[item]}/>
        })}
    </div>
);
export default Ingredients;

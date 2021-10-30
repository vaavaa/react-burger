import style from "./ingredients.module.css";
import IngredientElement from "./ingredient-element/ingredient-element"
import PropTypes from "prop-types";
import {ingredients_model} from "../../../models/common_models";


const Ingredients = (props) => (
    <div className={style.wrapper_ingredients}>
        {props.data.map((item, index) => {
            return <IngredientElement key={item.uuid} index={index} {...item} />
        })}
    </div>
);

Ingredients.propTypes = {
    data: PropTypes.arrayOf(ingredients_model.isRequired).isRequired,
}
export default Ingredients;

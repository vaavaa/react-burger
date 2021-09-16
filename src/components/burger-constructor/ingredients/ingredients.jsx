import style from "./ingredients.module.css";
import IngredientElement from "./ingredient-element/ingredient-element"
import PropTypes from "prop-types";
import {ingredients_model} from "../../../models/common_models";


const Ingredients = (props) => (
    <div className={style.wrapper_ingredients}>
        {props.ids.map((item, index) => {
            return <IngredientElement key={index} data={props.data[item]}/>
        })}
    </div>
);

Ingredients.propTypes = {
    data: PropTypes.arrayOf(ingredients_model.isRequired).isRequired,
    ids: PropTypes.arrayOf(PropTypes.isRequired).isRequired
}
export default Ingredients;

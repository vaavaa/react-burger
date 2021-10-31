import style from "./ingredients.module.css";
import IngredientElement from "./ingredient-element/ingredient-element"
import PropTypes from "prop-types";
import {ingredients_model} from "../../../models/common_models";
import React from "react";


const Ingredients = React.forwardRef((props, ref) => (
    <div ref={ref} className={`${style.wrapper_ingredients} ${props.is_hover ? style.is_hovering : ''}`}>
        {props.data.map((item, index) => {
            return <IngredientElement key={item.uuid} index={index} data={item} />
        })}
    </div>
));

Ingredients.propTypes = {
    data: PropTypes.arrayOf(ingredients_model).isRequired,
    is_hover: PropTypes.bool
}
export default Ingredients;

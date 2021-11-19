import React, {useMemo} from 'react';
import style from './ingredient-detail.module.css';
// import {ingredientDetailsModel} from "../../../models/common-models";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {isEmpty} from "../../../utils/utils";

const IngredientDetails = () => {
    const {ingredients, ingredientDetails} = useSelector(state => state.burgerIngredients);
    const {id} = useParams();

    console.log(ingredientDetails);
    console.log(ingredients);

    let ingredient = useMemo(() => {
        let returnValue;
        if (!isEmpty(ingredientDetails)) {
            returnValue = ingredientDetails;
        } else {
            returnValue = ingredients.find((item) => item._id === id);
        }
        return returnValue
    }, [ingredientDetails, ingredients, id]);

    return (
        <section className={style.body}>
            <img src={ingredient.image_large} alt=""/>
            <h5 className="text text_type_main-medium mt-4">{ingredient.name}</h5>
            <div className={style.composition + ' mt-8 '}>
                <div className={style.items + ' mr-5 '}>
                    <span className="text text_color_inactive text_type_main-default">Калории,ккал</span>
                    <span
                        className="text text_color_inactive text_type_digits-default mt-2">{ingredient.calories}</span>
                </div>
                <div className={style.items + ' mr-5 '}>
                    <span className="text text_color_inactive text_type_main-default">Белки, г</span>
                    <span
                        className="text text_color_inactive text_type_digits-default mt-2">{ingredient.proteins}</span>
                </div>
                <div className={style.items + ' mr-5 '}>
                    <span className="text text_color_inactive text_type_main-default">Жиры, г</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{ingredient.fat}</span>
                </div>
                <div className={style.items + ' mr-5'}>
                    <span className="text text_color_inactive text_type_main-default">Углеводы, г</span>
                    <span
                        className="text text_color_inactive text_type_digits-default mt-2">{ingredient.carbohydrates}</span>
                </div>
            </div>
        </section>
    )
}

// IngredientDetails.propTypes = ingredientDetailsModel.isRequired;
export default IngredientDetails;

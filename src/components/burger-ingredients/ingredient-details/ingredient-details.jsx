import React, {useEffect, useMemo} from 'react';
import style from './ingredient-detail.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getLastParam} from "../../../utils/utils";


const IngredientDetails = () => {
    const {ingredients, modalBit} = useSelector(state => state.burgerIngredients);
    const id = getLastParam(window.location.pathname);

    let ingredient = useMemo(() => {
        return ingredients.find((item) => item._id === id);
    }, [ingredients, id]);

    return (
        <>{ingredient && (
            <section className={modalBit ? style.body : style.body + ' ' + style.container}>
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
                        <span
                            className="text text_color_inactive text_type_digits-default mt-2">{ingredient.fat}</span>
                    </div>
                    <div className={style.items + ' mr-5'}>
                        <span className="text text_color_inactive text_type_main-default">Углеводы, г</span>
                        <span
                            className="text text_color_inactive text_type_digits-default mt-2">{ingredient.carbohydrates}</span>
                    </div>
                </div>
            </section>)}
        </>
    )
}

// IngredientDetails.propTypes = ingredientDetailsModel.isRequired;
export default IngredientDetails;

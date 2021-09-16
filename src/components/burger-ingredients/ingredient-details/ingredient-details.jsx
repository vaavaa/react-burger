import React from 'react';
import style from './ingredient-detail.module.css';
import {ingredient_details_model} from "../../../models/common_models";

function IngredientDetails(props) {
    const {image_large, name, calories, carbohydrates, fat, proteins} = props.data;
    return (
        <section className={style.body}>
            <img src={image_large} alt=""/>
            <h5 className="text text_type_main-medium mt-4">{name}</h5>
            <div className={style.composition + ' mt-8 '}>
                <div className={style.items + ' mr-5 '}>
                    <span className="text text_color_inactive text_type_main-default">Калории,ккал</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{calories}</span>
                </div>
                <div className={style.items + ' mr-5 '}>
                    <span className="text text_color_inactive text_type_main-default">Белки, г</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{proteins}</span>
                </div>
                <div className={style.items + ' mr-5 '}>
                    <span className="text text_color_inactive text_type_main-default">Жиры, г</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{fat}</span>
                </div>
                <div className={style.items + ' mr-5'}>
                    <span className="text text_color_inactive text_type_main-default">Углеводы, г</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{carbohydrates}</span>
                </div>
            </div>
        </section>
    )
}

IngredientDetails.propTypes = ingredient_details_model.isRequired;
export default  IngredientDetails;

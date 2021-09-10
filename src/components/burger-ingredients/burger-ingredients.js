import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const ingredientsPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
});

const IngredientCard = ({ingredients}) => (
    <div className={styles.cart_ingredient}>
        <span className={styles.icon_counter}><Counter count={1} size="small" /></span>
        <img className="mr-4 ml-4" src={ingredients.image} alt={ingredients.name} />
        <p className="mt-1 text text_type_digits-default">{ingredients.price} <CurrencyIcon type="primary" /></p>
        <p className="text text_type_main-default">{ingredients.name}</p>
    </div>
);


IngredientCard.propTypes = {
    ingredients: ingredientsPropTypes.isRequired,
};

const Ingredients = ({data,type,title}) => (
    <section>
        <h3 className='text text_type_main-medium '>{title}</h3>
        <div className={styles.burger_ingredient + " mt-6 mr-2 ml-4"}>
            { data.map((item, index) => {
                if(item.type === type) {
                    return <IngredientCard key={index} ingredients={item}/>
                }else{
                    return null;
                }
            })}
        </div>
    </section>
);

Ingredients.propTypes = {
    data: PropTypes.arrayOf(ingredientsPropTypes.isRequired),
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default function BurgerIngredients({data}) {

    const [current, setCurrent] = React.useState('one')
    return (
        <section className={styles.burger_content +' pt-10 pb-10'}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <div style={{ display: 'flex' }}  className='mt-5'>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Сосусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <section className={styles.wrapper_ingredients + " "}>
                <Ingredients data={data} type={"bun"} title="Булки"/>
                <Ingredients data={data} type={"sauce"} title="Соусы"/>
                <Ingredients data={data} type={"main"} title="Начинки"/>
            </section>
        </section>
    );
};
BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(
        ingredientsPropTypes.isRequired
    )
}


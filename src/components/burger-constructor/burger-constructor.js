import PropTypes from 'prop-types';
import style from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

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
    _v: PropTypes.number.isRequired,
});

const idIngredients = [6,4,7,8,8,12,6];

const IngredientsElement = ({data}) => (
    <span>
    <DragIcon type="primary" />
    <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
    />
  </span>
)

IngredientsElement.propTypes = {
    data: ingredientsPropTypes.isRequired,
};

const Ingredients = ({data}) => (
    <div className={style.wrapper_ingredients}>
        {idIngredients.map((item, index) => {
            return <IngredientsElement key={index} data={data[item]}/>
        })}
    </div>
);

Ingredients.propTypes = {
    data: PropTypes.arrayOf(ingredientsPropTypes.isRequired),
};

export default function BurgerConstructor({data}) {
    return (
        <div className={style.constructor_content}>
            <section className={style.constructor_ingredients} >
        <span className="pl-10 " style={{width:'552px'}}>
          <ConstructorElement
              type="top"
              isLocked={true}
              text={data[3].name + " (верх)"}
              price={data[0].price}
              thumbnail={data[0].image}/>
        </span>
                <Ingredients data={data} />
                <span className="pl-10" style={{width:'552px'}}>
          <ConstructorElement
              type="bottom"
              isLocked={true}
              text={data[0].name + " (низ)"}
              price={data[0].price}
              thumbnail={data[0].image}
          />
        </span>
            </section>
            <div className={"mt-10 " + style.constructor_info}>
                <span className="text text_type_digits-medium mr-10"><span>1000</span><CurrencyIcon type="primary" /></span>
                <Button type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(
        ingredientsPropTypes.isRequired
    )
}

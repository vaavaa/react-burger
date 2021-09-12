import style from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const id_ingredients = [4, 6, 8, 6, 7, 8, 12, 13];

const IngredientElement = ({data}) => (
    <span>
        <DragIcon type="primary"/>
        <ConstructorElement
            text={data.name}
            price={data.price}
            thumbnail={data.image}
        />
    </span>
)

const Ingredients = ({data}) => (
    <div className={style.wrapper_ingredients}>
        {id_ingredients.map((item, index) => {
            return <IngredientElement key={index} data={data[item]}/>
        })}
    </div>
);

export default function BurgerConstructor({data}) {
    return (
        <div className={style.constructor_content}>
            <section className={style.constructor_ingredients}>
                <span className="pl-10 " style={{width: '552px'}}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={data[3].name + " (верх)"}
                        price={data[0].price}
                        thumbnail={data[0].image}/>
                </span>
                <Ingredients data={data}/>
                <span className="pl-10" style={{width: '552px'}}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={data[0].name + " (низ)"}
                        price={data[0].price}
                        thumbnail={data[0].image}/>
                </span>
            </section>
            <div className={"mt-10 " + style.constructor_info}>
                <span className="text text_type_digits-medium mr-10"><span>1000</span><CurrencyIcon
                    type="primary"/></span>
                <Button type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
};

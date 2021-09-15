import style from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from "./ingredients/ingredients";


const BurgerConstructor = (props) =>{
    return (
        <div className={style.constructor_content}>
            <section className={style.constructor_ingredients}>
                <span className="pl-10 " style={{width: '552px'}}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={props.data[3].name}
                        price={props.data[0].price}
                        thumbnail={props.data[0].image}/>
                </span>
                <Ingredients data={props.data} ids={props.ids}/>
                <span className="pl-10" style={{width: '552px'}}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={props.data[0].name}
                        price={props.data[0].price}
                        thumbnail={props.data[0].image}/>
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
export default BurgerConstructor;

import {React, useRef, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-ingredients.module.css'
import {IngredientCard} from "./ingredient-card/ingredient-card";


const BurgerIngredients = (props) => {

    const [current, setCurrent] = useState('start')

    let data_buns = props.data.filter((buns) => buns.type === "bun");
    let data_sauces = props.data.filter((sauce) => sauce.type === "sauce");
    let data_mains = props.data.filter((main) => main.type === "main");


    const refScrollBuns = useRef(null)
    const refScrollSauces = useRef(null)
    const refScrollMains = useRef(null)
    const refScrollContainer = useRef(null)

    const executeScrollBuns = () => {
        refScrollBuns.current.scrollIntoView()
        setCurrent("start")
    }

    const executeScrollSauces = () => {
        refScrollSauces.current.scrollIntoView()
        setCurrent("second")
    }

    const executeScrollMains = () => {
        refScrollMains.current.scrollIntoView()
        setCurrent('third')
    }


    const handleScrollIngredients = () => {
        const bunsDis = refScrollBuns.current.getBoundingClientRect().top - refScrollContainer.current.getBoundingClientRect().top
        const saucesDis = refScrollSauces.current.getBoundingClientRect().top - refScrollContainer.current.getBoundingClientRect().top

        if (bunsDis >= -210) {
            setCurrent("start")
            return
        }
        if (saucesDis >= -485) {
            setCurrent("second")
        } else {
            setCurrent('third')
        }
    }

    return (

            <section className={style.burger_content +' pt-10 pb-10'}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <div style={{display: 'flex'}} className='mt-5'>
                <Tab value="one" active={current === 'first'} onClick={executeScrollBuns}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'second'} onClick={executeScrollSauces}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'third'} onClick={executeScrollMains}>
                    Начинки
                </Tab>
            </div>
            <div ref={refScrollContainer}
                 className={style.overflow}
                 onScroll={handleScrollIngredients}>
                <div>
                    <p ref={refScrollBuns}
                       className={style.headers + 'text text_type_main-medium'}>
                        Булки
                    </p>
                    <ul className={style.ul_groups}>
                        {
                            data_buns.map((item, index) => (
                                <IngredientCard key={index} data={item} />
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <p ref={refScrollSauces}
                       className={style.headers + 'text text_type_main-medium'}>
                        Соусы
                    </p>
                    <ul className={style.ul_groups}>
                        {
                            data_sauces.map((item, index) => (
                                <IngredientCard key={index} data={item} />
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <p ref={refScrollMains}
                       className={style.headers + 'text text_type_main-medium'}>
                        Начинки
                    </p>
                    <ul className={style.ul_groups}>
                        {
                            data_mains.map((item, index) => (
                                <IngredientCard key={index} data={item} />
                            ))
                        }
                    </ul>
                </div>
            </div>
            </section>
    );
}

export default BurgerIngredients;

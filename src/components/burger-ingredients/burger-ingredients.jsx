import React, {useRef} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-ingredients.module.css'
import IngredientCard from "./ingredient-card/ingredient-card";
import {bunsLimit, sauceLimit} from "../../utils/config";
import {useDispatch, useSelector} from "react-redux";
import {
    INGREDIENT_ACTIVATE_TAB,
    INGREDIENT_MODAL,
    INGREDIENTS_DETAILS
} from "../../services/actions/burger-ingredients";


const BurgerIngredients = () => {
    //Все стейты в redux
    const {
        ingredients, ingredientsRequest, ingredientsError, currentTab
    } = useSelector(state => state.burgerIngredients)

    const dispatch = useDispatch();
    const refBuns = useRef(null)
    const refSauces = useRef(null)
    const refMains = useRef(null)
    const refContainer = useRef(null)

    //Что бы не перегружать разметку выборкой, здесь фильтруем
    const dataBuns = ingredients.filter((buns) => buns.type === "bun");
    const dataSauces = ingredients.filter((sauce) => sauce.type === "sauce");
    const dataMains = ingredients.filter((main) => main.type === "main");

    //Обработка нажатий на табы
    const scrollBuns = () => {
        refBuns.current.scrollIntoView()
        handleTab("bun");
    }
    const scrollSauces = () => {
        refSauces.current.scrollIntoView()
        handleTab("sauce");
    }
    const scrollMains = () => {
        refMains.current.scrollIntoView()
        handleTab("main");
    }
    //Обработка скролинга для реакции табов
    const handleScroll = () => {
        const bunsDis = refBuns.current.getBoundingClientRect().top - refContainer.current.getBoundingClientRect().top
        const saucesDis = refSauces.current.getBoundingClientRect().top - refContainer.current.getBoundingClientRect().top
        switch (true) {
            case (bunsDis >= bunsLimit):
                handleTab("bun");
                break;
            case (saucesDis >= sauceLimit):
                handleTab("sauce");
                break;
            case (saucesDis < sauceLimit):
                handleTab("main");
                break;
            default:
        }
    }
    const handleTab = (tabName) => {
        dispatch({
            type: INGREDIENT_ACTIVATE_TAB,
            item: tabName
        })
    }

    const handleOpen = (e) => {
        dispatch({
            type: INGREDIENT_MODAL,
        })
        dispatch({
            type: INGREDIENTS_DETAILS,
        })
    }

    return (
        <>
            {ingredientsRequest && !ingredientsError && (<h1>Идет загрузка...</h1>)}
            {ingredientsError && !ingredientsRequest && (<h1>Произошла ошибка попробуйте позже</h1>)}
            {!ingredientsError && !ingredientsRequest && ingredients.length > 0 && (
                <section className={style.burger_content + ' pt-10 pb-10'}>
                    <h1 className='text text_type_main-large'>Соберите бургер</h1>
                    <div style={{display: 'flex'}} className='mt-5'>
                        <Tab value="one" active={currentTab === 'bun'} onClick={scrollBuns}>
                            Булки
                        </Tab>
                        <Tab value="two" active={currentTab === 'sauce'} onClick={scrollSauces}>
                            Соусы
                        </Tab>
                        <Tab value="three" active={currentTab === 'main'} onClick={scrollMains}>
                            Начинки
                        </Tab>
                    </div>
                    <div ref={refContainer}
                         className={style.overflow}
                         onScroll={handleScroll}>
                        <div>
                            <p ref={refBuns}
                               className={style.headers + 'text text_type_main-medium'}>
                                Булки
                            </p>
                            <ul className={style.ul_groups}>
                                {
                                    dataBuns.map((item) => (
                                        <IngredientCard key={item._id} data={item} onOpen={handleOpen}/>
                                    ))
                                }
                            </ul>
                        </div>
                        <div>
                            <p ref={refSauces}
                               className={style.headers + 'text text_type_main-medium'}>
                                Соусы
                            </p>
                            <ul className={style.ul_groups}>
                                {
                                    dataSauces.map((item) => (
                                        <IngredientCard key={item._id} data={item} onOpen={handleOpen}/>
                                    ))
                                }
                            </ul>
                        </div>
                        <div>
                            <p ref={refMains}
                               className={style.headers + 'text text_type_main-medium'}>
                                Начинки
                            </p>
                            <ul className={style.ul_groups}>
                                {
                                    dataMains.map((item) => (
                                        <IngredientCard key={item._id} data={item} onOpen={handleOpen}/>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </section>)}
        </>
    );
}

export default BurgerIngredients;

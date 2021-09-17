import {React, useRef, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-ingredients.module.css'
import IngredientCard from "./ingredient-card/ingredient-card";
import {bunsLimit, sauceLimit} from "../../utils/config";
import PropTypes from "prop-types";
import {ingredients_model} from "../../models/common_models";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";


const BurgerIngredients = (props) => {

    const [current, setCurrent] = useState('start')
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState({});

    let data_buns = props.data.filter((buns) => buns.type === "bun");
    let data_sauces = props.data.filter((sauce) => sauce.type === "sauce");
    let data_mains = props.data.filter((main) => main.type === "main");


    const refBuns = useRef(null)
    const refSauces = useRef(null)
    const refMains = useRef(null)
    const refContainer = useRef(null)

    const scrollBuns = () => {
        refBuns.current.scrollIntoView()
        setCurrent("start")
    }

    const scrollSauces = () => {
        refSauces.current.scrollIntoView()
        setCurrent("second")
    }

    const scrollMains = () => {
        refMains.current.scrollIntoView()
        setCurrent('third')
    }


    const handleScroll = () => {
        const bunsDis = refBuns.current.getBoundingClientRect().top - refContainer.current.getBoundingClientRect().top
        const saucesDis = refSauces.current.getBoundingClientRect().top - refContainer.current.getBoundingClientRect().top

        switch (true) {
            case (bunsDis >= bunsLimit):
                setCurrent("start")
                break;
            case (saucesDis >= sauceLimit):
                setCurrent("second");
                break;
            case (saucesDis < sauceLimit):
                setCurrent('third')
                break;
            default:
        }
    }

    const handleClose =() => {
        setModal(false);
    }
    const handleOpen = (e) => {
        const target = e.currentTarget;
        const id = target.getAttribute('id');
        setModalData(props.data.find((item) => item._id === id));
        setModal(true);
    }

    return (
        <section className={style.burger_content + ' pt-10 pb-10'}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <div style={{display: 'flex'}} className='mt-5'>
                <Tab value="one" active={current === 'start'} onClick={scrollBuns}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'second'} onClick={scrollSauces}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'third'} onClick={scrollMains}>
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
                            data_buns.map((item) => (
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
                            data_sauces.map((item) => (
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
                            data_mains.map((item) => (
                                <IngredientCard key={item._id} data={item} onOpen={handleOpen}/>
                            ))
                        }
                    </ul>
                </div>
            </div>
            {modal &&
            modalData &&
            (<Modal onClose={handleClose} caption={'Детали ингредиента'}>
                    <IngredientDetails data={modalData}/>
             </Modal>)
            }
        </section>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredients_model.isRequired).isRequired
}
export default BurgerIngredients;

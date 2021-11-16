import React from 'react';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

const HomePage = () => {
    return (
        <>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </>
    )
}

export default HomePage;

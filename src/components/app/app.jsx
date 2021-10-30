import style from './app.module.css';
import Header from '../app-header/app-header';
import React from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
// import ErrorBoundary from "../error-boundary/error-boundary";


const App = () => {
    return (
        <div className={style.wrapper}>
            {/*Надо на продакшен оставлять такой обработчик ошибок*/}
            {/*<ErrorBoundary>*/}
            <Header/>
            <div className={style.container}>
                <main className={style.content_body}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </main>}
            </div>
            {/*</ErrorBoundary>*/}
        </div>
    );
}

export default App;

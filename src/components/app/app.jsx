import style from './app.module.css';
import Header from '../app-header/app-header';
import {API_URL, BUNS, IDS} from "../../utils/config";
import React from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ErrorBoundary from "../error-boundary/error-boundary";


const App = () => {
    const [state, setState] = React.useState({isLoading: false, hasError: false, data: []})
    React.useEffect(() => {
        const getApiData = async () => {
            setState(prevState => ({...prevState, data: prevState.data}));
            await fetch(API_URL)
            setState(prevState => ({...prevState, isLoading: true, hasError: false, data: prevState.data}));
            await fetch(API_URL)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                    return Promise.reject(`Произошла ошибка: ${res.status}`);
                })
                .then((res) => setState(prevState => ({
                    ...prevState,
                    data: res.data,
                    isLoading: false,
                    hasError: false
                })))
                .catch(() => {
                    setState(prevState => ({...prevState, hasError: true, isLoading: false, data: prevState.data}));
                });
        }
        getApiData();
    }, [])

    return (
        <div className={style.wrapper}>
            {/*Надо на продакшен оставлять такой обработчик ошибок*/}
            <ErrorBoundary>
            <Header/>
            <div className={style.container}>
                {state.isLoading && 'Загрузка...'}
                {state.hasError && 'Произошла ошибка'}
                {!state.isLoading &&
                !state.hasError &&
                state.data.length &&
                <main className={style.content_body}>
                    <BurgerIngredients data={state.data}/>
                    <BurgerConstructor data={state.data} ids={IDS} buns={BUNS}/>
                </main>}
            </div>
            </ErrorBoundary>
        </div>
    );
}

export default App;

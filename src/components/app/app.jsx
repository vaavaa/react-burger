import style from './app.module.css';
import Header from '../app-header/app-header';
import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import {
    HomePage,
    LoginPage,
    NotFound404Page,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage,
    RestorePasswordPage
} from "../../pages";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import {getIngredientsFromServer, INGREDIENT_MODAL_REMOVE} from "../../services/actions/burger-ingredients";
import {useDispatch, useSelector} from "react-redux";
import ProtectedRoute from "../protected-route/protected-route";
import Modal from "../modal/modal";

const App = () => {

    const dispatch = useDispatch();
    const {ingredients} = useSelector(state => state.burgerIngredients)
    const [background, setBackground] = useState(false);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (ingredients.length <= 0) {
            dispatch(getIngredientsFromServer());
        }
    }, [dispatch, ingredients.length]);


    useEffect(() => {
        //Любой ввод пути, в строке браузера : переход по ссылке
        let background = history.action === 'PUSH' && location.state && location.state.background;
        if (location.state){
            if (location.state.hasOwnProperty('background')) {
                //Костыль!
                //TODO узнать как сделать нормально
                background = location.state.background;
            }
        }
        setBackground(background);
    }, [location.state, history.action]);


    const handleClose = () => {
        dispatch({
            type: INGREDIENT_MODAL_REMOVE

        });
        history.push("/");
    }

    return (
        <div className={style.wrapper}>
            <Header/>
            <div className={style.container}>
                <main className={style.content_body}>
                    <Switch location={background || location}>
                        <Route path="/" exact={true}>
                            <HomePage/>
                        </Route>
                        <Route path="/login" exact={true}>
                            <LoginPage/>
                        </Route>
                        <Route path={"/register"} exact={true}>
                            <RegisterPage/>
                        </Route>
                        <Route path={"/forgot-password"} exact={true}>
                            <RestorePasswordPage/>
                        </Route>
                        <Route path={"/reset-password"} exact={true}>
                            <ResetPasswordPage/>
                        </Route>
                        <Route path={"/ingredients/:id"} exact={true} children={<IngredientDetails/>}/>
                        <ProtectedRoute path={"/user-profile"} exact={true}>
                            <ProfilePage/>
                        </ProtectedRoute>
                        <Route>
                            <NotFound404Page/>
                        </Route>
                    </Switch>
                    {background && <Route path="/ingredients/:id" children={
                        <Modal onClose={handleClose} caption={'Детали ингредиента'}>
                            <IngredientDetails/>
                        </Modal>
                    }/>}
                </main>
            </div>
        </div>
    );
}
export default App;

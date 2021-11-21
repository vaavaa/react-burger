import style from './app.module.css';
import Header from '../app-header/app-header';
import React, {useEffect} from "react";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import ProtectedRoute from "../protected-route/protected-route";
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
import {
    getIngredientsFromServer,
    INGREDIENT_MODAL,
    INGREDIENT_MODAL_REMOVE
} from "../../services/actions/burger-ingredients";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../modal/modal";

const App = () => {

    const dispatch = useDispatch();
    const {ingredients, modalBit} = useSelector(state => state.burgerIngredients)
    useEffect(() => {
        if (ingredients.length <= 0) {
            dispatch(getIngredientsFromServer());
        }
    }, [dispatch, ingredients.length]);

    const history = useHistory();
    const location = useLocation();

    const handleClose = () => {
        dispatch({
            type: INGREDIENT_MODAL_REMOVE
        });
        history.push("/");
    }

    const checkModalBit = () => {
        if (!modalBit) {
            dispatch({
                type: INGREDIENT_MODAL
            });
        }
        return modalBit;
    }


    //Любой ввод пути, в строке браузера : переход по ссылке
    const background = history.action === 'PUSH' && location.state && location.state.background;
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
                        <Route path={"/ingredients/:id"} exact={true}>
                            {checkModalBit}
                        </Route>
                        <ProtectedRoute path={"/user-profile"} exact={true}>
                            <ProfilePage/>
                        </ProtectedRoute>
                        <Route>
                            <NotFound404Page/>
                        </Route>
                    </Switch>
                </main>
                {modalBit &&
                (<Modal onClose={handleClose} caption={'Детали ингредиента'}>
                    <IngredientDetails/>
                </Modal>)
                }
            </div>
        </div>
    );
}
export default App;

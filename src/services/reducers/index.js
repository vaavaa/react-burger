import {combineReducers} from 'redux';
import {userReducer} from "./user";
import {burgerIngredientsReducer} from "./burger-ingredients";
import {constructorReducer} from "./burger-constructor";

export const rootReducer = combineReducers({
    userData: userReducer,
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: constructorReducer
});

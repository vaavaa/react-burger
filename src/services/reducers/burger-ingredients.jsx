import {
    INGREDIENT_ACTIVATE_TAB,
    INGREDIENT_MODAL,
    INGREDIENT_MODAL_REMOVE,
    INGREDIENTS_FAILED,
    INGREDIENTS_REQUEST,
    INGREDIENTS_SUCCESS,
    INGREDIENTS_DETAILS,
} from "../actions/burger-ingredients";
import {deleteCookie, setCookie} from "../../utils/utils";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientPopUp: false,
    currentTab: "bun",
    modalBit: false

};

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case INGREDIENTS_DETAILS : {
            setCookie('in_popup', action.ingredient, );
            return {
                ...state,
                ingredientPopUp: action.ingredient
            };
        }
        case INGREDIENTS_SUCCESS: {
            return {...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false};
        }
        case INGREDIENTS_FAILED: {
            return {...state, ingredientsFailed: true, ingredientsRequest: false};
        }
        case INGREDIENT_MODAL: {
            return {
                ...state,
                modalBit: true
            }
        }
        case INGREDIENT_MODAL_REMOVE: {
            deleteCookie('in_popup');
            return {
                ...state,
                modalBit: false
            }
        }
        case INGREDIENT_ACTIVATE_TAB: {
            return {
                ...state,
                currentTab: action.item
            }
        }
        default:
            return state;
    }
};

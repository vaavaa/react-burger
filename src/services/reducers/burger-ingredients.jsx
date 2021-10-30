import {
    INGREDIENT_MODAL,
    INGREDIENT_MODAL_REMOVE,
    INGREDIENTS_FAILED,
    INGREDIENTS_REQUEST,
    INGREDIENTS_SUCCESS
} from "../actions/burger-ingredients";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientDetails: {}
};

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
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
                ingredientDetails: action.item
            }
        }
        case INGREDIENT_MODAL_REMOVE: {
            return {
                ...state,
                ingredientDetails: {}
            }
        }
        default:
            return state;
    }
};

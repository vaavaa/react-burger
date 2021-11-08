import {
    CONSTRUCTOR_ADD_BUN,
    CONSTRUCTOR_ADD_INGREDIENT,
    CONSTRUCTOR_CLEARED,
    CONSTRUCTOR_MOVE_INGREDIENT,
    CONSTRUCTOR_REMOVE_INGREDIENT, MODAL_CLOSED, MODAL_OPENED,
    ORDER_CLEARED,
    ORDER_FAILED,
    ORDER_REQUEST,
    ORDER_SUCCESS
} from "../actions/burger-constructor";

const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,

    ingredients: [],
    bun: null,

    totalPrice: 0,
    modalBit: false
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true
            }
        case ORDER_SUCCESS:
            return {
                ...state,
                order: action.payload
            }
        case ORDER_FAILED:
            return {
                ...state,
                orderFailed: true
            }
        case ORDER_CLEARED:
            return {
                ...state,
                order: null
            }
        case CONSTRUCTOR_ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.item],
            }
        case CONSTRUCTOR_REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients.filter(item => item.uuid !== action.uuid)],
            }
        case CONSTRUCTOR_ADD_BUN:
            return {
                ...state,
                bun: action.item,
            }
        case CONSTRUCTOR_MOVE_INGREDIENT:
            let ingredients = [...state.ingredients];
            const dragCard = ingredients[action.dragIndex];
            ingredients.splice(action.dragIndex, 1);
            ingredients.splice(action.hoverIndex, 0, dragCard)
            return {
                ...state,
                ingredients: ingredients
            }
        case CONSTRUCTOR_CLEARED:
            return {
                ...state,
                ingredients: [],
                bun: null
            }
        case MODAL_CLOSED:
            return {
                ...state,
                order: null,
                ingredients: [],
                bun: null,
                modalBit: false
            }
        case MODAL_OPENED:
            return {
                ...state,
                modalBit: true
            }
        default:
            return state;
    }
}

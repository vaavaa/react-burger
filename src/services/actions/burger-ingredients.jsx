
import {getData} from "../../utils/server";
import {API_URL} from "../../utils/config";

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_SUCCESS = 'INGREDIENTS_SUCCESS';
export const INGREDIENTS_FAILED = 'INGREDIENTS_FAILED';
export const INGREDIENT_MODAL = 'INGREDIENT_MODAL';
export const INGREDIENT_MODAL_REMOVE = 'INGREDIENT_MODAL_REMOVE';

export const getIngredients = () => {
    return function (dispatch) {
        dispatch({
            type: INGREDIENTS_REQUEST
        })
        getData(API_URL)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`Error occurred: ${res.status}`);
            })
            .then(data => {
                if (data && data.success) {
                    dispatch({
                        type: INGREDIENTS_SUCCESS,
                        ingredients: data.data,
                    })
                } else {
                    dispatch({type: INGREDIENTS_FAILED})
                }
            })
            .catch(err => {
                console.log(err)
                dispatch({type: INGREDIENTS_FAILED})
            })
    }
}

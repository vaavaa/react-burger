import {POST_URL} from "../../utils/config";
import {setData} from "../../utils/server";


export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILED = 'ORDER_FAILED';
export const ORDER_CLEARED = 'ORDER_CLEARED';
export const MODAL_CLOSED = 'MODAL_CLOSED';
export const MODAL_OPENED = 'MODAL_OPENED';

export const CONSTRUCTOR_ADD_INGREDIENT = 'CONSTRUCTOR_ADD_INGREDIENT';
export const CONSTRUCTOR_REMOVE_INGREDIENT = 'CONSTRUCTOR_REMOVE_INGREDIENT';
export const CONSTRUCTOR_ADD_BUN = 'CONSTRUCTOR_ADD_BUN';
export const CONSTRUCTOR_MOVE_INGREDIENT = 'CONSTRUCTOR_MOVE_INGREDIENT';
export const CONSTRUCTOR_CLEARED = 'CONSTRUCTOR_CLEARED';


export const postOrderToServer = (ids) => {
    return function (dispatch) {
        dispatch({
            type: ORDER_REQUEST
        })
        dispatch({
            type: MODAL_OPENED
        })
        setData({
            url: POST_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {ingredients: ids}
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`Error occurred: ${res.status}`)
            })
            .then(res => {
                    if (res && res.success) {
                        dispatch({
                            type: ORDER_SUCCESS,
                            payload: res.order.number
                        })
                    } else {
                        dispatch({
                            type: ORDER_FAILED
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch({
                    type: MODAL_CLOSED
                })
            })
    }
}

import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";

//Подключаем DEVTOOLS
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

//Добавляем THUNK
const enhancer = composeEnhancers(applyMiddleware(thunk));

const stores = createStore(rootReducer, enhancer);
export default stores;

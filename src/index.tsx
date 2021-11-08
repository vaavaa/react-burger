import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Provider} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import stores from "./services/stores";

ReactDOM.render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <Provider store={stores}>
                <App/>
            </Provider>
        </DndProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

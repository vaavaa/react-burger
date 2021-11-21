import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Provider} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import stores from "./services/stores";
import {BrowserRouter as Router} from "react-router-dom";

// import ErrorBoundary from "../error-boundary/error-boundary"; <ErrorBoundary>    Надо на продакшен оставлять такой обработчик ошибок


ReactDOM.render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <Provider store={stores}>
                {/*forceRefresh={true} - не позволяет показать попап*/}
                <Router >
                    <App/>
                </Router>
            </Provider>
        </DndProvider>
    </React.StrictMode>,
    document.getElementById('root')
);


import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import React from "react";
import {Provider} from "react-redux";
import store from "./redux/redux-store";



// let rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />,
            </Provider>
        </BrowserRouter>, document.getElementById('root'));
// }

// rerenderEntireTree();

// store.subscribe(() => {
//     rerenderEntireTree();
// }
// )

// store.subscribe(rerenderEntireTree)
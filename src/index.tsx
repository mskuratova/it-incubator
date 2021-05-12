import store, {RootStateType, StoreType} from './redux/state'
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import React from "react";



let rerenderEntireTree = (state: RootStateType) => {
    console.log(state)
    ReactDOM.render(
        <BrowserRouter>
            <App state={state} dispatch={store.dispatch.bind(store)} />,
        </BrowserRouter>, document.getElementById('root'));
}

rerenderEntireTree(store.getState());



// @ts-ignore
store.subscribe(rerenderEntireTree)
import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import {
    AddMessageActionType,
    AddPostActionType,
    ChangeNewTextActionType, ProfilePageType,
    RootStateType, SendMessageActionType, StoreType
} from "./redux/store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Users from "./components/Users/Users";
import UsersContainer from "./components/Users/UsersContainer";

 export type AppPropsType = {
     store: StoreType;
     state?: RootStateType,
     dispatch?:(action:AddPostActionType |ChangeNewTextActionType|AddMessageActionType| SendMessageActionType) => void
}
const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={ () => <DialogsContainer/> }/>
                    <Route  path='/profile'
                            render={ () => <Profile />} />
                    <Route path='/user'
                           render={ () => <UsersContainer /> } />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

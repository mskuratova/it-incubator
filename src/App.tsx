import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route} from 'react-router-dom';
import {
    AddMessageActionType,
    AddPostActionType,
    ChangeNewTextActionType,
    RootStateType, SendMessageActionType, StoreType
} from "./redux/store";

import ProfileContainer from "./components/Profile/ProfileInfo/ProfileInfoContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersAPIComponent from "./components/Users/UsersAPIComponent";
import Login from "./components/Login/Login";
import DialogsContainer from './components/Dialogs/DialogsContainer';


 export type AppPropsType = {
     store: StoreType;
     state?: RootStateType,
     dispatch?:(action:AddPostActionType |ChangeNewTextActionType|AddMessageActionType| SendMessageActionType) => void
}
const App = () => {

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                            render={
                                () => <DialogsContainer/> }
                    />
                    <Route  path='/profile/:userId?'
                            render={
                                () => <ProfileContainer />}
                    />
                    <Route path='/users'
                            render={ () => <UsersAPIComponent /> }
                    />
                    <Route path='/login'
                           render={ () => <Login /> } />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route} from 'react-router-dom';
import {
    AddMessageActionType,
    AddPostActionType,
    ChangeNewTextActionType, ProfilePageType,
    RootStateType, SendMessageActionType, StoreType
} from "./redux/store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from './components/Users/delete/UsersContainer';
import ProfileContainer from "./components/Profile/ProfileInfo/ProfileInfoContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersAPIComponent from "./components/Users/UsersAPIComponent";
import Login from "./components/Login/Login";

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
                                // @ts-ignore
                                () => <DialogsContainer/> }
                    />
                    <Route  path='/profile/:userId?'
                            render={
                                // @ts-ignore
                                () => <ProfileContainer />}
                    />
                    <Route path='/users'
                            render={
                                // @ts-ignore
                                () => <UsersAPIComponent /> }
                    />
                    <Route path='/login'
                           render={ () => <Login /> } />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

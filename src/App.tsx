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
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from "./components/Profile/ProfileInfo/ProfileInfoContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

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
                           render={ () => <DialogsContainer/> }/>
                    <Route  path='/profile/:userId?'
                            render={ () => <ProfileContainer />} />
                    <Route path='/users'
                           render={ () => <UsersContainer /> } />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

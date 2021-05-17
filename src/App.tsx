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
    ChangeNewTextActionType,
    RootStateType, SendMessageActionType
} from "./redux/store";

 export type AppPropsType = {
    state: RootStateType,
     dispatch:(action:AddPostActionType |ChangeNewTextActionType|AddMessageActionType| SendMessageActionType) => void
}

const App:React.FC<AppPropsType> = (props: AppPropsType ) => {
     const state = props.state;

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={ () => <Dialogs dialogsPage={state.dialogsPage}
                                                                    dispatch={props.dispatch}/> }/>
                    <Route  path='/profile' render={ () => <Profile profilePage={state.profilePage}
                                                                    dispatch={props.dispatch}/> } />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

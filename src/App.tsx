import React, {Component} from 'react';
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
import {connect} from "react-redux";
import {initializeApp, InitialSateType} from "./redux/app-reducer";
import {Preloader} from "./components/common/Preloader/Preloader";
import {getAuthUserData} from "./redux/auth-reducer";

export type AppPropsType = {
    store: StoreType;
    state?: RootStateType,
    dispatch?: (action: AddPostActionType | ChangeNewTextActionType | AddMessageActionType | SendMessageActionType) => void
    initializeApp: () => Promise<any>
}

class App extends Component<any, AppPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
        // intializeApp();
    }

    render() {
        // if (!this.props.initialized) {
        //     return <Preloader/>
        // }
        return (
            <BrowserRouter>
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs'
                               render={
                                   () => <DialogsContainer/>}
                        />
                        <Route path='/profile/:userId?'
                               render={
                                   () => <ProfileContainer/>}
                        />
                        <Route path='/users'
                               render={() => <UsersAPIComponent/>}
                        />
                        <Route path='/login'
                               render={() => <Login/>}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

type StateType = {
    app: {
        initialized: boolean | null,
    }
}
const mapStateToProps = (state: StateType) => ({
    initialized: state.app.initialized
})


export default connect(mapStateToProps, {getAuthUserData})(App);

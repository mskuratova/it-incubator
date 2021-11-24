import React from "react";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";


export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<any, any> {

        render() {
            if (!this.props.isAuth)
             return <Redirect to="/login" />

            return <Component {...this.props}/>
        }
    }

    function mapStateToProps(state: AppStateType) {
        return {
            isAuth: state.auth.isAuth
        }
    }


    return connect(mapStateToProps, {})(RedirectComponent);
}
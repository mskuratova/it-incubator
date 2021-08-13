import React from "react";
import {Redirect} from "react-router-dom";


export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<any, any> {
        // @ts-ignore
        render() {
            if (!this.props.isAuth) return
            // <Redirect to={"/login"}/>

            return
            // <Comment {...this.props}/>
        }
    }

    return RedirectComponent;
}
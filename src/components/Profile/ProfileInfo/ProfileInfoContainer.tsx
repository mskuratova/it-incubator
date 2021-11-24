import React, {ComponentType} from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom"
import Profile from "../Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../../redux/profile-reducer";
import {compose} from "redux";
import {AppStateType} from "../../../redux/redux-store";

type PathParamsType = {
   userId: string
}
type PropsType = RouteComponentProps<PathParamsType>

type MapStatePropsType ={
    profile: any
    isAuth: boolean
    status: string
}
type MapDispatchPropsType = {
    getUserProfile: (userId:number) =>void
    getStatus: (userId: number) => void
    updateStatus:(status: string) => void

}
type OwnPropsType =  PropsType & MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component< OwnPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 8+""
        }
        this.props.getUserProfile(+userId)
        this.props.getStatus(+userId)
    }

    render() {

        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} status ={this.props.status} updateStatus = {this.props.updateStatus}/>
            </div>
        )
    }
}


let mapStateToProps = (state:AppStateType):MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status
})

export default compose<ComponentType>(
    withRouter,
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,{getUserProfile, getStatus, updateStatus}),
)(ProfileContainer)


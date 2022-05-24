import React, {ComponentType} from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom"
import Profile from "../Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, savePhoto} from "../../../redux/profile-reducer";
import {compose} from "redux";
import {AppStateType} from "../../../redux/redux-store";

type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType>

type MapStatePropsType = {
    profile: any
    isAuth: boolean
    status: string
    userId: string | null
}
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void

}
type OwnPropsType = PropsType & MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<OwnPropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.userId + ""
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(+userId)
        this.props.getStatus(+userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<OwnPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }


    }

    render() {

        return (
            <div>
                <Profile {...this.props}
                         isOwner = {!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         savePhoto ={this.props.savePhoto}
                />
            </div>
        )
    }
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,
    userId: state.auth.userId
})

export default compose<ComponentType>(
    withRouter,
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus,
        savePhoto
    }),
)(ProfileContainer)


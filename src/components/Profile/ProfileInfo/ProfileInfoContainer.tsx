import React from 'react';
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom"
import Profile from "../Profile";
import {connect} from "react-redux";
import {RootStateType} from "../../../redux/store";
import {getUserProfile} from "../../../redux/profile-reducer";
import ProfileInfoContainer from "./ProfileInfoContainer";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";

type PathParamsType = {
   userId: string
}
type PropsType = RouteComponentProps<PathParamsType>

type MapStatePropsType ={
    profile: any
    isAuth: boolean
}
type MapDispatchPropsType = {
    getUserProfile: (userId:number) =>void
}
type OwnPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<any, OwnPropsType> {

    componentDidMount() {
        let userId = 3
        // this.props.match.params.userId;
        if(!userId) {userId=8}
        this.props.getUserProfile(userId)
    }

    render() {
        {
            console.log(this.props)
        }
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

let mapStateToProps = (state:any):MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

export default compose(connect(mapStateToProps,{getUserProfile}), withRouter, withAuthRedirect)(ProfileContainer)
// let AuthRedirectComponent =
//     // withAuthRedirect(ProfileInfoContainer)
//     (props: any) => {
//     if(!props.isAuth) return <Redirect to={"/login"}/>
//     return <ProfileInfoContainer {...props}/>
// }


// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
// export default connect<MapStatePropsType, MapDispatchPropsType, {} , RootStateType>(
//     mapStateToProps,{getUserProfile}
// )(ProfileContainer);

import React from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom"
import Profile from "../Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../../redux/profile-reducer";
import {RootStateType} from "../../../redux/store";

type PathParamsType = {
   userId: string
}
type PropsType = RouteComponentProps<PathParamsType>

type MapStatePropsType ={
    profile: any
}
type MapDispatchPropsType = {
    setUserProfile: (profile:any) =>void
}
type OwnPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<any, OwnPropsType> {

    componentDidMount() {
        let userId = "8"
            // this.props.match.params.userId;

        if(!userId) {userId='2'}
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+userId)
            .then(response => {
                this.props.setUserProfile(response.data)
            });
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

let mapStateToProps = (state:RootStateType):MapStatePropsType => ({
    profile: state.profilePage.profile
})
// @ts-ignore
let WithUrlDataContainerComponent = withRouter(ProfileContainer);
export default connect<MapStatePropsType, MapDispatchPropsType, {} , RootStateType>(
    mapStateToProps,{setUserProfile}
)(ProfileContainer);

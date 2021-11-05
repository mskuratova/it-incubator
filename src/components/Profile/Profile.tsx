import React, {ReactNode} from 'react';
import classes from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {
    AddMessageActionType,
    AddPostActionType,
    ChangeNewTextActionType,
    ProfilePageType, RootStateType,
    SendMessageActionType, StoreType
} from "../../redux/store";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";

type ProfileType = {
    // profilePage: ProfilePageType,
    // addPosts?: (postMessage: string) => void
    // updateNewPostText?: (newText: string) => void
    // dispatch: (action: AddPostActionType | ChangeNewTextActionType | AddMessageActionType | SendMessageActionType) => void
    profile: any

}

const Profile = (props: any) => {

    return (
        <div className={classes.content}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;

// posts = {props.profilePage.posts} newPostText ={props.profilePage.newPostText} dispatch = {props.dispatch}/>

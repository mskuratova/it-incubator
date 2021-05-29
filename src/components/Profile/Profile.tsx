import React from 'react';
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
    profilePage: ProfilePageType,
    addPosts?: (postMessage: string) => void
    updateNewPostText?:(newText:string) => void
    dispatch:(action:AddPostActionType |ChangeNewTextActionType|AddMessageActionType| SendMessageActionType) => void


}

const Profile = () => {
    //let myPostsElements = props.profilePage.posts.map((p) => <MyPosts posts={p.message}/>);

    return (

        <div className={classes.content}>
            <ProfileInfo/>

            <MyPostsContainer/>
                                    </div>
    )
};
export default Profile;

// posts = {props.profilePage.posts} newPostText ={props.profilePage.newPostText} dispatch = {props.dispatch}/>

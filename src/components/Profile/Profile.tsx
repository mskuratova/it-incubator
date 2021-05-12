import React from 'react';
import classes from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {
    AddMessageActionType,
    AddPostActionType,
    ChangeNewTextActionType,
    ProfilePageType,
    SendMessageActionType
} from "../../redux/state";

type ProfileType = {
    profilePage: ProfilePageType,
    addPosts?: (postMessage: string) => void
    updateNewPostText?:(newText:string) => void
    dispatch:(action:AddPostActionType |ChangeNewTextActionType|AddMessageActionType| SendMessageActionType) => void


}

const Profile = (props: ProfileType) => {
    //let myPostsElements = props.profilePage.posts.map((p) => <MyPosts posts={p.message}/>);
    // @ts-ignore
    return (

        <div className={classes.content}>
            <ProfileInfo/>

            <MyPosts posts={props.profilePage.posts}
                     newPostText= {props.profilePage.newPostText}
                     dispatch={props.dispatch}/>
        </div>
    )
};
export default Profile;
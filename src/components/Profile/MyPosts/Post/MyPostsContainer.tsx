import React from 'react';
import {addPostActionCreator} from "../../../../redux/profile-reducer";
import {AddPostActionType, ChangeNewTextActionType, PostType, RootStateType, StoreType} from "../../../../redux/store";
import MyPosts from "../MyPosts";
import {connect} from "react-redux";

type MessageType = {
    posts: PostType[]
    newPostText: string
    dispatch: (action: { type: string; newTex: string }) => void
}
type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    dispatch: (action: (postText: string) => AddPostActionType) => void
}

const mapStateToProps = (state:RootStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch:(action:AddPostActionType | ChangeNewTextActionType) => void) => {
    return {
        addPosts: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}

// @ts-ignore
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer
import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../redux/profile-reducer";
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

// const MyPostsContainer: any = (props:any) => {
//     let state = props.store.getState();
//
//     let addPostHandler:() => void = () => {
//         props.store.dispatch(addPostActionCreator);
//     }
//
//
//     let onPostChange = (text: string) => {
//         let action = updateNewPostTextActionCreator(text);
//         props.store.dispatch(action);
//     }
//
//     return (
//       <MyPosts posts={state.profilePage.posts} addPosts={addPostHandler} updateNewPostsText={onPostChange} newPostText={state.profilePage.newPostText}/>)
//
// };

const mapStateToProps = (state:RootStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch:(action:AddPostActionType | ChangeNewTextActionType) => void) => {
    return {
        updateNewPostsText: (text:string) => {
            dispatch(updateNewPostTextActionCreator(text))
        },
        addPosts: () => {
            dispatch(addPostActionCreator());
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer
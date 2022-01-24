import {
    AddPostActionType,
    ChangeNewTextActionType, DeletePostActionType,
    PostType,
    ProfilePageType,
    SetStatusActionType,
    SetUserProfileActionType
} from "./store";
import {Dispatch} from "redux";
import {profileAPI, userAPI} from "../api/api";

type ActionsType = ChangeNewTextActionType | AddPostActionType | SetUserProfileActionType | SetStatusActionType | DeletePostActionType

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'My posts?', likesCount: 11}],
    // newPostText: "it-kamasutra",
    profile: null,
    status: "Hi!"

};
export type InitialSateType = typeof initialState;

const profileReducer = (state: ProfilePageType = initialState, action: ActionsType): InitialSateType => {
    switch (action.type) {
        case 'ADD-POST' : {
            let newPost: PostType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                // newPostText:''
            } as InitialSateType
        }
        case 'SET_STATUS' : {
            return {
                ...state,
                status: action.status
            } as InitialSateType
        }
        case "SET-USER-PROFILE": {
            return {
                status: "",
                ...state, profile: action.profile
            }
        }
        case "DELETE-POST":{
            return {...state,
                 posts: state.posts.filter(p => p.id != action.postId)
            }as InitialSateType
        }

        default:
            return state as InitialSateType;
    }
}


export const addPostActionCreator = (newPostText: string): AddPostActionType => {
    return {type: "ADD-POST", newPostText}
}

export const setStatusActionCreator = (status: string): SetStatusActionType => {
    return {type: "SET_STATUS", status}
}
export const setUserProfile = (profile: any): SetUserProfileActionType => {
    return {type: "SET-USER-PROFILE", profile}
}
export const deletePost = (postId: number): DeletePostActionType => {
    return {type: "DELETE-POST", postId}
}
export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    userAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    });
}
export const getStatus = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatusActionCreator(response.data))
    });
}
export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0)  {
            dispatch(setStatusActionCreator(status))
        }
    });
}

export default profileReducer;
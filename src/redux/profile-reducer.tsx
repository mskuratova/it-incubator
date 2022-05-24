import {
    AddPostActionType,
    ChangeNewTextActionType, DeletePostActionType,
    PostType,
    ProfilePageType, SavePhotoActionType,
    SetStatusActionType,
    SetUserProfileActionType
} from "./store";
import {Dispatch} from "redux";
import {profileAPI, userAPI} from "../api/api";
import any = jasmine.any;

type ActionsType = ChangeNewTextActionType | AddPostActionType | SetUserProfileActionType | SetStatusActionType | DeletePostActionType | SavePhotoActionType

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'My posts?', likesCount: 11}],
    // newPostText: "it-kamasutra",
    profile: {
        photos: any
    },
    // status: "Hi!"

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
                // status: "",
                ...state, profile: action.profile
            }
        }
        case "DELETE-POST":{
            return {...state,
                 posts: state.posts.filter(p => p.id != action.postId)
            }as InitialSateType
        }
        case "SAVE-PHOTO-SUCCESS":{
            return {...state,
                profile: {...state.profile, photos: action.photos}}
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
export const savePhotoSuccess = (photos: any): SavePhotoActionType => {
    return {type: "SAVE-PHOTO-SUCCESS", photos}
}
export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    let response = await userAPI.getProfile(userId);
        dispatch(setUserProfile(response.data));
}
export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
   let response =  await profileAPI.getStatus(userId);
        dispatch(setStatusActionCreator(response.data));
}
export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0)  {
            dispatch(setStatusActionCreator(status))
        }
}
export const savePhoto = (file: any) => async (dispatch: Dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0)  {
        dispatch(savePhotoSuccess(response.data.photos))
    }
}

export default profileReducer;
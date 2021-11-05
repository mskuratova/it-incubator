import {
    AddPostActionType,
    ChangeNewTextActionType,
    PostType,
    ProfilePageType,
    SendMessageActionType, SetStatusActionType,
    SetUserProfileActionType
} from "./store";
import {Dispatch} from "redux";
import {profileAPI, userAPI} from "../api/api";

type ActionsType = ChangeNewTextActionType | AddPostActionType | SetUserProfileActionType | SetStatusActionType

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'My posts?', likesCount: 11}],
    newPostText: "it-kamasutra",
    profile: null,
    status: "Hi!"

};
export type InitialSateType = typeof initialState;

const profileReducer = (state: ProfilePageType = initialState, action: ActionsType): InitialSateType => {
    switch (action.type) {
        case 'ADD-POST' : {
            let newPost: PostType = {
                id: 2,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            } as InitialSateType
        }
        case 'UPDATE-NEW-POST-TEXT' : {
            return {
                ...state,
                newPostText: action.newText
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

        default:
            return state as InitialSateType;
    }
}


export const addPostActionCreator = (): AddPostActionType => {
    return {
        type: "ADD-POST"
    }
}

export const updateNewPostTextActionCreator = (text: string): ChangeNewTextActionType => {
    return {type: "UPDATE-NEW-POST-TEXT", newText: text}
}
export const setStatusActionCreator = (status: string): SetStatusActionType => {
    return {type: "SET_STATUS", status}
}
export const setUserProfile = (profile: any): SetUserProfileActionType => {
    return {type: "SET-USER-PROFILE", profile}
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
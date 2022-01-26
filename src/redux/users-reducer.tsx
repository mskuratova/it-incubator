import {
    FollowActionType,
    UnfollowActionType
} from "./store";
import {userAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import React from "react";
import {updateObjectInArray} from "../utils/object-helpers";

export type UserType = {
    id: number
    photos: string
    followed: boolean
    name: string
    status: string
    location: { city: string, country: string }
}

type ActionsType =
    FollowActionType
    | UnfollowActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | ToggleIsFetchingActionType
    | ToggleIsFollowingProgressActionType

let initialState = {
    users: [
        {
            id: 1,
            photos: "",
            followed: false,
            name: 'Dmitry',
            status: 'I am a boos',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: 2,
            photos: "",
            followed: true,
            name: 'Sasha',
            status: 'I am a boos too',
            location: {city: 'Moscow', country: 'Russia'}
        },
        {
            id: 3,
            photos: "",
            followed: false,
            name: 'Andrew',
            status: 'I am a boos too',
            location: {city: 'Kiev', country: 'Ukraine'}
        },
    ],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};
export type InitialSateType = typeof initialState;
export type SetUsersActionType = {
    type: "SET-USERS"
    users: UserType []
}
export type SetCurrentPageActionType = {
    type: "SET-CURRENT-PAGE"
    currentPage: number
}
export type SetTotalUsersCountActionType = {
    type: "SET-TOTAL-USERS-COUNT"
    count: number
}
export type ToggleIsFetchingActionType = {
    type: "TOGGLE-IS-FETCHING"
    ifFetching: boolean
}
export type ToggleIsFollowingProgressActionType = {
    type: "TOGGLE-IS-FOLLOWING-PROGRESS"
    ifFetching: boolean
    userId: number
}


const usersReducer = (state: InitialSateType = initialState, action: ActionsType): InitialSateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
            }
        case "SET-USERS":
            return {...state, users: [ ...action.users]}
        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET-TOTAL-USERS-COUNT":
            return {...state, totalUserCount: action.count}
        case "TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.ifFetching}
        }
        case "TOGGLE-IS-FOLLOWING-PROGRESS": {
            return {
                ...state,
                // @ts-ignore
                 followingInProgress: action.ifFetching
                     ? [...state.followingInProgress, action.userId]
                     : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}
export const followSuccess = (userID: number): FollowActionType => ({type: "FOLLOW", userID})
export const unfollowSuccess = (userID: number): UnfollowActionType => ({type: "UNFOLLOW", userID})
export const setUsers = (users: UserType) => ({type: "SET-USERS", users})
export const setCurrentPage = (currentPage: number) => ({type: "SET-CURRENT-PAGE", currentPage})
export const setTotalUsersCount = (totalUserCount: number) => ({type: "SET-TOTAL-USERS-COUNT", count: totalUserCount})
export const toggleIsFetching = (isFetching: boolean) => ({type: "TOGGLE-IS-FETCHING", isFetching})
export const toggleIsFollowingProgress = (isFetching: boolean, userId: React.Key | null | undefined) => ({type: "TOGGLE-IS-FOLLOWING-PROGRESS", isFetching, userId})

export const requestUsersThunkCreator =(page:number, PageSize:number ) => {
    return async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    let data = await userAPI.getUser(page, PageSize);
    // { items: UserType; totalCount: number; }) => {
       dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
}}
export const followUnfollowFlow = async (dispatch:Dispatch, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch (toggleIsFollowingProgress(true, userId))
    let response = await apiMethod(userId);

    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}

export const follow =(userId:number): ThunkAction<void, AppStateType, unknown, ActionsType> => {
    return async (dispatch: Dispatch) => {
        followUnfollowFlow(dispatch,userId,userAPI.follow.bind(userAPI), followSuccess);
}}
export const unfollow =(userId:number): ThunkAction<void, AppStateType, unknown, ActionsType> => {
    return async (dispatch: Dispatch) => {
        let apiMethod = userAPI.unfollow.bind(userAPI);
        let actionCreator = unfollowSuccess;
        followUnfollowFlow(dispatch,userId,apiMethod, actionCreator)
}}

export default usersReducer;
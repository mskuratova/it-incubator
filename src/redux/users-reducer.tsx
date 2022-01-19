import {
    FollowActionType,
    UnfollowActionType
} from "./store";
import {userAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

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
}


const usersReducer = (state: InitialSateType = initialState, action: ActionsType): InitialSateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
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
                 // followingInProgress: action.ifFetching
                 //     ? [...state.followingInProgress, action.userID]
                 //     : state.followingInProgress.filter(id => id != action.userID)
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

export const getUsersThunkCreator =(page:number, PageSize:number ) => {
    return (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    userAPI.getUser(page, PageSize).then((data: { items: UserType; totalCount: number; }) => {
       dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    });
}}
export const follow =(userId:number): ThunkAction<void, AppStateType, unknown, ActionsType> => {
    return (dispatch: Dispatch) => {
      dispatch (toggleIsFollowingProgress(true, userId))
        userAPI.follow(userId)
            .then((response: { data: { resultCode: number; items: UserType; totalCount: number; }; }) => {
                if (response.data.resultCode == 0) {
                    dispatch(followSuccess(userId));
                }
                dispatch(toggleIsFollowingProgress(false, userId))
            });
}}
export const unfollow =(userId:number): ThunkAction<void, AppStateType, unknown, ActionsType> => {
    return (dispatch: Dispatch) => {
      dispatch (toggleIsFollowingProgress(true, userId))
        userAPI.unfollow(userId)
            .then((response: { data: { resultCode: number; items: UserType; totalCount: number; }; }) => {
                if (response.data.resultCode == 0) {
                    dispatch(unfollowSuccess(userId));
                }
                dispatch(toggleIsFollowingProgress(false, userId))
            });
}}

export default usersReducer;
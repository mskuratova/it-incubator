import {
    FollowActionType,
    UnfollowActionType
} from "./store";

export type UserType = {
    id: number
    photos: string
    followed: boolean
    name: string
    status: string
    location:{city: string, country: string}
}

type ActionsType = FollowActionType |UnfollowActionType | SetUsersActionType

let initialState = {
    users: [
        {id: 1, photos: "", followed: false, name: 'Dmitry', status: 'I am a boos', location: {city: 'Minsk', country: 'Belarus'}},
        {id: 2,photos: "", followed: true, name: 'Sasha', status: 'I am a boos too', location: {city: 'Moscow', country: 'Russia'}},
        {id: 3, photos: "", followed: false, name: 'Andrew', status: 'I am a boos too', location: {city: 'Kiev', country: 'Ukraine'}},
    ]
};
export type InitialSateType = typeof initialState;
export type SetUsersActionType = {
    type: "SET-USERS"
    users: UserType []
}

const usersReducer = (state:InitialSateType = initialState, action:ActionsType):InitialSateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userID) {
                        return { ...u, followed: true}
                    }
                    return u;
                })
            }
        case "UNFOLLOW":
            return {
            ...state,
                users: state.users.map( u => {
                    if (u.id === action.userID) {
                        return { ...u, followed: false}
                }
                return u;
            })
        }
        case "SET-USERS":
            return {...state, users: [...state.users, ...action.users]}

     default: return state;}
}
export const followAC =(userID:number):FollowActionType => ({ type: "FOLLOW", userID })
export const unfollowAC = (userID:number):UnfollowActionType => ({type: "UNFOLLOW", userID})
export const setUsersAC = (users:UserType) => ({type: "SET-USERS", users})

export default usersReducer;
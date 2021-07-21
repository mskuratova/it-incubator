import {
    AddPostActionType,
    ChangeNewTextActionType,
    PostType,
    ProfilePageType,
    SendMessageActionType, SetUserDataActionType,
    SetUserProfileActionType
} from "./store";

type InitialSateType = {
    userId: string,
    email: string,
    login: string,
    isFetching: boolean
    isAuth:boolean
}

let initialState = {
    userId: "2",
    email: "blabla@bla.bla",
    login: "samurai",
    isFetching: false,
    isAuth :false

};


const authReducer = (state: InitialSateType = initialState, action: any): InitialSateType => {
    switch (action.type) {
        case 'SET-USER-DATA' : {

            return {
                ...state,
                ...action.data,
                isAuth: true
            } as InitialSateType
        }

        default:
            return state as InitialSateType;
    }
}


export const SetUserDataActionCreator = (userId: number, email: string, login: string): SetUserDataActionType => {
    return {
        type: 'SET-USER-DATA',
        data: {userId, email, login}
    }
}


export default authReducer;
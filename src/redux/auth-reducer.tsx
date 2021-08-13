import {
    AddPostActionType,
    ChangeNewTextActionType,
    PostType,
    ProfilePageType,
    SendMessageActionType, SetUserDataActionType,
    SetUserProfileActionType
} from "./store";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";

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
export const getAuthUserData =() => (dispatch:Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0){
                let {id, login, email} = response.data.data;
               dispatch(SetUserDataActionCreator(id,email,login));
            }
        })

}

export default authReducer;
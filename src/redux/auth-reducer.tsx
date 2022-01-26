import {
    SetUserDataActionType
} from "./store";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

type InitialSateType = {
    userId: string | null,
    email: string | null,
    login: string | null,
    isFetching: boolean
    isAuth: boolean

}

let initialState = {
    userId: "2",
    email: "blabla@bla.bla",
    login: "samurai",
    isFetching: false,
    isAuth: false

};


const authReducer = (state: InitialSateType = initialState, action: any): InitialSateType => {
    switch (action.type) {
        case 'auth/SET-USER-DATA' : {

            return {
                ...state,
                ...action.data,
            } as InitialSateType
        }

        default:
            return state as InitialSateType;
    }
}


export const SetUserDataActionCreator = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataActionType => {
    return {
        type: 'auth/SET-USER-DATA',
        data: {userId, email, login, isAuth}
    }
}
export const getAuthUserData = () => async (dispatch: Dispatch): Promise<any> => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(SetUserDataActionCreator(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch<any>) => {
    let response = await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let action = stopSubmit("login", {email: "Email is wrong"});
        dispatch(action)
    }
}
export const logout = () => async (dispatch: Dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(SetUserDataActionCreator(null, null, null, false));
    }
}

export default authReducer;
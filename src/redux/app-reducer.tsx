import {
    SetInitializerActionType
} from "./store";
import {AnyAction, Dispatch} from "redux";
import {authAPI} from "../api/api";
import {getAuthUserData} from "./auth-reducer";

 export type InitialSateType = {
    initialized: boolean | null,
}

let initialState = {
    initialized: false
};


const appReducer = (state: InitialSateType = initialState, action: any): InitialSateType => {
    switch (action.type) {
        case 'SET-INITIALIZED' : {

            return {
                ...state,
                initialized: true,
            } as InitialSateType
        }

        default:
            return state as InitialSateType;
    }
}


export const SetInitializedActionCreator = (): SetInitializerActionType => {
    return {
        type: 'SET-INITIALIZED'}
    }

export const initializeApp =  (dispatch: Dispatch<any>) => {
     let promise = dispatch(getAuthUserData());
    // promise.then(() => {
        dispatch(SetInitializedActionCreator());
     // })

}

export default appReducer;
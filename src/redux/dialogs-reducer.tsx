import {AddMessageActionType, DialogPageType, SendMessageActionType} from "./store";

type ActionsType = SendMessageActionType | AddMessageActionType

const initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Viktor'},
        {id: 4, name: 'Sveta'},
        {id: 5, name: 'Sasha'}
    ],

    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
    ],
    newMessageBody:""
}

export type InitialSateType = typeof initialState;

const dialogsReducer = (state:DialogPageType = initialState,action:ActionsType) :InitialSateType => {

    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY':
            return  {...state, newMessageBody: action.body };
        case "SEND-MESSAGE":
            let body =state.newMessageBody;
            return {...state,
                newMessageBody: "" ,
                    messages: [...state.messages, {id: 6, message: body} ] };
        default: return state;
    }
}
export const sendMessageCreator =(messageText:string):SendMessageActionType => {
    return {
        type: "SEND-MESSAGE",
        newText:messageText
    }
}

export const updateNewMessageBodyCreator = (body:string):AddMessageActionType => {
    return { type: "UPDATE-NEW-MESSAGE-BODY", body: body}
}


export default dialogsReducer;
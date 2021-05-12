import {AddMessageActionType, DialogPageType, SendMessageActionType} from "./state";

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
const dialogsReducer = (state:DialogPageType = initialState,action:ActionsType) :DialogPageType => {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY':
            state.newMessageBody = action.body;
            return state;
        case "SEND-MESSAGE":
            let body =state.newMessageBody;
            state.newMessageBody="";
            state.messages.push({id: 6, message :body});
            return state;
        default: return state;
    }
    // if (action.type === 'UPDATE-NEW-MESSAGE-BODY') {
    //     state.newMessageBody = action.body;
    //
    // }
    // else if (action.type ==="SEND-MESSAGE") {
    //     let body = state.newMessageBody;
    //     state.newMessageBody="";
    //     state.messages.push({id: 6, message :body});
    //
    // }
    // return state
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

type ActionsType = SendMessageActionType | AddMessageActionType
export default dialogsReducer;
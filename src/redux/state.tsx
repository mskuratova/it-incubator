import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
}
export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    // updateNewPostText: (text: string)=> void;
}
export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody:string
}
type sidebarType = {}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogPageType
    sidebar: sidebarType
    rerenderEntireTree?: any
    updateNewPostsText ?:any
}
export type StoreType = {
    _state: RootStateType
    addPost?:(newPost:string) => void
    updateNewPostText?:(newText:string) => void
    subscribe: (observer: () => void) => void
    _collSubscriber: (_state: RootStateType)=>void
    getState: () => RootStateType
    dispatch:(action:AddPostActionType |ChangeNewTextActionType|AddMessageActionType| SendMessageActionType) => void

}

export type AddPostActionType = {
    type: "ADD-POST"
    newPostText: string
}
 export type ChangeNewTextActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    newText: string
}
 export type AddMessageActionType = {
    type: "UPDATE-NEW-MESSAGE-BODY"
    body: string

}
export type SendMessageActionType = {
    type: "SEND-MESSAGE"
    newText: string
}


let store:StoreType = {
    _state: {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'My posts?', likesCount: 11}],
        newPostText: "it-kamasutra"

    },
    dialogsPage: {
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
    },
    sidebar: {}
},
    getState() {
        return this._state
    },
    _collSubscriber () {

    },
    subscribe(observer: () => void) {
        this._collSubscriber=observer;
},
    dispatch(action: any) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._collSubscriber(this._state);
        // if (action.type ==='ADD-POST') {
            //
            // let newPost: PostType = {
            //     id: 5,
            //     message: action.newPostText,
            //     likesCount: 0
            // };
            // this._state.profilePage.posts.push(newPost);
        //     this._state.profilePage.newPostText ='';
        //     this._collSubscriber(this._state);
        // }
        // else if (action.type === 'UPDATE-NEW-POST-TEXT') {
        //
        //     this._state.profilePage.newPostText = action.newText;
        //     this._collSubscriber(this._state);
        // }
        // else if (action.type === 'UPDATE-NEW-MESSAGE-BODY') {
        //     this._state.dialogsPage.newMessageBody = action.body;
        //     this._collSubscriber(this._state);
        // }
        // else if (action.type ==="SEND-MESSAGE") {
        //     let body = this._state.dialogsPage.newMessageBody;
        //     this._state.dialogsPage.newMessageBody="";
        //     this._state.dialogsPage.messages.push({id: 6, message :body});
        //     this._collSubscriber(this._state);
        //
        // }
    }
}


const addPostActionCreator =(postText:string):AddPostActionType => {
    return {
        type: "ADD-POST",
        newPostText:postText
    }
}

const updateNewPostTextActionCreator = (text:string):ChangeNewTextActionType => {
    return { type: "UPDATE-NEW-POST-TEXT", newText: text}
}
const sendMessageCreator =(messageText:string):SendMessageActionType => {
    return {
        type: "SEND-MESSAGE",
        newText:messageText
    }
}

const updateNewMessageBodyCreator = (body:string):AddMessageActionType => {
    return { type: "UPDATE-NEW-MESSAGE-BODY", body: body}
}

export default store;
// @ts-ignore
window.store = store
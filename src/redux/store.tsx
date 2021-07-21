import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

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
    profile ?: any
}
export type ProfilePageType = {
    store?:StoreType;
    posts: Array<PostType>
    newPostText: string
    profile ?: any
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
}
export type SetUserDataActionType = {
    type: 'SET-USER-DATA'
    data: {userId:number,
    email:string,
    login:string}
}
export type SetUserProfileActionType = {
    type: "SET-USER-PROFILE"
    profile:any
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
export type FollowActionType = {
    type: "FOLLOW"
    userID: number
}
export type UnfollowActionType = {
    type: "UNFOLLOW"
    userID: number
}

let store:StoreType = {
    _state: {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'My posts?', likesCount: 11}],
        newPostText: "it-kamasutra",

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
        this._collSubscriber = observer;
},
    dispatch(action: any) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._collSubscriber(this._state);
    }
}

export default store;
// @ts-ignore
window.store = store
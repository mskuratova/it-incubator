import {AddPostActionType, ChangeNewTextActionType, PostType, ProfilePageType, SendMessageActionType} from "./store";

type ActionsType = ChangeNewTextActionType |AddPostActionType

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'My posts?', likesCount: 11}],
        newPostText: "it-kamasutra"

};
export type InitialSateType = typeof initialState;

const profileReducer = (state:ProfilePageType = initialState, action:ActionsType):InitialSateType => {
    switch (action.type) {
        case 'ADD-POST' :{
            let newPost: PostType = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
        return  {
                ...state,
                posts: [...state.posts, newPost]
            }}
            // state.posts.push(newPost);
            // state.newPostText = '';
        case 'UPDATE-NEW-POST-TEXT' :{
            return {
                ...state,
                newPostText: action.newText
            }}
     default: return state;}}

    // if (action.type ==='ADD-POST') {
    //
    //     let newPost: PostType = {
    //         id: 5,
    //         message: action.newPostText,
    //         likesCount: 0
    //     };
    //     let stateCopy = {...state}
    //     stateCopy.posts=[...state.posts]
    //     stateCopy.posts.push(newPost);
    //     stateCopy.newPostText ='';
    //     return stateCopy;
    // }
    // else if (action.type === 'UPDATE-NEW-POST-TEXT') {
    //     let stateCopy = {...state}
    //     stateCopy.newPostText = action.newText;
    //     return stateCopy
    // }
    // return state

export const addPostActionCreator =():AddPostActionType => {
    return {
        type: "ADD-POST"
    }
}

export const updateNewPostTextActionCreator = (text:string):ChangeNewTextActionType => {
    return { type: "UPDATE-NEW-POST-TEXT", newText: text}
}

export default profileReducer;
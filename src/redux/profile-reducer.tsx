import {AddPostActionType, ChangeNewTextActionType, PostType, ProfilePageType} from "./store";

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'My posts?', likesCount: 11}],
        newPostText: "it-kamasutra"

};

const profileReducer = (state:ProfilePageType = initialState, action:any) => {
    // switch (action.type) {
    //     case 'ADD-POST' :
    //         let newPost: PostType = {
    //             id: 5,
    //             message: action.newPostText,
    //             likesCount: 0
    //         };
    //         state.posts.push(newPost);
    //         state.newPostText = '';
    //         return state;
    //     case 'UPDATE-NEW-POST-TEXT' :
    //         state.newPostText = action.newText;
    //         return state;
    //
    // } default: return state;}
    if (action.type ==='ADD-POST') {

        let newPost: PostType = {
            id: 5,
            message: action.newPostText,
            likesCount: 0
        };
        state.posts.push(newPost);
        state.newPostText ='';
    }
    else if (action.type === 'UPDATE-NEW-POST-TEXT') {

        state.newPostText = action.newText;
    }
    return state
}
export const addPostActionCreator =(postText:string):AddPostActionType => {
    return {
        type: "ADD-POST",
        newPostText:postText
    }
}

export const updateNewPostTextActionCreator = (text:string):ChangeNewTextActionType => {
    return { type: "UPDATE-NEW-POST-TEXT", newText: text}
}

export default profileReducer;
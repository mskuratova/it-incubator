import React, {ChangeEvent} from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import store, {AddPostActionType, ChangeNewTextActionType, PostType
} from '../../../redux/state';
import {type} from "os";
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';

type MessageType = {
    posts: PostType[]
    newPostText: string
    dispatch: (action: { type: string; newTex: string }) => void
}
type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    dispatch:(action:AddPostActionType | ChangeNewTextActionType) => void
}




    const MyPosts: React.FC<ProfilePageType> = ({posts, newPostText, dispatch}) => {

    let postsElements = posts.map((p) => <Post likesCount={p.likesCount} message={p.message} id={p.id}/>);
    // let newPostElement = React.createRef<HTMLTextAreaElement>()


    let addPostHandler:() => void = () => {
        dispatch(addPostActionCreator(newPostText));
    }

    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        dispatch(updateNewPostTextActionCreator(text));
    }

    return (
        <div className={classes.postsBlock}>
            <div>
                <h3>My post</h3>
            </div>
            <div>
                <div>
                    <textarea onChange={onPostChange} value={newPostText}/>
                    {/*ref={newPostElement}*/}
                </div>
                <button onClick={addPostHandler}>Add post</button>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts
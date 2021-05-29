import React, {ChangeEvent} from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {AddPostActionType, ChangeNewTextActionType, PostType
} from '../../../redux/store';

type MessageType = {
    posts: PostType[]
    newPostText: string
    dispatch: (action: { type: string; newTex: string }) => void
}
type ProfilePageType = {
    posts : Array<PostType>
    newPostText ?: string
    addPosts: () => void
    updateNewPostsText:(newText:string) => void
    // dispatch ?:(action:AddPostActionType | ChangeNewTextActionType) => void
}

    const MyPosts: React.FC<ProfilePageType> = ({posts, newPostText, addPosts, updateNewPostsText}) => {

    let postsElements = posts.map((p) => <Post likesCount={p.likesCount} message={p.message} id={p.id}/>);

    let onAddPost:() => void = () => {
       addPosts();
    }

    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        updateNewPostsText(text)
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
                <button onClick={onAddPost}>Add post</button>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts
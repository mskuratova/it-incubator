import React, {ChangeEvent} from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {
    PostType
} from '../../../redux/store';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormControls/FormsControls";

type MessageType = {
    posts: PostType[]
    newPostText: string
    dispatch: (action: { type: string; newTex: string }) => void
}
type ProfilePageType = {
    posts: Array<PostType>
    newPostText?: string
    addPosts: (newPostText:string) => void
    updateNewPostsText: (newText: string) => void
    // dispatch ?:(action:AddPostActionType | ChangeNewTextActionType) => void
}

const MyPosts: React.FC<ProfilePageType> = ({posts, newPostText, addPosts, updateNewPostsText}) => {

    let postsElements = posts.map((p) => <Post likesCount={p.likesCount} message={p.message} id={p.id}/>);

    let onAddPost: (values: any) => void = (values: any) => {
        addPosts(values.newPostText);
    }
    return (
        <div className={classes.postsBlock}>
            <div>
                <h3>My post</h3>
            </div>
            <AddNewPostForm onSubmit={onAddPost}/>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
};

type AddNewPostFormType = {
    onSubmit: (onAddPost: any) => void
}

const maxLength10 = maxLengthCreator(10)
function AddNewPostForm(props: AddNewPostFormType) {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                <Field name={"newPostText"} component={Textarea} validate={[requiredField("Hi"), maxLength10]}/>
            </div>
            <button>Add post</button>
        </form>
    )
}

// @ts-ignore
AddNewPostForm = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm)

export default MyPosts


import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css';
import DialogsItems from "./DialigItem/DialogsItem";
import {
    AddMessageActionType,
    AddPostActionType,
    ChangeNewTextActionType,
    DialogPageType,
    DialogType,
    MessageType, SendMessageActionType
} from "../../redux/store";
import {Field, reduxForm} from "redux-form";
import { Redirect } from 'react-router-dom';
import AddMessageForm from "./AddMessageForm";

// type DialogPropsType = {
//     dialogsPage: DialogPageType
//     dispatch: (action: AddPostActionType | ChangeNewTextActionType | AddMessageActionType | SendMessageActionType) => void
//
// }
type MessagePropsType = {
    message: string
    id: number
}

const Messages = (props: MessagePropsType) => {
    return <div className={classes.dialogs}>{props.message}</div>
}

type DialogsPropsType = {
    dialogsPage: DialogPageType
    isAuth: boolean
    sendMessage: (message: string)=> void
}

const Dialogs = (props: DialogsPropsType) => {

    let state = props.dialogsPage
    let dialogsElements = state.dialogs.map((d: DialogType) => <DialogsItems name={d.name} key={d.id} id={d.id}/>);

    let messageElements = state.messages.map((m: MessageType) => <Messages id={m.id} key={m.id} message={m.message}/>);

    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        // props.updateNewMessageBody(body);
    }
    let addNewMessages =(values:any) => {
        props.sendMessage(values.newMessageBoby)
    }

    // if (!props.isAuth) return <Redirect to={"/login"}/>

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messageElements}</div>
            </div>
         <AddMessageForm onSubmit={addNewMessages} />
        </div>
    )
}



export default Dialogs;
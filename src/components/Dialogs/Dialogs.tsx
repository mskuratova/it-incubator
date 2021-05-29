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
import {sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';

type DialogPropsType = {
    dialogsPage: DialogPageType
    dispatch:(action:AddPostActionType |ChangeNewTextActionType|AddMessageActionType| SendMessageActionType) => void

}
type MessagePropsType = {
    message: string
    id: number
}

const Messages = (props:MessagePropsType) => {
    return <div className={classes.dialogs}>{props.message}</div>
}

const Dialogs = (props:any) => {


    let dialogsElements = props.dialogsPage.dialogs.map( (d:DialogType) => <DialogsItems name={d.name} key={d.id} id={d.id} />);

    let messageElements = props.dialogsPage.messages.map( (m:MessageType) => <Messages id={m.id} key={m.id} message={m.message} />);

    let newMessageBody = props.dialogsPage.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMessage();
    }

    let onNewMessageChange =(e:ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        props.updateNewMessageBody(body);
    }
    // let newDialogsElementn:any = React.createRef();
    // let addDialogs = () => {
    //     let text = newDialogsElementn.current.value;
    //     alert(text);
    // }


    return (
        <div className={classes.dialogs}>
            {/*<textarea ref={newDialogsElementn}></textarea>*/}
            {/*<button onClick={addDialogs}>Add dialogs</button>*/}
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messageElements}</div>
                <div>
                    <div><textarea value={newMessageBody}
                                   onChange={onNewMessageChange}
                                   placeholder="Enter your message" ></textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;
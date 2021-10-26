import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css';
import {
    AddMessageActionType,
    AddPostActionType,
    ChangeNewTextActionType,
    DialogPageType, DialogType, MessageType,
    SendMessageActionType
} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {Redirect} from "react-router-dom";
import ProfileInfoContainer from "../Profile/ProfileInfo/ProfileInfoContainer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import DialogsItems from "./DialigItem/DialogsItem";


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

const DialogsContainer = (props:any) => {

    let dialogsElements = props.dialogsPage.dialogs.map( (d:DialogType) => <DialogsItems name={d.name} id={d.id} />);

    let messageElements = props.dialogsPage.messages.map( (m:MessageType) => <Messages id={m.id} message={m.message} />);

    let newMessageBody = props.dialogsPage.newMessageBody;

    let onSendMessageClick = () => {
        props.dispatch(sendMessageCreator(""))
    }

    let onNewMessageChange =(body:any) => {
        props.dispatch(updateNewMessageBodyCreator(body))
    }

    return (
      <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick} dialogsPage={props.store.getState().dialogsPage}/>
    )
}

let mapStateToProps = (state:AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        updateNewMessageBody: (body:string) => {
            dispatch(updateNewMessageBodyCreator(body));
        },
        sendMessage: (messageText:string) => {
            dispatch(sendMessageCreator(messageText));
        }
    }
}
// let AuthRedirectComponent =
//     // withAuthRedirect(Dialogs)
//     (props: any) => {
//     if(!props.isAuth) return <Redirect to={"/login"}/>
//     return <Dialogs {...props}/>
// }
export default compose (connect(mapStateToProps, mapDispatchToProps), withAuthRedirect) (Dialogs)

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
//
// export default DialogsContainer;
import React from 'react';
import classes from '../Dialogs.module.css';
import {NavLink} from 'react-router-dom';


type MessageType = { id: number, message: string }
type DataType = { id: number, name: string }


const DialogsItems: React.FC<DataType> = (props) => {
    let path = `/dialogs/${props.id}`
    return <div className={classes.dialogs + ' ' + classes.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}

export default DialogsItems;
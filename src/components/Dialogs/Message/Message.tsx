import React from 'react';
import classes from './../Dialogs.module.css';

const Messages = (props:any) => {
    return <div className={classes.dialogs} >{props.message}</div>
}

export default Messages;
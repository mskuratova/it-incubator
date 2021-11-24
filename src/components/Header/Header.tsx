import React from 'react';
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header:React.FC = (props:any) => {
    return  <header className= {classes.header}>
        <img src="http://vector30.com/wp-content/uploads/2018/01/%D0%BB%D0%BE%D0%B3%D0%BE-1024x576.jpg"/>

        <div className={classes.loginBlock}>
            {props.isAuth
                ?<div>{props.login} - <button onClick={props.logout}>Log out</button></div>
           : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;
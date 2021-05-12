import React from 'react';
import classes from './Header.module.css'

const Header:React.FC = () => {
    return  <header className= {classes.header}>
        <img src="http://vector30.com/wp-content/uploads/2018/01/%D0%BB%D0%BE%D0%B3%D0%BE-1024x576.jpg"></img>
    </header>
}

export default Header;
import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from  '../NavigationItems/NavigationItems'

const Toolbar = (props) => (
     <header className={classes.Toolbar}>
         <div>MENU</div>
         <div className={classes.Logo}>
         <Logo />
         </div>
         <nav className={classes.DesktopOnly}>
             <NavigationItems isAuth={props.isAuth}/>
         </nav>
     </header>
)

export default Toolbar;
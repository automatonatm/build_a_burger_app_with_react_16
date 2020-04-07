import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'

import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Ax'

const SideDrawer = (props) => {

    return (
        <Aux>

                <div className={classes.SideDrawer}>
                    <div className={classes.Logo}>
                        <Logo/>
                    </div>
                    <nav>
                        <NavigationItems/>
                    </nav>
                </div>

        </Aux>
    );
};

export default SideDrawer;
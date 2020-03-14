import React from "react"
import  Aux from '../../hoc/Ax'

import classes from './Layout.css'

const layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, BackDraw</div>
    <main className={classes.Content}>
    {props.children}
    </main>

  </Aux>
)


export  default  layout

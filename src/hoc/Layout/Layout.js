import React, {Component} from "react"

import {connect} from "react-redux";

import  Aux from '../Ax'

import classes from './Layout.css'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout  extends Component{

  render() {

    return (
        <Aux>
          {/*  <div >Toolbar, SideDrawer, BackDraw</div>*/}
          <Toolbar isAuth={this.props.isAuthenticated} />
          <SideDrawer isAuth={this.props.isAuthenticated} />
          <main className={classes.Content}>
            {this.props.children}
          </main>
        </Aux>
    )
  }


}

/*const layout = (props) => (
  <Aux>
  {/!*  <div >Toolbar, SideDrawer, BackDraw</div>*!/}
  <Toolbar isAuth={this.props.isAuthenticated} />
  <SideDrawer/>
    <main className={classes.Content}>
    {props.children}
    </main>
  </Aux>
)*/




const  mapStateToProps = state => {
  return {
    isAuthenticated: !!state.Auth.token
  }
}



export  default  connect(mapStateToProps)(Layout)

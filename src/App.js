import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {connect} from "react-redux";

import asyncComponent from './hoc/asyncComponent/asyncComponent'

import './App.css';

import  Layout from './hoc/Layout/Layout'

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

/*import Checkout from  './containers/checkout/Checkout'*/

/*import Orders from './containers/Orders/Orders'*/

/*import Auth from './containers/Auth/Auth'*/

import Logout from "./containers/Auth/Logout/Logout";

import * as actions from './store/actions/index'

const asyncCheckout = asyncComponent(() => {
    return import('./containers/checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth')
})

class App extends Component {
    componentDidMount() {
        this.props.onTryAuthSignUp()
    }

    render() {

        let routes =  (
            <div>
                <Route path='/auth' component={asyncAuth} />
                <Route path="/" exact  component={BurgerBuilder} />
                <Redirect to="/" />
            </div>
        )
        if(this.props.isAuthenticated)  {
            routes = (
             <div>
                 <Route path="/checkout" component={asyncCheckout} />
                 <Route path='/orders' component={asyncOrders} />
                 <Route path='/logout' component={Logout} />
                 <Route path='/auth' component={asyncAuth} />
                 <Route path="/" exact  component={BurgerBuilder} />
                 <Redirect to="/" />
             </div>
            )
        }
    return (
      <div >
        <Layout>
            <Switch>

                {routes}

            </Switch>
          {/* < BurgerBuilder  />
           <Checkout />*/}
        </Layout>
      </div>
    );
  }
}

const  mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.Auth.token
    }
}

const mapDispatchToProps = (dispatch) =>  {
    return {
        onTryAuthSignUp:  () => dispatch(actions.authCheckState())
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

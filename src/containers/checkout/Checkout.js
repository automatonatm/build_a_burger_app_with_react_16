import React, {Component} from 'react'
import  {Route, Redirect} from 'react-router-dom'

import {connect} from "react-redux";

import  CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

import ContactData from './ContactData/ContactData'


/*import * as actions from '../../store/actions'*/



class Checkout extends Component{

    componentWillMount() {
       // this.props.onInitPurchase()
    }


    /*  componentWillMount() {
          console.log(`${this.props.match.path}/contact-data`)
          const query = new  URLSearchParams(this.props.location.search)
          let price = 0


          const  ingredients = {}
          for (let param of query.entries() ) {

              if(param[0] === 'price') {
                  price = param = param[1]

              } else {
                  ingredients[param[0]]  = +param[1]
              }
          }
          this.setState({ingredients: ingredients, totalPrice: price })
      }*/

    checkOutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
            this.props.history.replace('checkout/contact-data')
    }

    render() {


        let summary = <Redirect to="/" />

        if(this.props.ings) {
           const purchasedRedirect =  this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                  {purchasedRedirect}
                <CheckoutSummary
                    checkoutCancelled={this.checkOutCancelledHandler}
                    checkoutContinued={this.checkoutContinueHandler}
                    ingredients={this.props.ings}/>

                <Route path={`${this.props.match.path}/contact-data`}
                      component={ContactData}/>

                </div>
            )
        }
        return (
            <div>

                {summary}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }

}

/*const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}*/

export  default connect(mapStateToProps)(Checkout)
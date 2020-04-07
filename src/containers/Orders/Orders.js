import React, {Component} from 'react'
import * as actions from '../../store/actions'

import {connect} from "react-redux";

import Order from '../../components/Order/Order'

import axios from '../../axios-orders'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Spinner from '../../components/UI/Spinner/spinner'

class Orders extends Component {



    componentDidMount() {
       this.props.onfetchOrder(this.props.token, this.props.userId)
    }

    render() {

        let orders = <Spinner/>
        if(!this.props.loading) {
            orders =  (
                <div>
                    {this.props.orders.map((order) => {
                        return <Order  key={order.id}
                                       ingredients={order.ingredients}
                                       price={+order.price}
                        />
                    })}
                </div>
            )
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const  mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.Auth.token,
        userId: state.Auth.userId,
    }
}

const  mapDispatchToProps = dispatch => {
    return {
        onfetchOrder: (token, userId) => dispatch(actions.fetchOrder(token, userId))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))

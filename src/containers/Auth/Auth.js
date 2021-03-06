import React, {Component} from 'react';

import {connect} from "react-redux";

import {Redirect} from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import Spinner from '../../components/UI/Spinner/spinner'

import classes from './Auth.css'

import * as actions from '../../store/actions/'


class Auth extends Component {
    state = {
        authForm : {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true

    }

    componentDidMount() {

         if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
               this.props.onsetAuthRedirectPath()
         }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
         const updatedControls = {
             ...this.state.authForm,
             [controlName]: {
                 ...this.state.authForm[controlName],
                 value: event.target.value,
                 valid: this.checkValidity(event.target.value, this.state.authForm[controlName].validation),
                 touched: true
             }
         }
         this.setState({authForm: updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () =>   {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }


        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))

        if(this.props.loading) {
            form = <Spinner/>
        }

        let errorMessage  = null

        if (this.props.error)  {
            errorMessage = <p>{this.props.error.message}</p>
        }

        let authRedirect = null

        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (

            <div className={classes.Auth}>
                {authRedirect}
                <form  onSubmit={this.submitHandler}>
                    {form}
                    {errorMessage}
                    <Button btnType='Success' >SUBMIT</Button>

                </form>
                <div>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType='Danger'>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP' }</Button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
       onsetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

const mapDispatchToState = (state) => {
    return {
        loading: state.Auth.loading,
        error: state.Auth.error,
        isAuthenticated: !!state.Auth.token,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.Auth.authRedirect
    }
}

export default connect(mapDispatchToState, mapDispatchToProps)(Auth);
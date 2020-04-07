import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Ax'

const WithErrorHandler = (WrappedComponent, axios) => {
    return class  extends Component {
        state = {
            error: null
        }

        errorConfirmedHanlder = () => {
            this.setState({error: null})
        }

        componentWillUnmount() {
            console.log('Will unmount', this.reqInterceptor, this.resInterceptor )
             axios.interceptors.request.eject(this.reqInterceptor)
             axios.interceptors.response.eject(this.resInterceptor)
        }

        componentDidMount() {
           this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })



            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                    this.setState({error: error})
            } )
        }

        render() {

            return (

                <Aux>
                    <Modal modalClosed={this.state.error}
                           clicked={this.errorConfirmedHanlder}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
};

export default WithErrorHandler;
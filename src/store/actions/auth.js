import axios from 'axios'
import * as actionTypes from  './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}



export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData,

    }
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkOutTimeOut = (expirationTime) => {
    return  dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}


export const auth = (email, password, isSignUp) => {
    return dispatch  => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDoqLMBLNHKqrz54dwqHeimw-ybNh3ERnM'
          if (!isSignUp)  {
              url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDoqLMBLNHKqrz54dwqHeimw-ybNh3ERnM'
          }
           axios
               .post(url,
                authData
                )
            .then(({data}) => {
              //  console.log(data)
                const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
                localStorage.setItem('token', data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', data.localId)

                //console.log(data)
                dispatch(authSuccess(data))
                dispatch(checkOutTimeOut(data.expiresIn))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(authFail(error.response.data.error))
            })
    }
}


export  const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch =>  {

        const token = localStorage.getItem('token')

        if(!token) {
            dispatch(logout())
        }else {

           const  expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()) {
                dispatch(logout())
            } else  {
                const userId = localStorage.getItem('userId')
               const authData =  {
                    idToken: token,
                   localId: userId
                }

                console.log(authData)

                dispatch(authSuccess(authData))
                dispatch(checkOutTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000))

            }

        }
    }
}






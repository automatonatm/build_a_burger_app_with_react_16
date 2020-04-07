import  * as actionTypes from './actionTypes'

import axios from '../../axios-orders'


export const  addIngredeint =  (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}


export const  removeIngredeint =  (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredrients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const setError = () => {
    return {
        type: actionTypes.SET_ERROR,
    }
}

export const initIngredients = () => {
    return dispatch =>  {
        axios
            .get('https://my-burger-app-64375.firebaseio.com/ingredients.json')
            .then(({data}) => {
                dispatch(setIngredrients(data))
            })
            .catch((error) => {
                console.log(error)
                dispatch(setError())
            })
    }
}
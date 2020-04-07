import  axios from 'axios'

const  instance = axios.create({
    baseURL: 'https://my-burger-app-64375.firebaseio.com/',

})

export default instance

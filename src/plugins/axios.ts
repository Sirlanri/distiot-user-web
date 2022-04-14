import  axios from "axios"

const http = axios.create({
    baseURL: 'http://localhost:8091/user',
    withCredentials:true,
})

export default http;
import  axios from "axios"

const http = axios.create({
    baseURL: 'http://localhost:8091/user',
})

export default http;
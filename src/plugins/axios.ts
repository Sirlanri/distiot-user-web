import  axios from "axios"
import { useStore } from "../store/pinia";
let store:any =null

const http = axios.create({
    baseURL: 'http://localhost:8091/user',
    withCredentials:true,
})
/*
http.interceptors.request.use(function(config){
    if (store==null) {
        store=useStore()
    }
    http.defaults.headers.common["token"] = store.getToken
    http.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
    
    return config
})
*/
export default http;
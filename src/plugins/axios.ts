import  axios from "axios"

const http = axios.create({
    //baseURL: 'https://user.distiot.ri-co.cn/user',
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
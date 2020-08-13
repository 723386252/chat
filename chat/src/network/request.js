import axios from 'axios'
import Vue from 'vue'


axios.defaults.withCredentials=true //让ajax携带cookie
Vue.prototype.$http = axios     // 这样设置就可以在组件内用 this.$http 使用axios了

export default function request(config){
const instance = axios.create({
    baseURL:'http://127.0.0.1:3000',
    timeout:5000
})
instance.defaults.withCredentials=true
instance.interceptors.response.use(response => {
    return response.data;
},error => {
    console.log(error);
}
)




return instance(config)
}
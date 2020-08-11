import axios from 'axios'



export default function request(config){
const instance = axios.create({
    baseURL:'http://127.0.0.1:3000',
    timeout:5000
})
instance.interceptors.response.use(response => {
    return response.data;
},error => {
    console.log(error);
}
)




return instance(config)
}
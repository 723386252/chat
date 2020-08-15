import request from '../request'
import {getToken} from '../../utils/token'

export function getuserinfo(){
    return request({
        url:'/chat/getuserinfo',
        method:'get',
        // responseType: 'blob',   
        headers: { 'Authorization': 'Bearer ' + getToken() }
    })
}

import request from '../request'
import {getToken} from '../../utils/token'

export function getmyinfo(){
    return request({
        url:'/chat/getmyinfo',
        method:'get',
        // responseType: 'blob',   
        headers: { 'Authorization': 'Bearer ' + getToken() }
    })
}

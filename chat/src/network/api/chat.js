import request from '../request'
import {getToken} from '../../utils/token'

export function test(){
    return request({
        url:'/',
        method:'get',
        // responseType: 'blob',   
        headers: { 'Authorization': 'Bearer ' + getToken() }
    })
}

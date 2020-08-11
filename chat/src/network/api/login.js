import request from '../request'

export function submitregister(data){
    return request({
        url:'/register',
        method:'post',
        data
    })
}
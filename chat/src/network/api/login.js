import request from '../request'

export function submitregister(data){
    return request({
        url:'/register',
        method:'post',
        data
    })
}
export function submitlogin(data) {
    return request({
        url:'/login',
        method:'post',
        data
    })
}
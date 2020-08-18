import request from '../request'
import {getToken} from '../../utils/token'

export function addgroup(params){
    return request({
        url:'/friend/addgroup',
        method:'get',
        params,
        headers: { 'Authorization': 'Bearer ' + getToken() }
    })
}

export function getrequest(params){
    return request({
        url:'/friend/getrequest',
        method:'get',
        params,
        headers: { 'Authorization': 'Bearer ' + getToken() }
    })
}

export function getuserinfo(params){
    return request({
        url:'/friend/getuserinfo',
        method:'get',
        params,
        headers: { 'Authorization': 'Bearer ' + getToken() }
    })
}

export function initfriend(params){
    return request({
        url:'/friend/initfriend',
        method:'get',
        params,
        headers: { 'Authorization': 'Bearer ' + getToken() }
    })
}

export function getgroup(params){
    return request({
        url:'/friend/getgroup',
        method:'get',
        params,
        headers: { 'Authorization': 'Bearer ' + getToken() }
    })
}
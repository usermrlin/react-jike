// 用户相关的所有请求
import {request} from '@/utils'

// 登录请求
export function login(formData) {
    return request({
        url:'/authorizations',
        method:'POST',
        data:formData
    })
}

// 获取用户信息
export function getUserInfo() {
    return request({
        url:'/user/profile',
        method:'GET'
    })
}

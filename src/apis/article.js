// 封装文章相关的接口函数

import { request } from "@/utils";

// 获取频道列表
export function getChannelAPI() {
    return request({
        url:'/channels',
        method:'GET'
    })
}

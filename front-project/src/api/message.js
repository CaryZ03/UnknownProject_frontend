import request from "@/utils/request";


export async function post_group_send_notification_to_user(data) {
    return request({
        method: 'POST',
        url:  '/message/group_send_notification_to_user',
        data: data,
    })
}

export async function post_check_notification_list(data) {
    return request({
        method: 'POST',
        url:  '/message/check_notification_list',
        data: data,
    })
}

export async function post_skip_info(data) {
    return request({
        method: 'POST',
        url:  '/message/post_skip_info',
        data: data,
    })
}









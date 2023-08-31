import request from "@/utils/request";

//check_profile_self
export async function post_get_team_members_and_permissions(data) {
    return request({
        method: 'POST',
        url:  '/chat/get_team_members_and_permissions',
        data: data
    })
}

export async function post_get_teams_for_user(data) {
    return request({
        method: 'POST',
        url:  '/chat/get_teams_for_user',
        data: data
    })
}

export async function post_get_team_chat_history(data) {
    return request({
        method: 'POST',
        url:  '/chat/get_team_chat_history',
        data: data
    })
}

export async function post_store_message(data) {
    return request({
        method: 'POST',
        url:  '/chat/store_message',
        data: data
    })
}

export async function post_search_chat_message(data) {
    return request({
        method: 'POST',
        url:  '/chat/search_chat_message',
        data: data
    })
}








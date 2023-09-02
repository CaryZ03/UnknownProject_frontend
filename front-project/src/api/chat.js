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

export async function post_search_group_chat_message(data) {
    return request({
        method: 'POST',
        url:  '/chat/search_group_chat_message',
        data: data
    })
}

export async function post_search_private_chat_message(data) {
    return request({
        method: 'POST',
        url:  '/chat/search_private_chat_message',
        data: data
    })
}

export async function post_create_private_chat(data) {
    return request({
        method: 'POST',
        url:  '/chat/create_private_chat',
        data: data
    })
}

export async function post_acquire_private_chat(data) {
    return request({
        method: 'POST',
        url:  '/chat/acquire_private_chat',
        data: data
    })
}

export async function post_get_private_chat_history(data) {
    return request({
        method: 'POST',
        url:  '/chat/get_private_chat_history',
        data: data
    })
}

export async function post_store_private_message(data) {
    return request({
        method: 'POST',
        url:  '/chat/store_private_message',
        data: data
    })
}

export async function post_create_group_chat(data) {
    return request({
        method: 'POST',
        url:  '/chat/create_group_chat',
        data: data
    })
}

export async function post_acquire_group_chat(data) {
    return request({
        method: 'POST',
        url:  '/chat/acquire_group_chat',
        data: data
    })
}

export async function post_get_group_chat_members(data) {
    return request({
        method: 'POST',
        url:  '/chat/get_group_chat_members',
        data: data
    })
}

export async function post_get_group_chat_history(data) {
    return request({
        method: 'POST',
        url:  '/chat/get_group_chat_history',
        data: data
    })
}

export async function post_store_group_message(data) {
    return request({
        method: 'POST',
        url:  '/chat/store_group_message',
        data: data
    })
}

export async function post_group_invite_member(data) {
    return request({
        method: 'POST',
        url:  '/chat/group_invite_member',
        data: data
    })
}

export async function post_group_delete_member(data) {
    return request({
        method: 'POST',
        url:  '/chat/group_delete_member',
        data: data
    })
}

export async function post_delete_group(data) {
    return request({
        method: 'POST',
        url:  '/chat/delete_group',
        data: data
    })
}

export async function post_acquire_message_block(data) {
    return request({
        method: 'POST',
        url:  '/chat/acquire_message_block',
        data: data
    })
}

export async function post_update_leave_message(data) {
    return request({
        method: 'POST',
        url:  '/chat/update_leave_message',
        data: data
    })
}

export async function post_acquire_unread_message(data) {
    return request({
        method: 'POST',
        url:  '/chat/acquire_unread_message',
        data: data
    })
}
import request from "@/utils/request";

export async function post_change_team_profile(data) {
    return request({
        method: 'POST',
        url: '/team/change_team_profile',
        data: data
    })
}

export async function post_change_team_avatar(data) {
    return request({
        method: 'POST',
        url: '/team/change_team_avatar',
        data: data
    })
}

export async function post_add_manager(data) {
    return request({
        method: 'POST',
        url: '/team/add_manager',
        data: data
    })
}

export async function post_delete_manager(data) {
    return request({
        method: 'POST',
        url: '/team/delete_manager',
        data: data
    })
}

export async function post_show_member(data) {
    return request({
        method: 'POST',
        url: '/team/show_member',
        data: data
    })
}

export async function post_show_team(data) {
    return request({
        method: 'POST',
        url: '/team/show_team',
        data: data
    })
}

export async function post_delete_team(data) {
    return request({
        method: 'POST',
        url: '/team/delete_team',
        data: data
    })
}

// export async function post_user_register_check(data) {
//     return request({
//         method: 'POST',
//         url: '/team/user_register_check',
//         data: data
//     })
// }

export async function post_join_team_url(data) {
    return request({
        method: 'POST',
        url: '/team/join_team_url',
        data: data
    })
}

export async function post_user_register_check(data) {
    return request({
        method: 'POST',
        url: '/team/user_register_check',
        data: data
    })
}

export async function post_join_team_straight(data) {
    return request({
        method: 'POST',
        url: '/team/join_team_straight',
        data: data
    })
}

export async function post_show_check(data) {
    return request({
        method: 'POST',
        url: '/team/show_check',
        data: data
    })
}

export async function post_check_member(data) {
    return request({
        method: 'POST',
        url: '/team/check_member',
        data: data
    })
}

// member_role
export async function post_member_role(data) {
    return request({
        method: 'POST',
        url:  `/team/member_role`,
        data: data
    })
}
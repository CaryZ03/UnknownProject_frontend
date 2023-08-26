import request from "@/utils/request";

//用户注册
export async function post_user_register_check(data) {
    return request({
        method: 'POST',
        url: '/user/user_register_check',
        data: data
    })
}
// send_verification_code
export function post_send_verification_code(data) {
    return request({
        method: 'POST',
        url:  '/user/send_verification_code',
        data: data
    })
}

// check_verification_code
export function post_check_verification_code(data) {
    return request({
        method: 'POST',
        url:  '/user/check_verification_code',
        data: data
    })
}


//user_register：
export function post_user_register(data) {
    return request({
        method: 'POST',
        url:  '/user/user_register',
        data: data
    })
}
//user_login
export async function post_user_login(data) {
    return request({
        method: 'POST',
        url:  '/user/user_login',
        data: data
    })
}

//reset_password
export async function post_reset_password_check(data) {
    return request({
        method: 'POST',
        url:  '/user/reset_password_check',
        data: data
    })
}

//reset_password
export async function post_reset_password(data) {
    return request({
        method: 'POST',
        url:  '/user/reset_password',
        data: data
    })
}


//cancel_account
export async function post_logout() {
    return request({
        method: 'POST',
        url:  '/user/logout'
    })
}

// cancel_account
export async function get_cancel_account(data) {
    return request({
        method: 'POST',
        url:  '/user/cancel_account',
        data: data
    })
}

//check_profile_self
export async function post_check_profile_self(data) {
    return request({
        method: 'GET',
        url:  '/user/check_profile_self',
        data: data
    })
}

// change_profile
export async function post_change_profile(data) {
    return request({
        method: 'POST',
        url:  '/user/change_profile',
        data: data
    })
}

// check_team_list
export async function get_check_team_list(data) {
    return request({
        method: 'GET',
        url:  `/user/check_team_list/${tm_list_type}`,
        data: data,
        params:{
            uid: uid
        }
    })
}

// check_profile
export async function post_check_profile(data) {
    return request({
        method: 'POST',
        url:  `/user/check_profile`,
        data: data
    })
}

// upload_avatar

export async function get_upload_avatar(data) {
    return request({
        method: 'POST',
        url:  '/user/upload_avatar',
        data: data
    })
}
//check_token
export async function get_check_token() {
    return request({
        method: 'GET',
        url:  '/user/check_token'
    })
}
//
export async function get_upload_email_check(data) {
    return request({
        method: 'GET',
        url:  '/user/upload_email_check',
        data: data
    })
}
// 换绑
export async function post_upload_email(data){
    return request({
        method: 'POST',
        url:  '/user/upload_email',
        data: data
    })
}








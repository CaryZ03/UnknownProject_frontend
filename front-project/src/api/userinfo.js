import request from "@/utils/request";

//用户注册
export async function postUserInfo_Register(data) {
    return request({
        method: 'POST',
        url: '/user/user_register',
        data: data
    })
}
// 用户登录
export function postUserInfo_UserLogin(data) {
    return request({
        method: 'POST',
        url:  '/user/user_login',
        data: data
    })
}
//  管理员登录
export function postUserInfo_AdminLogin(data) {
    return request({
        method: 'POST',
        url:  '/user/admin_login',
        data: data
    })
}
//发验证码
export async function postUserInfo_SendVeri(data) {
    return request({
        method: 'POST',
        url:  '/user/send_verification_code',
        data: data
    })
}
//重置密码
export async function postUserInfo_ResetPassword(data) {
    return request({
        method: 'POST',
        url:  '/user/reset_password',
        data: data
    })
}
//登出
export async function postUserInfo_Logout() {
    return request({
        method: 'POST',
        url:  '/user/logout',
    })
}
//cancel_account
export async function postUserInfo_CancelAccount(data) {
    return request({
        method: 'POST',
        url:  '/user/cancel_account',
        data: data
    })
}

// check_profile,获取用户信息
export async function getUserInfo_GetUserInfo(id) {
    return request({
        method: 'GET',
        url:  '/user/check_profile',
        params:{
            "uid": id
        }
    })
}

//check_profile_admin
export async function postUserInfo_GetAdminInfo(data) {
    return request({
        method: 'POST',
        url:  '/user/check_profile_admin',
        data: data
    })
}

// change_profile
export async function postUserInfo_ChangeUserInfo(data) {
    return request({
        method: 'POST',
        url:  '/user/change_profile',
        data: data
    })
}

// change_profile admin
export async function postUserInfo_ChangeAdminInfo(data) {
    return request({
        method: 'POST',
        url:  '/user/change_profile_admin',
        data: data
    })
}

// 获取用户问卷列表
export async function getUserInfo_GetQList(data) {
    const id=data.uid
    const type=data.type
    console.log(data.uid)
    console.log(data.type)

    return request({
        method: 'GET',
        url:  `/user/check_questionnaire_list/${type}`,
        params:{
            "uid": id,
        }
    })
}

// 封禁用户
export async function postUserInfo_ChangeUserStatus(user) {
    return request({
        method: 'POST',
        url:  '/user/change_user_status',
        data: user
    })
}
//检查token是否过期
export async function getUserInfo_CheckToken() {
    return request({
        method: 'GET',
        url:  '/user/check_token',
    })
}
// upload_avatar
export async function postUserInfo_upload_avatar(data){
    return request({
        method: 'POST',
        url:  '/user/upload_avatar',
        data: data
    })
}








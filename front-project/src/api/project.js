import request from "@/utils/request";


// delete_project
export async function post_delete_project(data) {
    return request({
        method: 'POST',
        url:  `/user/delete_project`,
        data: data
    })
}


// check_profile
export async function post_show_profile(data) {
    return request({
        method: 'POST',
        url:  `/user/show_profile`,
        data: data
    })
}


// check_profile
export async function post_change_profile(data) {
    return request({
        method: 'POST',
        url:  `/user/change_profile`,
        data: data
    })
}


// check_profile
export async function post_search_status(data) {
    return request({
        method: 'POST',
        url:  `/user/search_status`,
        data: data
    })
}


// check_profile
export async function post_check_project_list(data) {
    return request({
        method: 'GET',
        url:  `/user/check_project_list`,
        data: data
    })
}


// check_profile
export async function post_create_requirement(data) {
    return request({
        method: 'POST',
        url:  `/user/create_requirement`,
        data: data
    })
}

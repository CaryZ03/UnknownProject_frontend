import request from "@/utils/request";

//check_requirement_list
export async function post_check_requirement_list(data) {
    return request({
        method: 'POST',
        url:  `/project/check_requirement_list`,
        data: data
    })
}




// delete_project
export async function post_delete_project(data) {
    return request({
        method: 'POST',
        url:  `/project/delete_project`,
        data: data
    })
}


export async function post_create_project(data) {
    return request({
        method: 'POST',
        url:  `/project/create_project`,
        data: data
    })
}

// check_profile
export async function post_show_profile(data) {
    return request({
        method: 'POST',
        url:  `/project/show_profile`,
        data: data
    })
}


// check_profile
export async function post_change_profile(data) {
    return request({
        method: 'POST',
        url:  `/project/change_profile`,
        data: data
    })
}


// check_profile
export async function post_search_status(data) {
    return request({
        method: 'POST',
        url:  `/project/search_status`,
        data: data
    })
}


// check_profile
export async function post_check_project_list(data) {
    return request({
        method: 'GET',
        url:  `/project/check_project_list`,
        data: data
    })
}


// check_profile
export async function post_create_requirement(data) {
    return request({
        method: 'POST',
        url:  `/project/create_requirement`,
        data: data
    })
}

// check_project_list_team
export async function post_check_project_list_team(data) {
    return request({
        method: 'POST',
        url:  `/project/check_project_list_team`,
        data: data
    })
}

//delete__requirement
export async function post_delete_requirement(data) {
    return request({
        method: 'POST',
        url:  `/project/delete_requirement`,
        data: data
    })
}

//change_profile_requirement
export async function post_change_profile_requirement(data) {
    return request({
        method: 'POST',
        url:  `/project/change_profile_requirement`,
        data: data
    })
}


//change_recycle_status
export async function post_change_recycle_status(data) {
    return request({
        method: 'POST',
        url:  `/project/change_recycle_status`,
        data: data
    })
}

//copy_project
export async function post_copy_project(data) {
    return request({
        method: 'POST',
        url:  `/project/copy_project`,
        data: data
    })
}

//delete_prototype
export async function post_delete_prototype(data) {
    return request({
        method: 'POST',
        url:  `/project/delete_prototype`,
        data: data
    })
}

//create_prototype
export async function post_create_prototype(data) {
    return request({
        method: 'POST',
        url:  `/project/create_prototype`,
        data: data
    })
}

//change_prototype
export async function post_change_prototype(data) {
    return request({
        method: 'POST',
        url:  `/project/change_prototype`,
        data: data
    })
}

//change_document
export async function post_change_document(data) {
    return request({
        method: 'POST',
        url:  `/project/change_document`,
        data: data
    })
}

//delete_document
export async function post_delete_document(data) {
    return request({
        method: 'POST',
        url:  `/project/delete_document`,
        data: data
    })
}

//show_document_list
export async function post_show_document_list(data) {
    return request({
        method: 'POST',
        url:  `/project/show_document_list`,
        data: data
    })
}
//create_document
export async function post_create_document(data) {
    return request({
        method: 'POST',
        url:  `/project/create_document`,
        data: data
    })
}
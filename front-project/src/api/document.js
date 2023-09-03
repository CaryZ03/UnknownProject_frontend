import request from "@/utils/request";


export async function post_upload_file(data) {
    return request({
        method: 'POST',
        url:  '/document/upload_file',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export async function post_download_file(data) {
    return request({
        method: 'POST',
        url:  '/document/download_file',
        data: data,
        responseType: 'blob'
    })
}

//show_prototype_list
export async function post_show_prototype_list(data) {
    return request({
        method: 'POST',
        url:  '/document/show_prototype_list',
        data: data,
    })
}

//create_prototype
export async function post_create_prototype(data) {
    return request({
        method: 'POST',
        url:  '/document/create_prototype',
        data: data,
    })
}

// change_prototype
export async function post_change_prototype(data) {
    return request({
        method: 'POST',
        url:  '/document/change_prototype',
        data: data,
    })
}

//change_prototype_recycle

export async function post_change_prototype_recycle(data) {
    return request({
        method: 'POST',
        url:  '/document/change_prototype_recycle',
        data: data,
    })
}

//delete_prototype
export async function post_delete_prototype(data) {
    return request({
        method: 'POST',
        url:  '/document/delete_prototype',
        data: data,
    })
}

//show_directory_tree
export async function post_show_directory_tree(data) {
    return request({
        method: 'POST',
        url:  '/document/show_directory_tree',
        data: data,
    })
}

//search_document
export async function post_search_document(data) {
    return request({
        method: 'POST',
        url:  '/document/search_document',
        data: data,
    })
}

//create_document

export async function post_create_document(data) {
    return request({
        method: 'POST',
        url:  '/document/create_document',
        data: data,
    })
}

//move_document
export async function post_move_document(data) {
    return request({
        method: 'POST',
        url:  '/document/move_document',
        data: data,
    })
}

// change_directory_recycle
export async function post_change_directory_recycle(data) {
    return request({
        method: 'POST',
        url:  '/document/change_directory_recycle',
        data: data,
    })
}

//change_document_recycle
export async function post_change_document_recycle(data) {
    return request({
        method: 'POST',
        url:  '/document/change_document_recycle',
        data: data,
    })
}

//421 create_directory
export async function post_create_directory(data) {
    return request({
        method: 'POST',
        url:  '/document/create_directory',
        data: data,
    })
}

//show_recycle_tree
export async function post_show_recycle_tree(data) {
    return request({
        method: 'POST',
        url:  '/document/show_recycle_tree',
        data: data,
    })
}

//delete_directory
export async function post_delete_directory(data) {
    return request({
        method: 'POST',
        url:  '/document/delete_directory',
        data: data,
    })
}

//delete_document
export async function post_delete_document(data) {
    return request({
        method: 'POST',
        url:  '/document/delete_document',
        data: data,
    })
}

//change_document

export async function post_change_document(data) {
    return request({
        method: 'POST',
        url:  '/document/change_document',
        data: data,
    })
}

//show_template_list
export async function post_show_template_list(data) {
    return request({
        method: 'POST',
        url:  '/document/show_template_list',
        data: data,
    })
}

//change_document_permission
export async function post_change_document_permission(data) {
    return request({
        method: 'POST',
        url:  '/document/change_document_permission',
        data: data,
    })
}








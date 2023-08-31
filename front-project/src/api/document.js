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











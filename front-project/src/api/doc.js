import request from "@/utils/request";




// create_document
export async function post_create_document(data) {
    return request({
        method: 'POST',
        url:  `/document/upload_saved_document`,
        data: data
    })
}

// create_document
export async function post_download_saved_document(data) {
    return request({
        method: 'POST',
        url:  `/document/download_saved_document`,
        data: data
    })
}

export async function post_get_prototype_components(data) {
    return request({
        method: 'POST',
        url:  `/document/get_prototype_components`,
        data: data
    })
}

export async function post_save_prototype_components(data) {
    return request({
        method: 'POST',
        url:  `/document/save_prototype_components`,
        data: data
    })
}


// upload_saved_document
export async function post_upload_saved_document(data) {
    return request({
        method: 'POST',
        url:  `/document/upload_saved_document`,
        data: data
    })
}

// show_save
export async function post_show_save(data) {
    return request({
        method: 'POST',
        url:  `/document/show_save`,
        data: data
    })
}

// search_save
export async function post_search_save(data) {
    return request({
        method: 'POST',
        url:  `/document/search_save`,
        data: data
    })
}

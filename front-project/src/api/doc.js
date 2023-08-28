import request from "@/utils/request";

// upload_saved_document
export async function post_upload_saved_document(data) {
    return request({
        method: 'POST',
        url:  `/user/upload_saved_document`,
        data: data
    })
}

// create_document
export async function post_create_document(data) {
    return request({
        method: 'POST',
        url:  `/user/upload_saved_document`,
        data: data
    })
}

// create_document
export async function post_download_saved_document(data) {
    return request({
        method: 'POST',
        url:  `/user/download_saved_document`,
        data: data
    })
}


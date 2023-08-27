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










import request from "@/utils/request";

//check_profile_self
export async function post_get_team_members_and_permissions(data) {
    return request({
        method: 'POST',
        url:  '/chat/get_team_members_and_permissions',
        data: data
    })
}

export async function post_get_teams_for_user(data) {
    return request({
        method: 'POST',
        url:  '/chat/get_teams_for_user',
        data: data
    })
}









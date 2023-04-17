import {post, get, put} from "./baseService";

const endpoint = "notifications/"

export const getNotifications = (uid) => {
    return get(endpoint + "?receiver_id=" + uid)
}

export const sendInvitation = (body) => {
    return post(endpoint + "team_invitation/", body)
}

export const viewNotifications = (notifications) => {
    return put(endpoint + "viewed/?nids=" + notifications)
}

export const sendTeamPostulation = (body) => {
    return post(endpoint + "team_postulation/", body)
}

export const updateTeamPostulation = (body) => {
    return post(endpoint + "team_postulation_response/", body)
}

export const requestFinishProject = (body) => {
    return post(endpoint + "project_finished_requests/", body)
}

export const getFinishProject = (id) => {
    return get(`/project_finished_requests/${id}`)
}

export const getRequestFinishProject = (tid, pid) => {
    return get(`/project_finished_requests/?tid=${tid}&pid=${pid}`)
}

export const finishProject = (body) => {
    return post(endpoint + "project_finished/", body)
}

export const abandonProject = (body) => {
    return post(endpoint + "project_abandonment/", body)
}

export const abandonProjectRequest = (body) => {
    return post(endpoint + "project_abandons_requests/", body)
}

export const getTeamPosition = (tpid) => {
    return get(`teams_positions/${tpid}`)
}

export const projectInvitation = (body) => {
    return post(endpoint + "project_invitation/", body)
}

export const sendUserTeamInvitation = (body) => {
    return post(endpoint + "teams_positions_invitations/", body)
}

export const sendUserRecommendation = (body) => {
    return post(endpoint + "teams_member_internal_recommendations/", body)
}

export const sendProjectRecommendation = (body) => {
    return post(endpoint + "teams_project_internal_recommendations/", body)
}

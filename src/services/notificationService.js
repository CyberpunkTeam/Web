import {post, get, put} from "./baseService";

const endpoint = "notifications/"

export const getNotifications = (uid, context) => {
    return get(endpoint + "?receiver_id=" + uid, context)
}

export const sendInvitation = (body) => {
    return post(endpoint + "team_invitation/", body, context)
}

export const viewNotifications = (notifications) => {
    return put(endpoint + "viewed/?nids=" + notifications, context)
}

export const sendTeamPostulation = (body) => {
    return post(endpoint + "team_postulation/", body, context)
}

export const updateTeamPostulation = (body) => {
    return post(endpoint + "team_postulation_response/", body, context)
}

export const requestFinishProject = (body) => {
    return post(endpoint + "project_finished_requests/", body, context)
}

export const getFinishProject = (id) => {
    return get(`/project_finished_requests/${id}`, context)
}

export const getRequestFinishProject = (tid, pid) => {
    return get(`/project_finished_requests/?tid=${tid}&pid=${pid}`, context)
}

export const finishProject = (body, context) => {
    return post(endpoint + "project_finished/", body, context)
}

export const abandonProject = (body, context) => {
    return post(endpoint + "project_abandonment/", body, context)
}

export const abandonProjectRequest = (body) => {
    return post(endpoint + "project_abandons_requests/", body, context)
}

export const getTeamPosition = (tpid, context) => {
    return get(`teams_positions/${tpid}`, context)
}

export const projectInvitation = (body, context) => {
    return post(endpoint + "project_invitation/", body, context)
}

export const sendUserTeamInvitation = (body, context) => {
    return post(endpoint + "teams_positions_invitations/", body, context)
}

export const sendUserRecommendation = (body, context) => {
    return post(endpoint + "teams_member_internal_recommendations/", body, context)
}

export const sendProjectRecommendation = (body, context) => {
    return post(endpoint + "teams_project_internal_recommendations/", body, context)
}

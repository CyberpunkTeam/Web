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

import {post, get, put} from "./baseService";

const endpoint = "projects/"

export const createProject = (body, context) => {
    return post(endpoint, body, context)
}

export const updateProject = (pid, body, context) => {
    return put(endpoint + pid, body, context)
}

export const getProject = (pid, context) => {
    return get(endpoint + pid, context)
}

export const getProjects = (params, context) => {
    return get(endpoint + "?state=PENDING&currency=DOLAR" + params, context)
}

export const getPostulation = (ppid, context) => {
    return get(endpoint + `postulations/${ppid}`, context)
}

export const getProjectPostulations = (pid, context) => {
    return get(endpoint + `postulations/?pid=${pid}&state=PENDING`, context)
}

export const getTeamPostulations = (tid, context) => {
    return get(endpoint + `postulations/?tid=${tid}`, context)
}

export const projectReview = (body, context) => {
    return post(`/projects_reviews/`, body, context)
}

export const getProjectReview = (pid, tid, context) => {
    return get(`/projects_reviews/?pid=${pid}&tid=${tid}`, context)
}

export const getRequestAbandonProject = (tid, pid, context) => {
    return get(`/project_abandons_requests/?tid=${tid}&pid=${pid}`, context)
}

export const getRequestAbandonProjectWithID = (par_id, context) => {
    return get(`/project_abandons_requests/${par_id}`, context)
}

export const getProjectTeamRecommendations = (body, context) => {
    return post(`recommendations/projects/`, body, context)
}

export const getTemporallyTeamRecommendations = (body, context) => {
    return post(`recommendations/temporal_teams/`, body, context)
}

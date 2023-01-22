import {post, get, put} from "./baseService";

const endpoint = "projects/"

export const createProject = (body) => {
    return post(endpoint, body)
}

export const updateProject = (pid, body) => {
    return put(endpoint + pid, body)
}

export const getProject = (pid) => {
    return get(endpoint + pid)
}

export const getProjects = () => {
    return get(endpoint + "?state=PENDING")
}

export const getPostulation = (ppid) => {
    return get(endpoint + `postulations/${ppid}`)
}

export const getProjectPostulations = (pid) => {
    return get(endpoint + `postulations/?pid=${pid}&state=PENDING`)
}

export const getTeamPostulations = (tid) => {
    return get(endpoint + `postulations/?tid=${tid}`)
}

export const projectReview = (body) => {
    return post(`/projects_reviews/`, body)
}

export const getProjectReview = (pid, tid) => {
    return get(`/projects_reviews/?pid=${pid}&tid=${tid}`)
}

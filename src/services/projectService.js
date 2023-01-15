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

export const abandonProject = (tid, pid) => {
    return get(endpoint + `project_abandons_requests/?tid=${tid}&pid=${pid}`)
}

import {post, put, get} from "./baseService";

const endpoint = "teams/"

export const createTeam = (body) => {
    return post(endpoint, body)
}

export const getOwnerTeams = (uid) => {
    return get(endpoint + `?owner=${uid}`)
}

export const getTeam = (uid) => {
    return get(endpoint + uid)
}

export const addMember = (tid, uid) => {
    return post(endpoint + tid + "/members/" + uid)
}

export const updateTeam = (tid, body) => {
    return put(endpoint + tid, body)
}


export const teamReview = (body) => {
    return post(endpoint + "teams_reviews/", body)
}

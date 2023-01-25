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
    return post("teams_reviews/", body)
}

export const getTeamReview = (pid, tid) => {
    return get(`teams_reviews/?pid=${pid}&tid=${tid}`)
}

export const getMembersTeamReview = (pid, tid, uid) => {
    return get(`team_members_reviews/?pid=${pid}&tid=${tid}&member_reviewer=${tid}`)
}

export const createMembersTeamReview = (body) => {
    return post(`team_members_reviews/`, body)
}

import {post, put, get, erase} from "./baseService";

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

export const getTeamReviews = (tid) => {
    return get(`teams_reviews/?tid=${tid}`)
}

export const getMembersTeamReview = (pid, tid, uid) => {
    return get(`team_members_reviews/?pid=${pid}&tid=${tid}&member_reviewer=${uid}`)
}

export const createMembersTeamReview = (body) => {
    return post(`team_members_reviews/`, body)
}

export const createTeamVacant = (body) => {
    return post("teams_positions/", body)
}

export const getTeamVacants = (tid) => {
    return get(`teams_positions/?tid=${tid}&state=OPEN`)
}

export const teamPostulate = (tpid, uid) => {
    return post(`teams_positions/${tpid}/candidates/${uid}`)
}

export const rejectCandidate = (tpid, uid) => {
    return erase(`teams_positions/${tpid}/candidates/${uid}`)
}

export const acceptCandidate = (tid, tpid, uid) => {
    return post(`/teams/${tid}/teams_positions/${tpid}/candidates/${uid}`)
}

export const deleteVacant = (tpid, body) => {
    return put("teams_positions/" + tpid, body)
}

export const getAllTeamPositions = (params) => {
    return get(`teams_positions/?state=OPEN` + params)
}

export const getUserOpportunities = (body) => {
    return post(`recommendations/users/`, body)
}

export const createTeamTemporal = (body) => {
    return post(endpoint + `temporal`, body)
}

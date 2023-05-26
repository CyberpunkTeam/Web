import {post, put, get, erase} from "./baseService";

const endpoint = "teams/"

export const createTeam = (body, context) => {
    return post(endpoint, body, context)
}

export const getOwnerTeams = (uid, context) => {
    return get(endpoint + `?owner=${uid}`, context)
}

export const getMyTeams = (uid, context) => {
    return get(endpoint + `?mid=${uid}`, context)
}

export const getTeam = (uid, context) => {
    return get(endpoint + uid, context)
}

export const addMember = (tid, uid, context) => {
    return post(endpoint + tid + "/members/" + uid, context)
}

export const updateTeam = (tid, body, context) => {
    return put(endpoint + tid, body, context)
}

export const teamReview = (body, context) => {
    return post("teams_reviews/", body, context)
}

export const getTeamReview = (pid, tid, context) => {
    return get(`teams_reviews/?pid=${pid}&tid=${tid}`, context)
}

export const getTeamReviews = (tid, context) => {
    return get(`teams_reviews/?tid=${tid}`, context)
}

export const getMembersTeamReview = (pid, tid, uid, context) => {
    return get(`team_members_reviews/?pid=${pid}&tid=${tid}&member_reviewer=${uid}`, context)
}

export const createMembersTeamReview = (body, context) => {
    return post(`team_members_reviews/`, body, context)
}

export const createTeamVacant = (body, context) => {
    return post("teams_positions/", body, context)
}

export const getTeamVacants = (tid, context) => {
    return get(`teams_positions/?tid=${tid}&state=OPEN`, context)
}

export const teamPostulate = (tpid, uid, context) => {
    return post(`teams_positions/${tpid}/candidates/${uid}`, context)
}

export const rejectCandidate = (tpid, uid, context) => {
    return erase(`teams_positions/${tpid}/candidates/${uid}`, context)
}

export const acceptCandidate = (tid, tpid, uid, context) => {
    return post(`/teams/${tid}/teams_positions/${tpid}/candidates/${uid}`, context)
}

export const deleteVacant = (tpid, body, context) => {
    return put("teams_positions/" + tpid, body, context)
}

export const getAllTeamPositions = (params, context) => {
    return get(`teams_positions/?state=OPEN` + params, context)
}

export const getUserOpportunities = (body, context) => {
    return post(`recommendations/users/`, body, context)
}

export const createTeamTemporal = (body, context) => {
    return post(endpoint + `temporal`, body, context)
}

export const getTeamTemporal = (pid, context) => {
    return get(endpoint + `temporal/?pid=` + pid, context)
}

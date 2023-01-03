import {get, put} from "./baseService";
const endpoint = "invitations/teams/"

export const getTeamInvitations = (tid) => {
    return get(endpoint + "?tid=" + tid)
}

export const getPostulantInvitations = (uid) => {
    return get( endpoint + "?postulant_uid=" + uid)
}

export const getPostulantTeamInvitations = (uid, tid) => {
    return get(endpoint + `?tid=${tid}&postulant_uid=${uid}&state=PENDING`)
}

export const getInvitation = (tiid) => {
    return get(endpoint + tiid)
}

export const updateInvitation = (tiid, body) => {
    return put(endpoint + tiid, body)
}

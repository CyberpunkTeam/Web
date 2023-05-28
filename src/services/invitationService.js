import {get, put} from "./baseService";
const endpoint = "invitations/teams/"

export const getTeamInvitations = (tid, context) => {
    return get(endpoint + "?tid=" + tid, context)
}

export const getPostulantTeamInvitations = (uid, tid, context) => {
    return get(endpoint + `?tid=${tid}&postulant_uid=${uid}&state=PENDING`, context)
}

export const getInvitation = (tiid, context) => {
    return get(endpoint + tiid, context)
}

export const updateInvitation = (tiid, body, context) => {
    return put(endpoint + tiid, body, context)
}

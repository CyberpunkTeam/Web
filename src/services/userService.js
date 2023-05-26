import {post, get, put} from "./baseService";

const endpoint = "users/"

export const createUser = (body) => {
    return post(endpoint, body, null)
}

export const getUser = (uid, context) => {
    return get(endpoint + uid, context)
}

export const getProfile = (uid, context) => {
    return get( "profiles/" + uid, context)
}

export const getUsers = (context) => {
    return get(endpoint, context)
}

export const updateUser = (uid, body, context) => {
    return put(endpoint + uid, body, context)
}

export const followUser = (uid, followUid, context) => {
    return post(endpoint + uid + "/following/" + followUid, null, context)
}

export const followTeams = (uid, followTid, context) => {
    return post(endpoint + "teams/" + uid + "/following/" + followTid, null, context)
}

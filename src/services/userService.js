import {post, get, put} from "./baseService";

const endpoint = "users/"

export const createUser = (body) => {
    return post(endpoint, body)
}

export const getUser = (uid) => {
    return get(endpoint+ uid)
}

export const getProfile = (uid) => {
    return get( "profiles/" + uid)
}

export const getUsers = () => {
    return get(endpoint)
}

export const updateUser = (uid, body) => {
    return put(endpoint + uid, body)
}

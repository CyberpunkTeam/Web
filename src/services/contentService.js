import {get, post, erase} from "./baseService";

const endpoint = "contents/"
const homeEndpoint = "home/"

export const createArticle = (body, context) => {
    return post(endpoint, body, context)
}

export const getArticle = (cid, context) => {
    return get(endpoint + `${cid}`, context)
}

export const getMyArticles = (uid, context) => {
    return get(endpoint + `?author_uid=${uid}`, context)
}

export const likeArticle = (cid, uid, context) => {
    return post(endpoint + `${cid}/likes/${uid}`, context)
}

export const unlikeArticle = (cid, uid, context) => {
    return erase(endpoint + `${cid}/likes/${uid}`, context)
}

export const getHome = (uid, context) => {
    return get(homeEndpoint + uid, context)
}

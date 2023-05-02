import {get, post, erase} from "./baseService";

const endpoint = "contents/"

export const createArticle = (body) => {
    return post(endpoint, body)
}

export const getArticle = (cid) => {
    return get(endpoint + `${cid}`)
}

export const getMyArticles = (uid) => {
    return get(endpoint + `?author_uid=${uid}`)
}

export const getArticles = () => {
    return get(endpoint)
}

export const likeArticle = (cid, uid) => {
    return post(endpoint + `${cid}/likes/${uid}`)
}

export const unlikeArticle = (cid, uid) => {
    return erase(endpoint + `${cid}/likes/${uid}`)
}

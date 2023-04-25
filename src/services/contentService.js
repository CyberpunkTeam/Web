import {get, post} from "./baseService";

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

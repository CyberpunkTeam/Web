import {get, post} from "./baseService";

const endpoint = "contents/"

export const createArticle = (body) => {
    return post(endpoint, body)
}

export const getArticle = (cid) => {
    return get(endpoint + `${cid}`)
}

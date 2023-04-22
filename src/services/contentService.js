import {post} from "./baseService";

const endpoint = "contents/"

export const createArticle = (body) => {
    return post(endpoint, body)
}

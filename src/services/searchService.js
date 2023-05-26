import {get} from "./baseService";

const endpoint = "searches/"

export const search = (word, context) => {
    return get(endpoint + '?word=' + word, context)
}

export const searchCity = (city, context) => {
    return get('locations/?word=' + city, context)
}

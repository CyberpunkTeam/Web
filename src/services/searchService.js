import {get} from "./baseService";

const endpoint = "searches/"

export const search = (word) => {
    return get(endpoint + '?word=' + word)
}

export const searchCity = (city) => {
    return get('locations/?word=' + city)
}

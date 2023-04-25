import moment from "moment";

export const formatDate = (date) => {
    const d = date.replace(/:/, ' ');
    return moment.utc(d, 'DD/MM/YYYY hh:mm:ss').fromNow();
}

export const formatDatePublish = (date) => {
    const d = date.replace(/:/, ' ');
    return moment.utc(d, 'DD/MM/YYYY hh:mm:ss').format("DD MMMM YYYY");
}

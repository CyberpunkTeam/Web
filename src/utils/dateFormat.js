import moment from "moment";

export const formatDate = (date) => {
    const d = date.replace(/:/, ' ');
    return moment.utc(d, 'DD/MM/YYYY hh:mm:ss').fromNow();
}

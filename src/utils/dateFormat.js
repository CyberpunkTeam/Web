import moment from "moment";

export const formatDate = (date) => {
    const d = date.replace(/:/, ' ');
    return moment.utc(d, 'DD/MM/YYYY hh:mm:ss').fromNow();
}

export const formatDatePublish = (date) => {
    const d = date.replace(/:/, ' ');
    return moment.utc(d, 'DD/MM/YYYY hh:mm:ss').format("DD MMMM YYYY");
}

export const formatDateMessage = (date) => {
    const d = date.replace(/:/, ' ');
    const today = moment.utc().valueOf()
    const formatDate =  moment.utc(d, 'DD/MM/YYYY hh:mm:ss')
    if (formatDate <= today) {
        return formatDate.format("hh:mm A")
    } else {
        return formatDate.format("DD MMMM YYYY");
    }
}

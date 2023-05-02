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
    if (date === null || date.seconds === null || date.seconds === undefined) {
        return "Now"
    }

    const today = moment.utc().valueOf()
    if (date.seconds <= today) {
        return moment.unix(date.seconds).format("hh:mm A");
    } else {
        return moment.unix(date.seconds).format("DD MMMM YYYY");
    }
}

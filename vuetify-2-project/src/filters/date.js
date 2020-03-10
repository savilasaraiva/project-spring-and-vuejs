import moment from "moment";

export default (data) => {
    return data ? moment(data).format('DD/MM/YYYY') : "";
}

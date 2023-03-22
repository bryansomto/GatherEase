import moment from "moment"
export const useDate = (createdAt) => moment(createdAt).format("dddd, MMM D YYYY")
export const useTime = (createdAt)=> moment(createdAt).format("hh:mm:ss a")
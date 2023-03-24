import Cookie from "universal-cookie"

export const opt = {
    expires: new Date((new Date().getTime() + 24 * 60 * 60 * 1000)),
    path: '/' 
}
const cookie = new Cookie()
export const setCookie = (key,value)=>cookie.set(key,value,opt)
export const getCookie = (key)=> cookie.get(key)
export const removeCookie = (key)=> cookie.remove(key)
export const encodeRole = (role)=>{
    const mapper = {
        "ORGANIZER":process.env.REACT_APP_ORGANIZER,
        "USER":process.env.REACT_APP_USER
    }
    return mapper[role]
}
export const decodeRole = (role)=>{
    const mapper = {
        [process.env.REACT_APP_ORGANIZER]:"ORGANIZER",
        [process.env.REACT_APP_USER]:"USER"
    }
    return mapper[role]
}

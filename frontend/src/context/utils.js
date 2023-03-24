import Cookie from "universal-cookie"

export const opt = {
    expires: new Date((new Date().getTime() + 24 * 60 * 60 * 1000)),
    path: '/' 
}
const cookie = new Cookie()
export const setCookie = (key,value)=>cookie.set(key,value,opt)
export const getCookie = (key)=> cookie.get(key)
export const removeCookie = (key)=> cookie.remove(key)

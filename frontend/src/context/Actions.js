import { getCookie } from "./utils"
export const initialState = {
    user:null,
    login_error:{msg:"",show:false,type:""},
    register_error:{msg:"",show:false,type:""},
    code_error:{msg:"",show:false,type:""},
    login_redirect:false,
    register_redirect:false,
    code_redirect:false,
    token:sessionStorage.getItem("token") || null,
    role:sessionStorage.getItem("role") || null,
    id:sessionStorage.getItem("id") || null,
}
export const actions = {
    SET_FORM_ERROR:"SET_FORM_ERROR",
    SET_FORM_DEFAULT:"SET_FORM_DEFAULT",
    SET_CURRENT_USER:"SET_CURRENT_USER",
    SETUP_USER:"SETUP_USER",
    SET_REDIRECT:"SET_REDIRECT"
}
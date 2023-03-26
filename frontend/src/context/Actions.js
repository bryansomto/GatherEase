import { getCookie} from "./utils"
export const initialState = {
    user:null,
    login_error:{msg:"",show:false,type:""},
    register_error:{msg:"",show:false,type:""},
    code_error:{msg:"",show:false,type:""},
    login_redirect:false,
    register_redirect:false,
    code_redirect:false,
    token:getCookie("_A") || null,
    refresh:getCookie("_R") || null,
    role:getCookie("_R_F") || null,
    id:getCookie("_D") || null,
    global_err:{msg:"",show:false,type:""},
    eventAttended:{data:[], loading:true}
}
export const actions = {
    SET_FORM_ERROR:"SET_FORM_ERROR",
    SET_FORM_DEFAULT:"SET_FORM_DEFAULT",
    SET_CURRENT_USER:"SET_CURRENT_USER",
    SETUP_USER:"SETUP_USER",
    SET_REDIRECT:"SET_REDIRECT",
    LOGOUT:"LOGOUT",
    SET_GLOBAL_ERROR:"SET_GLOBAL_ERROR",
    SET_GLOBAL_ERROR_DEFAULTS:"SET_GLOBAL_ERROR_DEFAULTS",
    SET_EVENTS_ATTENDED:"SET_EVENTS_ATTENDED",
    SET_EVENTS_ATTENDED_DEFAULT:"SET_EVENTS_ATTENDED_DEFAULT"
}
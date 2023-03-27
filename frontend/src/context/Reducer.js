import { actions } from "./Actions"


export const reducer = (state,action) =>{
    switch (action.type) {
        case actions.SET_FORM_ERROR:{
            const {error, type} = action.payload
            return {...state, [`${type}_error`]:error}
        }
        case actions.SET_FORM_DEFAULT:{
            const {type} = action.payload
            const error = {msg:"",show:false,type:""}
            return {...state, [`${type}_error`]:error}
        }
        case actions.SETUP_USER:{
            const {user,role,id} = action.payload
            return {...state, user, role, id}
        }
        case actions.SET_REDIRECT:{
            const {type,status} = action.payload
            return {...state, [`${type}_redirect`]:status}
        }
        case actions.LOGOUT:{
            return {...state, token:null,refresh:null,role:null,id:null}
        }
        case actions.SET_GLOBAL_ERROR:{
            const {err} = action.payload
            return {...state, global_err:err}
        }
        case actions.SET_GLOBAL_ERROR_DEFAULTS:{
            const err = {msg:"",show:false,type:""}
            return {...state, global_err:err}
        }
        case actions.SET_EVENTS_ATTENDED:{
            const {events} = action.payload
            return {...state, eventAttended:{data:events, loading:false}}
        }
        case actions.SET_EVENTS_ATTENDED_DEFAULT:{
            return {...state, eventAttended:{data:[], loading:true}}
        }
        case actions.SET_AUTH:{
            const {accessToken, refreshToken} = action.payload
            return {...state, refresh:refreshToken, token:accessToken}
        }
        default:{
            return state
        }
    }
}
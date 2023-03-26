import { actions } from "./Actions"


export const reducer = (state,action)=>{
    switch (action.type){
        case actions.GET_EVENTS:{
            const {events} = action.payload
            console.log(events)
            const {data,page,totalPages} = events
            return {...state, events:{...state.events,data,page,totalPages,loading:false}}
        }
        case actions.START_UPLOAD:{
            return {...state,  eventImage:{...state.eventImage,loading:true}}
        }
        case actions.UPLOAD_IMAGE:{
            const {data} = action.payload
            return {...state,  eventImage:{data,loading:false}}
        }
        case actions.SET_ERROR:{
            const {err, type} = action.payload
            return {...state,  [type]:err}
        }
        case actions.DEFAULT_ERROR:{
            const err = {msg:"",show:false,type:""}
            return {...state,  form_error: err}
        }
        case actions.SET_CATEGORY:{
            const {data} = action.payload
            return {...state,  category:{data:data, loading:false}}
        }
        case actions.SET_VENUES:{
            const {data} = action.payload
            return {...state,  venues:{data:data, loading:false}}
        }
        default:{
            throw new Error(`No such action as ${action.type}`)
        }
    }

}

import { actions } from "./Actions"


export const reducer = (state,action)=>{
    switch (action.type){
        case actions.GET_EVENTS:{
            const {events} = action.payload
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
            return {...state,  form_error: err, update_error: err}
        }
        case actions.SET_CATEGORY:{
            const {data} = action.payload
            return {...state,  category:{data:data, loading:false}}
        }
        case actions.SET_VENUES:{
            const {data} = action.payload
            return {...state,  venues:{data:data.data,page:data.page,totalPages:data.totalPages, loading:false}}
        }
        case actions.SET_YOUR_EVENTS:{
            const {data,page,totalPages} = action.payload
            return {...state,  usersEvents:{...state.usersEvents,data,page,totalPages,loading:false}}
        }
        case actions.SET_CURRENT_EVENT:{
            const {event} = action.payload
            return {...state,  currentEvent:{data:event, loading:false}}
        }
        case actions.SET_CURRENT_EVENT_DEFAULT:{
            return {...state,  currentEvent:{data:{}, loading:true}}
        }
        case actions.GET_ORGANIZER:{
            const {organizer} = action.payload
            return {...state,  organizer:{data:organizer,loading:false}}
        }
        case actions.GET_GUESTS:{
            const {guests} = action.payload
            return {...state,  guests:{data:guests,loading:false}}
        }
        case actions.SET_VENUES_DEFAULT:{
            return {...state,  venues:{...state.venues, loading:true}}
        }
        case actions.SET_CURRENT_VENUE:{
            const {venue} = action.payload
            return {...state,  currentVenue:{data:venue, loading:false}}
        }
        case actions.SET_CURRENT_VENUE_DEFAULT:{
            return {...state,  currentVenue:{data:[], loading:true}}
        }
        case actions.SET_EVENTS_DEFAULT:{
            return {...state,  events:{data:[],page:0,totalPages:0, loading:true}}
        }
        case actions.SET_DEFAULT_USER_EVENTS:{
            return {...state,  usersEvents: { data: [], page:0,totalPages:0,loading: true, err: {msg:"",show:false,type:""} }}
        }
        case actions.SET_DEFAULT_GUESTS:{
            return {...state,  guests:{data:[],loading:true}}
        }
        default:{
            throw new Error(`No such action as ${action.type}`)
        }
    }

}

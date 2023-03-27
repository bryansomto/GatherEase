import { getCookie } from "../../../context/utils";

export const initialState = {
  events: { data: [], page:0,totalPages:0,loading: true, err: {msg:"",show:false,type:""} },
  usersEvents: { data: [], page:0,totalPages:0,loading: true, err: {msg:"",show:false,type:""} },
  currentEvent:{data:{}, loading:true},
  eventImage:{data:getCookie("_image") || "",loading:false},
  organizer:{data:{},loading:true},
  category:{data:[],loading:true},
  venues:{data:[],page:0,totalPages:0,loading:true},
  currentVenue:{data:{}, loading:true},
  guests:{data:[],loading:true}
};
export const actions = {
  GET_EVENTS: "GET_EVENTS",
  SET_EVENTS_DEFAULT:"SET_EVENTS_DEFAULT",
  SET_ERROR: "SET_ERROR",
  UPLOAD_IMAGE:"UPLOAD_IMAGE",
  START_UPLOAD:"START_UPLOAD",
  DEFAULT_ERROR:"DEFAULT_ERROR",
  SET_CATEGORY:"SET_CATEGORY",
  SET_VENUES:"SET_VENUES",
  SET_YOUR_EVENTS:"SET_YOUR_EVENTS",
  SET_CURRENT_EVENT:"SET_CURRENT_EVENT",
  SET_CURRENT_EVENT_DEFAULT:"SET_CURRENT_EVENT_DEFAULT",
  GET_ORGANIZER:"GET_ORGANIZER",
  GET_GUESTS:"GET_GUESTS",
  SET_VENUES_DEFAULT:"SET_VENUES_DEFAULT",
  SET_CURRENT_VENUE:"SET_CURRENT_VENUE",
  SET_CURRENT_VENUE_DEFAULT:"SET_CURRENT_VENUE_DEFAULT",
  SET_DEFAULT_USER_EVENTS:"SET_DEFAULT_USER_EVENTS",
  SET_DEFAULT_GUESTS:"SET_DEFAULT_GUESTS"
};

import { getCookie } from "../../../context/utils";

export const initialState = {
  events: { data: [], page:0,totalPages:0,loading: true, err: {msg:"",show:false,type:""} },
  usersEvents: { data: [], page:0,totalPages:0,loading: true, err: {msg:"",show:false,type:""} },
  currentEvent:{data:{}, loading:true},
  eventImage:{data:getCookie("_image") || "",loading:false},
  organizer:{data:{},loading:true},
  form_error: {msg:"",show:false,type:""},
  update_error:{msg:"",show:false,type:""},
  category:{data:[],loading:true},
  venues:{data:[],loading:true},
  guests:{data:[],loading:true}
};
export const actions = {
  GET_EVENTS: "GET_EVENTS",
  ADD_EVENT: "GET_EVENT",
  DELETE_EVENTS: "DELETE_EVENTS",
  UPDATE_EVENT: "UPDATE_EVENT",
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
  GET_GUESTS:"GET_GUESTS"
};

import React, { useContext, useReducer } from "react";
import { actions, initialState } from "./Actions";
import { reducer } from "./Reducer";
import { useGlobally } from "../../../context/AppContext";
import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../../../context/utils";

const EventProvider = React.createContext();

const EventContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token, setGlobalErr } = useGlobally();
  const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  const setErr = (type, err) => {
    dispatch({ type: actions.SET_ERROR, payload: { type, err } });
    setTimeout(() => dispatch({ type: actions.DEFAULT_ERROR }), 3000);
  };
  const addFilter  = (obj)=>{
    let url = "event"
    let del = []
    Object.entries(obj).forEach((i)=>{
      if(i[1]){
        del = [...del, i]
        return
      }
    })
    del.forEach((i, index)=>{
      if(index === 0){
        url = `event?${i[0]}=${i[1]}`
      }else{
        url += `&${i[0]}=${i[1]}`
      }
    })
    return url
  }
  const getEvents = async (body={city:"",category:"",venue:"",startDate:"",endDate:""}) => {
    dispatch({type:actions.SET_EVENTS_DEFAULT})
    let url = "event"
    const {city,category,venue} = body
    const startDate = (body.startDate)?new Date(body.startDate).toISOString():""
    const endDate = (body.endDate)?new Date(body.endDate).toISOString():""
    if(city && category && venue && startDate && endDate){
      url = `event?city=${city}&category=${category}&venue=${venue}&startDate=${startDate}&endDate=${endDate}`
    }else{
      const map = {city:city,category:category,venue:venue,startDate:startDate,endDate:endDate}
      url = addFilter(map)
    }
    try {
      const { data } = await client.get(url);
      dispatch({
        type: actions.GET_EVENTS,
        payload: { events: data.data },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleEvent = async (id) => {
    dispatch({ type: actions.SET_CURRENT_EVENT_DEFAULT });
    try {
      const { data } = await client.get(`event/${id}`);
      dispatch({
        type: actions.SET_CURRENT_EVENT,
        payload: { event: data.data },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getEventOrganizer = async (id) => {
    try {
      const { data } = await client.get(`event/organizer/${id}`);
      dispatch({
        type: actions.GET_ORGANIZER,
        payload: { organizer: data.data },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteEvent = (id) => client.delete(`event/${id}`);
  const getUpdateData = (id) => client.get(`event/${id}`);
  const updateEvent = async (id, body) => {
    const { title, description } = body;
    try {
      await client.put(`event/${id}`, { title, description });
      setErr("update_error", {
        msg: "Event successfully updated",
        show: true,
        type: "success",
      });
    } catch (error) {
      if (error?.response?.data) {
        setErr("update_error", {
          msg: error.response.data.message,
          show: true,
          type: "warning",
        });
      }
      console.log(error);
    }
  };

  const uploadImage = async (body) => {
    dispatch({
      type: actions.START_UPLOAD,
    });
    try {
      const { data } = await client.post("event/upload", body);
      setCookie("_image", data.data.imageUrl);
      dispatch({
        type: actions.UPLOAD_IMAGE,
        payload: { data: data.data.imageUrl },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createEvents = async (body) => {
    const {
      date,
      title,
      description,
      categoryId,
      venueId,
      isPublic,
      day,
      city,
      imageUrl,
    } = body;
    try {
      await client.post("event", {
        date,
        title,
        description,
        categoryId,
        venueId,
        isPublic,
        day,
        city,
        imageUrl,
      });
      removeCookie("_image");
      setErr("form_error", {
        msg: "Event successfully created",
        show: true,
        type: "success",
      });
      getEvents();
    } catch (error) {
      if (error?.response?.data) {
        setErr("form_error", {
          msg: error.response.data.message,
          show: true,
          type: "warning",
        });
      }
      console.log(error);
    }
  };
  const getUserEvents = async (id) => {
    try {
      const { data } = await client.get(`event?organizerId=${id}`);
      const { page, totalPages } = data.data;
      dispatch({
        type: actions.SET_YOUR_EVENTS,
        payload: {
          data: data.data.data,
          page,
          totalPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const rspvNow =  async (body) => {
    try {
      const { data } = await client.post(`event/rsvp`,body);
      setGlobalErr({msg:"You Registered for this event",show:true,type:"success"})
    } catch (error) {
      console.log(error);
    }
  };
  const getGuests = async (id) => {
    getSingleEvent(id)
    try {
      const { data } = await client.get(`event/guestList/${id}`);
      dispatch({
        type:actions.GET_GUESTS,
        payload:{guests:data.data.guests}
      })
    } catch (error) {
      console.log(error);
    }
  };

  //----------------categories--------------------
  const getCategories = async () => {
    try {
      const { data } = await client.get("category");
      dispatch({
        type: actions.SET_CATEGORY,
        payload: { data: data.data.data },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleCategory = async (id) => {
    try {
      const { data } = await client.get(`category/${id}`);
      setCookie("_image", data.data.imageUrl);
      dispatch({
        type: actions.UPLOAD_IMAGE,
        payload: { data: data.data.imageUrl },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getVenues = async (body={city: "", name: "" }) => {
    dispatch({ type: actions.SET_VENUES_DEFAULT});
    const {city,name} = body
    let url  = "venue";
    if(city && name){
      url = `venue?city=${city}&name=${name}`
    }
    if(city){
      url = `venue?city=${city}`
    }
    if(name){
      url = `venue?name=${name}`
    }
    try {
      const { data } = await client.get(url);
      dispatch({ type: actions.SET_VENUES, payload: { data: data.data.data } });
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleVenue = async (id) => {
    dispatch({type:actions.SET_CURRENT_VENUE_DEFAULT})
    try {
      const { data } = await client.get(`venue/${id}`);
      dispatch({
        type: actions.SET_CURRENT_VENUE,
        payload: { venue: data.data },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <EventProvider.Provider
      value={{
        ...state,
        getEvents,
        createEvents,
        uploadImage,
        setErr,
        getCategories,
        getSingleCategory,
        getVenues,
        getUserEvents,
        getSingleEvent,
        updateEvent,
        getUpdateData,
        deleteEvent,
        getEventOrganizer,
        getGuests,
        rspvNow,
        getSingleVenue
      }}
    >
      {children}
    </EventProvider.Provider>
  );
};

//hook
const useEvents = () => useContext(EventProvider);

export { EventContext, useEvents };

import React, { useContext, useReducer } from "react";
import { actions, initialState } from "./Actions";
import { reducer } from "./Reducer";
import { useGlobally } from "../../../context/AppContext";
import axios from "axios";
import { removeCookie, setCookie } from "../../../context/utils";

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
  axios.interceptors.response.use(
    (response)=>response, 
    function (error) {
    if(error.message && error.message === "Network Error"){
      setGlobalErr({msg:"Check your internet connection",show:true,type:"warning"})
    }
    return Promise.reject(error);
  });
  const setErr = (type, err) => {
    dispatch({ type: actions.SET_ERROR, payload: { type, err } });
    setTimeout(() => dispatch({ type: actions.DEFAULT_ERROR }), 3000);
  };
  const addFilter = (obj, url) => {
    Object.entries(obj).forEach((i) => {
      if(i[1]){
        url += `&${i[0]}=${i[1]}`;
      }
      }
    );
    return url;
  };
  const setGlobalError = (error) => {
    if (error.response && error.response.data && error.response.status !== 401) {
      setGlobalErr({msg:error.response.data.message ,show: true,type: "warning"});
    }
  };
  const getEvents = async (
    body = { city: "", category: "", venue: "", startDate: "", endDate: "" },
    page = 1,
    count = 5
  ) => {
    dispatch({ type: actions.SET_EVENTS_DEFAULT });
    let url = "event";
    const { city, category, venue } = body;
    const startDate = body.startDate
      ? new Date(body.startDate).toISOString()
      : "";
    const endDate = body.endDate ? new Date(body.endDate).toISOString() : "";
      url = `event?page=${page}&count=${count}`
      const map = {
        city: city,
        category: category,
        venue: venue,
        startDate: startDate,
        endDate: endDate,
      }
      url = addFilter(map, url);
    try {
      const { data } = await client.get(url);
      dispatch({
        type: actions.GET_EVENTS,
        payload: { events: data.data },
      });
    } catch (error) {
      setGlobalError(error)
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
      setGlobalError(error)
    }
  };
  const deleteEvent = (id) => client.delete(`event/${id}`);
  const getUpdateData = (id) => client.get(`event/${id}`);
  const updateEvent = async (id, body) => {
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
      await client.put(`event/${id}`, {date,
        title,
        description,
        categoryId,
        venueId,
        isPublic,
        day,
        city,
        imageUrl, });
      setGlobalErr({
        msg: "Event successfully updated",
        show: true,
        type: "success",
      });
    } catch (error) {
      setGlobalError(error);
    }
  };

  const setCurrentImage = (data)=>{
    dispatch({
      type: actions.START_UPLOAD,
    });
    setCookie("_image", data);
    dispatch({
      type: actions.UPLOAD_IMAGE,
      payload: { data },
    });
  }
  const storeFormdata = (data)=>{
    dispatch({
      type: actions.UPLOAD_IMAGE,
      payload: { data},
    });
  }

  const uploadImage = async (body) => {
    dispatch({
      type: actions.START_UPLOAD,
    });
    try {
      const { data } = await client.post("event/upload", body);
      dispatch({
        type: actions.UPLOAD_IMAGE,
        payload: { data: data.data.imageUrl },
      });
    } catch (error) {
      setGlobalError(error)
    }
  };

  const createEvents = (body) => {
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
    return client.post("event", {
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

  };
  const mapping = (body, url) => {
    Object.entries(body).forEach((i) => {
      if (i[1]) {
        url += `&${i[0]}=${i[1]}`;
      }
    });
    return url;
  };
  const getSingleEventUser =  (id) => client.get(`event/${id}`);
  const getUserEvents = async (
    id,
    body = { city: "", category: "", venue: "", startDate: "", endDate: "" },
    page=1,
    count=5
  ) => {
    dispatch({ type: actions.SET_DEFAULT_USER_EVENTS });
    let url = `event?organizerId=${id}&page=${page}&count=${count}`;
    const { city, category, venue } = body;
    const startDate = body.startDate
      ? new Date(body.startDate).toISOString()
      : "";
    const endDate = body.endDate ? new Date(body.endDate).toISOString() : "";
    const newBody ={city, category, venue,startDate,endDate} 
    url = mapping(newBody, url);
    try {
      const { data } = await client.get(url);
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
      setGlobalError(error)
    }
  };
  //-------GUESTS---------------
  const rspvNow = async (body) => {
    try {
      await client.post(`event/rsvp`, body);
      setGlobalErr({
        msg: "You Registered for this event",
        show: true,
        type: "success",
      });
    } catch (error) {
      setGlobalError(error)
    }
  };
  const getGuests = async (id) => {
    dispatch({type:actions.SET_DEFAULT_GUESTS})
    getSingleEvent(id);
    try {
      const { data } = await client.get(`event/guestList/${id}`);
      dispatch({
        type: actions.GET_GUESTS,
        payload: { guests: data.data.guests },
      });
    } catch (error) {
      setGlobalError(error)
    }
  };
  const removeGuest = async (id,eventId) => {
    try {
      await client.delete(`guest/${id}`);
      getGuests(eventId)
      setGlobalErr({
        msg: "You removed a user from guest list",
        show: true,
        type: "success",
      });
    } catch (error) {
      setGlobalError(error)
    }
  };
  const attendedGuest = async (guestId, eventId) => {
    try {
      await client.post(`guest/markAttended`,{guestId});
      getGuests(eventId)
      setGlobalErr({
        msg: "You changed guest status to Attended event",
        show: true,
        type: "success",
      });
    } catch (error) {
      setGlobalError(error)
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
  const getVenues = async (body = { city: "", name: "" },page=1,count=5) => {
    dispatch({ type: actions.SET_VENUES_DEFAULT });
    const { city, name } = body;
    let url = `venue?page=${page}&count=${count}`;
    if (city && name) {
      url += `&city=${city}&name=${name}`;
    }
    if (city) {
      url += `&city=${city}`;
    }
    if (name) {
      url += `&name=${name}`;
    }
    try {
      const { data } = await client.get(url);
      dispatch({ type: actions.SET_VENUES, payload: { data: data.data} });
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleVenue = async (id) => {
    dispatch({ type: actions.SET_CURRENT_VENUE_DEFAULT });
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
        getSingleVenue,
        removeGuest,
        setGlobalError,
        getSingleEventUser,
        attendedGuest,
        setCurrentImage,
        storeFormdata
      }}
    >
      {children}
    </EventProvider.Provider>
  );
};

//hook
const useEvents = () => useContext(EventProvider);

export { EventContext, useEvents };

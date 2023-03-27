import React, { useContext, useEffect, useReducer } from "react";
import { actions, initialState } from "./Actions";
import { reducer } from "./Reducer";
import { setCookie, decodeRole, encodeRole, removeCookie, getCookie } from "./utils";

import axios from "axios";
const AppProvider = React.createContext();

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "x-auth-token": `${state.token}`,
    },
  });
  client.interceptors.response.use((response)=>response, function (error) {
    // if(error.response && error.response.status === 401){
    //   logout()
    // }
    return Promise.reject(error);
  });
  //----- utils -----------------------------------
  const closeGlobal = ()=>{
    dispatch({
      type:actions.SET_GLOBAL_ERROR_DEFAULTS,
    })
  }
  const setGlobalErr = (err)=>{
    dispatch({
      type:actions.SET_GLOBAL_ERROR,
      payload:{err}
    })
    setTimeout(()=>closeGlobal(),6000)
  }
  const setFormError = (type, error) => {
    dispatch({
      type: actions.SET_FORM_ERROR,
      payload: { error, type },
    });
    setTimeout(
      () =>
        dispatch({
          type: actions.SET_FORM_DEFAULT,
          payload: { type },
        }),
      3000
    );
  };
  const setError = (error, type, err) => {
    if (error?.response?.data) {
      setFormError(type, { ...err, msg: error.response.data.message });
    }
  };

  const setLocal = (token, refreshToken, role, id) => {
    setCookie("_A", token);
    setCookie("_R", refreshToken);
    setCookie("_R_F", encodeRole(role));
    setCookie("_D", id);
  };
  const defaultLocal = () => {
    removeCookie("_A");
    removeCookie("_R");
    removeCookie("_R_F");
    removeCookie("_D");
  };
  const setRedirect = (type, status) => {
    dispatch({
      type: actions.SET_REDIRECT,
      payload: { type, status },
    });
    setTimeout(
      () =>
        dispatch({
          type: actions.SET_REDIRECT,
          payload: { type, status: false },
        }),
      2000
    );
  };
  //----- users -----------------------------------
  const createUser = async (type, body) => {
    const { firstName, lastName, phone, email, password } = body;
    return await client.post(`${type}/register`, {
        firstName,
        lastName,
        phone,
        email,
        password,
      });
  };
  const setupUser = (accessToken, refreshToken, role, id, user)=>{
    dispatch({
      type: actions.SETUP_USER,
      payload: {
        user,
        role: encodeRole(role),
        id,
      },
    });
    setLocal(accessToken, refreshToken, role, id);
    dispatch({
      type:actions.SET_AUTH,
      payload:{accessToken, refreshToken}
    })
  }
  const loginUser = async (type, body) => {
    const { email, password } = body;
    const path = "login";

    try {
      const { data } = await client.post(`${type}/login`, { email, password });
      const { user, accessToken, refreshToken } = data;
      if(type === "user"){
        setupUser(accessToken, refreshToken, user.role, user.id,user);
      }else{
        setupUser(accessToken, refreshToken, user.role, user.profile[`${type}Id`],user);
      }
      setRedirect(path, true);
    } catch (error) {
      setError(error, path, { msg: "", show: true, type: "warning" });
      console.log(error);
    }
  };
  const confirmUser = async (type, body) => {
    const { phone, code } = body;
    return await client.post(`${type}/confirmation`, {
        phone,
        code,
      });
  };
  const getEventsAttended = async ()=>{
    dispatch({type:actions.SET_EVENTS_ATTENDED_DEFAULT})
    try {
      const { data } = await client.get(`user/profile`);
      dispatch({
        type:actions.SET_EVENTS_ATTENDED,
        payload:{events:data.data.eventsAttended}
      })
    } catch (error) {
      console.log(error);
    }
  }
  const mapper = {
    ORGANIZER: "organizer",
    USER: "user",
  };
  const getCurrentUser = async () => {
    const type = mapper[decodeRole(state.role)];
    try {
      const { data } = await client.get(`${type}/profile`);
      if(type === "user"){
        dispatch({
          type: actions.SETUP_USER,
          payload: {
            user: data.data,
            role: encodeRole(data.data.role),
            id: data.data.id,
          },
        });
      }else{
        dispatch({
          type: actions.SETUP_USER,
          payload: {
            user: data.data,
            role: encodeRole(data.data.role),
            id: data.data.profile[`${type}Id`],
          },
        });
      }
    } catch (error) {
      logout()
    }
  };
  const dryLogout = ()=>{
    defaultLocal();
      dispatch({
        type: actions.LOGOUT,
      });
  }
  const logout = async() => {
    const type = mapper[decodeRole(state.role)]
    try {
      await client.post(`${type}/logout`)
      dryLogout()
    } catch (error) {
      dryLogout()
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <AppProvider.Provider
      value={{
        ...state,
        createUser,
        setFormError,
        loginUser,
        confirmUser,
        getCurrentUser,
        logout,
        setGlobalErr,
        getEventsAttended,
        closeGlobal,
        setError
      }}
    >
      {children}
    </AppProvider.Provider>
  );
};

const useGlobally = () => {
  return useContext(AppProvider);
};

export { useGlobally, AppContext };

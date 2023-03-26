import React, { useContext, useEffect, useReducer } from "react";
import { actions, initialState } from "./Actions";
import { reducer } from "./Reducer";
import { setCookie, decodeRole, encodeRole, removeCookie } from "./utils";

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
  //----- utils -----------------------------------
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
    if (error.response.data) {
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
    const path = "register";
    const { firstName, lastName, phone, email, password } = body;
    try {
      const { data } = await client.post(`${type}/register`, {
        firstName,
        lastName,
        phone,
        email,
        password,
      });
      console.log(data);
      setFormError(path, {
        msg: "Redirecting to confirm registration...",
        show: true,
        type: "success",
      });
      setRedirect(path, true);
    } catch (error) {
      setError(error, path, { msg: "", show: true, type: "warning" });
      console.log(error);
    }
  };
  const loginUser = async (type, body) => {
    const { email, password } = body;
    const path = "login";

    try {
      const { data } = await client.post(`${type}/login`, { email, password });
      const { user, accessToken, refreshToken } = data;
      dispatch({
        type: actions.SETUP_USER,
        payload: {
          user,
          role: encodeRole(user.role),
          id: user.profile[`${type}Id`],
        },
      });
      setLocal(accessToken, refreshToken, user.role, user.profile[`${type}Id`]);
      setRedirect(path, true);
    } catch (error) {
      setError(error, path, { msg: "", show: true, type: "warning" });
      console.log(error);
    }
  };
  const confirmUser = async (type, body) => {
    const { phone, code } = body;
    const path = "code";
    try {
      const { data } = await client.post(`${type}/confirmation`, {
        phone,
        code,
      });
      console.log(data);
      setFormError(path, {
        msg: "Confirmed registration. Redirecting...",
        show: true,
        type: "success",
      });
      setRedirect(path, true);
    } catch (error) {
      setError(error, path, { msg: "", show: true, type: "warning" });
      console.log(error);
    }
  };
  const getCurrentUser = async () => {
    const mapper = {
      ORGANIZER: "organizer",
      USER: "user",
    };
    const type = mapper[decodeRole(state.role)];
    try {
      const { data } = await client.get(`${type}/profile`);
      dispatch({
        type: actions.SETUP_USER,
        payload: {
          user: data.data,
          role: encodeRole(data.data.role),
          id: data.data.profile[`${type}Id`],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
    defaultLocal();
    dispatch({
      type: actions.LOGOUT,
    });
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

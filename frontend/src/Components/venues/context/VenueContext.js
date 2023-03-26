import React, { useContext, useReducer } from "react";
import { actions, initialState } from "./Actions";
import { reducer } from "./Reducer";
import { useGlobally } from "../../../context/AppContext";
import axios from "axios";

const VenueProvider = React.createContext();

const VenueContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token } = useGlobally();
  const client = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
      "x-auth-token": `${token}`,
    },
  });
  const getVenues = async () => {
    try {
      const { data } = await client.get("venues");
      dispatch({
        type: actions.GET_VENUES,
        payload: { venues: data.data },
      });
    } catch (error) {
      console.log(error);
    }
  };
  //   const createEvents = async (body) => {
  //     try {
  //       await client.post("event", body);
  //       getEvents();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <VenueProvider.Provider value={{ ...state, getVenues }}>
      {children}
    </VenueProvider.Provider>
  );
};

//hook
const useVenues = () => useContext(VenueProvider);

export { VenueContext, useVenues };

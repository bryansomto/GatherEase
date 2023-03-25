import React, {  useContext, useReducer } from 'react'
import { actions,initialState } from './Actions'
import { reducer } from './Reducer'
import {useGlobally} from "../../../context/AppContext"
import axios from 'axios'

const EventProvider = React.createContext()

const EventContext = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)
    const {token} = useGlobally()
    const client = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers:{
            "x-auth-token":`${token}`
        }
    })
    const getEvents = async()=>{
        try {
           const {data} =  await client.get("event")
           dispatch({
            type:actions.GET_EVENTS,
            payload:{events:data.data}
           })
        } catch (error) {
            console.log(error)
        }
    }
    const createEvents = async(body)=>{
        try {
            await client.post("event",body)
            getEvents()
         } catch (error) {
             console.log(error)
         }
    }
  return (
    <EventProvider.Provider value={{...state, getEvents,createEvents}}>
        {children}
    </EventProvider.Provider>
  )
}

//hook
const useEvents = ()=> useContext(EventProvider)

export {EventContext,useEvents}
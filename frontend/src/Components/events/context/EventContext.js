import React, {  useContext, useReducer } from 'react'
import { actions,initialState } from './Actions'
import { reducer } from './Reducer'
import {useGlobally} from "../../../context/AppContext"
import axios from 'axios'
import { setCookie } from '../../../context/utils'

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
    const setErr = (type,err)=>{
        dispatch({type:actions.SET_ERROR,payload:{type,err}})
        setTimeout(()=>dispatch({type:actions.DEFAULT_ERROR}),3000)
    }
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
    const uploadImage = async(body)=>{
        dispatch({
            type:actions.START_UPLOAD
        })
        try {
            const {data} = await client.post("event/upload",body)
            setCookie("_image", data.data.imageUrl)
            dispatch({
                type:actions.UPLOAD_IMAGE,
                payload:{data:data.data.imageUrl}
            })
         } catch (error) {
             console.log(error)
         }
    }

    const createEvents = async(body)=>{
        const {date,title,description,categoryId,venueId,isPublic,day,city,imageUrl} = body
        try {
            await client.post("event",{date,title,description,categoryId,venueId,isPublic,day,city,imageUrl})
            setErr("form_error",{
                msg:"Event successfully created",
                show:true,
                type:"success"
            })
            getEvents()
         } catch (error) {
            if(error?.response?.data){
                setErr("form_error",{
                    msg:error.response.data.message,
                    show:true,
                    type:"warning"
                })
            }
             console.log(error)
         }
    }
    const getCategories = async ()=>{
        try {
            const {data} = await client.get("category")
            console.log(data.data)
            dispatch({type:actions.SET_CATEGORY,payload:{data:data.data.data}})
         } catch (error) {
             console.log(error)
         }
    }
    const getSingleCategory = async (id)=>{
        try {
            const {data} = await client.get(`category/${id}`)
            setCookie("_image", data.data.imageUrl)
            dispatch({
                type:actions.UPLOAD_IMAGE,
                payload:{data:data.data.imageUrl}
            })
         } catch (error) {
             console.log(error)
         }
    }
    const getVenues = async ()=>{
        try {
            const {data} = await client.get("venue")
            dispatch({type:actions.SET_VENUES,payload:{data:data.data.data}})
         } catch (error) {
             console.log(error)
         }
    }
  return (
    <EventProvider.Provider value={{...state, getEvents,createEvents,uploadImage,setErr,getCategories,getSingleCategory,getVenues}}>
        {children}
    </EventProvider.Provider>
  )
}

//hook
const useEvents = ()=> useContext(EventProvider)

export {EventContext,useEvents}
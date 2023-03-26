import React from 'react'
import CreateEventForm from './CreateEventForm'
import {EventWrapper} from "../../all/frames/EventWrapper"
import { useGlobally } from '../../../context/AppContext'
import { Navigate } from 'react-router-dom'
const Wrapper = () => {
  const {role} = useGlobally()
  const verify = role === process.env.REACT_APP_ORGANIZER
  if(!verify){
    return <Navigate to="/events"/>
  }
  return (
    <EventWrapper element={<CreateEventForm/>}/>
  )
}

export default Wrapper
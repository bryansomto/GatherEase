import React from 'react'
import { Navigate } from 'react-router-dom'
import { useGlobally } from '../../../context/AppContext'
import { EventWrapper } from "../../all/frames/EventWrapper"
import UpdateEventForm from './UpdateEventForm'
const Wrapper = () => {
  const {role} = useGlobally()
  const verify = role === process.env.REACT_APP_ORGANIZER
  if(!verify){
    return <Navigate to="/events"/>
  }
  return (
    <EventWrapper element={<UpdateEventForm/>}/>
  )
}

export default Wrapper
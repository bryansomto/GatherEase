import React from 'react'
import CreateEventForm from './CreateEventForm'
import {EventWrapper} from "../../all/frames/EventWrapper"
const Wrapper = () => {
  return (
    <EventWrapper element={<CreateEventForm/>}/>
  )
}

export default Wrapper
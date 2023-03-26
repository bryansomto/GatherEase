import moment from 'moment'
import React, { useEffect } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { useEvents } from '../events/context/EventContext'

export const ParseEvent = ({eventId}) => {
    const {getSingleEvent, currentEvent}  = useEvents()
    useEffect(
        ()=>{
            getSingleEvent(eventId)
        },[]
    )
    if(currentEvent.loading){
        return <>
        <td><BiLoaderAlt className='animate-spin text-sm'/></td>
        <td><BiLoaderAlt className='animate-spin text-sm'/></td>
        <td><BiLoaderAlt className='animate-spin text-sm'/></td>
        </>
    }
  return (
   <>
   <td>{currentEvent.data.title}</td>
   <td>{currentEvent.data.venue.name}</td>
   <td>{moment(currentEvent.data.date).format("dddd, MMM D YYYY")}</td>
   <td>{moment(currentEvent.data.date).format("hh:mm:ss a")}</td>
   </>
  )
}

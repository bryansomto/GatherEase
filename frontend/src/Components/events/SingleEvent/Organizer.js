import React from 'react'
import { useEffect } from 'react'
import { Loader } from '../../all/load/Loader'
import { useEvents } from '../context/EventContext'
import { Main } from './Detail'
import { BiLoaderAlt } from 'react-icons/bi'
export const Organizer = ({icon,title,value}) => {
    const {getEventOrganizer,organizer} = useEvents()
    useEffect(()=>{
        getEventOrganizer(value)
    },[value])
  return (
    <Main>
    <div className="title">
      {icon}
    <p>{title}</p>
    </div>
    {
        organizer.loading?<p className="text">
            <BiLoaderAlt className='animate-spin text-sm'/>
        </p>:
    <p className="text">{`${organizer.data.firstName} ${organizer.data.lastName}` || "Details not found"}</p>
    }
  </Main>
  )
}

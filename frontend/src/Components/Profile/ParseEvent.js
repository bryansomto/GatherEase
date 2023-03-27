import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useEvents } from '../events/context/EventContext'

export const ParseEvent = ({eventId,attended}) => {
    const {currentEvent,setGlobalError,getSingleEventUser}  = useEvents()
    const [data, setData] = useState(null)
    const getData = ()=>{
        getSingleEventUser(eventId).then((response)=>{
            const {data} = response
            setData(data.data)
        }).catch((error)=>{
            setGlobalError(error)
        })
    }
    useEffect(
        ()=>{
            getData()
        },[]
    )
    if(!data){
        return <>
        <Main><BiLoaderAlt className='animate-spin text-sm'/></Main>
        <Main><BiLoaderAlt className='animate-spin text-sm'/></Main>
        <Main><BiLoaderAlt className='animate-spin text-sm'/></Main>
        <Main><BiLoaderAlt className='animate-spin text-sm'/></Main>
        </>
    }
  return (
   <>
   <td>{data.title}</td>
   <td>{data.venue.name}</td>
   <td>{moment(data.date).format("dddd, MMM D YYYY")}</td>
   <td>{moment(data.date).format("hh:mm:ss a")}</td>
   <td>{attended?
    "Attended"
    :<>{(new Date(data.date) - new Date()) >= 0 ? "Upcoming" : "Missed It"}</>}
</td>
   </>
  )
}

const Main = styled.td`
${tw`w-[50px]`}
`
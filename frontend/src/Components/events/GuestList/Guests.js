import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {ContentHeader} from "../../all/headers/ContentHeader"
import { useParams } from 'react-router-dom'
import { useEvents } from '../context/EventContext'
import { Loader } from '../../all/load/Loader'


const Guests = () => {
    const {eventId} = useParams()
    const {getGuests, guests ,currentEvent} = useEvents()
    useEffect(()=>{
        getGuests(eventId)
    },[eventId])
    if(guests.loading){
        return <Main>
             <ContentHeader url={`/events/${eventId}`} title="guests" text="view event"/>
             <Loader/>
        </Main>
    }
    const expired = new Date(currentEvent.data.date) - new Date()
    const alreadyExpired = expired <= 24 * 60 * 60 * 1000
  return (
    <Main>
        <ContentHeader url={`/events/${eventId}`} title="guests" text="view event"/>
        <table>
            <thead>
                <tr>
                    <td>name</td>
                    <td>email</td>
                    <td>actions</td>
                </tr>
            </thead>
            <tbody>
                {
                   guests.data.length === 0?
                            <tr>
                        <td colSpan={3} style={{textAlign:"center"}}>

                        No guests yet
                        </td>
                        </tr>
                    : guests.data.map((item)=>{
                        const {email,lastName,firstName} = item.user
                        return <tr key={lastName}>
                        <td>{`${firstName} ${lastName}`}</td>
                        <td>{email}</td>
                        <td className='actions'>
                            {
                            alreadyExpired&&<button className='remove'>attended</button>
                            }
                            <button className='view'>view</button>
                        </td>
                        </tr>
                    })
                }
            </tbody>
            <tfoot>
                <tr>
                    <td>
                    <button className='dir'>previous</button>
                    </td>
                    <td>   
                    </td>
                    <td>
                    <button className='dir'>next</button>
                    </td>
                </tr>
            </tfoot>
        </table>
    </Main>
  )
}

export default Guests

const Main =styled.div`
${tw`w-full max-w-[830px] space-y-5 flex flex-col`}
thead > tr, tbody > tr{
    ${tw`border-b border-solid border-[rgba(0,0,0,.1)]`}
    td{
        ${tw`py-5 text-[rgba(0,0,0,.7)]`}
    }
    .actions{
        ${tw`flex space-x-5`}
        button{
            ${tw`px-2.5 py-1 rounded-lg`}
        }
        .remove{
            ${tw`bg-white border border-solid border-newOrange text-newOrange`}
        }
        .view{
            ${tw`bg-white border border-solid border-newPurple text-newPurple`}
        }
    }
}
thead tr td{
    font-family:PoppinsBold;
    ${tw`capitalize`}
}
tbody tr td{
    font-family:PoppinsSemiBold;
}
tfoot tr td{
    ${tw`py-5`}
}
tfoot tr td:last-child{
    ${tw`flex justify-end pr-5`}
}
tfoot tr td:first-child{
    ${tw`pl-5`}
}
.dir{
    ${tw`px-5 py-2 bg-newGreen text-white rounded-lg`}
  }
`
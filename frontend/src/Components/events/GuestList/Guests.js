import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {ContentHeader} from "../../all/headers/ContentHeader"
import { useParams } from 'react-router-dom'
import { useEvents } from '../context/EventContext'
import { Loader } from '../../all/load/Loader'
import { useGlobally } from '../../../context/AppContext'
import { FaTimes } from 'react-icons/fa'


const Guests = () => {
    const {eventId} = useParams()
    const {getGuests, guests ,currentEvent,removeGuest, attendedGuest} = useEvents()
    const [show,setShow] = useState({type:false,data:{}})
    const changeShow = (show,data)=>{
        if(show){
            setShow({type:true,data})
        }else{
            setShow({type:false,data:{}})
        }
    }
    const {setGlobalErr} = useGlobally()
    const removeGuestNow = (id,eventId)=>{
        removeGuest(id,eventId)
        changeShow(false,{})
    }
    const setAttended  = (guestId)=>{
        attendedGuest(guestId, eventId)
    }
    useEffect(()=>{
        getGuests(eventId)
    },[eventId])
    if(guests.loading){
        return <Main>
             <ContentHeader url={`/events/${eventId}`} title="guests" text="view event"/>
             <Loader/>
        </Main>
    }
   
  return (
    <Main>
        <ContentHeader url={`/events/${eventId}`} title="guests" text="view event"/>
        { show.type && <div className='popup'>
            <div>
            <header>current guest</header>
            <FaTimes onClick={()=>changeShow(false, {})}/>
            </div>
            <div>
            <p>first Name</p>
            <p>{show.data.firstName}</p>
            </div>
            <div>
            <p>last Name</p>
            <p>{show.data.lastName}</p>
            </div>
            <div>
            <p>email</p>
            <p>{show.data.email}</p>
            </div>
            <div>
            <p>phone</p>
            <p>{show.data.phone}</p>
            </div>
        </div>}
        <div className='table'>

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
                        console.log(item.user)
                        const expired = new Date(currentEvent.data.date) - new Date()
                        const alreadyExpired = expired <= 24 * 60 * 60 * 1000
                        return <tr key={lastName}>
                        <td>{`${firstName} ${lastName}`}</td>
                        <td>{email}</td>
                        <td className='actions'>
                            {
                            alreadyExpired ? <button className='remove' onClick={()=>setAttended(item.id)}>attended</button> :
                            <button className='remove' onClick={()=>removeGuestNow(item.id,eventId)}>remove</button>
                            }
                            <button className='view' onClick={()=>changeShow(true, item.user)}>view</button>
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
        </div>
    </Main>
  )
}

export default Guests

const Main =styled.div`
${tw`relative w-full max-w-[830px] space-y-5 flex flex-col`}
.popup{
    ${tw`absolute z-20 w-full max-w-[300px] flex flex-col items-center -translate-x-1/2 rounded-lg bg-white p-5 space-y-2.5 left-1/2 top-[50px]`}
    box-shadow:0px 4px 8px 0px rgba(0,0,0,.25);
    div:first-child{
        ${tw`flex justify-between items-center`}
        >header{
            font-family:PoppinsSemiBold;
            ${tw`text-center text-sm`}
        }
    }
    >div{
        ${tw`w-full flex space-x-2`}
        p{
            
            ${tw`text-sm m-0 p-0`}
        }
        p:first-child{
            ${tw`capitalize w-[80px]`}
        }
    }
}
.table{
    ${tw`w-full overflow-x-scroll flex items-start`}
}
table{
    ${tw`w-full min-w-[800px] md:min-w-[200px]`}
}
thead > tr, tbody > tr{
    ${tw`border-b border-solid border-[rgba(0,0,0,.1)] p-5`}
    td{
        ${tw`min-w-fit py-5 text-[rgba(0,0,0,.7)]`}
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
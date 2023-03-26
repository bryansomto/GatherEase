import React, { useEffect, useState } from 'react'
import { eventData} from "../utils/Events"
import styled from 'styled-components';
import tw from 'twin.macro';
import { ContentHeader } from '../all/headers/ContentHeader';
import { useGlobally } from '../../context/AppContext';
import {Event} from "../all/cards/Event" 
import { useEvents } from '../events/context/EventContext';
import { Loader } from '../all/load/Loader';
import { NoData } from '../all/error/NoData';
const ProfileEvents = () => {
    const [body, setBody] = useState({})
    const {id,role} = useGlobally()
    const {getUserEvents,usersEvents} = useEvents()
    const handleChange = (e)=>{
        const {value, name} = e.target
        setBody({...body, [name]:value})
    }
    const organizer = role === process.env.REACT_APP_ORGANIZER
    useEffect(()=>{getUserEvents(id)},[])
    return (
      <Main>
        <div className='header'>
        <input type="text" placeholder="City" name="city" value={body.city} onChange={(e)=>handleChange(e)}/>
        <input type="text" placeholder="Country" name="country" value={body.city} onChange={(e)=>handleChange(e)}/>
        <input type="text" placeholder="Budget" name="budget" value={body.city} onChange={(e)=>handleChange(e)}/>
            <button>
                search
            </button>
        </div>
        {
          <ContentHeader title="events" url="/events/add" text="add event"/>
        }
          <div className='events'>
          {
            usersEvents.loading?
            <Loader/>
            :<>
            { usersEvents.data.length === 0 ?
            <NoData text="You seem to have not created events yet"/>
            :usersEvents.data.map(
                (item, index)=><Event key={index} index={index} {...item}/>
              )
            }
            </>
      }
          </div>
          <div className='pages'>
            <button>previous</button>
            <button>next</button>
          </div>
      </Main>
    );
};


export default ProfileEvents

const Main = styled.div`
${tw`w-full flex flex-col space-y-5 px-6 md:pr-10`}
.header{
    ${tw`flex space-x-5`}
    select, input {
        font-family: DMsansRegular;
        ${tw`w-full max-w-[80px] md:max-w-[130px] py-2 px-5 border border-[rgba(0,0,0,.5)] text-[rgba(0,0,0,.7)] rounded-lg`}
        :placeholder {
          ${tw`capitalize text-[rgba(0,0,0,.7)]`}
        }
      }
      button{
        ${tw`px-5 py-2 bg-newGreen text-white rounded-lg`}
      }
}.pages{
    ${tw`w-full flex items-center justify-between`}
    button{
        ${tw`px-5 py-2 bg-newGreen text-white rounded-lg`}
      }
}.events{
${tw`grid grid-cols-[repeat(auto-fit, minmax(230px, 1fr))] md:grid-cols-[repeat(auto-fit, minmax(300px, 1fr))] gap-5`}
}
`
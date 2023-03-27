import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import { ContentHeader } from '../all/headers/ContentHeader';
import { useGlobally } from '../../context/AppContext';
import {Event} from "../all/cards/Event" 
import { useEvents } from '../events/context/EventContext';
import { Loader } from '../all/load/Loader';
import { NoData } from '../all/error/NoData';
const ProfileEvents = () => {
    const [body, setBody] = useState({city:"",category:"",venue:"",startDate:"",endDate:""})
    const [send,setSend] = useState(false)
    const {id} = useGlobally()
    const [page,setPage] = useState(1)
    const {getUserEvents,usersEvents} = useEvents()
    const handleChange = (e)=>{
        const {value, name} = e.target
        setBody({...body, [name]:value})
    }
    const handleDir = (dir)=>{
      const current = Number(usersEvents.page)
      const total = Number(usersEvents.totalPages)
      if(total !== 1){
        if(dir === "next"){
          if(current < total){
            setPage(current + 1)
          }else{
            setPage(1)
          }
        }else{
          if(current > 1){
            setPage(current - 1)
          }else{
            setPage(total)
          }
        }
      }
    }
    useEffect(()=>{
      getUserEvents(id,body,page,4)
    },[send,page])
    return (
      <Main>
         <div className="filter">
          <div>
            <div className='input'>
              <label>City</label>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={body.city}
              onChange={(e) => handleChange(e)}
            />
            </div>
            <div className='input'>
              <label>Category</label>
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={body.category}
              onChange={(e) => handleChange(e)}
            />
            </div>
            <div className='input'>
              <label>venue</label>
            <input
              type="text"
              placeholder="Venue"
              name="venue"
              value={body.venue}
              onChange={(e) => handleChange(e)}
            />
            </div>
          </div>
          <div>
            <div className='input'>

            <label>
              Start date
              </label>
            <input
              type="date"
              name="startDate"
              value={body.startDate}
              onChange={(e) => handleChange(e)}
            />
            </div>
            <div className='input'>
            <label>
              end date
              </label>
            <input
              type="date"
              name="endDate"
              value={body.endDate}
              onChange={(e) => handleChange(e)}
            />
            </div>
            <div className='submit'>
            <button onClick={() => setSend(!send)}>Search</button>
            </div>
          </div>
        </div>
        {
          <ContentHeader title="your events" url="/events/add" text="add event"/>
        }
          <div className='events'>
          {
            usersEvents.loading?
            <Loader/>
            :<>
            { usersEvents.data.length === 0 ?
            <NoData text="You seem to have no events yet or try changing filters"/>
            :usersEvents.data.map(
                (item, index)=><Event key={index} index={index} {...item}/>
              )
            }
            </>
      }
          </div>
          <div className='pages'>
          <button onClick={()=>handleDir("prev")}>previous</button>
        <button onClick={()=>handleDir("next")}>next</button>
          </div>
      </Main>
    );
};


export default ProfileEvents

const Main = styled.div`
${tw`w-full flex flex-col space-y-5 px-6 md:pr-10`}
.filter {
  ${tw`flex flex-col items-start space-y-5 space-x-0`}
  >div {
    ${tw`flex items-center space-x-5`}
    .input {
      ${tw`w-full flex items-start flex-col space-y-2`}
      label {
        font-family: PoppinsSemiBold;
        ${tw`text-[rgba(0,0,0,.7)] capitalize text-sm`}
      }
      textarea,
      input {
        font-family: DMsansRegular;
        ${tw`w-full py-2 px-5 border border-[rgba(0,0,0,.5)] text-[rgba(0,0,0,.7)] rounded-lg`}
        :placeholder {
          ${tw`capitalize text-[rgba(0,0,0,.7)]`}
        }
      }
    }.submit{
      ${tw`flex flex-col h-full justify-end items-center`}
      button {
        ${tw`px-5 py-2.5 bg-newGreen text-white rounded-lg`}
      }
    }
  }
  select,
  input {
    font-family: DMsansRegular;
    ${tw`w-full max-w-[80px] md:max-w-[130px] py-2 px-5 border border-[rgba(0,0,0,.5)] text-[rgba(0,0,0,.7)] rounded-lg`}
    :placeholder {
      ${tw`capitalize text-[rgba(0,0,0,.7)]`}
    }
  }
  select {
    ${tw`max-w-none`}
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
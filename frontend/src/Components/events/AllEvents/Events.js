import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {Event} from "../../all/cards/Event"
import {Main} from "../../styles.js"
import { ContentHeader } from '../../all/headers/ContentHeader'
import noevents from "../../../Assets/svg/events.svg"
import {Loader} from "../../all/load/Loader"
import { NoData } from '../../all/error/NoData'
import { useEvents } from '../context/EventContext'
import { useGlobally } from '../../../context/AppContext'
const Events = () => {
  const [body, setBody] = useState({city:"",category:"",venue:"",startDate:"",endDate:""})
  const [send,setSend] = useState(false)
  const {getEvents,events}=useEvents()
  const {role} = useGlobally()
  const handleChange = (e)=>{
    const {value, name} = e.target
    if(name === 'budget'){
      setBody({...body, [name]: JSON.parse(value)})
    }else{
      setBody({...body, [name]:value})
    }
  }
  const verify = role === process.env.REACT_APP_ORGANIZER
  useEffect(()=>{
    getEvents(body)
  },[send])
  return (
    <Main>
      <FlexDiv>
        <div className="filter">
          <div>
        <input type="text" placeholder="City" name="city" value={body.city} onChange={(e)=>handleChange(e)}/>
        <input type="text" placeholder="Category" name="category" value={body.category} onChange={(e)=>handleChange(e)}/>
        <input type="text" placeholder="Venue" name="venue" value={body.venue} onChange={(e)=>handleChange(e)}/>
        </div>
        <div>
        <input type="date" name="startDate" value={body.startDate} onChange={(e)=>handleChange(e)}/>
        <input type="date" name="endDate" value={body.endDate} onChange={(e)=>handleChange(e)}/>
        <button onClick={()=>setSend(!send)}>Search</button>
        </div>
        </div>
      </FlexDiv>
      {
        verify?
        
        <ContentHeader url="/events/add" title="events" text="add event"/>
        :
        <ContentHeader url="/venues" title="events" text="all venues"/>
      }
      <GridCol>
      { events.loading ?<Loader/>:<>{
        events.data.length === 0?
        <NoData/>
        :
        events.data.map(
          (item, index)=><Event key={index} index={index} {...item}/>
        )
      }
      </>
      }
      </GridCol>
      <Div>
      <button>previous</button>
        <button>next</button>
      </Div>
    </Main>
  )
}

export default Events

const Div =styled.div`
${tw`w-full flex justify-between items-center`}
button{
  ${tw`px-5 py-2 bg-newGreen text-white rounded-lg`}
}
`
const FlexDiv = styled.div`
${tw`w-full flex flex-col lg:flex-row space-y-5 lg:space-y-0 items-start lg:justify-between lg:items-center`}
.filter{
  ${tw`flex flex-col sm:flex-row items-start sm:items-center space-y-5 sm:space-y-0 space-x-0 sm:space-x-5`}
  >div{
    ${tw`flex items-center space-x-5`}
  }
  select, input {
    font-family: DMsansRegular;
    ${tw`w-full max-w-[80px] md:max-w-[130px] py-2 px-5 border border-[rgba(0,0,0,.5)] text-[rgba(0,0,0,.7)] rounded-lg`}
    :placeholder {
      ${tw`capitalize text-[rgba(0,0,0,.7)]`}
    }
  }
  select{
    ${tw`max-w-none`}
  }
  button{
    ${tw`px-5 py-2 bg-newGreen text-white rounded-lg`}
  }
}
.sort{
  ${tw`flex items-center space-x-5`}
  select, input {
    font-family: DMsansRegular;
    ${tw`w-max py-2 px-5 border border-[rgba(0,0,0,.5)] text-[rgba(0,0,0,.7)] rounded-lg`}
    :placeholder {
      ${tw`capitalize text-[rgba(0,0,0,.7)]`}
    }
  }
}
`
const GridCol = styled.div`
${tw`w-full grid grid-cols-[repeat(auto-fit, minmax(230px, 1fr))] md:grid-cols-[repeat(auto-fit, minmax(500px, 1fr))] gap-5`}
`
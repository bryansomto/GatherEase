import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import { ContentHeader } from "../../all/headers/ContentHeader";
import moment from "moment";
import {FaClock,FaUser,FaCalendarDay} from "react-icons/fa"
import {ImLocation2} from "react-icons/im"
import {MdCategory} from "react-icons/md"
import {BsFillShieldLockFill} from "react-icons/bs"
import { Detail } from "./Detail";
import { useEvents } from "../context/EventContext";
import { Loader } from "../../all/load/Loader";
import { Organizer } from "./Organizer";
import { useGlobally } from "../../../context/AppContext";
import { NoData } from "../../all/error/NoData";
const Event = () => {
  const { eventId } = useParams();
  const {getSingleEvent,currentEvent,rspvNow } = useEvents()
  const {id,role} = useGlobally()
  useEffect(()=>{
    getSingleEvent(eventId)
  },[eventId])
  if(currentEvent.loading){
    return <Main>
      <Loader/>
    </Main>
  }
  if(Object.keys(currentEvent).length === 0){
    return <NoData text="You seem to have no events yet"/>
  }
  const {title,imageUrl,description,date,venue,category,isPublic,organizerId} = currentEvent.data
  const verified = id === organizerId
  const user = role === process.env.REACT_APP_USER
  return (
    <Main>
      {verified?
      <ContentHeader
      url={`/events/guests/${eventId}`}
      title={title}
      text="view guests"
    />
      :
      <ContentHeader
        url={`/events`}
        title={title}
        text="all events"
      />
      }
      <img src={imageUrl} alt={title} />
      <p>{description}</p>
      <Detail icon={ <FaCalendarDay className="icon"/>} title={"day"} value={moment(date).format("dddd, MMM D YYYY")}/>
      <Organizer icon={ <FaUser className="icon"/>} title={"organizer"} value={eventId}/>
      <Detail icon={ <FaClock className="icon"/>} title={"time"} value={moment(date).format("hh:mm:ss a")}/>
      <Detail icon={ <ImLocation2 className="icon"/>} title={"venue"} value={venue.name} link={true} url={`/venues/${venue.id}`}/>
      <Detail icon={ <MdCategory className="icon"/>} title={"category"} value={category.name}/>
      <Detail icon={ <BsFillShieldLockFill className="icon"/>} title={"privacy"} value={isPublic?"Public":"Private"}/>
      <div className="actions-event">
        {
          verified && <Link to={`/events/update/${eventId}`}>Edit</Link> 
        }
        {
          user && <button onClick={()=>rspvNow({eventId})}>RSPV</button>
        }
      </div>
    </Main>
  );
};

export default Event;
const Main = styled.div`
  ${tw`w-full max-w-[830px] space-y-5 flex flex-col`}
  img{
    ${tw`w-full rounded-lg`}
  }.actions-event{
    ${tw`flex items-center justify-end px-5`}
    a, button{
      ${tw`px-2.5 py-2 text-white rounded-lg border-none`}
    }
    button{
      ${tw`bg-newPurple`}
    }
    a{
      ${tw`bg-newOrange`}
    }
}
`;

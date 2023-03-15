import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import { ContentHeader } from "../../all/headers/ContentHeader";
import { eventData } from "../../utils/Events";
import {useDate, useTime} from "../../hooks/useDate"
import {FaClock,FaUser,FaCalendarDay} from "react-icons/fa"
import {ImLocation2} from "react-icons/im"
import { Detail } from "./Detail";
const Event = () => {
  const { eventId } = useParams();
  const [data, setData] = useState(eventData[Number(eventId)]);
  const handleChange = ()=>{
    setData(eventData[Number(eventId)])
  }
  useEffect(()=>{
    handleChange()
  },[eventId])
  return (
    <Main>
      <ContentHeader
        url={`/events/guests/${eventId}`}
        title={data.title}
        text="view guests"
      />
      <img src={data.image} alt={data.title} />
      <p>{data.description}</p>
      <Detail icon={ <FaCalendarDay className="icon"/>} title={"day"} value={useDate(data.createdAt)}/>
      <Detail icon={ <FaUser className="icon"/>} title={"organizer"} value={"John Doe"}/>
      <Detail icon={ <FaClock className="icon"/>} title={"time"} value={useTime(data.createdAt)}/>
      <Detail icon={ <ImLocation2 className="icon"/>} title={"venue"} value={"Nairobi, kenya"}/>
      <div className="actions-event">
        <button>RSPV</button>
        <Link to={`/events/update/${eventId}`}>Edit</Link>
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
    ${tw`flex items-center justify-between px-5`}
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

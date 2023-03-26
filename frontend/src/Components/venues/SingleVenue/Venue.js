import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { ContentHeader } from "../../all/headers/ContentHeader";
import moment from "moment";
import {FaClock,FaCalendarDay} from "react-icons/fa"
import {ImLocation2} from "react-icons/im"
import {BsFillShieldLockFill} from "react-icons/bs"
import { Detail } from "../../events/SingleEvent/Detail";
import { useEvents } from "../../events/context/EventContext";
import { Loader } from "../../all/load/Loader";
import { useGlobally } from "../../../context/AppContext";
import { NoData } from "../../all/error/NoData";

const Venue = () => {
  const { venueId } = useParams();
  const {getSingleVenue,currentVenue} = useEvents()
  useEffect(()=>{
    getSingleVenue(venueId)
  },[venueId])
  if(currentVenue.loading){
    return <Main>
      <Loader/> 
    </Main>
  }
  console.log(currentVenue)
  if(currentVenue.data.length === 0){
    return <NoData text="You seem to have no events yet"/>
  }
  const {name,imageUrl,city,country,createdAt,street} = currentVenue.data
  return (
    <Main>

      <ContentHeader
        url={`/venues`}
        title={name}
        text="all venues"
      />
      <img src={imageUrl} alt={name} />
      <p>Details</p>
      <Detail icon={ <FaCalendarDay className="icon"/>} title={"created at"} value={moment(createdAt).format("dddd, MMM D YYYY")}/>
      <Detail icon={ <ImLocation2 className="icon"/>} title={"location"} value={`${city}, ${country}`}/>
      <Detail icon={ <BsFillShieldLockFill className="icon"/>} title={"street"} value={street}/>

    </Main>
  );
};

export default Venue;

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

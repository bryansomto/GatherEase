import React, { useEffect } from "react";
import { Recent } from "../styles";
import eventImg from "../../../Assets/svg/events.svg"
import { useEvents } from "../../events/context/EventContext";
import { RecentSingle } from "./RecentSingle";
import {Loader} from "../load/Loader"
const RecentEvents = () => {
  const {getEvents,events } = useEvents()
  useEffect(()=>{getEvents()},[])
  if(events.loading){
    return <Recent>
      <header className="font">Recent Events</header>
      <Loader/>
    </Recent>
  }
  return (
    <Recent>
      <header className="font">Recent Events</header>
      <div className="recent">
        {events.data.length === 0 ?
        <div className="image-div">
          <img src={eventImg} alt="no events"/>
          <p>No events available</p>
        </div>
        :events.data.map((item, index)=><RecentSingle key={index} index={index} {...item}/>)
        }
      </div>
    </Recent>
  );
};

export default RecentEvents;


import React, { useEffect } from "react";
import { Recent } from "../styles";
import { useEvents } from "../../events/context/EventContext";
import { VenueSingle } from "./VenueSingle";
import {Loader} from "../load/Loader"
import { NoData } from "../error/NoData";

const RecentVenue = () => {
    const {getVenues,venues} = useEvents()
    useEffect(()=>{getVenues()},[])
    if(venues.loading){
      return <Recent>
        <header className="font">Recent Events</header>
        <Loader/>
      </Recent>
    }
    return (
      <Recent>
        <header className="font">Recent Venues</header>
        <div className="recent">
          {venues.data.length === 0 ?
          <NoData/>
          :venues.data.map((item, index)=><VenueSingle key={index} index={index} {...item}/>)
          }
        </div>
      </Recent>
    );
}

export default RecentVenue
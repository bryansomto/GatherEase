import React from "react";
import { Recent } from "../styles";
import { eventData } from "../../utils/Events";
import { RecentSingle } from "./RecentSingle";
const RecentEvents = () => {
  return (
    <Recent>
      <header className="font">Recent Events</header>
      <div className="recent">
        {
            eventData.map((item, index)=><RecentSingle key={index} index={index} {...item}/>)
        }
      </div>
    </Recent>
  );
};

export default RecentEvents;


import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Venue } from "../../all/cards/Venue";
import { Main } from "../../styles.js";
import { ContentHeader } from "../../all/headers/ContentHeader";
import { venuesData } from "../../utils/Venues";
import { useEvents } from "../../events/context/EventContext";
import { Loader } from "../../all/load/Loader";
import { NoData } from "../../all/error/NoData";
const Venues = () => {
  const [body, setBody] = useState({city: "", name: "" });
  const [send, setSend] = useState(false)
  const {getVenues, venues} = useEvents()
  const handleChange = (e) => {
    const { value, name } = e.target;
      setBody({ ...body, [name]: value });
  };
  useEffect(()=>{
    getVenues(body)
  },[send])
  return (
    <Main>
      <FlexDiv>
        <div className="filter">
          <div>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={body.city}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={body.name}
              onChange={(e) => handleChange(e)}
            />
            <div>
              <button onClick={()=>setSend(!send)}>Search</button>
            </div>
          </div>
        </div>
      </FlexDiv>
      <ContentHeader title="Venues" url="/events" text="all events"/>
      <GridCol>
        {
          venues.loading ? <Loader/> :<>
          {venues.data.length === 0 ? <NoData text="No venues yet"/>: venues.data.map((item, index) => (
          <Venue key={index} index={index} {...item} />
        ))}
          </>
        }
        
      </GridCol>
      <Div>
        <button>previous</button>
        <button>next</button>
      </Div>
    </Main>
  );
};

export default Venues;

const Div = styled.div`
  ${tw`w-full flex justify-between items-center`}
  button {
    ${tw`px-5 py-2 bg-newGreen text-white rounded-lg`}
  }
`;
const FlexDiv = styled.div`
  ${tw`w-full flex flex-col lg:flex-row space-y-5 lg:space-y-0 items-start lg:justify-between lg:items-center`}
  .filter {
    ${tw`flex flex-col sm:flex-row items-start sm:items-center space-y-5 sm:space-y-0 space-x-0 sm:space-x-5`}
    >div {
      ${tw`flex items-center space-x-5`}
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
    button {
      ${tw`px-5 py-2 bg-newGreen text-white rounded-lg`}
    }
  }
  .sort {
    ${tw`flex items-center space-x-5`}
    select, input {
      font-family: DMsansRegular;
      ${tw`w-max py-2 px-5 border border-[rgba(0,0,0,.5)] text-[rgba(0,0,0,.7)] rounded-lg`}
      :placeholder {
        ${tw`capitalize text-[rgba(0,0,0,.7)]`}
      }
    }
  }
`;
const GridCol = styled.div`
  ${tw`grid grid-cols-[repeat(auto-fit, minmax(230px, 1fr))] md:grid-cols-[repeat(auto-fit, minmax(400px, 1fr))] gap-5`}
`;

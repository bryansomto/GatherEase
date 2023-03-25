import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Form } from "../styles";
import {ContentHeader} from "../../all/headers/ContentHeader"
import moment from "moment";
import { useEvents } from "../context/EventContext";
const body = {
  venueId: "",
  categoryId: "",
  isPublic: "Yes",
  day: moment(new Date).format("YYYY-MM-DD"),
  time: moment(new Date).format("HH:MM:SS"),
};
const CreateEventForm = () => {
  const [data, setData] = useState(body);
  const {createEvents} = useEvents()
  const [category, setCategory] = useState(["Cloned","Done","undo"])
  const [venues, setVenues] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e)=>{
    e.preventDefault()
    createEvents()
  }
  return (
    <Main>
        <ContentHeader url="/events" title="create event" text="all events"/>
      <Form onSubmit={(e)=>handleSubmit(e)}>
        <div className="input">
          <label htmlFor="venueId"> Venue </label>
          <input
            type="text"
            name="venueId"
            placeholder="(e.g). choose a place"
            value={data.venueId}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="categoryId"> Category</label>
          <select
            type="text"
            name="categoryId"
            value={data.categoryId}
            onChange={(e) => handleChange(e)}
          >
            {
                category.map((item)=><option value={item}>{item}</option>)
            }
          </select>
        </div>
        <div className="input-radio">
          <p> Make it Public </p>
          <div>
            <div>
              <input
                type="radio"
                name="isPublic"
                value={data.isPublic}
                id="yes"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                name="isPublic"
                value={data.isPublic}
                id="no"
                checked
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
        </div>
        <div className="input">
          <label htmlFor="time"> Time </label>
          <input
            type="time"
            name="time"
            value={data.time}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="day"> Day </label>
          <input
            type="date"
            name="day"
            value={data.day}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="submit">
          <input type="submit" value="Create event"/>
        </div>
      </Form>
    </Main>
  );
};

export default CreateEventForm;
const Main = styled.form`
  ${tw`w-full max-w-[830px] space-y-5 flex flex-col`}
`;

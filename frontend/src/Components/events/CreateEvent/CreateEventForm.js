import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Form } from "../styles";
import {ContentHeader} from "../../all/headers/ContentHeader"
import { ImageUpload } from "./ImageUpload";
import { Categories } from "./Categories";
import moment from "moment";
import {validateEvent} from "../../utils/Events"
import { useEvents } from "../context/EventContext";
import { Venues } from "./Venues";
import { FormError } from "../../all/error/FormError";
const body = {
  venueId: "",
  categoryId: "",
  isPublic: true,
  day: moment(new Date()).format("YYYY-MM-DD"),
  time: moment(new Date()).format("HH:mm:ss"),
  imageUrl: "",
  title:"",
  description:"",
  city:""
};
const CreateEventForm = () => {
  const [data, setData] = useState(body);
  const form = useRef() 
  const {createEvents,eventImage,setErr,form_error} = useEvents()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const changeImage = ()=>{
    setData({ ...data, imageUrl: eventImage.data });
  }
  const handlePublic = (val)=>{
    setData({ ...data, isPublic:val });
  }
  const handleChildren = (name,value)=>{
    setData({ ...data, [name]: value });
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    form.current.scrollIntoView({scroll:"smooth"})
    const date = new Date(`${data.day} ${data.time}`)
    const day = date.getDay()
    const weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const newData = {...data, day:weekday[day], date:date.toISOString(), changeErr}
console.log(newData);
if(validateEvent(newData)){
  createEvents(newData)
}
} 
const changeErr = (err)=>{
  setErr("form_error",err)
}
  useEffect(()=>{
    changeImage()
  },[eventImage.data])
  return (
    <Main>
        <ContentHeader url="/events" title="create event" text="all events"/>
      <Form onSubmit={(e)=>handleSubmit(e)} ref={form}>
        <FormError {...form_error}/>
      <div className="input">
          <label htmlFor="title"> title </label>
          <input
            type="text"
            name="title"
            placeholder="(e.g). title"
            value={data.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="description">
            description 
            <span id="count">({data.description.length} {(data.description.length === 0) ? "character" : "characters"})</span>
            </label>
          
          <textarea
            type="text"
            name="description"
            placeholder="(e.g). A Great place"
            value={data.description}
            onChange={(e) => handleChange(e)}
          />
        </div>
       <Venues handleChildren={handleChildren}/>
        <Categories handleChildren={handleChildren}/>
        <ImageUpload/>
        <div className="input-radio">
          <p> Make it Public </p>
          <div>
            <div>
              <input
                type="radio"
                name="isPublic"
                onChange={() => handlePublic(true)}
                checked
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                name="isPublic"
                onChange={() => handlePublic(false)}
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
            min={moment(new Date()).format("YYYY-MM-DD")} 
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input">
          <label htmlFor="city"> City </label>
          <input
            type="text"
            name="city"
            placeholder="(e.g) Nairobi"
            value={data.city}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="submit" style={{justifyItems:"end"}}>
          <button type="submit">
          Create event
          </button>
        </div>
      </Form>
    </Main>
  );
};

export default CreateEventForm;
const Main = styled.div`
  ${tw`w-full max-w-[830px] space-y-5 flex flex-col`}
`;

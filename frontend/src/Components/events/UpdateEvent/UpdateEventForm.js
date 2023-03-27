import React, { useEffect, useRef, useState } from 'react'
import {Form, Main} from "../styles"
import { ContentHeader } from '../../all/headers/ContentHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { Venues } from '../CreateEvent/Venues'
import { Categories } from '../CreateEvent/Categories'
import { ImageUpload } from '../CreateEvent/ImageUpload'
import { validateEvent } from '../../utils/Events'
import moment from 'moment'
import { useEvents } from '../context/EventContext'
import { FormError } from '../../all/error/FormError'
import { Loader } from '../../all/load/Loader'
import { useGlobally } from '../../../context/AppContext'
const UpdateEventForm = () => {
  const {eventId} = useParams()
  const {currentEvent,getUpdateData,updateEvent,deleteEvent} = useEvents()
  const {id,setGlobalErr} = useGlobally()
  const [data, setData]  = useState(currentEvent.data)
  const navigate = useNavigate()
  const [fill,setFill] = useState({})
  const [loading,setLoading] = useState(true)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handlePublic = (value)=>{
    setData({ ...data, isPublic:value });
  }
  const handleChildren = (name,value)=>{
    setData({ ...data, [name]: value });
  }
  const updateDetails = ()=>{
    getUpdateData(eventId).then((res)=>{
      setFill({category:res.data.data.category.name,venue:res.data.data.venue.name})
      if(res.data.data.organizerId !== id){
        navigate(`/events/${res.data.data.id}`)
      }
      const newData = {
      venueId: res.data.data.venueId,
      categoryId: res.data.data.categoryId,
      isPublic: res.data.data.isPublic,
      day: moment(res.data.data.Date).format("YYYY-MM-DD"),
      time: moment(res.data.data.Date).format("HH:mm:ss"),
      imageUrl: res.data.data.imageUrl,
      title:res.data.data.title,
      description:res.data.data.description,
      city:res.data.data.city}
      setData(newData)
      setLoading(false)
    })
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(data)
    const date = new Date(`${data.day} ${data.time}`)
    const day = date.getDay()
    const weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const newData = {...data, day:weekday[day], date:date.toISOString(), changeErr}
if(validateEvent(newData)){
  updateEvent(eventId,newData)
}
} 
const changeErr = (err)=>{
  setGlobalErr(err)
}
const handleDelete = (e)=>{
  e.preventDefault()
  deleteEvent(eventId).then((res)=>{
    navigate("/events")
  })
}
  useEffect(()=>{
    updateDetails()
  },[eventId])
  if(loading){
    return <Main>
      <Loader/>
    </Main>
  }
  return (
    <Main>
      <ContentHeader url={`/events/${eventId}`} title="update event" text="view event" />
      <Form onSubmit={(e)=>handleSubmit(e)}>
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
       <Venues handleChildren={handleChildren} value={fill.venue}/>
        <Categories handleChildren={handleChildren} value={fill.category}/>
        <ImageUpload/>
        <div className="input-radio">
          <p> Make it Public </p>
          <div>
            <div>
              <input
                type="radio"
                name="isPublic"
                onInput={() => handlePublic(true)}
                defaultChecked={data.isPublic === true}
              />
              <label htmlFor="isPublic">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                name="isPublic"
                onInput={() => handlePublic(false)}
                defaultChecked={data.isPublic === false}
              />
              <label htmlFor="isPublic">No</label>
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
        <div className="submit">
          <button onClick={(e)=>handleDelete(e)}>delete</button>
          <input type="submit" value="Update"/>
        </div>
      </Form>
    </Main>
  )
}

export default UpdateEventForm
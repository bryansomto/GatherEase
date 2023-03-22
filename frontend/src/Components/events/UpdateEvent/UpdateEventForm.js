import React, { useState } from 'react'
import {Form, Main} from "../styles"
import { ContentHeader } from '../../all/headers/ContentHeader'
import { useParams } from 'react-router-dom'
import {eventData} from "../../utils/Events"
const UpdateEventForm = () => {
  const {eventId} = useParams()
  const [data, setData]  = useState(eventData[Number(eventId)])
  const [category, setCategory] = useState(["Cloned","Done","undo"])
  const [venues, setVenues] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <Main>
      <ContentHeader url={`/events/${eventId}`} title="update event" text="view event" />
      <Form>
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
          <input type="submit" value="Update Event"/>
        </div>
      </Form>
    </Main>
  )
}

export default UpdateEventForm
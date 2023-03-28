import React from 'react'
import {DisplayImage} from "../all/DisplayImage"
const Hero = () => {
  const about = "https://res.cloudinary.com/oryankibandi/image/upload/v1679746110/events/clfjkkjny0008s21z07tcy7ut/7be0f36b43064ea690ee303ff634ecbe1679746109975.jpg"
  return (
    <DisplayImage image={about} text="Easily follow up on your events"/>

  )
}

export default Hero
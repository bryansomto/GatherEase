import React from 'react'
import {DisplayImage} from "../../all/DisplayImage"
const events = "https://res.cloudinary.com/oryankibandi/image/upload/v1679746674/events/clfjkkjny0008s21z07tcy7ut/927c00a0b52a43e0b4034019a1fba31e1679746674023.jpg"
const Hero = () => {
  return (
    <DisplayImage image={events} text="Start planning your events today"/>
  )
}

export default Hero
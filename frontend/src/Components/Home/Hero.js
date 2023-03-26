import React from 'react'
import {DisplayImage} from "../all/DisplayImage"
const Hero = () => {
  const home = "https://res.cloudinary.com/oryankibandi/image/upload/v1679780645/events/clfjkkjny0008s21z07tcy7ut/f5b3973dd6614e5ba79182a145e93f661679780644713.jpg"
  return (
    <DisplayImage image={home} text="Let us manage and plan your events" />
  )
}

export default Hero

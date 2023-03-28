import React from 'react'
import {DisplayImage} from "../all/DisplayImage"
const Hero = () => {
  const contact = "https://res.cloudinary.com/oryankibandi/image/upload/v1679746402/events/clfjkkjny0008s21z07tcy7ut/e108a8bd61fb430fbc5d5ccd7d5f799d1679746401781.jpg"
  return (
    <DisplayImage image={contact} text="Contact us for more information"/>
  )
}

export default Hero
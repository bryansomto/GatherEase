import React from 'react'
import error from "../Assets/svg/Error.svg"
import styled from "styled-components"
import tw from "twin.macro"
import {Link} from "react-router-dom"
const Error = () => {
  return (
    <Main>
      <img alt="error" src={error}/>
      <p>Opps! seems the page does not exist. <Link to="/">Go Home</Link></p>
    </Main>
  )
}

export default Error
const Main = styled.section`
${tw`w-full flex flex-col items-center justify-center space-y-12`}
img{
  ${tw`w-full max-w-[600px]`}
}p{
  font-family:poppinsBold;
  ${tw`text-newGreen text-base md:text-3xl`}
  a{
    ${tw`text-newBlue`}
  }
}
`
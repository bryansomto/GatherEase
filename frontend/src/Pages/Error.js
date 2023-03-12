import React from 'react'
import error from "../Assets/svg/Error.svg"
import styled from "styled-components"
import tw from "twin.macro"
const Error = () => {
  return (
    <Main>
      <img alt="error" src={error}/>
      <p>Opps! seems we could not find anything here.</p>
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
  ${tw`text-newGreen text-3xl`}
}
`
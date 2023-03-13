import React from 'react'
import styled from 'styled-components'
import tw from "twin.macro"

export const DisplayImage = ({image, text}) => {
  return (
    <Main>
      <img src={image} alt="img"/>
      <p>{text}</p>
    </Main>
  )
}


const Main =styled.section` 
${tw`relative  w-full`}

img{
  ${tw`object-fill h-full max-h-[650px] w-full rounded-b-[50px] md:rounded-b-[100px] brightness-75`}
}
p{
  font-family:PoppinsBold;
  ${tw`absolute w-max top-1/2 left-1/2 text-white text-2xl sm:text-4xl lg:text-5xl -translate-x-1/2`}
}
`
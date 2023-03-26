import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import eventImg from "../../../Assets/svg/events.svg"
export const NoData = ({text = "No events available", img=eventImg}) => {
  return (
    <Main>
          <img src={img} alt="no events"/>
          <p>{text}</p>
        </Main>
  )
}

const Main = styled.div`
    ${tw`pt-10 w-full flex items-center space-y-5 flex-col justify-start`}
    >img{
      ${tw`max-w-[300px] max-h-[200px]`}
    } 
    >p{
      ${tw`text-sm`}
    }
`

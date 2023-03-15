import React from 'react'
import styled from 'styled-components'
import {useDate} from "../../hooks/useDate"
import { useTextMore } from '../../hooks/useText'
import { Link } from 'react-router-dom'
import tw from 'twin.macro'
export const Event = ({image, description,createdAt,title,index}) => {
  return (
    <Main>
      <Link to={`/events/${index}`}><img className="event-image" src={image} alt={createdAt}/></Link>
      <header className='font'>{title}</header>
      <p>{useTextMore(description)}</p>
      <p className='created'><span className='font'>Created At</span>{useDate(createdAt)}</p>
    </Main>
  )
}
const Main = styled.div`
${tw`w-full flex flex-col`}
.event-image{
  ${tw`rounded-lg w-full h-full`}
}.font{
  font-family:poppinsBold;
}
.created{
  ${tw`text-[rgba(0,0,0,.5)] `}
  span{

    ${tw`text-[rgba(0,0,0,.5)] text-sm mr-5`}
  }
}
`
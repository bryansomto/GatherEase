import React from 'react'
import styled from 'styled-components'
import {useDate} from "../../hooks/useDate"
import { useTextMore } from '../../hooks/useText'
import { Link } from 'react-router-dom'
import tw from 'twin.macro'
export const Event = ({imageUrl, description,createdAt,title,id}) => {
  return (
    <Main>
      <Link to={`/events/${id}`}><img className="event-image" src={imageUrl} alt={title}/></Link>
      <header className='font'>{title}</header>
      <p>{useTextMore(description)}</p>
      <p className='created'><span className='font'>Created At</span>{useDate(createdAt)}</p>
    </Main>
  )
}
const Main = styled.div`
${tw`w-full max-w-[530px] flex flex-col space-y-2`}
.event-image{
  ${tw`rounded-lg w-full h-full object-cover h-[336px]`}
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
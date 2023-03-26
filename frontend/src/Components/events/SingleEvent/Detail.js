import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Detail = ({icon,title,value, link=false, url}) => {
  return (
    <Main>
        <div className="title">
          {icon}
        <p>{title}</p>
        </div>
        {
          link?
          <Link to={url}>
            {value}
          </Link>
          :
        <p className="text">{value}</p>
        }
      </Main>
  )
}

export const Main =styled.div`
${tw`flex`}
    .title{
      ${tw`w-32 flex space-x-5 items-center`}
      p{
        font-family:PoppinsSemiBold;
        ${tw`capitalize text-sm text-[rgba(0,0,0,.4)]`}
      }.icon{
        ${tw`text-newGreen`}
      }
    }a,.text{
        ${tw`ml-5`}
    }a{
      ${tw`text-newBlue hover:underline`}
    }
`
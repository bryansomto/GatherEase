import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

export const Detail = ({icon,title,value}) => {
  return (
    <Main>
        <div className="title">
          {icon}
        <p>{title}</p>
        </div>
        <p className="text">{value}</p>
      </Main>
  )
}

const Main =styled.div`
${tw`flex`}
    .title{
      ${tw`w-32 flex space-x-5 items-center`}
      p{
        font-family:PoppinsSemiBold;
        ${tw`capitalize text-sm text-[rgba(0,0,0,.4)]`}
      }.icon{
        ${tw`text-newGreen`}
      }
    }.text{
        ${tw`ml-5`}
    }
`
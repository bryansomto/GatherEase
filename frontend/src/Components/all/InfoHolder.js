import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
export const InfoHolder = ({title, text, noPad=false}) => {
  return (
    <Main noPad={noPad}>
        <header>{title}</header>
        <p>{text}</p>
    </Main>
  )
}
const Main= styled.div`
    ${tw`flex flex-col px-12 md:px-24 space-y-5`}
    ${(prop)=>prop.noPad && tw`px-0`}
    header{
        font-family:PoppinsBold;
        ${tw``}
    }
`
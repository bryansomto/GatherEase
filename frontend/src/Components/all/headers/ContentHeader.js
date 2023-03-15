import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Link } from 'react-router-dom'

export const ContentHeader = ({title,url,text}) => {
  return (
    <Main>
        <header>{title}</header>
        <Link to={url}>{text}</Link>
      </Main>
  )
}
const Main = styled.section`
font-family:PoppinsBold;
  ${tw`w-full flex justify-between items-center capitalize`}
  a{
    ${tw`text-newBlue`}
  }
`

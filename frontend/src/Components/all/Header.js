import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
export const Header = ({title}) => {
  return (
    <Main>{title}</Main>
  )
}


const Main =styled.header`
font-family:PoppinsBold;
${tw`text-base capitalize`}
`
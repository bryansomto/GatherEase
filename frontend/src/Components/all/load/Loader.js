import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {BiLoaderAlt} from "react-icons/bi"

export const Loader = () => {
  return (
    <Main>
        <BiLoaderAlt className='icon'/>
    </Main>
  )
}

const Main = styled.div`
${tw`w-full min-h-[300px] flex items-center justify-center text-[rgba(0,0,0,.7)]`}
.icon{
  ${tw`text-xl animate-spin`}
}
`

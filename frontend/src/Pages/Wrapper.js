import React from 'react'
import { Outlet } from 'react-router-dom'
import {NavBar,Footer} from "../components/Wrapper/index"
import styled from 'styled-components'
import tw from 'twin.macro'
const Wrapper = () => {
  return (
    <Main>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </Main>
  )
} 

export default Wrapper

const Main = styled.main` 
${tw`min-h-full`}
.all{
    ${tw`flex flex-col`}
}
`
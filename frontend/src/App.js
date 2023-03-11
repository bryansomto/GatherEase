import React from 'react'
import tw from "twin.macro"
import styled from "styled-components"
const App = () => {
  return (
    <Main>
      Hello world!
    </Main>
  )
}

export default App

const Main = styled.h1` 
${tw`text-3xl font-bold underline`}
`
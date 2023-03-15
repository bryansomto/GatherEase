import React from 'react'
import styled from 'styled-components'
import RecentEvents from './RecentEvents'

import tw from 'twin.macro'
export const EventWrapper = ({element}) => {
  return (
    <Main>
        {element}
        <RecentEvents/>
    </Main>
  )
}
const Main =styled.section`
${tw`flex flex-col md:flex-row items-start p-5 pb-16 space-x-0 space-y-5 md:space-y-0 md:space-x-5`}
`
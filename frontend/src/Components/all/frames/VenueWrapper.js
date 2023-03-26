import React from 'react'
import styled from 'styled-components'
import RecentVenue from './RecentVenue'
import tw from 'twin.macro'

export const VenueWrapper = ({element}) => {
    return (
        <Main>
            {element}
            <RecentVenue/>
        </Main>
      )
}
const Main =styled.section`
${tw`flex flex-col items-start space-y-5 md:space-y-0 md:grid pb-16 md:grid-cols-[3fr 2fr] md:gap-5 p-5`}
`
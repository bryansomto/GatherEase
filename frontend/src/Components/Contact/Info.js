import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {InfoHolder} from "../all/InfoHolder"
import {InfoData} from "../utils/Contacts"
export const Info = () => {
  return (
    <Main>
        {InfoData.map(
            (item)=><InfoHolder noPad={true} key={item.title}  {...item}/>
        )
        }
    </Main>
  )
}
const Main =styled.div`
${tw`w-full min-w-min sm:min-w-[400px] flex flex-col space-y-5`}
`

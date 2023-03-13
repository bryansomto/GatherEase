import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {InfoHolder} from "../all/InfoHolder"

import {InfoData, StatsData} from "../utils/About"
const Info = () => {
    return (
        <Main>
            <InfoHolder {...InfoData[0]}/>
            <div className='stats'>
                {StatsData.map((item)=>{
                    const {title, no} = item
                    return <div className='stat'>
                        <p>{no}</p>
                        <header>{title}</header>
                    </div>
                })}
            </div>
            <InfoHolder {...InfoData[1]}/>
        </Main>
    )
}

export default Info

const Main =styled.section`
${tw`flex flex-col items-center py-12 space-y-20`}
.stats{
    ${tw`w-full bg-[rgba(188, 7, 128, .1)] py-8 flex justify-evenly`}
    .stat{
        ${tw`flex flex-col items-center space-y-5`}
        p{
            font-family:PoppinsBold;
            ${tw`text-3xl`}
        }
    }
}
`

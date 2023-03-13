import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
export const ServicesCard = ({img,title,text, index}) => {
    const [enter, setEnter] = useState(false)
  return (
    <Main reverse={index % 2 === 0} enter={enter}>
        <img src={img} alt={title} onMouseEnter={()=>setEnter(true)} onMouseLeave={()=>setEnter(false)}/>
        <div>
            <header>{title}</header>
            <p>{text}</p>
        </div>
    </Main>
  )
}

const Main = styled.div`
${tw`relative w-full flex flex-row  items-center justify-between `}
${(props)=>props.reverse && tw`flex-row-reverse`}
img{
    ${tw`w-full sm:w-1/2 max-w-none sm:max-w-[620px] rounded-lg brightness-100`}
    &:hover{
        ${tw`brightness-50 sm:brightness-100`}
    }
}
div{
    ${tw`absolute pointer-events-none  sm:pointer-events-auto sm:static -translate-y-1/2 sm:translate-y-0  -translate-x-1/2 sm:translate-x-0 left-1/2 top-1/2 w-full sm:w-1/2 flex flex-col items-center space-y-5`}
    ${(props)=>props.enter ? tw`flex` : tw`hidden sm:flex`}
    p{
        ${tw`w-full text-white sm:text-black max-w-[200px] md:max-w-[300px] text-center text-base sm:text-sm `}
    }header{
       font-family:PoppinsBold;
       ${tw`text-white sm:text-[rgba(0,0,0,.7)] text-base sm:text-sm`}
    }
}
`
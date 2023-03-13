import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {FaCaretDown,FaCaretUp} from "react-icons/fa"

export const SingleFaq = ({text,title}) => {
    const [read, setRead] = useState(false)
  return (
    <Main>
        <div className='faq'>
            <header>{title}</header>
            <div className='icon-holder' onClick={()=>setRead(!read)}>
           { read ? <FaCaretDown className='icon'/>:<FaCaretUp className='icon'/>}
            </div>
        </div>
        {
            read && <p>{text}</p>
        }
    </Main>
  )
}


const Main = styled.div`
${tw`w-full max-w-[680px] rounded-lg border border-newGreen border-solid p-5 space-y-5`}
.icon-holder{
    ${tw`cursor-pointer`}
}
.faq{
    ${tw`w-full flex justify-between`}
    header{
        font-family:PoppinsSemiBold;
        ${tw`text-sm text-newGreen`}
    }
}p{
    ${tw`text-sm text-newGreen`}
}
`
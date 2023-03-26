import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGlobally } from '../../../context/AppContext'

export const Alert = () => {
    const {global_err} = useGlobally()
  return (
   <>
   {global_err.show && <Main type={global_err.type}>
        <div>
            <header>Message</header>
        </div>
        <p>{global_err.msg}</p>
    </Main>
   } 
   </>
  )
}


const Main = styled.div`
${tw`w-full max-w-[400px] p-3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 border border-solid rounded-lg -translate-y-1/2`}
${(props)=>props.type === "warning" && tw`border-red-400`}
${(props)=>props.type === "success" && tw`border-green-400`}
>div{
    ${tw`flex justify-between w-full`}
    ${(props)=>props.type === "warning" && tw`text-red-400`}
${(props)=>props.type === "success" && tw`text-green-400`}
}
`

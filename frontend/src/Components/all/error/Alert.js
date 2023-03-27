import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGlobally } from '../../../context/AppContext'

export const Alert = () => {
    const {global_err,closeGlobal} = useGlobally()
    const err = {msg:"Error",show:true,type:"warning"}
  return (
   <>
   {global_err.show   && <Main type={global_err.type}>
        <div>
            <header>Message</header>
            <FaTimes onClick={closeGlobal}/>
        </div>
        <p>{global_err.msg}</p>
    </Main>
   } 
   </>
  )
}


const Main = styled.div`
${tw`w-full z-50 max-w-[250px] md:max-w-[500px] p-3 bg-white absolute top-[60px] left-1/2 -translate-y-1/2 -translate-x-1/2 border-transparent border-[5px] border-solid rounded-lg -translate-y-1/2`}
box-shadow:0px 5px 8px 0px rgba(0,0,0,.3);
${(props)=>props.type === "warning" && tw`border-l-red-400`}
${(props)=>props.type === "success" && tw`border-l-green-400`}
p{
    font-family:poppins;
    ${tw`text-sm text-black pt-2`}
}
>div{
    font-family:poppinsSemiBold;
    ${tw`flex justify-between w-full text-sm`}
    ${(props)=>props.type === "warning" && tw`text-red-400`}
${(props)=>props.type === "success" && tw`text-green-400`}
}
`

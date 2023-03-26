import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const FormError = ({msg,show,type}) => {
    if(!show){
        return <></>
    }
  return (
    <Main show={show} type={type}>
        <p>{msg}</p>
    </Main>
  )
}


const Main = styled.div`
${tw`max-w-[400px] relative p-2 px-2 rounded-lg`}
overflow:hidden;
${(props)=>props.type === "warning" && tw`text-red-600 bg-red-100`}
${(props)=>props.type === "success" && tw`text-green-600 bg-green-100`}
:before{
  content:"";
  width:0%;
  height:5px;
  ${tw`transition absolute left-0 top-full`}
  ${(props)=>props.type === "success" && tw`bg-green-400`}
  ${(props)=>props.type === "warning" && tw`bg-red-400`}
  transform:translate(0%,-50%);
  animation: ${(props)=>props.show && "spin 3s linear infinite"};
}
@keyframes spin {
  from {
    width:0%;
  }
  to {
    width:100%;
  }
}
p{
    font-family:Poppins;
    ${tw`p-0 m-0  text-sm`}
}
`
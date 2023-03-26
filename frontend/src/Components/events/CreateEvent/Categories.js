import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useEvents } from '../context/EventContext'
import { BiLoaderAlt } from 'react-icons/bi'

export const Categories = ({handleChildren, value=""}) => {
    const {category,getCategories} = useEvents()
    const [active, setActive] = useState(value)
    const handleClick = (value,id)=>{
        setActive(value)
        handleChildren("categoryId",id)
    }
    useEffect(()=>{
      getCategories()
    },[])
    if(category.loading){
      return <Main>
        <label>Category</label>
        <div className='loading'>
          <BiLoaderAlt className='icon'/>
        </div>
      </Main>
    }
  return (
    <Main>
    <label>Category</label>
    <div>

    {
        category.data.map((i)=>{
            const {name,id} = i
            return <div className={`category ${active === name && "active"}`} key={name} name={name} onClick={()=>handleClick(name,id)}>
                <p>{name}</p>
            </div>
        })
    }
    </div>
  </Main>
  )
}
const Main = styled.div`
  ${tw`w-full max-w-[410px] flex items-start flex-col space-y-2`}
  label {
    font-family: PoppinsSemiBold;
    ${tw`text-[rgba(0,0,0,.7)] capitalize text-sm`}
  }
  select, textarea,
  input {
    font-family: DMsansRegular;
    ${tw`w-full py-2 px-5 border border-[rgba(0,0,0,.5)] text-[rgba(0,0,0,.7)] rounded-lg`}
    :placeholder {
      ${tw`capitalize text-[rgba(0,0,0,.7)]`}
    }
  }
  >div{
      ${tw`flex flex-wrap w-full space-x-2 `}
      .category{
        ${tw`mb-2 cursor-pointer text-newBlue border border-newBlue border-solid rounded-lg p-1 px-2`}
      }
      .active{
        ${tw`text-white bg-newBlue`}
      }
  }
  .loading{
    ${tw`max-h-[120px] flex items-center justify-center `}
    .icon{
      ${tw`animate-spin text-sm`}
    }
  }
`
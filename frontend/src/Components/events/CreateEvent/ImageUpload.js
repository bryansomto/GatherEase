import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useEvents } from '../context/EventContext'
import {Loader} from "../../all/load/Loader"
import images from "../../../Assets/svg/image.svg"

export const ImageUpload = () => {
  const {uploadImage, eventImage} = useEvents()
  const handleChange = (e)=>{
    e.preventDefault()
    const data = new FormData()
    data.append("eventImage",e.target.files[0])
    uploadImage(data)
  }
  if(eventImage.loading){
    return <Main>
      <Loader/>
    </Main>
  }
  return (
    <Main>
      <label>Image</label>
      <input type="file" accept='image/*' onChange={(e)=>handleChange(e)}/>
      <div className='uploaded'>
        <p>Image to be uploaded</p>
        {
          eventImage.data.length === 0 ?
          <img className='imagedef' src={images} alt="uploaded"/>
          :<img src={eventImage.data} alt="uploaded"/>
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
  .uploaded{
    ${tw`w-full flex flex-col items-center space-y-3`}
    p{
      font-family: PoppinsSemiBold;
    ${tw`w-full text-[rgba(0,0,0,.5)] text-sm`}
    }
    img{
      ${tw`rounded-lg w-full object-cover`}
    }
    .imagedef{
      ${tw`max-w-[150px] py-10`}
    }
  }
`
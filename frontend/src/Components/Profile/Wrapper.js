import React from 'react'
import ProfileEvents from './ProfileEvents'
import ProfileData from "./ProfileData"
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGlobally } from '../../context/AppContext'
import { AttendedEvents } from './AttendedEvents'
const Wrapper = () => {
  const {role} = useGlobally()
  const organizer = role === process.env.REACT_APP_ORGANIZER
  return (
    <Main>
        <ProfileData/>
        {
       (organizer)?<ProfileEvents/>:<AttendedEvents/>
        }
    </Main>
  )
}

export default Wrapper

const Main = styled.section`
${tw`w-full flex flex-col space-y-10 md:space-y-0 md:grid md:grid-cols-[35%,65%] py-12`}
`

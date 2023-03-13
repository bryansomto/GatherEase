import React from 'react'
import { Main } from '../styles'
import {Header}from "../all/Header"
import { ServicesCard } from '../all/ServicesCard'
import { servicesData } from '../utils/Home'
import styled from 'styled-components'
import tw from 'twin.macro'
const Services = () => {
  return (
    <Main>
      <Header title="services"/>
      <ServiceDiv>

      {
        servicesData.map((item, index)=><ServicesCard key={item.title} {...item} index={index + 1}/>)
      }
      </ServiceDiv>
    </Main>

  )
}

export default Services
 const ServiceDiv =styled.div`
 ${tw`w-full flex flex-col space-y-24`}
 `
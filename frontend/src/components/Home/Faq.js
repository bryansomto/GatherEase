import React from 'react'
import {Header} from "../all/Header"
import { Main } from '../styles'
import {SingleFaq} from "../all/SingleFaq"
import {FaqData} from "../utils/Home"
const Faq = () => {
  return (
    <Main>
      <Header title="Frequently ask questions"/>
      {
        FaqData.map((item, index)=><SingleFaq key={index} {...item}/>)
      }
    </Main>
  )
}

export default Faq
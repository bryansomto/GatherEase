import React from 'react'
import {Main} from "../styles"
import { Header } from '../all/Header'
import {GithubData} from "../utils/Home"
import {FaGithub, FaTwitter, FaLinkedin} from "react-icons/fa"
import styled from 'styled-components'
import tw from 'twin.macro'
const Developers = () => {
  return (
    <Main>
      <Header title="developers"/>
      <Dev>
      {GithubData.map((item)=>{
        const {name,github,linkedin,twitter} = item
        return <div className='developer'>
          <header>{name}</header>
          <div>
          <a href={github} target="_blank" rel='noreferrer'><FaGithub/></a>
          <a href={linkedin} target="_blank" rel='noreferrer'><FaLinkedin/></a>
          <a href={twitter} target="_blank" rel='noreferrer'><FaTwitter/></a>
          </div>
          </div>
      })
      }
      </Dev>
    </Main>
  )
}

export default Developers
const Dev = styled.a`
${tw`w-full max-w-[800px] grid grid-cols-[repeat(auto-fit, minmax(7rem, 1fr))] justify-items-center gap-5`}
.developer{
  ${tw`border-solid border border-[rgba(0,0,0,.3)] max-w-[150px] flex flex-col items-center space-y-5 p-5 rounded-lg`}
  header{
    font-family:PoppinsBold;
    ${tw`text-sm text-black`}
    opacity:.7;
  }
  div{
    ${tw`flex items-center space-x-5`}
  }

}
`
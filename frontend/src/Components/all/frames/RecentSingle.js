import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Link } from 'react-router-dom'
import { useText } from '../../hooks/useText'
import { useDate } from '../../hooks/useDate'
export const RecentSingle = ({image,title,description,createdAt, index}) => {
  return (
    <Main>
        <Link className="event-image" to={`/events/${index}`}>
          <img
            className="event-image"
            src={image}
            alt={title}
          />
        </Link>
          <div className="inner-info">
            <header className="font">{title}</header>
            <div>
            <p>{useText(description)}</p>
            <p className="created">
              <span className="font">Created At</span>
              {useDate(createdAt)}
            </p>
            </div>
          </div>
        </Main>
  )
}


const Main = styled.div`
    ${tw`flex flex-col md:flex-row items-start space-x-0 md:space-x-5`}

        .event-image {
          ${tw`rounded-lg text-sm w-full min-w-[100px] max-w-none md:max-w-[220px] h-full`}
        }
    .inner-info{
        ${tw`flex flex-col space-y-2`}
        p{
            ${tw`text-sm`}
        }
        .created {
          ${tw`text-[rgba(0,0,0,.5)] text-sm`}
          span {
            ${tw`text-[rgba(0,0,0,.5)] text-xs mr-5`}
          }
        }
    }
`
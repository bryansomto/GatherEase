import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Link } from 'react-router-dom'
import { useText } from '../../hooks/useText'
import { useDate } from '../../hooks/useDate'
export const RecentSingle = ({imageUrl,title,description,createdAt,id}) => {
  return (
    <Main>
        <Link className="event-image" to={`/events/${id}`}>
          <img
            className="event-image"
            src={imageUrl}
            alt={title}
          />
        </Link>
          <div className="inner-info">
            <header className="font">{title}</header>
            <div>
            <p>{useText(description)}</p>
            <div className="created">
              {useDate(createdAt)}
            </div>
            </div>
          </div>
        </Main>
  )
}


const Main = styled.div`
    ${tw`flex flex-col md:flex-row items-start space-y-4 md:space-y-0 space-x-0 md:space-x-5`}

        .event-image {
          ${tw`rounded-lg text-xs lg:text-sm w-full min-w-[100px] max-w-none md:max-w-[220px] h-full`}
        }
    .inner-info{
        ${tw`flex flex-col space-y-2`}
        .font{
          ${tw`text-xs lg:text-sm`}
        }
        p{
            ${tw`text-xs lg:text-sm`}
        }
        .created {
          ${tw`flex items-center text-[rgba(0,0,0,.5)] text-[10px] lg:text-sm`}
          span {
            ${tw`text-[rgba(0,0,0,.5)] text-[10px] lg:text-xs mr-5`}
          }
        }
    }
`
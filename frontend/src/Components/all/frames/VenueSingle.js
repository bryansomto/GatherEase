import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Link } from 'react-router-dom'

export const VenueSingle = ({city,country,imageUrl,createdAt,id,name,street}) => {
    return (
        <Main>
            <Link className="event-image" to={`/venues/${id}`}>
              <img
                className="event-image"
                src={imageUrl}
                alt={name}
              />
            </Link>
              <div className="inner-info">
                <header className="font">{name}</header>
                <div>
                <p>{`${city} ${country}`}</p>
                <div className="created">
                  {street}
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
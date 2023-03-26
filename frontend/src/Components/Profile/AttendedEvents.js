import moment from "moment";
import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useGlobally } from "../../context/AppContext";
import { ContentHeader } from "../all/headers/ContentHeader";
import { Loader } from "../all/load/Loader";
import { ParseEvent } from "./ParseEvent";

export const AttendedEvents = () => {
  const { getEventsAttended, eventAttended } = useGlobally();
  useEffect(() => {
    getEventsAttended();
  }, []);
  if (eventAttended.loading) {
    return <Main>
      <ContentHeader
        url={`/events`}
        title="events you booked"
        text="all event"
      />
      <Loader />
    </Main>;
  }

  return (
    <Main>
      <ContentHeader
        url={`/events`}
        title="events you booked"
        text="all events"
      />
      <div className="table">

      <table>
        <thead>
          <tr>
            <td>name</td>
            <td>venue</td>
            <td>time</td>
            <td>date</td>
            <td>status</td>
            <td>RSPV at</td>
          </tr>
        </thead>
        <tbody>
          {eventAttended.data.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No events yet
              </td>
            </tr>
          ) : (
            eventAttended.data.map((item,index) => {
              const { eventId, attended, createdAt} = item;
              return (
                <tr key={index}>
                  <ParseEvent eventId={eventId}/>
                  <td>{attended?"Attended":"Upcoming"}</td>
                  <td>{moment(createdAt).format("dddd, MMM D YYYY")}</td>
                </tr>
              );
            })
          )}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <button className="dir">previous</button>
            </td>
            <td colSpan={4}></td>
            <td>
              <button className="dir">next</button>
            </td>
          </tr>
        </tfoot>
      </table>
      </div>
    </Main>
  );
};

const Main = styled.div`
  ${tw`w-full flex flex-col space-y-5 px-6 md:pr-10`}
  .table{
    ${tw`w-full overflow-x-scroll flex items-start`}
    table{
        ${tw`min-w-[1000px]`}
        thead > tr, tbody > tr {
            ${tw`border-b border-solid border-[rgba(0,0,0,.1)]`}
            td {
              ${tw`min-w-fit py-5 text-[rgba(0,0,0,.7)]`}
            }
            .actions {
              ${tw`flex space-x-5`}
              button {
                ${tw`px-2.5 py-1 rounded-lg`}
              }
              .remove {
                ${tw`bg-white border border-solid border-newOrange text-newOrange`}
              }
              .view {
                ${tw`bg-white border border-solid border-newPurple text-newPurple`}
              }
            }
          }
          thead tr td {
            font-family: PoppinsBold;
            ${tw`capitalize`}
          }
          tbody tr td {
            font-family: PoppinsSemiBold;
          }
          tfoot tr td {
            ${tw`py-5`}
          }
          tfoot tr td:last-child {
            ${tw`flex justify-end pr-5`}
          }
          tfoot tr td:first-child {
            ${tw`pl-5`}
          }
          .dir {
            ${tw`px-5 py-2 bg-newGreen text-white rounded-lg`}
          }
    }
  }
 
`;

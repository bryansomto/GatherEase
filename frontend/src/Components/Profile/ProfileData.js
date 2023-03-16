import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { profileInfo, profileEvents } from "../utils/Profile";

export const ProfileDetails = () => {
  return (
    <Main>
      <section className="list">
        <ProfileList data={profileInfo} title="profile details" />
      </section>
    </Main>
  );
};

export const ProfileEvents = () => {
  return (
    <Main>
      <section className="list">
        <EventList data={profileEvents} title="Events" />
      </section>
    </Main>
  );
};

const ProfileList = ({ data, title }) => {
  return (
    <div className="list">
      <header>{title}</header>
      {data.map((i) => (
        <div>
          <p className="profileInfo font-bold">{i.key}</p>
          <p className="profileInfo">{i.value}</p>
        </div>
      ))}
    </div>
  );
};

const EventList = ({ data, title }) => {
  return (
    <div className="list">
      <header>{title}</header>
      {data.map((i) => (
        <div>
          <img
            className="object-contain h-48 w-96"
            src={i.image}
            alt={i.title}
          />
          <p>{i.title}</p>
          <p>{i.created}</p>
        </div>
      ))}
    </div>
  );
};

const Main = styled.section`
  ${tw`flex flex-col justify-between space-y-24 pt-[4rem] h-[28rem]`}
  .profileInfo {
    ${tw`inline space-x-12 md:space-x-24 pl-5 md:pl-10`}
  }
  .list {
    ${tw`flex flex-col capitalize space-y-2.5`}
    header {
      font-family: PoppinsSemiBold;
    }`;

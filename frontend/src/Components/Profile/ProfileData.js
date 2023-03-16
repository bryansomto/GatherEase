import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ProfileInfo } from "../utils/Profile";

export const ProfileDetails = () => {
  return (
    <Main>
      <section className="list">
        <List data={ProfileInfo} title="profile details" />
      </section>
    </Main>
  );
};

export const ProfileEvents = () => {
  return (
    <section>
      <header> Events </header>
    </section>
  );
};

const List = ({ data, title }) => {
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

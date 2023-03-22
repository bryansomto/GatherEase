import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { useGlobally } from "../../context/AppContext";
import { FooterAccount,FooterLoginAccount, FooterSocial, FooterEvents } from "../../utils/Wrapper";
const Footer = () => {
  const {user}= useGlobally()
  const {state} = useLocation()
  let data = (!user) ? FooterAccount : FooterLoginAccount 
  if(state){
    data = FooterLoginAccount
  }
  return (
    <Main>
      <div className="links">
        <List data={FooterSocial} title="social" />
        <List data={data} title="account" />
        <List data={FooterEvents} title="events" />
      </div>
      <div className="copyright">Copyright &copy;2023 GatherEase</div>
    </Main>
  );
};

const List = ({ data, title }) => {
  return (
    <div className="list">
      <header>{title}</header>
      {data.map((i) => (
        <Link key={i.text} to={i.link}>
          {i.text}
        </Link>
      ))}
    </div>
  );
};
export default Footer;
const Main = styled.footer`
  ${tw`bg-newBlue text-white flex flex-col justify-between space-y-24 pt-[4rem] h-[28rem]`}
  .links {
    ${tw`flex space-x-12 md:space-x-24 pl-5 md:pl-10`}
  }
  .list {
    ${tw`flex flex-col capitalize space-y-2.5`}
    header {
      font-family: PoppinsSemiBold;
    }
    a {
      ${tw`text-white`}
    }
  }
  .copyright {
    font-family: PoppinsSemiBold;
    ${tw`border-t border-[#fff] text-center text-sm py-6`}
  }
`;

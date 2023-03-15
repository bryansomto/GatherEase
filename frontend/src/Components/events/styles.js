import styled from "styled-components";
import tw from "twin.macro";

export const Wrapper = styled.section`
  ${tw`flex flex-col md:flex-row items-start p-5 space-x-0 space-y-5 md:space-y-0 md:space-x-5`}
`;
export const Main = styled.div`
  ${tw`w-full max-w-[830px] space-y-5 flex flex-col`}
`;

export const Form = styled.form`
  ${tw`w-full flex flex-col space-y-5`}
  header {
    font-family: PoppinsBold;
    ${tw`capitalize`}
  }
  .submit,
  .input {
    ${tw`w-full max-w-[410px] flex items-start flex-col space-y-2`}
    label {
      font-family: PoppinsSemiBold;
      ${tw`text-[rgba(0,0,0,.7)] capitalize text-sm`}
    }
    select, textarea,
    input {
      font-family: DMsansRegular;
      ${tw`w-full py-2 px-5 border border-[rgba(0,0,0,.5)] text-[rgba(0,0,0,.7)] rounded-lg`}
      :placeholder {
        ${tw`capitalize text-[rgba(0,0,0,.7)]`}
      }
    }
  }
  .submit {
    ${tw`items-end pr-5 md:max-w-none max-w-[410px] `}
    input {
      ${tw`w-auto cursor-pointer py-2.5 px-5 bg-newOrange border-none text-white rounded-lg`}
    }
  }
  .input-radio {
    ${tw`w-full max-w-[410px] flex items-start flex-col space-y-2`}
    p{
        font-family: PoppinsSemiBold;
      ${tw`text-[rgba(0,0,0,.7)] capitalize text-sm`}
    }
    > div {
        ${tw`w-full flex`}
      > div {
        ${tw`w-full flex items-center space-x-2`}
        label {
          font-family: PoppinsSemiBold;
          ${tw`text-[rgba(0,0,0,.5)] capitalize text-sm`}
        }
        input {
          font-family: DMsansRegular;
          ${tw`w-auto py-2 px-5 border border-[rgba(0,0,0,.5)] text-[rgba(0,0,0,.7)] rounded-lg`}
          :placeholder {
            ${tw`capitalize text-[rgba(0,0,0,.7)]`}
          }
        }
      }
    }
  }
`;

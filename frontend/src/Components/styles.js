import styled from "styled-components";
import tw from "twin.macro";
export const Main = styled.section`
  ${tw`flex flex-col items-center p-12 md:p-24 py-12 space-y-8`}
`;
export const Form = styled.form`
  ${tw`w-full max-w-[350px] flex flex-col space-y-5`}
  header {
    font-family: PoppinsBold;
    ${tw`capitalize`}
  }
  .submit,
  .input {
    ${tw`w-full flex items-start flex-col space-y-2`}
    label {
      font-family: PoppinsSemiBold;
      ${tw`text-[rgba(0,0,0,.7)] capitalize text-sm`}
    }
    textarea,
    input {
      font-family: DMsansRegular;
      ${tw`w-full py-2 px-5 border border-[rgba(0,0,0,.5)] text-[rgba(0,0,0,.7)] rounded-lg`}
      :placeholder {
        ${tw`capitalize text-[rgba(0,0,0,.7)]`}
      }
    }
  }
  .submit {
    ${tw`items-end`}
    input {
      ${tw`w-auto cursor-pointer py-2.5 px-5 bg-newGreen text-white rounded-lg`}
    }
  }
  .authButton {
    ${tw`shadow bg-indigo-900 hover:bg-indigo-800 text-white py-3`}
  }
`;

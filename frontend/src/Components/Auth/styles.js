import styled from "styled-components";
import tw from "twin.macro";



export const Main = styled.section`
${tw`bg-white w-full max-w-[300px] md:max-w-[400px] border-t-[5px] flex items-start justify-center border-solid border-newBlue rounded-lg p-12 pt-8`}
box-shadow:0px 4px 8px 0px rgba(140, 104, 204, .25);
`

export const Form = styled.form`
  ${tw`w-full max-w-[200px] md:max-w-none flex flex-col space-y-5`}
  
  header {
    font-family: PoppinsBold;
    ${tw`capitalize w-full text-center text-newBlue`}
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
      ${tw`cursor-pointer py-2.5 px-5 bg-newBlue text-white rounded-none`}
    }
  }
  .links{
    ${tw`flex items-center justify-center text-sm`}
    a{
      font-family:PoppinsSemiBold;
      ${tw`text-newBlue hover:underline`}
    }
  }
`;


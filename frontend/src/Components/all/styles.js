import styled from "styled-components";
import tw from "twin.macro";

export const Recent = styled.div`
  ${tw`w-full max-w-[540px] flex flex-col space-y-5`}
  .font {
    font-family: poppinsBold;
    
  }
  .recent{
    ${tw`grid grid-cols-[repeat(auto-fit, minmax(150px, 1fr))] gap-5 md:flex md:flex-col space-y-0 md:space-y-5`}
    .image-div{
      ${tw`pt-10 w-full flex items-center space-y-5 flex-col justify-start`}
      >img{
        ${tw`max-w-[300px] max-h-[200px]`}
      } 
      >p{
        ${tw`text-sm`}
      }
    }
  }
`;
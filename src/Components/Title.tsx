import React from "react";
import styled from "styled-components";

const Title = ({ title }: { title: string }) => {
  return <StyledTitle>{title}</StyledTitle>;
};

export default Title;
const StyledTitle = styled.div`
  /* background: green; */
  font-size: 5em;
  letter-spacing: 5px;
  text-align: center;
  color: white;
  //width =< 425px
  @media screen and (max-width: 428px) {
    font-size: 2.7em;
    width: 100%;
  }
`;

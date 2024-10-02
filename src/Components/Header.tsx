import React from "react";
import styled from "styled-components";
import Title from "./Title";

const Header = () => {
  return (
    <StyledHeader>
      <Title title="Uni Kit" />
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  width: 100%;
  padding-top: 15px;
`;

import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <span> © dev.frenchlod@gmail.com</span>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  width: 100%;
  padding-bottom: 15px;
  span {
    text-align: center;
    color: white;
  }
`;

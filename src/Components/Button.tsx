import React from "react";
import styled from "styled-components";
import "animate.css";

const Button = ({ text, onAction }: { text: string; onAction: () => void }) => {
  return (
    <StyledButton
      onClick={() => onAction()}
      className="animate__animated animate__fadeInUp"
    >
      {text}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  background: yellowgreen;
  padding: 13px;
  border: none;
  border-radius: 5px;
  font-weight: 700;
  margin: 10px;
  width: 100%;
  cursor: pointer;
  //width =< 425px
  @media screen and (max-width: 428px) {
    font-size: 1.2em;
  }
`;

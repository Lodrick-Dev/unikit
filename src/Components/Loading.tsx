import React from "react";
import styled from "styled-components";
import { Dynamic } from "../context/ContextDynamic";

const Loading = () => {
  const { consigne } = Dynamic();
  return (
    <StyledLoading>
      <span>{consigne === "Vérifié" ? "Création..." : "Vérification..."}</span>
      <span className="loader"></span>
    </StyledLoading>
  );
};

export default Loading;

const StyledLoading = styled.div`
  /* background: pink; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    color: white;
    margin-bottom: 25px;
    font-weight: 700;
    font-size: 1.3em;
  }
  .loader {
    transform: rotateZ(45deg);
    perspective: 1000px;
    border-radius: 50%;
    width: 78px;
    height: 78px;
    color: #fff;
  }
  .loader:before,
  .loader:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: 1s spin linear infinite;
  }
  .loader:after {
    color: #ff3d00;
    transform: rotateY(70deg);
    animation-delay: 0.4s;
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotateZ(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotateZ(360deg);
    }
  }

  @keyframes rotateccw {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }

  @keyframes spin {
    0%,
    100% {
      box-shadow: 0.2em 0px 0 0px currentcolor;
    }
    12% {
      box-shadow: 0.2em 0.2em 0 0 currentcolor;
    }
    25% {
      box-shadow: 0 0.2em 0 0px currentcolor;
    }
    37% {
      box-shadow: -0.2em 0.2em 0 0 currentcolor;
    }
    50% {
      box-shadow: -0.2em 0 0 0 currentcolor;
    }
    62% {
      box-shadow: -0.2em -0.2em 0 0 currentcolor;
    }
    75% {
      box-shadow: 0px -0.2em 0 0 currentcolor;
    }
    87% {
      box-shadow: 0.2em -0.2em 0 0 currentcolor;
    }
  }
`;

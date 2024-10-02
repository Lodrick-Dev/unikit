import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const JustQuestion = () => {
  const [vote, setVote] = useState(false);
  const goVote = async () => {
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API}count-votes/one`,
        withCredentials: true,
        data: {
          nameVote: "questions",
        },
      });
      setVote((prev) => !prev);
      return toast.success("Merci pour le vote");
    } catch (error) {
      console.log(error);
      const typedError = error as any;
      if (typedError.status === 412) {
        setVote((prev) => !prev);
        return toast.error("Vous avez déjà voté");
      }
      return toast.error("Une erreur est survenue lors du vote");
    }
  };
  return (
    <StyledJustQuestion onClick={() => setVote((prev) => !prev)}>
      {vote && (
        <div className="justQuestion" onClick={(e) => e.stopPropagation()}>
          <span className="voted" onClick={() => goVote()}>
            Voter
          </span>
          <span onClick={() => setVote((prev) => !prev)}>Annuler</span>
        </div>
      )}
      <h2>Juste Question</h2>
      <p>Question/réponse vous permettra de créer une liste de question</p>
      <p>
        "Just Question" sans réponse permet de stimuler la réflexion critique,
        d'améliorer la mémorisation, d'encourager l'exploration, de faciliter la
        préparation aux examens, et d'identifier les zones d'incertitude. Elle
        favorise également l'autonomie
      </p>
    </StyledJustQuestion>
  );
};

export default JustQuestion;

const StyledJustQuestion = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin: 10px;
  padding: 10px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  .justQuestion {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 50%;
    left: 50%;
    background: white;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 10px;
    border-radius: 10px;
    cursor: auto;
    .voted {
      padding: 10px;
      background: #79c179;
      cursor: pointer;
      border-radius: 5px;
    }
    span {
      padding: 10px;
      background: #e37575;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  h2 {
    background: #e7e7e7;
    width: 100%;
    text-align: center;
    border-radius: 5px;
  }
  p {
    width: 100% !important;
    margin: 10px 0px;
    text-align: center;
  }
`;

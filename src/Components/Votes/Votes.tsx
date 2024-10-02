import React from "react";
import styled from "styled-components";
import Structure from "./Structure";
import QuestionAnswer from "./QuestionAnswer";
import JustQuestion from "./JustQuestion";

const Votes = () => {
  return (
    <StyledVotes>
      <h3>Espace vote</h3>
      <p className="sous-title">
        Découvrez nos prochaines fonctionnalités à venir ! Votre vote nous aide
        à développer celles qui vous tiennent le plus à cœur. Participez et
        faites entendre votre voix !
      </p>
      <div className="cadre">
        <Structure />
        <QuestionAnswer />
        <JustQuestion />
      </div>
    </StyledVotes>
  );
};

export default Votes;

const StyledVotes = styled.div`
  background: #d6d6d6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px 0px;
  border-radius: 15px;
  h3 {
    font-size: 2.4em;
    margin-bottom: 10px;
    color: #8d50c5;
  }
  .sous-title {
    width: 50%;
    text-align: center;
    border-radius: 5px;
    background: #8d50c5;
    color: white;
  }
  > .cadre {
    display: flex;
  }

  //width =< 425px
  @media screen and (max-width: 429px) {
    width: 100%;
    margin: 0px;
    padding: 10px;
    .sous-title {
      width: 100%;
    }
    .cadre {
      display: flex;
      flex-direction: column;
    }
  }
`;

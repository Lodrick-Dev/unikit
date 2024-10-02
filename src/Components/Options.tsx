import React, { useState } from "react";
import styled from "styled-components";
import Title from "./Title";
import Button from "./Button";
import { MdCancel } from "react-icons/md";
import { Dynamic } from "../context/ContextDynamic";
import { toast } from "react-toastify";
import axios from "axios";
interface FicheRevision {
  cours: string;
  sujet: string;
}

const Options = () => {
  const [inputNot, setInputNot] = useState<string>("");
  const [verification, setVerification] = useState<FicheRevision[]>([]);
  const {
    setFileUpload,
    fileUpload,
    selectMatiere,
    setSelectMatiere,
    setNameDoc,
    nameDoc,
    setLoading,
    loading,
    consigne,
    setConsigne,
  } = Dynamic();
  const action = (mat: string) => {
    setSelectMatiere(mat);
    setConsigne("Sytème prêt");
  };
  const cancel = () => {
    setFileUpload(null);
    setConsigne("Vérifier le fichier");
    setNameDoc("");
    setSelectMatiere("");
  };

  const actionPlay = () => {
    if (consigne === "Vérifier le fichier") {
      checkDocISCorrect();
      return;
    }

    if (consigne === "Vérifié") {
      createDocNow();
    }
  };

  const checkDocISCorrect = async () => {
    if (inputNot) {
      return toast.error("Erreur");
    }
    const data = new FormData();
    if (fileUpload) {
      data.append("File", fileUpload);
      data.append("option", selectMatiere);
      data.append("field", inputNot);
      setLoading((prev) => !prev);
    }
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API}file/check`,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        data,
        withCredentials: true,
      });
      if (response.data.cours) {
        console.log(response.data.cours);
        setVerification([response.data]);
        setConsigne("Vérifié");
      }

      setLoading((prev) => !prev);
      // if (response.data.message) {
      //   toast.error(response.data.message);
      //   cancel();
      //   setLoading((prev) => !prev);
      //   return;
      // }

      // Vérifiez si la réponse est réussie
    } catch (error) {
      setLoading((prev) => !prev);
      if (error) {
        console.log(error);
        // Cast error en 'any' pour contourner le problème de typage
        const typedError = error as any;
        if (typedError.status === 406) {
          cancel();
          return toast.error("Le document ne ressemble pas à un cours.");
        }
        cancel();
        return toast.error("Une erreur est survenue.Réessayez ou plus tard");
      }
    }
  };

  const createDocNow = async () => {
    if (inputNot) {
      return toast.error("Erreur");
    }
    const data = new FormData();
    if (fileUpload) {
      data.append("File", fileUpload);
      data.append("option", selectMatiere);
      data.append("field", inputNot);
      setLoading((prev) => !prev);
    }

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API}file/create`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data,
        withCredentials: true,
        responseType: "blob",
      });
      if (response.data.message) {
        toast.error(response.data.message);
        cancel();
        setLoading((prev) => !prev);
        return;
      }

      // Vérifiez si la réponse est réussie
      if (response.status >= 200 && response.status < 300) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `fiche_revision_${selectMatiere}.pdf`); // Nom du fichier PDF
        document.body.appendChild(link);
        link.click();
        link.remove(); // Supprimer le lien après le téléchargement
        cancel();
        setLoading((prev) => !prev);
      } else {
        setLoading((prev) => !prev);
        console.error("Erreur lors du téléchargement du fichier PDF");
      }
    } catch (error) {
      setLoading((prev) => !prev);
      if (error) {
        console.log(error);
        // Cast error en 'any' pour contourner le problème de typage
        const typedError = error as any;
        if (typedError.status === 406) {
          cancel();
          return toast.error("Le document ne ressemble pas à un cours.");
        }
        cancel();
        return toast.error("Une erreur est survenue.Réessayez ou plus tard");
      }
    }
  };
  return (
    <StyledOptions $css={consigne}>
      {!loading && <h2>{consigne}</h2>}
      {/* {!selectMatiere && (
        <div className="buttons">
          <Button text="Histoire" onAction={() => action("histoire")} />
          <Button text="Math" onAction={() => action("math")} />
          <Button text="Science" onAction={() => action("science")} />
        </div>
      )} */}
      {!selectMatiere && (
        <div className="box-cancel">
          <MdCancel className="icon-cancel" onClick={cancel} />
        </div>
      )}
      {!loading && (
        <div className="box-name-file">
          {verification &&
            verification.map((verif, index) => (
              <div className="lil-box-info-cours" key={index}>
                <span>Cours : {verif.cours}</span>
                <span>Sujet : {verif.sujet}</span>
                <strong>Le fichier est correcte ? Créer votre fiche</strong>
              </div>
            ))}
          <span>Nom du fichier : {nameDoc}</span>
        </div>
      )}
      {!loading && (
        <div className="box-button animate__animated animate__zoomInUp">
          <button onClick={() => actionPlay()}>
            {consigne === "Vérifié"
              ? "Lancer la création"
              : "Lancer la vérification"}
          </button>
          <input type="hidden" onChange={(e) => setInputNot(e.target.value)} />
        </div>
      )}
    </StyledOptions>
  );
};

export default Options;

const StyledOptions = styled.div<{ $css?: string }>`
  /* background: pink; */
  width: 50%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  border: 1px solid red; /* Initial border color */
  animation: borderAnimation 3s infinite; /* Apply animation */

  h2 {
    text-align: center;
    color: ${({ $css }) => ($css === "Vérifié" ? "blueviolet" : "white")};
    margin-bottom: 20px;
  }
  > .buttons {
    display: flex;
    justify-content: space-around;
  }
  > .box-cancel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
    .icon-cancel {
      cursor: pointer;
      margin: 20px 0px;
      font-size: 2em;
      color: #fa6969;
      animation: grow-shrink 1s ease-in-out infinite;
      animation-play-state: running;
    }
    span {
      color: white;
    }
  }
  > .box-button {
    display: flex;
    justify-content: center;
    width: 30%;
    margin: 10px auto;
    button {
      padding: 10px;
      font-weight: 700;
      border: none;
      border-radius: 5px;
      width: 80%;
      /* background: green; */
      background: ${({ $css }) =>
        $css === "Vérifié" ? "#79c179" : "blueviolet"};
      color: white;
      cursor: pointer;
    }
  }
  > .box-name-file {
    margin: 10px 0px;
    span {
      display: block;
      text-align: center;
      color: white;
    }
    > .lil-box-info-cours {
      margin: 0px 0px 15px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        margin-bottom: 10px;
      }
      strong {
        text-align: center;
        font-size: 1.5em;
        color: white;
        background: blueviolet;
        padding: 5px;
        border-radius: 5px;
      }
    }
  }

  @keyframes borderAnimation {
    0% {
      border-color: red;
    }
    25% {
      border-color: blue;
    }
    50% {
      border-color: green;
    }
    75% {
      border-color: yellow;
    }
    100% {
      border-color: red;
    }
  }

  //width =< 425px
  @media screen and (max-width: 428px) {
    width: 100%;
    h2 {
      font-size: 2em;
    }
    > .buttons {
      flex-direction: column;
      align-items: center;
    }
    > .box-button {
      width: 100%;
    }
  }
`;

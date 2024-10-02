import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { Dynamic } from "../context/ContextDynamic";
const ZoneUpload = () => {
  const doc = useRef<HTMLInputElement>(null);
  // const [nameDoc, setNameDoc] = useState<string>("");
  const { setFileUpload, fileUpload, setNameDoc } = Dynamic();

  const handleIconClick = () => {
    doc.current?.click();
  };

  const handleUploadDoc = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const fileCatch = await e.target.files?.[0];
      if (fileCatch) {
        if (fileCatch.type !== "application/pdf") {
          return toast.error("Format refusé");
        }

        //vérifie la taille (5 mo)
        if (fileCatch.size > 5 * 1024 * 1024) {
          return toast.error("Fichier trop grand, 5 Mo max.");
        }
        setNameDoc(fileCatch.name);
        setFileUpload(fileCatch);
      }
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue lors du chargement du doc");
    }
  };

  const cancel = () => {
    setFileUpload(null);
    setNameDoc("");
  };

  useEffect(() => {
    if (!fileUpload) {
      cancel();
    }
  }, [fileUpload]);
  return (
    <StyledZoneUpload>
      <h3>5 Mo max</h3>
      <div className="circle-icon">
        <FaUpload
          className="icon animate__animated animate__bounce animate__infinite"
          onClick={handleIconClick}
        />
      </div>
      <input type="file" ref={doc} onChange={handleUploadDoc} />
      <span>*Aucune donnée n'est sauvegardée</span>
    </StyledZoneUpload>
  );
};

export default ZoneUpload;
const StyledZoneUpload = styled.div`
  /* background: pink; */
  margin: 40px auto;
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 0.9em;
    color: white;
  }
  .circle-icon {
    border: solid 1px white;
    margin: 10px;
    height: 200px;
    width: 200px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    animation: borderAnimation 3s infinite;
    .icon {
      font-size: 7em;
      margin: 20px;
      color: yellowgreen;
      cursor: pointer;
      /* border: solid 5px white;
      border-radius: 50%; */
      /* padding: 20px; */
      /* animation: bounce 0.5s ease-in-out infinite; */
      /* animation: bounce 2s ease-in-out infinite; */
    }
  }
  span {
    margin: 20px;
    color: white;
  }
  button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1.2em;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    width: 20%;
    background: #67b6e0;
    color: white;
    animation: bounce 0.5s ease-in-out infinite;
    animation-play-state: running;
  }
  button:hover,
  .icon-cancel:hover {
    animation-play-state: paused;
  }
  .icon-cancel {
    cursor: pointer;
    margin-top: 20px;
    font-size: 2em;
    color: #fa6969;
    animation: grow-shrink 1s ease-in-out infinite;
    animation-play-state: running;
  }
  input {
    display: none;
  }
  span {
    font-size: 0.9em;
    text-align: center;
  }
  //width =< 425px
  @media screen and (max-width: 428px) {
    width: 100%;
    button {
      width: 50%;
    }
    .circle-icon {
      height: 160px;
      width: 160px;
      .icon {
        font-size: 5em;
      }
    }
  }

  //animation
  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px); // Distance du saut
    }
  }

  @keyframes grow-shrink {
    0%,
    100% {
      transform: scale(1); /* Taille normale */
    }
    50% {
      transform: scale(1.1); /* Le bouton grossit à 120% */
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
`;

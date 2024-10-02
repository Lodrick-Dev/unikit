import styled from "styled-components";
import ZoneUpload from "./Components/ZoneUpload";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Dynamic } from "./context/ContextDynamic";
import Options from "./Components/Options";
import Loading from "./Components/Loading";
import Votes from "./Components/Votes/Votes";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const { fileUpload, loading } = Dynamic();
  const [count, setCount] = useState(0);

  const getCount = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API}file/count`,
        withCredentials: true,
      });
      // console.log(res);
      if (res.data.count) {
        setCount(res.data.count);
      }
    } catch (error) {
      console.log(error);
      return toast.error("Erreur lors de la récupération du count");
    }
  };
  useEffect(() => {
    getCount();

    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.muted = true;
      videoElement.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }
  }, []);
  return (
    <>
      <StyledApp>
        <Header />
        {loading && <Loading />}
        {!loading && (
          <div className="box-first">
            {!fileUpload && (
              <h2>Fiche de révision partir de vos cours (pdf uniquement)</h2>
            )}
            <span>
              {count} demande{count > 1 ? "s" : ""}
            </span>
          </div>
        )}
        {fileUpload ? <Options /> : <ZoneUpload />}
        {!fileUpload && (
          <div className="zone-details">
            {/* <strong>
              Fichier trop grand ? Compréssé votre document sur ce site,ici
            </strong> */}
            <Votes />
          </div>
        )}
        <Footer />
      </StyledApp>
      <Overlay />
      <BackgroundVideo autoPlay loop preload="auto" muted>
        <source src="./assets/bgvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
const StyledApp = styled.div`
  height: 100vh;
  width: 100%;
  padding: 20px;
  position: relative;
  z-index: 5 !important;
  > .box-first {
    /* background: yellow; */
    padding: 10px;
    h2 {
      color: white;
      margin: 15px 0px;
      text-align: center;
    }
    span {
      display: block;
      text-align: center;
      color: yellowgreen;
    }
  }
  > .zone-details {
    width: 80%;
    margin: 15px auto;
    /* background: #f68b33; */
    border-radius: 7px;
    padding: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    strong {
      font-size: 0.9em;
      color: white;
    }
  }
  //width =< 425px
  @media screen and (max-width: 429px) {
    padding: 0px;
    > .box-first {
      margin-top: 25px;
      width: 100%;
      padding: 2px;
    }
    > .box-first > h2 {
      font-size: 1.2em;
    }
    > .zone-details {
      width: 100%;
      margin: 0px;
      padding: 0px;
      strong {
        text-align: center;
      }
    }
  }
`;

// Composant pour la vidéo en fond
const BackgroundVideo = styled.video`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100vw;
  min-height: 100vh;
  z-index: -1;
  transform: translate(-50%, -50%);
  object-fit: cover; // pour s'assurer que la vidéo couvre toute la zone
`;

// Filtre overlay avec transparence et blur
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7); // Couche semi-transparente (70% opacity)
  backdrop-filter: blur(5px); // Ajoute du flou
  z-index: 0; // Juste au-dessus de la vidéo
`;

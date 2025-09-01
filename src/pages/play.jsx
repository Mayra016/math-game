import PlayersInfo from "../components/playersInfo";
import FreestyleMode from "../components/FreestyleMode";
import { useState, useRef, useEffect } from "react";
import music from '../assets/music.mp3';
import BeatTheClock from "../components/BeatTheClock";
import OneMinute from "../components/OneMinute";
import { useLocation } from "react-router-dom";
import GreaterThan from "../components/GreaterThan";

const Play = () =>  {
    const audioElement = useRef(null);
    const location = useLocation();
    const volume = localStorage.getItem("vol") || 50;
    const [lifes, setLifes] = useState(3);
    const [score, setScore] = useState(0);

    const handleUserAnswer = (value) => {
        if (value === "reset") {
            setScore(0);
            setLifes(3);
        }

        if (value === true) {
            setScore(prev => prev + 10);
        } else {
            if (lifes > 1) {
                setLifes(prev => prev - 1);
            } 
        }
    }

    useEffect(() => {
        if (audioElement.current) {
            audioElement.current.volume = volume / 100;
        }
    });

    return(
        <div>
            <PlayersInfo lifes={lifes} score={score}></PlayersInfo>
            {location.pathname.endsWith("/play/freestyle") && (<FreestyleMode sendData={handleUserAnswer} levelLifes={lifes} levelScore={score}></FreestyleMode>)}
            {location.pathname.endsWith("/play/beat-the-clock") && (<BeatTheClock sendData={handleUserAnswer} beatLifes={lifes} beatScore={score}></BeatTheClock>)}
            {location.pathname.endsWith("/play/one-minute") && (<OneMinute sendData={handleUserAnswer} oneLives={lifes} oneScore={score}></OneMinute>)}
            {location.pathname.endsWith("/play/greater-than") && (<GreaterThan sendData={handleUserAnswer} greaterLifes={lifes} greaterScore={score}></GreaterThan>)}
            <audio ref={audioElement} src={music} autoPlay loop></audio>
        </div>
    );
}

export default Play;
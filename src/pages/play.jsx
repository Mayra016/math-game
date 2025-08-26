import PlayersInfo from "../components/playersInfo";
import FreestyleMode from "../components/FreestyleMode";
import { useState, useRef, useEffect } from "react";
import music from '../assets/music.mp3';

const Play = () =>  {
    const audioElement = useRef(null);
    const volume = localStorage.getItem("vol") || 50;
    const [lifes, setLifes] = useState(3);
    const [score, setScore] = useState(0);

    const handleUserAnswer = (value) => {
        if (value) {
            setScore(prev => prev + 10);
        } else {
            if (lifes > 1) {
                setLifes(prev => prev - 1);
            } else {
                setScore(0);
                setLifes(3);
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
            <FreestyleMode sendData={handleUserAnswer} levelLifes={lifes} levelScore={score}></FreestyleMode>
            <audio ref={audioElement} src={music} autoPlay loop></audio>
        </div>
    );
}

export default Play;
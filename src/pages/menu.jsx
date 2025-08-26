import GameModes from "../components/gameModes";
import { useTranslation } from "../components/LanguageProvider";
import { useRef, useEffect } from 'react';
import music from '../assets/music.mp3';

const Menu = () => {
    const {text} = useTranslation();
    const volume = localStorage.getItem("vol") || 50;
    const audioElement = useRef(null);
    const gameModes = [{ "description" : text("equations"), "imgURL": "https://img.icons8.com/?size=100&id=46667&format=png&color=000000"}];

    useEffect(() => {
        if (audioElement.current) {
            audioElement.current.volume = volume / 100;
        }
    })

    return(
        <div className="container">
            <h1>MathGame</h1>
            {gameModes.map((mode, index) => (
                <GameModes key={index} description={mode["description"]} imgURL={mode["imgURL"]}></GameModes>
            ))}
            <audio ref={audioElement} src={music} autoPlay loop></audio>
        </div>
    );
}

export default Menu;
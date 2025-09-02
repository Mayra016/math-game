import GameModes from "../components/gameModes";
import { useTranslation } from "../components/LanguageProvider";
import { useRef, useEffect } from 'react';
import music from '../assets/music.mp3';
import GameModesInfo from '../models/gameModesInfo';
import freeStyleImg from '../assets/freestyle-icon.png';
import timmerIcon from '../assets/timmer-icon.png';
import oneMinuteIcon from '../assets/one-minute-icon.png';
import greaterThanIcon from '../assets/greaterThanIcon.png';
/*
    "beattheclock-title": "Contra o tempo",
    "freestyle-title": "Estilo livre",
    "greaterthan-title": "Maior que",
    "oneminute-title": "Um minuto"
    */

const Menu = () => {
    const {text} = useTranslation();
    const volume = localStorage.getItem("vol") || 50;
    const audioElement = useRef(null);
    const gameModes = [new GameModesInfo(text("freestyle-title"), text("equations"), freeStyleImg), new GameModesInfo(text("beattheclock-title"), text("clock-description"), timmerIcon),
                       new GameModesInfo(text("oneminute-title"), text("one-description"), oneMinuteIcon), new GameModesInfo(text("greaterthan-title"), text("greater-description"), greaterThanIcon)
    ];

    useEffect(() => {
        if (audioElement.current) {
            audioElement.current.volume = volume / 100;
        }
    })

    return(
        <div className="container">
            <h1>MathGame</h1>
            <div className="modes">
                {gameModes.map((mode, index) => (
                    <GameModes key={index} name={mode["name"]} description={mode["description"]} imgURL={mode["imgURL"]} link={mode["link"]}></GameModes>
                ))}
            </div>
            <audio ref={audioElement} src={music} autoPlay loop></audio>
        </div>
    );
}

export default Menu;
import GameModes from "../components/gameModes";
import { useTranslation } from "../components/LanguageProvider";
import { useRef, useEffect } from 'react';
import GameModesInfo from '../models/gameModesInfo';

const Menu = () => {
    const {text} = useTranslation();
    const volume = localStorage.getItem("vol") || 50;
    const audioElement = useRef(null);
    const gameModes = [new GameModesInfo(text("freestyle-title"), text("equations"), 'assets/freestyle-icon.png'), new GameModesInfo(text("beattheclock-title"), text("clock-description"), 'assets/timmer-icon.png'),
                       new GameModesInfo(text("oneminute-title"), text("one-description"), 'assets/one-minute-icon.png'), new GameModesInfo(text("greaterthan-title"), text("greater-description"), 'assets/greaterThanIcon.png')
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
            <audio ref={audioElement} src='assets/music.mp3' autoPlay loop></audio>
        </div>
    );
}

export default Menu;
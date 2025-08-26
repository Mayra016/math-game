import { useTranslation } from "../components/LanguageProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import music from '../assets/music.mp3';
import gameIcon from '../assets/game-icon.png';
import youtubeIcon from '../assets/youtube-logo.png'


const Config = () => {
    const { text } = useTranslation();
    const navigate = useNavigate();
    const audioElement = useRef(null);

    const [volume, setVolume] = useState(() => Number(localStorage.getItem("vol")) || 50);

    useEffect(() => {
        localStorage.setItem("vol", String(volume));
        if (audioElement.current) {
            audioElement.current.volume = volume / 100;
        }
    }, [volume]);

    return (
        <div id="configuration">
            <div className="volume-container">
                <div className="secondary-font">
                    <p className="volume">{text("volumeTxt")}</p>
                </div>
                <div className="secondary-font">
                    <input
                        name="volume-slider"
                        type="range"
                        step="1"
                        value={volume}
                        min="0"
                        max="100"
                        onChange={(e) => setVolume(Number(e.target.value))}
                    />
                    <output>{volume}%</output>
                </div>
            </div>
            <div className="infos">
                <div className="games" onClick={() => window.open(text('games-link'))}>
                    <img src={gameIcon} alt="game icon"></img>
                    <p>{text("more-games")}</p>
                </div>
                <div className="youtube" onClick={() => window.open(text('youtube-link'))}>
                    <img src={youtubeIcon} alt="youtube icon"></img>
                    <p>{text("youtube")}</p>
                </div>
            </div>

            <audio ref={audioElement} src={music} autoPlay loop></audio>

            <button className="button" onClick={() => navigate("/menu")}>
                {text("save")}
            </button>
        </div>
    );
};

export default Config;

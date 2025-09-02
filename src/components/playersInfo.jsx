import playAudio from "../utils/playAudio";
import { redirect } from "../utils/redirect";
import { useTranslation } from "./LanguageProvider";
import { useNavigate } from 'react-router-dom';

const PlayersInfo = ({score, lifes}) => {
    const {text} = useTranslation();
    const navigate = useNavigate();

    function redirect(route) {
        playAudio("pauseAudio");
        navigate(route);
    }

    return(
        <div className="players-info">
            <div>
                <button className="menu-btn" onClick={() => redirect('/')}>
                    <img className="menu-logo" src="assets/menu-icon.png" alt="menu logo" />
                </button>
            </div>
            <div className="lifes">
                {[...Array(lifes)].map((_, index) => (
                    <img className="lifes-number" src='assets/heart.png'></img>
                ))}
            </div>
            <div className="score">
                <h5>{text('score')}: </h5><h5 id="score">{score}</h5>
            </div>	
        </div>	
    );
}

export default PlayersInfo;
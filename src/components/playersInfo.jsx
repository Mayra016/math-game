import { redirect } from "../utils/redirect";
import { useTranslation } from "./LanguageProvider";
import heart from '../assets/heart.png';

const PlayersInfo = ({score, lifes}) => {
    const {text} = useTranslation();

    return(
        <div className="players-info">
            <div>
                <button className="menu-btn" onClick={() => redirect('/menu')}>
                    <img className="menu-logo" src="https://img.icons8.com/?size=100&id=36389&format=png&color=000000" alt="menu logo" />
                </button>
            </div>
            <div className="lifes">
                {[...Array(lifes)].map((_, index) => (
                    <img className="lifes-number" src={heart}></img>
                ))}
            </div>
            <div className="score">
                <h5>{text('score')}: </h5><h5 id="score">{score}</h5>
            </div>	
        </div>	
    );
}

export default PlayersInfo;
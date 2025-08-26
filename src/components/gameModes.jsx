import { useTranslation } from "../components/LanguageProvider";
import { useNavigate } from "react-router-dom";


const GameModes = ({key, description, imgURL}) => {
    const {text} = useTranslation();
    const navigate = useNavigate();

    return(
        <div className="gameModes" id={key} >
            <h3>{description}</h3>
            <img src={imgURL}></img>
            <button onClick={() => navigate('/play')}>{text("play")}</button>
        </div>
    );
};

export default GameModes;
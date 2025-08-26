import { useTranslation } from "../components/LanguageProvider";
import { useNavigate } from "react-router-dom";


const GameModes = ({modeKey, name, description, imgURL, link}) => {
    const {text} = useTranslation();
    const navigate = useNavigate();

    return(
        <div key={modeKey} className="gameModes">
            <h2>{name}</h2>
            <h3>{description}</h3>
            <img src={imgURL}></img>
            <button onClick={() => navigate(link)}>{text("play")}</button>
        </div>
    );
};

export default GameModes;
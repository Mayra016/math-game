import { useTranslation } from "../components/LanguageProvider";
import { redirect } from "../utils/redirect";


const GameModes = ({key, description, imgURL}) => {
    const {text} = useTranslation();

    return(
        <div className="gameModes" id={key} >
            <h3>{description}</h3>
            <img src={imgURL}></img>
            <button onClick={() => redirect('/play')}>{text("play")}</button>
        </div>
    );
};

export default GameModes;
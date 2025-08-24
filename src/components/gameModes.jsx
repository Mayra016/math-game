import { useTranslation } from "../components/LanguageProvider";
import { redirect } from "../utils/redirect";


const GameModes = ({description, imgURL}) => {
    const {text} = useTranslation();

    return(
        <div className="gameModes" >
            <h3>{description}</h3>
            <img src={imgURL}></img>
            <button onClick={() => redirect('/play')}>{text("play")}</button>
        </div>
    );
};

export default GameModes;
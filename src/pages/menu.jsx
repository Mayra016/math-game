import GameModes from "../components/gameModes";
import { useTranslation } from "../components/LanguageProvider";

const Menu = () => {
    const {text} = useTranslation();
    const gameModes = [{ "description" : text("equations"), "imgURL": "https://img.icons8.com/?size=100&id=46667&format=png&color=000000"}];

    return(
        <div class="container">
            <h1>MathGame</h1>
            {gameModes.map((mode, index) => (
                <GameModes description={mode["description"]} imgURL={mode["imgURL"]}></GameModes>
            ))}
            
        </div>
    );
}

export default Menu;
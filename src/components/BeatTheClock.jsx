import { useEffect, useRef, useState } from "react";
import { GameService } from "../services/GameService";
import { useTranslation } from "./LanguageProvider";

const BeatTheClock = ({sendData}) => {
    const {text} = useTranslation();
    const [userInput, setUserInput] = useState("");
    let [gameLogic, setGameLogic] = useState(new GameService("BeatTheClock"));
    let [levelEquation, setLevelEquation] = useState("");
    const gameContainer = useRef(null);

    function checkAnswer() {
        if (userInput === String(gameLogic.getLevelResult)) {
            gameContainer.current?.classList.add("win");
            sendData(true);
        }
    }

    useEffect(() => {
        gameLogic.generateEquation();
        setLevelEquation(gameLogic.getEquation());
        console.log("beat the clock");
    }, [])

    return(
        <div ref={gameContainer} className="game-level" >
            <h3 id="equation" >{levelEquation}</h3>
            <input value={userInput} onChange={(e) => setUserInput(e.target.value)} className="playerAnswer" type="number"></input>
            <button onClick={() => checkAnswer()}>{text('send')}</button>
        </div>
    );
};

export default BeatTheClock;
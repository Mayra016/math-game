import { useTranslation } from "./LanguageProvider";
import { GameService } from "../services/gameService";
import { useState, useEffect } from "react";

const Game = ( {levelLifes} ) => {
    const {text} = useTranslation();
    let [gameLogic, setGameLogic] = useState(new GameService());
    const [userInput, setUserInput] = useState(null);
    const [levelEquation, setLevelEquation] = useState("");
    

    function checkAnswer() { 

        if (userInput === String(gameLogic.getLevelResult())) {
            console.log("Correct");
        }
    }

    useEffect(() => {
        gameLogic.generateEquation();
        setLevelEquation(gameLogic.getEquation());
    }, []);
      


    return(		
        <div className="game-level" >
            <h3 id="equation" >{levelEquation}</h3>
            <input onChange={(e) => setUserInput(e.target.value)} className="playerAnswer" type="number"></input>
            <button onClick={() => checkAnswer()}>{text('send')}</button>
        </div>
    );
}

export default Game;
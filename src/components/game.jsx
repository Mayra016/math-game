import { useTranslation } from "./LanguageProvider";
import { GameService } from "../services/gameService";
import { useState, useEffect, useRef } from "react";

const Game = ( {levelLifes, sendData} ) => {
    const {text} = useTranslation();
    let [gameLogic, setGameLogic] = useState(new GameService());
    const [userInput, setUserInput] = useState("");
    const [levelEquation, setLevelEquation] = useState("");
    const gameContainer = useRef(null);

    function nextLevel() {
        gameLogic.generateEquation();
        setLevelEquation(gameLogic.getEquation());
        console.log(gameLogic.getLevelResult());
    }

    function checkAnswer() { 

        if (userInput === String(gameLogic.getLevelResult())) {
            console.log("Correct");
            gameContainer.current?.classList.add("win");
            sendData(true);
            setTimeout(() => gameContainer.current?.classList.remove("win"), 500);
            setUserInput("");
            gameLogic.setLevel();
            gameLogic.updateMaxNum();
            gameLogic.updateMaxEquations();
            nextLevel();
        } else {
            sendData(false);
            gameContainer.current?.classList.add("shake");
            setTimeout(() => gameContainer.current?.classList.remove("shake"), 100);
            if (levelLifes < 1) {

            }
        }
    }

    useEffect(() => {
        gameLogic.generateEquation();
        setLevelEquation(gameLogic.getEquation());
    }, []);
      


    return(		
        <div ref={gameContainer} className="game-level" >
            <h3 id="equation" >{levelEquation}</h3>
            <input value={userInput} onChange={(e) => setUserInput(e.target.value)} className="playerAnswer" type="number"></input>
            <button onClick={() => checkAnswer()}>{text('send')}</button>
        </div>
    );
}

export default Game;
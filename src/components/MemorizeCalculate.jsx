import { useState } from "react";
import { useTranslation } from "./LanguageProvider";


const MemorizeCalculate = () => {
    const {text} = useTranslation();

    const [gameLogic] = useState(() => new GameService("MemorizeCalculate"));
    const [userInput, setUserInput] = useState("");
    const [levelResult, setLevelResult] = useState(0);
    
    function nextLevel() {
        setUserInput("");
        gameLogic.generateEquation();

    }
    
    return(
        <div ref={gameContainer} className="game-level" >
            <h3 id="equation" >{levelEquation}</h3>
            <input value={userInput} onChange={(e) => setUserInput(e.target.value)} className="playerAnswer" type="number"></input>
            <button onClick={() => checkAnswer()}>{text('send')}</button>
            <audio ref={audioEffects} src=""></audio>
        </div>
    );
};

export default MemorizeCalculate;

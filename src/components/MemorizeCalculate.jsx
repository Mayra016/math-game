import { useTranslation } from "./LanguageProvider";

const MemorizeCalculate = () => {
    const {text} = useTranslation();
    
    
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

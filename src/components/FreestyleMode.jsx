import { useTranslation } from "./LanguageProvider";
import { GameService } from "../services/GameService";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import lostAudio from "../assets/lost.mp3";
import winAudio from "../assets/right-answer.mp3";
import wrongAudio from "../assets/wrong-answer.mp3";
import playAudio from "../utils/playAudio";

const FreestyleMode = ( {levelLifes, sendData, levelScore} ) => {
    const {text} = useTranslation();
    let [gameLogic, setGameLogic] = useState(new GameService("Freestyle"));
    const [userInput, setUserInput] = useState("");
    const [levelEquation, setLevelEquation] = useState("");
    const gameContainer = useRef(null);
    const audioEffects = useRef(null);
    const menuBtn = text("redirect-menu");
    const playAgainBtn = text("playAgain");
    const navigate = useNavigate();

    function showAlert(title, message) {
        Swal.fire({
            title: title,
            text: message + levelScore,
            icon: "error",
            showCancelButton: true,
            confirmButtonText: playAgainBtn,
            cancelButtonText: menuBtn
        }).then((result) => {
            if (result.isConfirmed) {
                gameLogic.resetLevel();
                setUserInput("");
                nextLevel();               
            } else {
                navigate("/");
            }
        });
    }

    function nextLevel() {
        gameLogic.generateEquation();
        setLevelEquation(gameLogic.getEquation());
        console.log(gameLogic.getLevelResult());
    }

    function checkAnswer() { 

        if (userInput === String(gameLogic.getLevelResult()) && String(userInput) != "") {
            console.log("Correct");
            gameContainer.current?.classList.add("win");
            sendData(true);
            setTimeout(() => gameContainer.current?.classList.remove("win"), 500);
            setUserInput("");
            playAudio("win", audioEffects);
            gameLogic.setLevel();
            gameLogic.updateMaxNum();
            gameLogic.updateMaxEquations();
            nextLevel();
        } else {
            sendData(false);
            gameContainer.current?.classList.add("shake");
            setTimeout(() => gameContainer.current?.classList.remove("shake"), 100);
            if (levelLifes <= 1) {
                playAudio("lost", audioEffects);
                showAlert(text("lost-title"), text("lost-text"));
            } else {
                playAudio("wrong", audioEffects);
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
            <audio ref={audioEffects} src=""></audio>
        </div>
    );
}

export default FreestyleMode;
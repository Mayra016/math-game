import { useEffect, useRef, useState } from "react";
import { GameService } from "../services/GameService";
import { useTranslation } from "./LanguageProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import playAudio from "../utils/playAudio";
import rightAnswer from "../assets/right-answer.mp3";
import ProgressBar from "./progressBar";


const BeatTheClock = ({sendData, beatLifes, beatScore}) => {
    const navigate = useNavigate();
    const {text} = useTranslation();
    const timerRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [userInput, setUserInput] = useState("");
    const [timeWidth, setTimeWidth] = useState(100);
    let [gameLogic, setGameLogic] = useState(new GameService("BeatTheClock"));
    let [levelEquation, setLevelEquation] = useState("");
    let result = "";

    const gameContainer = useRef(null);
    const timerBar = useRef(null);
    const audioEffects = useRef(null);

    const menuBtn = text("redirect-menu");
    const playAgainBtn = text("playAgain");
    


    function showAlert(title, message) {
        Swal.fire({
            title: title,
            text: message + beatScore,
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
        setUserInput("");
        gameLogic.generateEquation();
        result = gameLogic.getLevelResult();
        setLevelEquation(gameLogic.getEquation());
        gameLogic.resetTime();
        startTimer();
        console.log(gameLogic.getLevelResult());
    }

    function checkAnswer() {
        console.log(userInput);
        console.log(gameLogic.getLevelResult());

        if (String(userInput) === gameLogic.getLevelResult() && String(userInput) != "") {
            gameContainer.current?.classList.add("win");
            sendData(true);
            setTimeout(() => gameContainer.current?.classList.remove("win"), 500); 
            playAudio("win", audioEffects);
            gameLogic.setLevel();
            gameLogic.updateMaxNum();
            gameLogic.updateMaxEquations();
            nextLevel();
        } else {
            gameContainer.current?.classList.add("shake");
            sendData(false);
            console.log("falsch");
            setTimeout(() => gameContainer.current?.classList.remove("shake"), 100);
            if (beatLifes <= 1) {
                playAudio("lost", audioEffects);
                showAlert(text("lost-title"), text("lost-text"));
            } else {
                playAudio("wrong", audioEffects);    
            }
        }
    }

    useEffect(() => {
        gameLogic.generateEquation();
        result = gameLogic.getLevelResult();
        setLevelEquation(gameLogic.getEquation());
        
        startTimer();
        console.log(result);
    }, [])
    
    function startTimer() {
        clearInterval(timerRef.current);
        setTimeLeft(31); 
        setTimeWidth(110);
        
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                const next = +(prev - 0.1).toFixed(1);
                if (next <= 0) {
                    clearInterval(timerRef.current);
                    playAudio("lost", audioEffects);
                    showAlert(text("lost-title"), text("lost-text"));
                    return 0;
                }
                setTimeWidth((next / 30) * 100);
                return next;
            });
        }, 100);
    }
    
    
    
    


    return(
        <div ref={gameContainer} className="game-level"style={{textAlign: "center"}} >
            <ProgressBar value={timeWidth}></ProgressBar>
            <h3 id="equation" >{levelEquation}</h3>
            <input value={userInput} onChange={(e) => setUserInput(e.target.value)} className="playerAnswer" type="number"></input>
            <button onClick={() => checkAnswer()}>{text('send')}</button>
            <audio ref={audioEffects} src={rightAnswer}></audio>
        </div>
    );
};

export default BeatTheClock;
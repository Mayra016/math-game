import { useEffect, useRef, useState } from "react";
import { GameService } from "../services/GameService";
import { useTranslation } from "./LanguageProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import playAudio from "../utils/playAudio";
import rightAnswer from "../assets/right-answer.mp3";
import ProgressBar from "./progressBar";
import updateBestScore from '../utils/bestScore';

const BeatTheClock = ({sendData, beatLifes, beatScore}) => {
    const navigate = useNavigate();
    const {text} = useTranslation();
    const timerRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [userInput, setUserInput] = useState("");
    const [timeWidth, setTimeWidth] = useState(100);
    const [gameOver, setGameOver] = useState(false);
    const [showGameOverAlert, setShowGameOverAlert] = useState(false);
    const [gameLogic] = useState(() => new GameService("BeatTheClock"));
    const [levelEquation, setLevelEquation] = useState("");
    const [result, setResult] = useState("");

    const gameContainer = useRef(null);
    const audioEffects = useRef(null);
    const scoreRef = useRef(beatScore);
    let timeAudioRef = true;

    const menuBtn = text("redirect-menu");
    const playAgainBtn = text("playAgain");

    // Update ref when score changes
    useEffect(() => {
        scoreRef.current = beatScore;
    }, [beatScore]);

    function showAlert(title, message) {
        // Set flag to indicate alert is showing
        setShowGameOverAlert(true);
        let bestScore = updateBestScore(scoreRef.current, "BeatTheClock");
        message += scoreRef.current + "\n" + text("best-score") + bestScore;
        
        Swal.fire({
            title: title,
            text: message, 
            icon: "error",
            showCancelButton: true,
            confirmButtonText: playAgainBtn,
            cancelButtonText: menuBtn,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            focusConfirm: true,
            backdrop: true,
            customClass: {
                container: 'swal-overlay',
                popup: 'my-swal'
            }
        }).then((result) => {
            playAudio("pause");
            setShowGameOverAlert(false);
            if (result.isConfirmed) {
                setGameOver(false);
                gameLogic.resetLevel();
                sendData("reset");
                setUserInput("");
                nextLevel();               
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                navigate("/");
            }
        });
    }

    function nextLevel() {
        setUserInput("");
        gameLogic.generateEquation();
        const newResult = gameLogic.getLevelResult();
        setResult(newResult);
        setLevelEquation(gameLogic.getEquation());
        gameLogic.resetTime();
        startTimer();
        console.log(newResult);
    }

    function checkAnswer() {
        playAudio("pause");
        // Don't process answers if alert is showing
        if (showGameOverAlert || gameOver) return;
        
        console.log(userInput);
        console.log(result);

        if (String(userInput) === result && String(userInput) !== "") {
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
            setTimeout(() => gameContainer.current?.classList.remove("shake"), 200);
            if (beatLifes <= 1) {
                setGameOver(true);
                playAudio("lost", audioEffects);
                showAlert(text("lost-title"), text("lost-text"));
            } else {
                playAudio("wrong", audioEffects);    
            }
        }
    }

    useEffect(() => {
        gameLogic.generateEquation();
        const initialResult = gameLogic.getLevelResult();
        setResult(initialResult);
        setLevelEquation(gameLogic.getEquation());
        
        startTimer();
        console.log(initialResult);
        
        return () => clearInterval(timerRef.current);
    }, [])
    
    function startTimer() {
        clearInterval(timerRef.current);
        setTimeLeft(30); 
        setTimeWidth(100);
        setGameOver(false);
        setShowGameOverAlert(false);
        
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                const next = +(prev - 0.1).toFixed(1);

                if (next === 15 && timeAudioRef) {
                    playAudio("timmer");
                    timeAudioRef = false;
                }
                if (next <= 0 && !gameOver && !showGameOverAlert) {
                    clearInterval(timerRef.current);
                    setGameOver(true);
                    playAudio("lost", audioEffects);
                    // Use setTimeout to ensure state updates are processed
                    setTimeout(() => {
                        showAlert(text("lost-title"), text("lost-text"));
                    }, 100);
                    return 0;
                }
                setTimeWidth((next / 30) * 100);
                return next;
            });
        }, 100);
    }
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !showGameOverAlert && !gameOver) {
            checkAnswer();
        }
    };

    return(
        <div ref={gameContainer} className="game-level" style={{textAlign: "center"}} >
            <ProgressBar value={timeWidth}></ProgressBar>
            <h3 id="equation" >{levelEquation}</h3>
            <input 
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)} 
                onKeyPress={handleKeyPress} 
                className="playerAnswer" 
                type="number"
                autoFocus
                disabled={showGameOverAlert || gameOver}
            />
            <button 
                onClick={() => checkAnswer()}
                disabled={showGameOverAlert || gameOver}
            >
                {text('send')}
            </button>
            <audio ref={audioEffects} src={rightAnswer}></audio>
        </div>
    );
};

export default BeatTheClock;
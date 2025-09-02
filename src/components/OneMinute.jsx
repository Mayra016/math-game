import { useRef, useState, useEffect } from 'react';
import { useTranslation } from './LanguageProvider';
import { useNavigate } from 'react-router-dom';
import { GameService } from '../services/GameService';
import Swal from "sweetalert2";
import playAudio from '../utils/playAudio';
import ProgressBar from './progressBar';
import updateBestScore from '../utils/bestScore';

const OneMinute = ({sendData, oneLives, oneScore}) => {
    const {text} = useTranslation();
    const navigate = useNavigate();
    
    const gameContainer = useRef(null);
    const audioEffects = useRef(null);
    const timerRef = useRef(null);
    const scoreRef = useRef(oneScore);
    let timeAudioRef = true;
    
    const [userInput, setUserInput] = useState("");
    const [timeWidth, setTimeWidth] = useState(100);
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameLogic] = useState(() => new GameService("OneMinute"));
    const [levelEquation, setLevelEquation] = useState("");
    const [result, setResult] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [showGameOverAlert, setShowGameOverAlert] = useState(false);
    
    const menuBtn = text("redirect-menu");
    const playAgainBtn = text("playAgain");
    
    useEffect(() => {
        scoreRef.current = oneScore;
    }, [oneScore]);
    
    function showAlert(title, message, isTimeOver = false) {
        const finalScore = scoreRef.current;
        let replacements = [finalScore / 10, finalScore];
        let i = 0;
        message = message.replaceAll("$", () => replacements[i++]);
        let bestScore = updateBestScore(scoreRef.current, "OneMinute");
        message += "\n" + text("best-score") + bestScore;
                
        
        setShowGameOverAlert(true);
        
        Swal.fire({
            title: title,
            text: message,
            icon: isTimeOver ? "success" : "error",
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
            setShowGameOverAlert(false);
            playAudio("pause");
            if (result.isConfirmed) {
                playAudio("pauseAudio");
                resetGame();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                playAudio("pauseAudio");
                navigate("/");
            }
        });
    }
    
    function resetGame() {
        gameLogic.resetLevel();
        setUserInput("");
        playAudio("pause");
        sendData("reset");
        setGameOver(false);
        nextLevel();
        startTimer();
    }
    
    function nextLevel() {
        setUserInput("");
        gameLogic.generateEquation();
        const newResult = gameLogic.getLevelResult();
        setResult(newResult);
        setLevelEquation(gameLogic.getEquation());
        gameLogic.resetTime();
    }
    
    function checkAnswer() {
        playAudio("pause");
        if (showGameOverAlert || gameOver) return;
        
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
            setTimeout(() => gameContainer.current?.classList.remove("shake"), 200);
            if (oneLives <= 1) {
                playAudio("lost", audioEffects);
                setGameOver(true);
                showAlert(text("lost-title"), text("lost-one-text"), false);
            } else {     
                sendData(false);        
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
        
        return () => {
            clearInterval(timerRef.current);
        };
    }, []);
    
    function startTimer() {
        clearInterval(timerRef.current);
        setTimeLeft(60); 
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
                  
                    setTimeout(() => {
                        showAlert(text("one-minute-lost-title"), text("lost-one-text"), true);
                    }, 100);
                    return 0;
                }
                setTimeWidth((next / 60) * 100);
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
                className="playerAnswer" 
                type="number"
                onKeyPress={handleKeyPress}
                autoFocus
                disabled={showGameOverAlert || gameOver}
            />
            <button onClick={() => checkAnswer()} disabled={showGameOverAlert || gameOver}>
                {text('send')}
            </button>
            <audio ref={audioEffects} src="assets/right-answer.mp3"></audio>
        </div>
    );
}

export default OneMinute;
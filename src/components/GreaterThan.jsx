import { useTranslation } from './LanguageProvider';
import { GameService } from '../services/GameService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState, useRef, useEffect } from 'react';
import playAudio from '../utils/playAudio';
import ProgressBar from './progressBar';
import updateBestScore from '../utils/bestScore';

const GreaterThan = ({sendData, greaterLifes, greaterScore}) => {
    const {text} = useTranslation();
    const navigate = useNavigate();
    
    const [timeWidth, setTimeWidth] = useState(100);
    const [gameLogic] = useState(() => new GameService("GreaterThan"));
    const [firstEquation, setFirstEquation] = useState("");
    const [secondEquation, setSecondEquation] = useState("");
    const [timeLeft, setTimeLeft] = useState(15);
    const [firstResult, setFirstResult] = useState(0);
    const [secondResult, setSecondResult] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [showGameOverAlert, setShowGameOverAlert] = useState(false);
    
    const gameContainer = useRef(null);
    const audioEffects = useRef(null);
    const timerRef = useRef(null);
    const scoreRef = useRef(greaterScore);
    const lifesRef = useRef(greaterLifes);
    let timeAudioRef = true;
    
    const menuBtn = text("redirect-menu");
    const playAgainBtn = text("playAgain");
    
    useEffect(() => {
        scoreRef.current = greaterScore;
    }, [greaterScore]);
    useEffect(() => {
        lifesRef.current = greaterLifes;
    }, [greaterLifes]);
    
    function showAlert(title, message, iconImg = "error") {
        const finalScore = scoreRef.current;
        setShowGameOverAlert(true);
        let replacements = [finalScore / 10, finalScore];
        let i = 0;
        message = message.replaceAll("$", () => replacements[i++]);
        let bestScore = updateBestScore(finalScore, "GreaterThan");

        console.log(bestScore.text);
        message += ".\n" + text("best-score") + String(bestScore);
        
        Swal.fire({
            title: title,
            text: message,
            icon: iconImg,
            showCancelButton: true,
            confirmButtonText: playAgainBtn,
            cancelButtonText: menuBtn,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            backdrop: true,
            customClass: {
                popup: 'my-swal'
            }
        }).then((result) => {
            setShowGameOverAlert(false);
            
            if (result.isConfirmed) {
                resetGame();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                navigate("/menu");
            }
        });
    }
    
    function resetGame() {
        gameLogic.resetLevel();
        playAudio("pause");
        sendData("reset");
        setGameOver(false);
        nextLevel();
        startTimer();
    }
    
    function nextLevel() {
        gameLogic.generateEquation();
        setFirstEquation(gameLogic.getEquation());
        setFirstResult(Number(gameLogic.getLevelResult()));
        
        gameLogic.generateEquation();
        setSecondEquation(gameLogic.getEquation());
        setSecondResult(Number(gameLogic.getLevelResult()));
        
        gameLogic.resetTime();
        startTimer();
        console.log("left: " + firstResult + " right: " + secondResult);
    }
    
    function checkAnswer(userAnswer) {
        
        playAudio("pause");

        if (showGameOverAlert || gameOver) return;
        
        let isCorrect = (userAnswer === firstResult && firstResult >= secondResult) || 
                       (userAnswer === secondResult && secondResult >= firstResult);
        
        console.log("check answer | left: " + firstResult + " right: " + secondResult + "user answer: " + userAnswer + "isCorrect : " + isCorrect);
        
        if (isCorrect || firstResult === secondResult) {
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
            console.log("false");
            setTimeout(() => gameContainer.current?.classList.remove("shake"), 200);
            
            if (greaterLifes <= 1) {
                setGameOver(true);
                playAudio("lost", audioEffects);
                showAlert(text("lost-title"), text("lost-one-text"), "error");
            } else {
                playAudio("wrong", audioEffects);
                nextLevel();
            }
        }
        
        startTimer();
    }
    
    useEffect(() => {
        nextLevel();
        
        return () => clearInterval(timerRef.current);
    }, []);
    
    function startTimer() {
        // Clear any existing timer first
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        
        setTimeLeft(10); 
        setTimeWidth(100);
        setGameOver(false);
        setShowGameOverAlert(false);
        
        // Use a flag to prevent multiple executions
        let isHandlingTimeUp = false;
        clearInterval(timerRef.current);
        timerRef.current = null;
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (isHandlingTimeUp) return 0;
                
                const next = +(prev - 0.1).toFixed(1);

                if (next === 5 && timeAudioRef) {
                    playAudio("timmer");
                    timeAudioRef = false;
                }

                if (next <= 0 && !gameOver && !showGameOverAlert) {
                    isHandlingTimeUp = true;
                    
                    // Clear the timer immediately
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                    console.log("GREATER LIFES : " + lifesRef.current);
                    if (Number(lifesRef.current) <= 1) {
                        // Game over - no lives left
                        sendData(false);
                        setGameOver(true);
                        playAudio("lost", audioEffects);
                        setTimeout(() => {
                            showAlert(text("one-minute-lost-title"), text("lost-one-text"));
                        }, 100);
                        

                    } else {
                        // Deduct one life
                        sendData(false);
                        console.log("Time expired - life deducted");
                        playAudio("wrong", audioEffects);
                        nextLevel();
                        return 0;
                    }
                    
                }
                
                setTimeWidth((next / 10) * 100);
                return next;
            });
        }, 100);
    }
    
    return(
         <div ref={gameContainer} className="game-level" style={{textAlign: "center"}} >
            <ProgressBar value={timeWidth}></ProgressBar>
            <div className="equations">
                <button 
                    className="equation" 
                    onClick={() => checkAnswer(firstResult)}
                    disabled={showGameOverAlert || gameOver}
                >
                    {firstEquation}
                </button>
                <span className="vs-text">VS</span>
                <button 
                    className="equation" 
                    onClick={() => checkAnswer(secondResult)}
                    disabled={showGameOverAlert || gameOver}
                >
                    {secondEquation}
                </button>
            </div>
            <audio ref={audioEffects} src='assets/right-answer.mp3'></audio>
        </div>   
    );
};

export default GreaterThan;
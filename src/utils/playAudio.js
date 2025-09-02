import winAudio from "../assets/right-answer.mp3";
import wrongAudio from "../assets/wrong-answer.mp3";
import lostAudio from "../assets/lost.mp3";
import timmerAudio from '../assets/timmer-effect.mp3';

let timerAudio = null;
let isTimer = false;

export default function playAudio(effect) {
    let audio;
    

    if (effect === "win") audio = new Audio(winAudio);
    if (effect === "wrong") audio = new Audio(wrongAudio);
    if (effect === "lost") audio = new Audio(lostAudio);
    
    if (effect === "timmer") {
        if (isTimer) {
            console.log("PAUSA DE TIMER");
            timerAudio.pause();
            
            timerAudio.currentTime = 0;
            isTimer = false;
        } else {
            timerAudio = new Audio(timmerAudio);
            timerAudio.play();
            isTimer = true;
        }   
        
        setTimeout(() => {
            if (isTimer) {
                timerAudio.muted = false;
            }
        }, 1000);
        
        
        setTimeout(() => {
            if (timerAudio != null) {
                timerAudio.pause();
                timerAudio.currentTime = 0;
                timerAudio.muted = true;
            }
        }, 5000);
        
        return;
    }

    if (effect === "pause") {
        
        if (isTimer) {
            timerAudio.muted = true;
            timerAudio.muted = true;
            timerAudio.pause();
            
            timerAudio.currentTime = 0;
            isTimer = false;
        }
        return;
    }

    if (audio) {
        audio.volume = effect === "lost" ? 0.3 : 1;
        audio.play();
    }
}
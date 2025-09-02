

let timerAudio = null;
let isTimer = false;

export default function playAudio(effect) {
    let audio;
    

    if (effect === "win") audio = new Audio("assets/right-answer.mp3");
    if (effect === "wrong") audio = new Audio("assets/wrong-answer.mp3");
    if (effect === "lost") audio = new Audio("assets/lost.mp3");
    
    if (effect === "timmer") {
        if (isTimer) {
            timerAudio.pause();
            
            timerAudio.currentTime = 0;
            isTimer = false;
        } else {
            timerAudio = new Audio('assets/timmer-effect.mp3');
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
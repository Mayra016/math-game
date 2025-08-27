import winAudio from "../assets/right-answer.mp3";
import wrongAudio from "../assets/wrong-answer.mp3";
import lostAudio from "../assets/lost.mp3";

export default function playAudio(effect, audioEffects) {
    audioEffects.current.pause();

    if (effect === "win") {
        audioEffects.current.src = winAudio;
        audioEffects.current.volume = 1;
    }
    if (effect === "wrong") {
        audioEffects.current.src = wrongAudio;
        audioEffects.current.volume = 0.3;
    }
    if (effect === "lost") {
        audioEffects.current.src = lostAudio;
        audioEffects.current.volume = 0.3;
    }
    audioEffects.current.play();
}
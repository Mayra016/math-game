import winAudio from "../assets/right-answer.mp3";
import wrongAudio from "../assets/wrong-answer.mp3";
import lostAudio from "../assets/lost.mp3";

export default function playAudio(effect) {
    let audio;
    if (effect === "win") audio = new Audio(winAudio);
    if (effect === "wrong") audio = new Audio(wrongAudio);
    if (effect === "lost") audio = new Audio(lostAudio);

    audio.volume = effect === "lost" ? 0.3 : 1;
    audio.play();
}

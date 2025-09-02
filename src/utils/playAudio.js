let audios = {
    win: new Audio("assets/right-answer.mp3"),
    wrong: new Audio("assets/wrong-answer.mp3"),
    lost: new Audio("assets/lost.mp3"),
    timer: new Audio("assets/timmer-effect.mp3")
};

let isTimerPlaying = false;

export default function playAudio(effect) {
    if (effect === "pauseAudio") {
        Object.keys(audios).forEach(key => {
            if (key !== "background" && !audios[key].paused) {
                audios[key].pause();
                audios[key].currentTime = 0;
            }
        });
        return;
    }

    if (effect === "pause") {
        Object.keys(audios).forEach(key => {
            if (key == "timer") {
                audios[key].pause();
                audios[key].currentTime = 0;
            }
        });
        return;
    }

    if (effect === "timmer") {
        audios.timer.play();
        isTimerPlaying = true;
        return;
    }

    if (audios[effect]) {
        audios[effect].currentTime = 0;
        audios[effect].volume = effect === "lost" ? 0.3 : 1;
        audios[effect].play();
    }
}

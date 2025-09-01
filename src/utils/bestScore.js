export default function updateBestScore(currentScore, gameMode) {
    let bestScore = localStorage.getItem("best-" + String(gameMode));
    if (bestScore == null) {
        localStorage.setItem("best-" + String(gameMode), Number(currentScore));
        return String(currentScore);
    }
    if (Number(currentScore) >= Number(bestScore)) {
        localStorage.setItem("best-" + String(gameMode), String(currentScore));
        return currentScore;
    }
    return bestScore;
}
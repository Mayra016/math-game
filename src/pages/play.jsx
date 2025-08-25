import PlayersInfo from "../components/playersInfo";
import Game from "../components/game";
import { useState } from "react";

const Play = () =>  {
    const [lifes, setLifes] = useState(3);
    const [score, setScore] = useState(0);

    const handleUserAnswer = (value) => {
        if (value) {
            setScore(prev => prev + 10);
        } else {
            if (lifes > 1) {
                setLifes(prev => prev - 1);
            } else {
                setScore(0);
                setLifes(3);
            }
            
        }
    }

    return(
        <div>
            <PlayersInfo lifes={lifes} score={score}></PlayersInfo>
            <Game sendData={handleUserAnswer} levelLifes={lifes}></Game>
        </div>
    );
}

export default Play;
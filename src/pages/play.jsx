import PlayersInfo from "../components/playersInfo";
import Game from "../components/game";

const Play = () =>  {
    let lifes = 3;
    let score = 0;

    return(
        <div>
            <PlayersInfo lifes={lifes} score={score}></PlayersInfo>
            <Game levelLifes={lifes}></Game>
        </div>
    );
}

export default Play;
import PlayersInfo from "../components/playersInfo";

const Play = () =>  {
    let lifes = 3;
    let score = 0;

    return(
        <PlayersInfo lifes={lifes} score={score}></PlayersInfo>
    );
}

export default Play;
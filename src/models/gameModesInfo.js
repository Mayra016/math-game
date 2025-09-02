
export default class GameModesInfo {
    name = "";
    description = "";
    imgURL = "";
    link = "";
    freestyle = ["Freistil", "Freestyle", "Estilo libre", "Estilo livre"];
    beatTheClock = ["Gegen die Uhr", "Beat the clock", "Contra el reloj", "Contra o tempo"];
    greaterThan = ["Größer als", "Greater than", "Mayor que", "Maior que"];
    oneMinute = ["Eine Minute", "One Minute", "Un minuto", "Um minuto"];

    constructor(newName, newDescription, newImgURL) {
        this.name = newName;
        this.description = newDescription;
        this.imgURL = newImgURL;

        if (this.freestyle.includes(newName)) {
            this.link = "/play/freestyle";
        }
        if (this.beatTheClock.includes(newName)) {
            this.link = "/play/beat-the-clock";
        }
        if (this.oneMinute.includes(newName)) {
            this.link = "/play/one-minute";
        }
        if (this.greaterThan.includes(newName)) {
            this.link = "/play/greater-than";
        }

    }
}
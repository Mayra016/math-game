export default class GameModesInfo {
    name = "";
    description = "";
    imgURL = "";
    link = "";

    constructor(newName, newDescription, newImgURL) {
        this.name = newName;
        this.description = newDescription;
        this.imgURL = newImgURL;

        if (newName === "Freestyle") {
            this.link = "/play/freestyle";
        }
        if (newName === "Beat The Clock") {
            this.link = "/play/beat-the-clock";
        }
        if (newName === "One Minute") {
            this.link = "/play/one-minute";
        }
        if (newName === "Greater Than") {
            this.link = "/play/greater-than";
        }

    }
}
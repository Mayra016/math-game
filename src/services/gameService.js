

export class GameService {
    level = 0;
    maxNum = 10;
    maxEquations = 1;
    levelEquation = "";
    playedEquations = [];
    levelResult = "";

    updateMaxNum() {
        if (this.level % 3 === 0) {
            this.maxNum += 10;
        }    
    }

    updateMaxEquations() {
        if (this.level % 5 === 0 && this.maxNum < 5) {
            this.maxEquations++;
        }    
    }

    setLevel() {
        this.level++;
    }

    getLevelResult() {
        return this.levelResult;
    }

    getEquation() {
        return this.levelEquation;
    }

    generateEquation() {
        const randomizer = this.getRandomInt(1, this.maxNum);
        let i = 0;
        while (i < this.maxEquations) {
            if (randomizer === 1) {
                this.generateAdditionEquation();  
            }
            if (randomizer === 2) {
                this.generateSubtractionEquation();
            }
            if (randomizer === 3) {
                this.generateMultiplicationEquation();
            }
            if (randomizer === 4) {
                this.generateDivisionEquation();
            }
            i++;
        }

    }

    updateEquation(equation, result) {
        if (this.maxEquations === 1) {
            this.levelEquation = equation;
            this.levelResult = result;
        } else {
            this.levelEquation += `+ ${equation}`;
            this.levelResult += result;
        }        
    }

    generateAdditionEquation() {
        const a = this.getRandomInt(1, this.maxNum);
        const b = this.getRandomInt(1, this.maxNum);
        this.updateEquation(`${a} + ${b}`,a + b );
    }

    generateSubtractionEquation() {
        const a = this.getRandomInt(1, this.maxNum);
        const b = this.getRandomInt(1, this.maxNum);
        this.updateEquation(`${a} - ${b}`, a - b);
    }

    generateMultiplicationEquation() {
        const a = this.getRandomInt(1, this.maxNum);
        const b = this.getRandomInt(1, this.maxNum);
        this.updateEquation(`${a} × ${b}`, a * b);
    }

    generateDivisionEquation() {
        const a = this.getRandomInt(1, this.maxNum);
        const b = this.getRandomInt(1, this.maxNum);
        this.updateEquation(`${a} / ${b}`, a / b);
    }  
    
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
      
         
}
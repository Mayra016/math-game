

export class GameService {
    level = 0;
    maxNum = 10;
    maxEquations = 1;
    levelEquation = "";
    playedEquations = [];
    levelResult = "";
    time = 0;

    maxNumConstant = 6;
    maxEquationsConstant = 5;

    constructor(gameMode) {
        // Update constants based on the game mode to reuse the same logic for different modes
        if (gameMode === "Freestyle") {
            this.maxEquationsConstant = 5;
            this.maxNumConstant = 6;
        }
        if (gameMode === "BeatTheClock" || gameMode === "OneMinute" ) {
            this.maxEquationsConstant = 10;
            this.maxNumConstant = 8;
        }
    }

    resetLevel() {
        this.level = 0;
        this.maxNum = 10;
        this.maxEquations = 1;
        this.levelEquation = "";
        this.playedEquations = [];
        this.levelResult = "";
        this.time = 0;
    }

    resetTime() {
        this.time = 0;
    }

    async timmer() {
        while(this.time < 30) {
            this.time++;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    updateMaxNum() {
        if (this.level % this.maxNumConstant === 0) {
            this.maxNum += 10;
        }    
    }

    updateMaxEquations() {
        if (this.level % this.maxEquationsConstant === 0 && this.maxEquations < 5) {
            this.maxEquations++;
        }    
    }

    generateEquation() {
        let equation = "";
        let operations = ["+", "-", "×", "/"];
        const numTerms = this.maxEquations + 1;
    
        equation += this.getRandomInt(1, this.maxNum);
    
        for (let i = 1; i < numTerms; i++) {
            const op = operations[this.getRandomInt(0, operations.length - 1)];
            const num = this.getRandomInt(1, this.maxNum);
            equation += ` ${op} ${num}`;
        }
    
        const evalEquation = equation.replace(/×/g, "*");
        const result = eval(evalEquation);
    
        this.levelEquation = equation;
        this.levelResult = this.formatResult(result);
    }
    
    

    updateEquation(equation, result) {
        if (this.playedEquations.includes(equation)) {
            return false;
        }

        if (this.maxEquations === 1) {
            this.levelEquation = equation;
            this.levelResult = this.formatResult(result);
        } else {
            this.levelEquation += `+ ${equation}`;
            this.levelResult = this.formatResult(result);
        }    
        
        this.playedEquations.push(equation);

        return true;
    }

    formatResult(num){
        if (Number.isInteger(num)) {
            return num;
        }

        const str = num.toString();

        if (str.includes(".")) {
          const decimals = str.split(".")[1];
          if (decimals.length > 2) {
            return num.toFixed(2);
          } else {
            return num;
          }
        } else {
            return num;
        }
    }

    generateAdditionEquation() {
        const a = this.getRandomInt(1, this.maxNum);
        const b = this.getRandomInt(1, this.maxNum);
        if (this.updateEquation(`${a} + ${b}`,a + b ) === false) {
            this.generateEquation();
        }
    }

    generateSubtractionEquation() {
        const a = this.getRandomInt(1, this.maxNum);
        const b = this.getRandomInt(1, this.maxNum);
        if (this.updateEquation(`${a} - ${b}`, a - b) === false) {
            this.generateEquation();
        }
    }

    generateMultiplicationEquation() {
        const a = this.getRandomInt(1, this.maxNum);
        const b = this.getRandomInt(1, this.maxNum);
        if(this.updateEquation(`${a} × ${b}`, a * b) === false) {
            this.generateEquation();
        }
    }

    generateDivisionEquation() {
        const a = this.getRandomInt(1, this.maxNum);
        const b = this.getRandomInt(1, this.maxNum);
        if (this.updateEquation(`${a} / ${b}`, a / b) === false) {
            this.generateEquation();
        }
    }  
    
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
      
       
    // Setters and getters

    getTime() {
        return this.time;
    }

    setLevel() {
        this.level++;
    }

    getLevelResult() {
        return String(this.levelResult);
    }

    getEquation() {
        return this.levelEquation;
    }
}
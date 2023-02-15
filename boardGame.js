    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2"); 
    var die = {};
    var player1Turn = true;
    var previousStep = 1;

    var diceRolled = false;

    

    this.rollDie = function () {
        var dieText = document.getElementById("rollText");
        die.number = Math.floor(Math.random() * 6) + 1;
        dieText.textContent = die.number;
        gameLog();
        getPosition();
    }

    this.getPosition = function() {
        var nextStep = +previousStep + +die.number;
        console.log(nextStep)
        previousStep = nextStep;
        movePlayer();
    }

    this.movePlayer = function() {
        
    }

    this.gameLog = function(){
        const node = document.createElement("li")
               
        if (player1Turn) {
            var textNode = document.createTextNode("- Player 1 has rolled a " + die.number)
            node.appendChild(textNode);
            document.getElementById("gameLogDisplay").appendChild(node);            
        } else {
            textNode = document.createTextNode("- Player 2 has rolled a " + die.number)
            node.appendChild(textNode);
            document.getElementById("gameLogDisplay").appendChild(node); 
        }
        player1Turn = !player1Turn;
    }
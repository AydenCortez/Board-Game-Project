    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2"); 
    var die = {};
    var player1Turn = true;
    var previousStep = 1;
    var currentStep;

    var diceRolled = false;

    player1 = {
        currentTile: 1
    }

    player2 = {
        currentTile: 1
    }

    this.rollDie = function () {
        var dieText = document.getElementById("rollText");
        die.number = Math.floor(Math.random() * 6) + 1;
        dieText.textContent = die.number;
        var dieImg = document.getElementById("die");
        
        gameLog();

        switch (die.number){
            case 1:
                dieImg.style.background = "url(/images/d1.PNG)";
                dieImg.style.backgroundSize = "contain";
                break;
            case 2:
                dieImg.style.background = "url(/images/d2.PNG)";
                dieImg.style.backgroundSize = "contain";
                break;
            case 3:
                dieImg.style.background = "url(/images/d3.PNG)";
                dieImg.style.backgroundSize = "contain";
                break;
            case 4:
                dieImg.style.background = "url(/images/d4.PNG)";
                dieImg.style.backgroundSize = "contain";
                break;
            case 5:
                dieImg.style.background = "url(/images/d5.PNG)";
                dieImg.style.backgroundSize = "contain";
                break;
            case 6:
                dieImg.style.background = "url(/images/d6.PNG)";
                dieImg.style.backgroundSize = "contain";
                break;
        }

        $("#player1").appendTo("#4");
    }

   
    

    // this.getPosition = function() {
    //     currentStep = +previousStep + +die.number;
    //     console.log(currentStep)
    //     previousStep = currentStep;
    //     movePlayer();
    // }

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
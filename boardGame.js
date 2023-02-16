    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2"); 
    var die = {};
    var player1Turn = true;
    var previousStep = 1;
    var currentStep;

    var diceRolled = false;

    const tiles = document.querySelectorAll(".tile");
    console.log(tiles);
    for (var i = 0; i < tiles.length; i++) {
        console.log("Total Tiles: " + tiles.length);
    }


    // player objects
    player1 = {
        previousTile: 1,
        currentTile: 1
    }

    player2 = {
        previousTile: 1,
        currentTile: 1
    }

    const player_Won_Msg = "You Win!";
    const ai_Won_Msg = "You Lose!";

    this.doPlayerTurn = function () {
        var dieText = document.getElementById("rollText");
        die.number = Math.floor(Math.random() * 6) + 1;
        dieText.textContent = die.number;
        var dieImg = document.getElementById("die");


        // die image display
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

        // get postition
        if (player1Turn) {
            player1.currentTile = player1.previousTile + die.number;
            player1.previousTile = player1.currentTile
            console.log("player 1: " + player1.currentTile)
        } else {
            player2.currentTile = player2.previousTile + die.number;
            player2.previousTile = player2.currentTile
            console.log("player 2: " + player2.currentTile);
        }

        // move player
        if (player1Turn) {
            $("#player1").appendTo("#" + player1.currentTile);
        } else {
            $("#player2").appendTo("#" + player2.currentTile);
        }
        
        // stop player at switch tile
        const popup = document.getElementById("popupCont")

        if (player1.currentTile >= 15){
                $("#player1").appendTo("#14");
                popup.style.display = "flex";
                popup.style.animation = "0.5s fadeIn";
        }
        if (player2.currentTile >= 15){
                $("#player2").appendTo("#14");
                popup.style.display = "flex";
                popup.style.animation = "0.5s fadeIn";
        }

        // game log
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
        
        // end turn
        player1Turn = !player1Turn;               
    }




    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2"); 
    const popup = document.getElementById("popupCont")
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
        currentTile: 1, 
        playerPath: "none",
        switched: false
    }

    player2 = {
        previousTile: 1,
        currentTile: 1,
        playerPath: "none",
        switched: false
    }

    const player_Won_Msg = "You Win!";
    const ai_Won_Msg = "You Lose!";

    this.doPlayerTurn = function () {
        var dieText = document.getElementById("rollText");
        die.number = Math.floor(Math.random() * 6) + 1;
        dieText.textContent = die.number;
        var dieImg = document.getElementById("die");


        // die image display
        switch (die.number) {
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
        } else {
            player2.currentTile = player2.previousTile + die.number;
            player2.previousTile = player2.currentTile
        }

        // move player
        if (player1Turn) {
            switch (player1.playerPath){
                case "A":
                    $("#player1").appendTo("#A" + player1.currentTile);
                    break;
                case "B":
                    $("#player1").appendTo("#B" + player1.currentTile);
                    break;
                default:
                    $("#player1").appendTo("#" + player1.currentTile);
                    break;
            }        
        } else {
            switch (player2.playerPath){
                case "A":
                    $("#player2").appendTo("#A" + player2.currentTile);
                    break;
                case "B":
                    $("#player2").appendTo("#B" + player2.currentTile);
                    break;
                default:
                    $("#player2").appendTo("#" + player2.currentTile);
                    break;
            }        
        }
            

            $("#player2").appendTo("#" + player2.currentTile);

        
        // stop player at switch tile
        
        
        if (player1.currentTile >= 14 && player1.switched == false) {
                player1.currentTile = 14;
                $("#player1").appendTo("#14");
                popup.style.display = "flex";
                popup.style.animation = "0.5s fadeIn";
        }
        if (player2.currentTile >= 14 && player2.switched == false) {
                player2.currentTile = 14;
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

    this.pathA = function (){
        if (player1Turn) {
            player1.playerPath = "A"
            player1.switched = true;
        } else {
            player2.playerPath = "A"
            player2.switched = true;
        }
        popup.style.display = "none";
        console.log(player1.playerPath + player2.playerPath)
    }

    this.pathB = function (){
        if (player1Turn) {
            player1.playerPath = "B"
            player1.switched = true;
        } else {
            player2.playerPath = "B"
            player2.switched = true;
        }
        popup.style.display = "none";
        console.log(player1.playerPath + player2.playerPath)
    }
    
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2"); 
    const popup = document.getElementById("popupCont")
    var die = {};
    var player1Turn = true;
    var previousStep = 1;
    var currentStep;
    
    var spunWheel = false;

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
        if (spunWheel)
            return;

        // die image display
        switch (spin.number) {
            case 1:
                // dieImg.style.background = "url(/images/d1.PNG)";
                // dieImg.style.backgroundSize = "contain";
                break;
            case 2:
                // dieImg.style.background = "url(/images/d2.PNG)";
                // dieImg.style.backgroundSize = "contain";
                break;
            case 3:
                // dieImg.style.background = "url(/images/d3.PNG)";
                // dieImg.style.backgroundSize = "contain";
                break;
        }

        // get postition
        if (player1Turn) {
            player1.currentTile = player1.previousTile + spin.number;
            player1.previousTile = player1.currentTile
        } else {
            player2.currentTile = player2.previousTile + spin.number;
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
                diceRolled = true;
                player1.currentTile = 14;
                $("#player1").appendTo("#" + player1.currentTile);
                popup.style.display = "flex";
                popup.style.animation = "0.5s fadeIn";
                console.log(player1.currentTile);
        }
        if (player2.currentTile >= 14 && player2.switched == false) {
                diceRolled = true;
                player2.currentTile = 14;
                $("#player2").appendTo("#" + player2.currentTile);
                popup.style.display = "flex";
                popup.style.animation = "0.5s fadeIn";
                console.log(player2.currentTile);
        }

        // If current tile is greater than or equal to the last tile, put the last tile as the current tile

        if (player1.currentTile >= 39 && player1.switched == false) {
            diceRolled = true;
            player1.currentTile = 39;
            $("#player1").appendTo("#" + player1.currentTile);   
        }
        if (player2.currentTile >= 39 && player2.switched == false) {
            diceRolled = true;
            player2.currentTile = 39;
            $("#player2").appendTo("#" + player2.currentTile);
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
        console.log("Player 1 (blue) current Tile:", player1.currentTile);
        console.log("Player 2 (orange) current Tile:", player2.currentTile);         
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
        diceRolled = false;
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
        diceRolled = false;
    }

    // Wheel Spinner
    
    const spin = () => {
        const element = document.getElementById('wheel');
        const flag = document.getElementById('flag');
        const minSpinCount = 5;
        
        const min = minSpinCount * 360;
        const max = min + 360;
        let startPosition = 0;
        const endPosition = Math.floor(Math.random() * (min - max) ) + max;
        
        startPosition = element.style.transform.match(/\d+/);
        
        while (startPosition > 360) {
          startPosition = startPosition - 360;
        }
        
        element.style.transitionDuration = '0s';
        element.style.transform = `rotate(${ startPosition }deg)`;
        
        setTimeout(function(){
          flag.classList.add('wobble-fast');
          element.style.transitionDuration = '5s';
          element.style.transform = `rotate(${ startPosition + endPosition }deg)`;
        }, 50);
      }
      
      const init = () => {
        // This is necessary for proper rendering
        document.getElementById('wheel').style.transform = 'rotate(0deg)';
      }
      
      init();
    
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2"); 
    var player1Turn = true;
    var previousStep = 1;
    var currentStep;
    let boardTiles = document.querySelectorAll('tile');
    const gameLog = document.getElementById('gameLogDisplay');
    var chaosTimer = 0;
    var chaosValue = 1;
    const startTile = document.getElementById("1");
    turn = 1
    var testNumber;
    

    // Assign board spaces from HTML to arrays
    
    // Die Rolling Variables
    var dieNumberLanded = 0;
    var isDieRolling = false;


    const board1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    for (i = 0; i <= 14; i++) {
        board1[i] = document.getElementById(i);
    }
    
    let path1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    for (i = 0; i <= 14; i++) {
        path1[i] = document.getElementById('A' + i);
    }

    let path2 = [1, 2, 3, 4, 5, 6, 7, 8]
    for (i = 0; i <= 10; i++) {
        path2[i] = document.getElementById('B' + i);
    }

    // chaos meter array
    var chaosMeter = [1, 2, 3, 4, 5]
    for (i = 0; i <=5; i++) {
        chaosMeter[i] = document.getElementById('Chaos' + i);
        console.log(chaosMeter[i])
    }


    // player objects
    player1 = {
        previousValue: 1,
        currentTile: 0, 
        playerPath: board1,
    }

    player2 = {
        previousValue: 1,
        currentTile: 0,
        playerPath: board1,
    }


    // Starts the game and resets the values
    function start(){
        turn = 1;
        isWinner = null;
        player1.currentTile = 1;
        player2.currentTile = 1;        
        $('#player1').appendTo(board1[player1.currentTile]);
        $('#player2').appendTo(board1[player1.currentTile]);
        chaos = chaosMeter[chaosValue];
        chaos.style.backgroundColor = "red";
    }
    start();


    function testButton (){
        function getTest (max) {
            return Math.floor(Math.random() * max)
        }
        testNumber = Math.floor(getTest(3) + 1)
        try {
            movePlayers();
        } catch (error) {
            console.log(error)
        }

        turn *= -1
        // if (turn == 1) {
        //     console.log("player 1's turn")
        // } else {
        //     console.log("player 2's turn")
        // }
        chaosTimer += 1;
        console.log('Timer', chaosTimer)
        console.log('Chaos', chaosMeter[chaosValue])
        try {
            setChaos();
        } catch (error) {
            console.log(error)
        }

    }

    // Uses the 3 arrays to move the player incrementally
    function movePlayers() {
        if (turn === 1) {
            switch (player1.playerPath) {
                case board1:
                    player1.currentTile = player1.previousValue + testNumber;
                    $('#player1').appendTo(board1[player1.currentTile]);
                    player1.previousValue = player1.currentTile;
                    $('#gameLogDisplay').append('<li style=color:#34495e>' + '-- Player 1 moved ' + testNumber + ' space(s)' + '</li>')
                    switchTile();
                    break;
                case path1:
                    player1.currentTile = player1.previousValue + testNumber;
                    $('#player1').appendTo(path1[player1.currentTile]);
                    player1.previousValue = player1.currentTile;
                    $('#gameLogDisplay').append('<li style=color:#34495e;>' + '-- Player 1 moved ' + testNumber + ' space(s)' + '</li>')
                    Winner ();
                    break;
                case path2:
                    player1.currentTile = player1.previousValue + testNumber;
                    $('#player1').appendTo(path2[player1.currentTile]);
                    player1.previousValue = player1.currentTile;
                    $('#gameLogDisplay').append('<li style=color:#34495e;>' + '-- Player 1 moved ' + testNumber + ' space(s)' + '</li>')
                    Winner ();
                    break;
            }
        } else {
            switch (player2.playerPath) {
                case board1:
                    player2.currentTile = player2.previousValue + testNumber;
                    $('#player2').appendTo(board1[player2.currentTile]);
                    player2.previousValue = player2.currentTile;
                    $('#gameLogDisplay').append('<li style=color:#6e0000;>' + '-- Player 2 moved ' + testNumber + ' space(s)' + '</li>')
                    switchTile();
                    break;
                case path1:
                    player2.currentTile = player2.previousValue + testNumber;
                    $('#player2').appendTo(path1[player2.currentTile]);
                    player2.previousValue = player2.currentTile;
                    $('#gameLogDisplay').append('<li style=color:#6e0000;>' + '-- Player 2 moved ' + testNumber + ' space(s)' + '</li>')
                    Winner ();
                    break;
                case path2:
                    player2.currentTile = player2.previousValue + testNumber;
                    $('#player2').appendTo(path2[player2.currentTile]);
                    player2.previousValue = player2.currentTile;
                    $('#gameLogDisplay').append('<li style=color:#6e0000;>' + '-- Player 2 moved ' + testNumber + ' space(s)' + '</li>')
                    Winner ();
                    break;

            }
        }
        gameLog.scrollTop = gameLog.scrollHeight;
    }

    function setChaos (){
        if (chaosTimer == 8 || chaosTimer == 16 || chaosTimer == 24 || chaosTimer == 32) {
            chaosValue += 1;
            $('#gameLogDisplay').append('<li style=color:red; font-weight:bold;>' + '!! The chaos has increased to ' + chaosValue + '!!' + '</li>')
            // chaosMeter = chaosMeter[chaosValue];
        } else {
            return chaosValue;
        };
        // return chaosMeter;
        chaosMeter[chaosValue].style.backgroundColor = "red";
    }


    // Checks if a player reached the switch tile and executes the prompt
    function switchTile(){
        if (player1.currentTile >= 14){
            $('#player1').appendTo('#14')
            popUp()
            console.log('test 1');
        }
        if (player2.currentTile >= 14){
            $('#player2').appendTo('#14')
            popUp()
            console.log('test 2');
        }
    }

    // Popup function that lets player choose a path
    function popUp (){
        let popUp = document.getElementById('popupCont')
        popUp.style.display = 'flex';
        popUp.style.animation = '0.5s fadeIn'
    }

    // If a player chose path 1 on the popup
    function pathA (){
        let popUp = document.getElementById('popupCont')
        if (turn == -1) {
            player1.playerPath = path1
            player1.currentTile = 1
            player1.previousValue = 1
            $('#gameLogDisplay').append('<li>' + '!- Player 1 has chosen path 1' + '</li>')
            popUp.style.display = 'none';
        } else {
            player2.playerPath = path1
            player2.currentTile = 1
            player2.previousValue = 1
            $('#gameLogDisplay').append('<li>' + '!- Player 2 has chosen path 1' + '</li>')
            popUp.style.display = 'none';
        }
    }

    // If a player chose path 2 on the popup
    function pathB (){
        let popUp = document.getElementById('popupCont')
        if (turn == -1) {
            player1.playerPath = path2
            player1.currentTile = 1
            player1.previousValue = 1
            $('#gameLogDisplay').append('<li>' + '!- Player 1 has chosen path 2' + '</li>')
            popUp.style.display = 'none';
        } else {
            player2.playerPath = path2
            player2.currentTile = 1
            player2.previousValue = 1
            $('#gameLogDisplay').append('<li>' + '!- Player 2 has chosen path 2' + '</li>')
            popUp.style.display = 'none';
        }
    }

    function Winner (){
        let winPopUp = document.getElementById('winPopupCont');
        let winningPlayer = document.getElementById('winningPlayer')
        if (turn == 1) {
            if (player1.playerPath == path1 && player1.currentTile >= 15) {
                winPopUp.style.display = 'flex';
                $('#player1').appendTo('#end');
                winPopUp.style.animation = '0.5s fadeIn';
                winningPlayer.textContent = "1";
            }
            if (player1.playerPath == path2 && player1.currentTile >= 10) {
                winPopUp.style.display = 'flex';
                $('#player1').appendTo('#end');
                winPopUp.style.animation = '0.5s fadeIn';
                winningPlayer.textContent = "1";
            }
        } else {
            if (player2.playerPath == path1 && player2.currentTile >= 15){
                winPopUp.style.display = 'flex';
                $('#player2').appendTo('#end');
                winPopUp.style.animation = '0.5s fadeIn';
                winningPlayer.textContent = "2";
            }
            if (player2.playerPath == path2 && player2.currentTile >= 10){
                winPopUp.style.display = 'flex';
                $('#player2').appendTo('#end');
                winPopUp.style.animation = '0.5s fadeIn';
                winningPlayer.textContent = "2";
            }
        }
    }

    // Die
    //select the classes we require
    var cube = document.querySelector('.cube');
    var rollBtn = document.querySelector('.rollBtn');
    var currentClass = '';

    //this function will generate a random number between 1 and 6 (or whatever value you send it)
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    //our main roll dice function on click
    function rollDice() {
    console.log("Is Die Rolling? " + isDieRolling);
    if (isDieRolling)
        return;
    isDieRolling = true;
    //genberate a random number between 1 and 6 with out getRandomInt function
     var randNum = getRandomInt(1,7); 
      console.log(randNum)
      //generate a class with the random number between 1 - 6 called showClass
      var showClass = 'show-' + randNum;
      console.log(showClass)
    // if there is a class already selected remove it
      if ( currentClass ) {
        cube.classList.remove( currentClass );
      }
    // add the new showclass with the generated number
      cube.classList.add(showClass);
    //set the current class to the randomly generated number
      currentClass = showClass;

      setTimeout(function() {
        switch (randNum) {
            case 1:
            case 2:
                isDieRolling = false;
                return dieNumberLanded = 1;
                break;
            case 3:
            case 4:
                isDieRolling = false;
                return dieNumberLanded = 2;
                break;
            case 5:
            case 6:
                isDieRolling = false;
                return dieNumberLanded = 3;
                break;
            default:
                return 0;
        }
        }, 1500);
    }
    // set initial side
    rollDice();
    // on click eventlistener for the button element
    rollBtn.addEventListener("click", rollDice);

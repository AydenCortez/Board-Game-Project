    
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2"); 
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
    var dieNumberLanded = 3;
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
    }

    function Card(title, desc, image, action, Atype) {
        this.title = title;
        this.desc = desc;
        this.image = image;
        this.action = action;
        this.Atype = Atype;
    }

    var cards = [];

    cards[0] = new Card('Robbed', "You got robbed!" , '/images/Cards/Card_Robbed.png', 'losePoints');
    cards[1] = new Card('SPACING', "The vast nothingness has intruded" , '/images/Cards/Card_Spaced.png', 'goBackSpaces', 'spacing');
    cards[2] = new Card('Clumsy', "Someone didn't clean up!" , '/images/Cards/Card_Clumsy.png', 'goBackSpaces', 'slipped');
    cards[3] = new Card('Asteroid', "You are doomed", '/images/Cards/Card_Asteroid.png', 'backToStart');
    cards[4] = new Card('Murdered', "Some rando [UNALIVED] you!! Luckily there's cloning!", '/images/Cards/Card_Murdered.png', 'losePoints')


    function drawCard (){
        if (cards.length > 0) {
            randIn = Math.floor(Math.random() * cards.length);
            cardPicked = cards[randIn];
            console.log(cardPicked.action)
            showCard(cardPicked)
            switch(cardPicked.action){
                case 'losePoints':
                    losePoints(chaosValue);
                    console.log('something worked')
                    break;
                case 'goBackSpaces':
                    goBackSpaces(chaosValue, cardPicked.Atype);
                    console.log('something worked');
                    break;
                case 'backToStart':
                    backToStart();
                    console.log('something worked');
                    break;
                default:
                    break;
            }
        }

    }

    function showCard(card){
        $('#cardName').text(card.title)
        $('#cardDesc').text(card.desc)
        document.getElementById('cardImg').src= card.image
        $('.actionCard').css('display', 'flex');
        $('.actionCard').css('animation', '0.5s fadeIn');

    }




    function hideCard() {
        $('.actionCard').css('display', 'none');
    }

    console.log(cards.length)
    function losePoints (chaos){
        switch (chaos) {
            case 1:
            case 2:
                if (turn == 1) {
                    player1.victoryPoints -= 3;
                } else {
                    player2.victoryPoints -= 3;
                }
                return chaos;
            case 3:
            case 4:
                if (turn == 1) {
                    player1.victoryPoints -= 4;
                } else {
                    player2.victoryPoints -= 4;
                }
                return chaos;
            case 5:
                if (turn == 1) {
                    player1.victoryPoints -= 5;
                } else {
                    player2.victoryPoints -= 5;
                }
                return chaos;
            default:
                break;
        }
    }

    function goBackSpaces (chaos, cardType){
        console.log('test')
        if (cardType == 'spacing') {
            console.log('test for spacing')
            switch (chaos) {
                case 1:
                    if (turn == 1) {
                        player1.currentTile -= 1;
                        player1.previousValue = player1.currentTile;
                    } else {
                        player2.currentTile -= 1;
                        player2.previousValue = player2.currentTile;
                    }
                    break;
                case 2:
                case 3:
                case 4:
                    if (turn == 1) {
                        player1.currentTile -= 2;
                        player1.previousValue = player1.currentTile;
                    } else {
                        player2.currentTile -= 2;
                        player2.previousValue = player2.currentTile;
                    }
                    break;
                case 5:
                    if (turn == 1) {
                        player1.currentTile -= 4;
                        player1.previousValue = player1.currentTile;
                    } else {
                        player2.currentTile -= 4;
                        player2.previousValue = player2.currentTile;
                    }
                    break
                default:
                    break;
            }
        } else if (cardType == 'slipped') {
            console.log('test for slipped')
            switch (chaos) {
                case 1:
                    if (turn == 1) {
                        player1.currentTile -= 1;
                        player1.previousValue = player1.currentTile;
                    } else {
                        player2.currentTile -= 1;
                        player2.previousValue = player2.currentTile;
                    }
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                    if (turn == 1) {
                        player1.currentTile -= 2;
                        player1.previousValue = player1.currentTile;
                        player1.victoryPoints -= 1;
                    } else {
                        player2.currentTile -= 2;
                        player2.previousValue = player2.currentTile;
                        player2.victoryPoints -=1;
                    }
                    break;
                default:
                    break;
            }
        }
        console.log('test one last time')
        switch (player1.playerPath) {
            case board1:
                $('#player1').appendTo(board1[player1.currentTile]);
                break
            case path1:
                $('#player1').appendTo(path1[player1.currentTile]);
                break;
            case path2:
                $('#player1').appendTo(path2[player1.currentTile]);
                break;
            default:
                break;
        }
        switch (player2.playerPath) {
            case board1:
                $('#player2').appendTo(board1[player2.currentTile]);
                break
            case path1:
                $('#player2').appendTo(path1[player2.currentTile]);
                break;
            case path2:
                $('#player2').appendTo(path2[player2.currentTile]);
                break;
            default:
                break;
        }

    }

    function backToStart (){
        if (turn == 1) {
            player1.currentTile = 1;
            player1.previousValue = 1;
            player1.playerPath = board1;
            $('#player1').appendTo([board1[1]]);
     
        } else {
            player2.currentTile = 1;
            player1.previousValue = 1;
            player2.playerPath = board1;
            $('#player2').appendTo(board1[1]);
        }
    }

    // player objects
    player1 = {
        previousValue: 1,
        currentTile: 0, 
        playerPath: board1,
        victoryPoints: 0,
    }

    player2 = {
        previousValue: 1,
        currentTile: 0,
        playerPath: board1,
        victoryPoints: 0,
    }


    // Starts the game and resets the values
    function start(){
        turn = 1;
        isWinner = null;
        player1.currentTile = 1;
        player2.currentTile = 1;        
        $('#player1').appendTo(board1[player1.currentTile]);
        $('#player2').appendTo(board1[player1.currentTile]);
        // $(player1.victoryPoints).appendTo('#player1VP')
        document.getElementById('player1VP').textContent = player1.victoryPoints;
        document.getElementById('player2VP').textContent = player2.victoryPoints;
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
                    player1.currentTile = player1.previousValue + dieNumberLanded;
                    $('#player1').appendTo(board1[player1.currentTile]);
                    player1.previousValue = player1.currentTile;
                    $('#gameLogDisplay').append('<li style=color:#34495e>' + '-- Player 1 moved ' + dieNumberLanded + ' space(s)' + '</li>')
                    switchTile();
                    break;
                case path1:
                    player1.currentTile = player1.previousValue + dieNumberLanded;
                    $('#player1').appendTo(path1[player1.currentTile]);
                    player1.previousValue = player1.currentTile;
                    $('#gameLogDisplay').append('<li style=color:#34495e;>' + '-- Player 1 moved ' + dieNumberLanded + ' space(s)' + '</li>')
                    Winner ();
                    break;
                case path2:
                    player1.currentTile = player1.previousValue + dieNumberLanded;
                    $('#player1').appendTo(path2[player1.currentTile]);
                    player1.previousValue = player1.currentTile;
                    $('#gameLogDisplay').append('<li style=color:#34495e;>' + '-- Player 1 moved ' + dieNumberLanded + ' space(s)' + '</li>')
                    Winner ();
                    break;
            }
        } else {
            switch (player2.playerPath) {
                case board1:
                    player2.currentTile = player2.previousValue + dieNumberLanded;
                    $('#player2').appendTo(board1[player2.currentTile]);
                    player2.previousValue = player2.currentTile;
                    $('#gameLogDisplay').append('<li style=color:#6e0000;>' + '-- Player 2 moved ' + dieNumberLanded + ' space(s)' + '</li>')
                    switchTile();
                    break;
                case path1:
                    player2.currentTile = player2.previousValue + dieNumberLanded;
                    $('#player2').appendTo(path1[player2.currentTile]);
                    player2.previousValue = player2.currentTile;
                    $('#gameLogDisplay').append('<li style=color:#6e0000;>' + '-- Player 2 moved ' + dieNumberLanded + ' space(s)' + '</li>')
                    Winner ();
                    break;
                case path2:
                    player2.currentTile = player2.previousValue + dieNumberLanded;
                    $('#player2').appendTo(path2[player2.currentTile]);
                    player2.previousValue = player2.currentTile;
                    $('#gameLogDisplay').append('<li style=color:#6e0000;>' + '-- Player 2 moved ' + dieNumberLanded + ' space(s)' + '</li>')
                    Winner ();
                    break;

            }
        }
        gameLog.scrollTop = gameLog.scrollHeight;
    }

    function moneyTile (){
        if (turn == 1) {
            player1.victoryPoints += dieNumberLanded;
            $('#gameLogDisplay').append('<li style=color:#20AF30>' + '$- Player 1 gained ' + dieNumberLanded + ' victory points' + '</li>')
            document.getElementById('player1VP').textContent = player1.victoryPoints;
        } else {
            player2.victoryPoints += dieNumberLanded;
            $('#gameLogDisplay').append('<li style=color:#20AF30>' + '$- Player 2 gained ' + dieNumberLanded + ' victory points' + '</li>')
            document.getElementById('player2VP').textContent = player2.victoryPoints;
        }
        turn *= -1;
        return dieNumberLanded;
    }

    function setChaos (){
        if (chaosTimer == 8 || chaosTimer == 16 || chaosTimer == 24 || chaosTimer == 32) {
            chaosValue += 1;
            $('#gameLogDisplay').append('<li style=color:red; font-weight:bold;>' + '!! The chaos has increased to ' + chaosValue + ' !!' + '</li>')
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
            player1.currentTile = 0
            player1.previousValue = 0
            $('#gameLogDisplay').append('<li>' + '!- Player 1 has chosen path 1' + '</li>')
            popUp.style.display = 'none';
        } else {
            player2.playerPath = path1
            player2.currentTile = 0
            player2.previousValue = 0
            $('#gameLogDisplay').append('<li>' + '!- Player 2 has chosen path 1' + '</li>')
            popUp.style.display = 'none';
        }
    }

    // If a player chose path 2 on the popup
    function pathB (){
        let popUp = document.getElementById('popupCont')
        if (turn == -1) {
            player1.playerPath = path2
            player1.currentTile = 0
            player1.previousValue = 0
            $('#gameLogDisplay').append('<li>' + '!- Player 1 has chosen path 2' + '</li>')
            popUp.style.display = 'none';
        } else {
            player2.playerPath = path2
            player2.currentTile = 0
            player2.previousValue = 0
            $('#gameLogDisplay').append('<li>' + '!- Player 2 has chosen path 2' + '</li>')
            popUp.style.display = 'none';
        }
    }

    function turnAction (){
        if (turn == 1){
            if (player1.playerPath == board1) {
                switch (board1[player1.currentTile]) {
                    case board1[7]:
                    case board1[13]:
                        moneyTile();
                        break;
                    case board1[4]:
                    case board1[10]:
                        drawCard();
                        $('#gameLogDisplay').append('<li>' + 'Somethings supposed to happen here....' + '</li>');
                        turn *= -1;
                        break;
                    default:
                        turn *= -1
                }
            } else if (player1.playerPath == path1) {
                switch (path1[player1.currentTile]) {
                    case path1[1]:
                    case path1[8]:
                        moneyTile();
                        break;
                    case path1[3]:
                    case path1[10]:
                    case path1[13]:
                        drawCard();
                        $('#gameLogDisplay').append('<li>' + 'Somethings supposed to happen here....' + '</li>');
                        turn *= -1;
                        break;
                    default:
                        turn *= -1;
                }
            } else if (player1.playerPath == path2) {
                switch (path2[player1.currentTile]) {
                    case path2[3]:
                    case path2[5]:
                    case path2[7]:
                        moneyTile();
                        break;
                    case path2[2]:
                    case path2[4]:
                    case path2[6]:
                    case path2[8]:
                    case path2[9]:
                        drawCard();
                        $('#gameLogDisplay').append('<li>' + 'Somethings supposed to happen here....' + '</li>');
                        turn *= -1;
                        break;
                    default:
                        turn *= -1
                }
            }
        } else {
            if (player2.playerPath == board1) {
                switch (board1[player2.currentTile]) {
                    case board1[7]:
                    case board1[13]:
                        moneyTile();
                        break;
                    case board1[4]:
                    case board1[10]:
                        drawCard();
                        $('#gameLogDisplay').append('<li>' + 'Somethings supposed to happen here....' + '</li>');
                        turn *= -1;
                        break;
                    default:
                        turn *= -1
                }
            } else if (player2.playerPath == path1) {
                switch (path1[player2.currentTile]) {
                    case path1[1]:
                    case path1[8]:
                        moneyTile();
                        break;
                    case path1[3]:
                    case path1[10]:
                    case path1[13]:
                        drawCard();
                        $('#gameLogDisplay').append('<li>' + 'Somethings supposed to happen here....' + '</li>');
                        turn *= -1;
                        break;
                    default:
                        turn *= -1;
                }
            } else if (player2.playerPath == path2) {
                switch (path2[player2.currentTile]) {
                    case path2[3]:
                    case path2[5]:
                    case path2[7]:
                        moneyTile();
                        break;
                    case path2[2]:
                    case path2[4]:
                    case path2[6]:
                    case path2[8]:
                    case path2[9]:
                        drawCard();
                        $('#gameLogDisplay').append('<li>' + 'Somethings supposed to happen here....' + '</li>');
                        turn *= -1;
                        break;
                    default:
                        turn *= -1
                }
            }
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
                player1.victoryPoints += 5;
                document.getElementById('player1VP').textContent = player1.victoryPoints;
            }
            if (player1.playerPath == path2 && player1.currentTile >= 11) {
                winPopUp.style.display = 'flex';
                $('#player1').appendTo('#end');
                winPopUp.style.animation = '0.5s fadeIn';
                winningPlayer.textContent = "1";
                player1.victoryPoints += 5;
                document.getElementById('player1VP').textContent = player1.victoryPoints;
            }
        } else {
            if (player2.playerPath == path1 && player2.currentTile >= 15){
                winPopUp.style.display = 'flex';
                $('#player2').appendTo('#end');
                winPopUp.style.animation = '0.5s fadeIn';
                winningPlayer.textContent = "2";
                player2.victoryPoints += 5;
                document.getElementById('player2VP').textContent = player2.victoryPoints;
            }
            if (player2.playerPath == path2 && player2.currentTile >= 11){
                winPopUp.style.display = 'flex';
                $('#player2').appendTo('#end');
                winPopUp.style.animation = '0.5s fadeIn';
                winningPlayer.textContent = "2";
                player2.victoryPoints += 5;
                document.getElementById('player2VP').textContent = player2.victoryPoints;
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
    if (isDieRolling)
        return;
    isDieRolling = true;
    changeColorDice();
    //genberate a random number between 1 and 6 with out getRandomInt function
     var randNum = getRandomInt(1,7); 
      //generate a class with the random number between 1 - 6 called showClass
      var showClass = 'show-' + randNum;
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
                dieNumberLanded = 1;
                // movePlayers();
                break;
            case 3:
            case 4:
                isDieRolling = false;
                dieNumberLanded = 2;
                // movePlayers();
                break;
            case 5:
            case 6:
                isDieRolling = false;
                dieNumberLanded = 3;
                // movePlayers();
                break;
            default:
                return 0;
        }
        movePlayers();
        chaosTimer += 1;
        setChaos();
        turnAction();
        }, 1000);
    }
    // set initial side

    // on click eventlistener for the button element
    rollBtn.addEventListener("click", rollDice);

    function changeColorDice() {
        if (turn == 1) {
            $(".cube__face--1").css("background", "#3498db");
            $(".cube__face--2").css("background", "#3498db");
            $(".cube__face--3").css("background", "#3498db");
            $(".cube__face--4").css("background", "#3498db");
            $(".cube__face--5").css("background", "#3498db");
            $(".cube__face--6").css("background", "#3498db");
        }
        else if (turn == -1) {
            $(".cube__face--1").css("background", "#e74c3c");
            $(".cube__face--2").css("background", "#e74c3c");
            $(".cube__face--3").css("background", "#e74c3c");
            $(".cube__face--4").css("background", "#e74c3c");
            $(".cube__face--5").css("background", "#e74c3c");
            $(".cube__face--6").css("background", "#e74c3c");
        }
    }
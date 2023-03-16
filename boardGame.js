    
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2"); 
    var currentStep;
    let boardTiles = document.querySelectorAll('tile');
    const gameLog = document.getElementById('gameLogDisplay');
    var chaosTimer = 0;
    var chaosValue = 1;
    const startTile = document.getElementById("1");
    turn = 1
    var testNumber;

    
    // Die Rolling Variables
    var dieNumberLanded = 3;
    var isDieRolling = false;

     // Assign board spaces from HTML to arrays
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
            isBot: undefined,
        }

    function Card(title, desc, image, action, Atype, hover, chaos1, chaos2, chaos3, chaos4, chaos5) {
        this.title = title;
        this.desc = desc;
        this.hover = hover
        this.image = image;
        this.action = action;
        this.Atype = Atype;
        this.chaos1 = chaos1
        this.chaos2 = chaos2
        this.chaos3 = chaos3
        this.chaos4 = chaos4
        this.chaos5 = chaos5
    }

    var cards = [];

    cards[0] = new Card('Robbed', "You got robbed!" , '/images/Cards/Card_Robbed.png', 'givePoints', null, "Give Points", 'Chaos 1-2: 1 Point', 'Chaos 3-4: 2 Points', 'Chaos 5: 3 Points');
    cards[1] = new Card('Spacing', "The vast nothingness has intruded" , '/images/Cards/Card_Spaced.png', 'goBackSpaces', 'spacing', "Go Back Spaces", 'Chaos 1: 1 Space', 'Chaos 2-4: 2 Spaces', 'Chaos 5: 4 Spaces');
    cards[2] = new Card('Clumsy', "Someone didn't clean up!" , '/images/Cards/Card_Clumsy.png', 'goBackSpaces', 'slipped', "Go back/Lose Points", 'Chaos 1: 1 Space', 'Chaos 2-5: 2 Spaces, 1 Point');
    cards[3] = new Card('Asteroid', "You are doomed", '/images/Cards/Card_Asteroid.png', 'backToStart', null, "Go Back to Start");
    cards[4] = new Card('Murdered', "Someone [UNALIVED] you! You were cloned.", '/images/Cards/Card_Murdered.png', 'losePoints', 'murdered', "Lose Points", 'Chaos 1-2: 3 Points', 'Chaos 3-4: 4 Points', 'Chaos 5: 5 Points')
    cards[5] = new Card('Portal', 'Portal 3 confirmed', '/images/Cards/Card_Portal.png',  'switchPlayers', null, "Switch Players")
    cards[6] = new Card('Black Hole', 'Oh no....', '/images/Cards/Card_Singularity.png', 'switchPoints', null, 'Switch Victory Points')
    cards[7] = new Card('Workplace Hazard', "Someone didn't bring their gloves™!", '/images/Cards/Card_Hazard.png', 'losePoints', 'hazard', 'Lose Points', 'Chaos 1-2: 2 Points', 'Chaos 3-4: 3 Points', 'Chaos 5: 6 Points')



    function drawCard (){
        if (cards.length > 0) {
            randIn = Math.floor(Math.random() * cards.length);
            cardPicked = cards[randIn];
            showCard(cardPicked)
            switch(cardPicked.action){
                case 'losePoints':
                    losePoints(chaosValue, cardPicked.Atype);
                    console.log(cardPicked.Atype)
                    break;
                case 'goBackSpaces':
                    goBackSpaces(chaosValue, cardPicked.Atype);
                    break;
                case 'backToStart':
                    backToStart();
                    break;
                case 'switchPlayers':
                    switchPlayers();
                    break;
                case 'switchPoints':
                    switchPoints();
                case 'givePoints':
                    givePoints(chaosValue);
                default:
                    break;
            }
        }
        gameLog.scrollTop = gameLog.scrollHeight;
        underFlow();

    }

    function showCard(card){
        $('#cardName').text(card.title);
        $('#cardDesc').text(card.desc);
        document.getElementById('cardImg').src= card.image;
        $('#cardHover').text(card.hover);
        if (card.chaos1 != undefined) {
            $('#chaosCon1').text(card.chaos1);
        } else {
            $('#chaosCon1').text('');
        }
        if (card.chaos2 != undefined) {
            $('#chaosCon2').text(card.chaos2);
        } else {
            $('#chaosCon2').text(''); 
        }
        if (card.chaos3 != undefined) {
            $('#chaosCon3').text(card.chaos3);
        } else {
            $('#chaosCon3').text('');
        }
        if (card.chaos4 != undefined) {
            $('#chaosCon4').text(card.chaos4);
        } else {
            $('#chaosCon4').text('');
        }
        if (card.chaos5 != undefined) {
            $('#chaosCon5').text(card.chaos5);
        } else {
            $('#chaosCon5').text('');
        }
        $('.actionCard').css('display', 'flex');
        $('.actionCard').css('animation', '0.5s fadeIn');
    }




    function hideCard() {
        $('.actionCard').css('display', 'none');
    }
    function losePoints (chaos, cardType){
        if (cardType == 'murdered') {
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
        } else if (cardType == 'hazard') {
            console.log('hazard was tripped')
            switch (chaos) {
                case 1:
                case 2:
                    if (turn == 1) {
                        player1.victoryPoints -= 2;
                    } else {
                        player2.victoryPoints -= 2;
                    }
                    return chaos;
                case 3:
                case 4:
                    if (turn == 1) {
                        player1.victoryPoints -= 3;
                    } else {
                        player2.victoryPoints -= 3;
                    }
                    return chaos;
                case 5:
                    if (turn == 1) {
                        player1.victoryPoints -= 6;
                    } else {
                        player2.victoryPoints -= 6;
                    }
                    return chaos;
                default:
                    break;
            }
        }

        updateVC();
    }

    function givePoints (chaos){
        if (turn == 1) {
            switch (chaos) {
                case 1:
                case 2:
                    player1.victoryPoints -= 1;
                    player2.victoryPoints += 1;
                case 3:
                case 4:
                    player1.victoryPoints -= 2;
                    player2.victoryPoints += 2;
                case 5:
                    player1.victoryPoints -= 3;
                    player2.victoryPoints -= 3;
                default:
                    break;
            }
        } else {
            switch (chaos) {
                case 1:
                case 2:
                    player2.victoryPoints -= 2;
                    player1.victoryPoints += 2;
                case 3:
                case 4:
                    player2.victoryPoints -= 3;
                    player1.victoryPoints += 3
                case 5:
                    player2.victoryPoints -= 6;
                    player1.victoryPoints -= 6;
                default:
                    break;
            }
        }
        updateVC();
    }

    function goBackSpaces (chaos, cardType){
        console.log('test')
        if (cardType == 'spacing') {
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
        $('#player1').appendTo(player1.playerPath[player1.currentTile]);
        $('#player2').appendTo(player2.playerPath[player2.currentTile]);
    }

    function backToStart (){
        if (turn == 1) {
            player1.currentTile = 1;
            player1.previousValue = 1;
            player1.playerPath = board1;
            $('#player1').appendTo([board1[1]]);
     
        } else {
            player2.currentTile = 1;
            player2.previousValue = 1;
            player2.playerPath = board1;
            $('#player2').appendTo(board1[1]);
        }
    }





    function underFlow (){
        if (player1.victoryPoints < 0) {
            player1.victoryPoints = 0;
        }
        if (player2.victoryPoints < 0) {
            player2.victoryPoints = 0
        }
        if (player1.currentTile < 0) {
            player1.currentTile = 0;
            player1.previousValue = 0;
        }
        if (player2.currentTile < 0) {
            player2.currentTile = 0;
            player2.previousValue = 0;
        }
        updateVC();
    }

    function updateVC (){
        document.getElementById('player1VP').textContent = player1.victoryPoints;
        document.getElementById('player2VP').textContent = player2.victoryPoints;
    }

    var chaosImg = ['/images/Chaos_Symbols/Chaos_Symbol_2.png', '/images/Chaos_Symbols/Chaos_Symbol_3.png', '/images/Chaos_Symbols/Chaos_Symbol_4.png', '/images/Chaos_Symbols/Chaos_Symbol_5.png'];
    var chaosImg2 = [];

    function setChaos (){
        if (chaosTimer == 8 || chaosTimer == 16 || chaosTimer == 24 || chaosTimer == 32) {
            chaosValue += 1;
            $('#gameLogDisplay').append('<li style=color:red; font-weight:bold;>' + '!! The chaos has increased to ' + chaosValue + ' !!' + '</li>')
        } else {
            return chaosValue;
        };
        // return chaosMeter;
        randIn = Math.floor(Math.random() * chaosImg.length);
        chaosPic = chaosImg.splice(randIn, 1)
        $(chaosMeter[chaosValue]).css('background', 'url(' + chaosPic + ')');
        chaosImg2.push(chaosPic);
    }

    // Starts the game and resets the values
    function start(isBot){
        turn = 1;
        isWinner = null;
        player1.currentTile = 1;
        player2.currentTile = 1;        
        $('#player1').appendTo(board1[player1.currentTile]);
        $('#player2').appendTo(board1[player1.currentTile]);
        // $(player1.victoryPoints).appendTo('#player1VP')
        updateVC();
        chaos = chaosMeter[chaosValue];
        $(chaos).css('background', 'url(/images/Chaos_Symbols/Chaos_Symbol_1.png)')
        $('.chaosMeter, .gameMenu, #gameBoard, .sign').css('animation', '2s fadeIn')
        $('.chaosMeter, .gameMenu, .sign').css('display', 'flex')
        $('#startBtn, #creditsBtn, #title').css('display', 'none')
        $('#gameBoard').removeAttr('style')
        $('.helpButton').css('top', '5%',)
        $('.helpButton').css('left', '22%',)
        $('.helpButton').css('width', '5%',)
        $('.helpButton').css('height', '5%',)
        player2.isBot = isBot;
        console.log(player2.isBot)
    }
    // start();
    // Uses the 3 arrays to move the player incrementally
    function movePlayers() {
        if (turn === 1) {
            player1.currentTile = player1.previousValue + dieNumberLanded;
            $('#player1').appendTo(player1.playerPath[player1.currentTile]);
            player1.previousValue = player1.currentTile;
            $('#gameLogDisplay').append('<li style=color:#34495e>' + '-- Player 1 moved ' + dieNumberLanded + ' space(s)' + '</li>')
            switchTile();
            Winner();
        } else {
            player2.currentTile = player2.previousValue + dieNumberLanded;
            $('#player2').appendTo(player2.playerPath[player2.currentTile]);
            player2.previousValue = player2.currentTile;
            $('#gameLogDisplay').append('<li style=color:#6e0000;>' + '-- Player 2 moved ' + dieNumberLanded + ' space(s)' + '</li>')
            switchTile();
            Winner();
        }
        gameLog.scrollTop = gameLog.scrollHeight;
    }

    function moneyTile (){
        randIn = Math.floor(Math.random() * 4);
        console.log(randIn)
        if (turn == 1) {
            player1.victoryPoints += randIn;
            $('#gameLogDisplay').append('<li style=color:#20AF30>' + '$- Player 1 gained ' + randIn + ' victory point(s)' + '</li>')
        } else {
            player2.victoryPoints += randIn;
            $('#gameLogDisplay').append('<li style=color:#20AF30>' + '$- Player 2 gained ' + randIn + ' victory point(s)' + '</li>')
        }
        updateVC();
        gameLog.scrollTop = gameLog.scrollHeight;
        turn *= -1;
        return randIn;
    }

    // Checks if a player reached the switch tile and executes the prompt
    function switchTile(){
        if (player1.currentTile >= 14){
            $('#player1').appendTo('#14')
            popUp()
        }
        if (player2.currentTile >= 14){
            $('#player2').appendTo('#14')
            popUp()
        }
    }

    // Popup function that lets player choose a path
    var popupActive = false;
    function popUp (){
        let popUp = document.getElementById('popupCont')
        popUp.style.display = 'flex';
        popUp.style.animation = '0.5s fadeIn'
        $('.rollBtn').css('display', 'none')
        popupActive = true;
        // if (turn == -1) {
        //     if (player2.isBot) {
        //         randIn = Math.floor(Math.random() * 2)
        //         if (randIn == 1) {
        //             Path1();
        //         } else {
        //             Path2();
        //         }
        //     }
        // }

    }

    // If a player chose path 1 on the popup
    function Path1 (){
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
        $('.rollBtn').css('display', 'block')
        popupActive = false;
    }

    // If a player chose path 2 on the popup
    function Path2 (){
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
        $('.rollBtn').css('display', 'block')
        popupActive = false;
    }

    function turnAction (){
        if (turn == 1){
            switch (player1.playerPath[player1.currentTile]) {
                case board1[7]:
                case board1[13]:
                case path1[1]:
                case path1[8]:
                case path2[3]:
                case path2[5]:
                case path2[7]:
                    moneyTile();
                    break;
                case board1[4]:
                case board1[10]:
                case path1[3]:
                case path1[10]:
                case path1[13]:
                case path2[2]:
                case path2[4]:
                case path2[6]:
                case path2[8]:
                case path2[9]:
                    drawCard();
                    $('#gameLogDisplay').append('<li>' + '+- Player 1 drew a card' + '</li>');
                    turn *= -1;
                    break;
                default:
                    turn *= -1;
            }
        } else {
            switch (player2.playerPath[player2.currentTile]) {
                case board1[7]:
                case board1[13]:
                case path1[1]:
                case path1[8]:
                case path2[3]:
                case path2[5]:
                case path2[7]:
                    moneyTile();
                    break;
                case board1[4]:
                case board1[10]:
                case path1[3]:
                case path1[10]:
                case path1[13]:
                case path2[2]:
                case path2[4]:
                case path2[6]:
                case path2[8]:
                case path2[9]:
                    drawCard();
                    $('#gameLogDisplay').append('<li>' + '+- Player 2 drew a card' + '</li>');
                    turn *= -1;
                    break;
                default:
                    turn *= -1
            }
        }

    }

    function switchPlayers (){
        tempPos = player1.playerPath;
        tempNum = player1.currentTile;
        player1.playerPath = player2.playerPath;
        player2Path = tempPos;
        player1.currentTile = player2.currentTile;
        player2.currentTile = tempNum;
        player1.previousValue = player1.currentTile;
        player2.previousValue = player2.currentTile;
        $('#player1').appendTo(player1.playerPath[player1.currentTile])
        $('#player2').appendTo(player2.playerPath[player2.currentTile])
    }

    function switchPoints (){
        tempNum = player1.victoryPoints;
        player1.victoryPoints = player2.victoryPoints;
        player2.victoryPoints = tempNum;
        updateVC();
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
            }
            if (player1.playerPath == path2 && player1.currentTile >= 11) {
                winPopUp.style.display = 'flex';
                $('#player1').appendTo('#end');
                winPopUp.style.animation = '0.5s fadeIn';
                winningPlayer.textContent = "1";
                player1.victoryPoints += 5;
            }
        } else {
            if (player2.playerPath == path1 && player2.currentTile >= 15){
                winPopUp.style.display = 'flex';
                $('#player2').appendTo('#end');
                winPopUp.style.animation = '0.5s fadeIn';
                winningPlayer.textContent = "2";
                player2.victoryPoints += 5;
            }
            if (player2.playerPath == path2 && player2.currentTile >= 11){
                winPopUp.style.display = 'flex';
                $('#player2').appendTo('#end');
                winPopUp.style.animation = '0.5s fadeIn';
                winningPlayer.textContent = "2";
                player2.victoryPoints += 5;
            }
        }
        updateVC();
    }

    setInterval(function botMove(){
        if (turn == -1) {
            if (player2.isBot) {
                if (popupActive == false) {
                    rollDice();
                }
            }            
        }
    }, 1000)

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
        if (turn == -1) {
            console.log('Its player 2s turn')
        } else {
            console.log('Its player 1s turn')
        }
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

// Help Page
var Helptoggle = 1;
function toggleHelp () {
    if (Helptoggle == 1) {
        $('.helpMenu').css('visibility', 'visible')
    } else if (Helptoggle == -1){
        $('.helpMenu').css('visibility', 'hidden')
    } 
    Helptoggle *= -1;
}

    // function toggleHelp() {
    //     if ($('.helpMenu').is(':hidden')) {
    //         console.log("Hid");
    //         $('.helpMenu').css('visibility', 'hidden');
    //     } else if ($('.helpMenu').is(':visible')){
    //         console.log("Vis");
    //         $('.helpMenu').css('visibility', 'visible');
    //     } 
    // }

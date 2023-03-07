    
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2"); 
    var player1Turn = true;
    var previousStep = 1;
    var currentStep;
    let boardTiles = document.querySelectorAll('tile');
    var spunWheel = false;

    const startTile = document.getElementById("1");

    var testNumber;
    
    var isWheelSpinning = false;

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
        if (turn == 1) {
            console.log("player 1's turn")
        } else {
            console.log("player 2's turn")
        }

    }

    // Starts the game and resets the values
    function start(){
        turn = 1;
        isWinner = null;
        player1.currentTile = 1;
        player2.currentTile = 1;        
        $('#player1').appendTo(board1[player1.currentTile]);
        $('#player2').appendTo(board1[player1.currentTile]);

    }
    start();

    // Uses the 3 arrays to move the player in an incremental way
    function movePlayers() {
        if (turn === 1) {
            switch (player1.playerPath) {
                case board1:
                    player1.currentTile = player1.previousValue + testNumber;
                    $('#player1').appendTo(board1[player1.currentTile]);
                    player1.previousValue = player1.currentTile;
                    console.log('player1 moved', testNumber, 'space(s) and is on tile', player1.currentTile)
                    switchTile();
                    break;
                case path1:
                    player1.currentTile = player1.previousValue + testNumber;
                    $('#player1').appendTo(path1[player1.currentTile]);
                    player1.previousValue = player1.currentTile;
                    console.log('player1 moved', testNumber, 'space(s) and is on tile', player1.currentTile)
                    Winner ();
                    break;
                case path2:
                    player1.currentTile = player1.previousValue + testNumber;
                    $('#player1').appendTo(path2[player1.currentTile]);
                    player1.previousValue = player1.currentTile;
                    console.log('player1 moved', testNumber, 'space(s) and is on tile', player1.currentTile)
                    Winner ();
                    break;
            }
        } else {
            switch (player2.playerPath) {
                case board1:
                    player2.currentTile = player2.previousValue + testNumber;
                    $('#player2').appendTo(board1[player2.currentTile]);
                    player2.previousValue = player2.currentTile;
                    console.log('player2 moved', testNumber, 'space(s) and is on tile', player2.currentTile)
                    switchTile();
                    break;
                case path1:
                    player2.currentTile = player2.previousValue + testNumber;
                    $('#player2').appendTo(path1[player2.currentTile]);
                    player2.previousValue = player2.currentTile;
                    console.log('player2 moved', testNumber, 'space(s) and is on tile', player2.currentTile)
                    Winner ();
                    break;
                case path2:
                    player2.currentTile = player2.previousValue + testNumber;
                    $('#player2').appendTo(path2[player2.currentTile]);
                    player2.previousValue = player2.currentTile;
                    console.log('player2 moved', testNumber, 'space(s) and is on tile', player2.currentTile)
                    Winner ();
                    break;

            }
        }

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
            console.log('--player1 has chosen path1')
            popUp.style.display = 'none';
        } else {
            player2.playerPath = path1
            player2.currentTile = 1
            player2.previousValue = 1
            console.log('--player2 has chosen path1')
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
            console.log('--player1 has chosen path2')
            popUp.style.display = 'none';
        } else {
            player2.playerPath = path2
            player2.currentTile = 1
            player2.previousValue = 1
            console.log('--player2 has chosen path2')
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
                // winPopUp.style.animation = '0.5s fadeIn'
                winningPlayer.innerHTML('1')
            }
            if (player1.playerPath == path2 && player1.currentTile >= 10) {
                winPopUp.style.display = 'flex';
                $('#player1').appendTo('#end');
                // winPopUp.style.animation = '0.5s fadeIn'
                winningPlayer.innerHTML('1')
            }
        } else {
            if (player2.playerPath == path1 && player2.currentTile >= 15){
                winPopUp.style.display = 'flex';
                $('#player2').appendTo('#end');
                // winPopUp.style.animation = '0.5s fadeIn'
                winningPlayer.innerHTML('2')
            }
            if (player2.playerPath == path2 && player2.currentTile >= 10){
                winPopUp.style.display = 'flex';
                $('#player2').appendTo('#end');
                // winPopUp.style.animation = '0.5s fadeIn'
                winningPlayer.innerHTML('2')
            }
        }
    }
        
    //     if (player1.playerPath = path1 && player1.currentTile >= 15) {
    //         winPopUp.style.display = 'flex';
    //         winPopUp.style.animation = '0.5s fadeIn'
    //     } else if (player2.playerPath = path1 && player2.currentTile >= 15){
    //         winPopUp.style.display = 'flex';
    //         winPopUp.style.animation = '0.5s fadeIn'
    //     }

    //     if (player1.playerPath = path2 && player1.currentTile >= 10) {
    //         winPopUp.style.display = 'flex';
    //         winPopUp.style.animation = '0.5s fadeIn'
    //     } else if (player2.playerPath = path2 && player2.currentTile >= 10){
    //         winPopUp.style.display = 'flex';
    //         winPopUp.style.animation = '0.5s fadeIn'
    //     }
    // }

    // Wheel Spinner
    
    const spin = () => {
        if (isWheelSpinning){
            return;
        }

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
        
        setTimeout(function() {
          flag.classList.add('wobble-fast');
          element.style.transitionDuration = '5s';
          element.style.transform = `rotate(${ startPosition + endPosition }deg)`;
        }, 50);

        isWheelSpinning = true;
        console.log(isWheelSpinning);

        setTimeout(function() {
            console.log("Spinner Ended");
            isWheelSpinning = false;
            console.log(isWheelSpinning);
       }, 6000);
      }
      
      const init = () => {
        // This is necessary for proper rendering                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        document.getElementById('wheel').style.transform = 'rotate(0deg)';
      }
      
      init()

      const isOnTop = (id) => {
        let element = document.querySelector(id),
            divs = document.querySelectorAll('section div');
      
        return [...divs].some(div =>
          div.getBoundingClientRect().bottom > element.getBoundingClientRect().bottom
        );
      }

      function wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
     }
    
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2"); 
    var player1Turn = true;
    var previousStep = 1;
    var currentStep;
    let boardTiles = document.querySelectorAll('tile');
    var spunWheel = false;

    const startTile = document.getElementById("1");

    var testNumber;
    

    const board1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    console.log('Test Array value', board1[19])
    for (i = 0; i <= 14; i++) {
        board1[i] = document.getElementById(i);
        // console.log(board1[i])
    }
    
    let path1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    for (i = 0; i <= 14; i++) {
        path1[i] = document.getElementById('A' + i);
        // console.log('path 1 ', path1[i])
    }

    let path2 = [1, 2, 3, 4, 5, 6, 7, 8]
    for (i = 0; i <= 14; i++) {
        path2[i] = document.getElementById('B' + i);
        // console.log('path 2 ', path1[i])
    }

    // player objects
    player1 = {
        previousValue: 1,
        currentTile: board1[0], 
        playerPath: board1,
        switched: false
    }

    player2 = {
        previousValue: 1,
        currentTile: board1[0],
        playerPath: board1,
        switched: false
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
        switchTile();
        turn *= -1
        if (turn == 1) {
            console.log("player 1's turn")
        } else {
            console.log("player 2's turn")
        }

    }

    function start(){
        turn = 1;
        isWinner = null;
        $('#player1').appendTo(board1[1]);
        $('#player2').appendTo(board1[1])
        player1.currentTile = board1[1].id;
        player2.currentTile = board1[1].id;
    }
    start();

    function spinWheel() {
        // wheelnumber = document.getElementById('')
        player1.currentTile = board1[testNumber];

        turn *= -1;
    }

    function movePlayers() {

        if (turn === 1) {
            switch (player1.playerPath) {
                case board1:
                    player1.currentTile = board1[player1.previousValue + testNumber]
                    player1.previousValue += +testNumber
                    console.log('test', player1.previousValue)
                    console.log('%cplayer1 moved', 'color: cornflower', testNumber, 'space(s) and is on tile', player1.currentTile.id)
                    break;
                case path1:
                    player1.currentTile = path1[player1.previousValue + testNumber]
                    player1.previousValue += +testNumber
                    console.log('player1 moved', testNumber, 'space(s) and is on tile', player1.currentTile.id)
                    break;
                case path2:
                    player1.currentTile = path2[player1.previousValue + testNumber]
                    player1.previousValue += +testNumber
                    console.log('player1 moved', testNumber, 'space(s) and is on tile', player1.currentTile.id)
                    break;

            }
        } else {
            switch (player2.playerPath) {
                case board1:
                    player2.currentTile = board1[player2.previousValue + testNumber]
                    player2.previousValue += +testNumber
                    console.log('player2 moved', testNumber, 'space(s) and is on tile', player2.currentTile.id)
                    break;
                case path1:
                    player2.currentTile = path1[player2.previousValue + testNumber]
                    player2.previousValue += +testNumber
                    console.log('player2 moved', testNumber, 'space(s) and is on tile', player2.currentTile.id)
                    break;
                case path2:
                    player2.currentTile = path2[player2.previousValue + testNumber]
                    player2.previousValue += +testNumber
                    console.log('player2 moved', testNumber, 'space(s) and is on tile', player2.currentTile.id)
                    break;

            }
        }

        try {
            render()
        } catch (error) {
            console.log('TYPE ERROR')
        }

    }
    console.log('Test Tile ', player1.currentTile, typeof player1.currentTile, board1[14].id, typeof board1[14].id)
    function switchTile(){
        if (player1.currentTile.id >= 14){
            $('#player1').appendTo('#14')
            popUp()
            console.log('test 1');
        }
        if (player2.currentTile.id >= 14){
            $('#player2').appendTo('#14')
            popUp()
            console.log('test 2');
        }
        

    }

    function popUp (){
        let popUp = document.getElementById('popupCont')
        popUp.style.display = 'flex';
        popUp.style.animation = '0.5s fadeIn'
    }

    function pathA (){
        let popUp = document.getElementById('popupCont')
        if (turn == -1) {
            player1.playerPath = path1
            player1.currentTile = path1[1]
            player1.previousValue = 1
            console.log('--player1 has chosen path1')
            popUp.style.display = 'none';
        } else {
            player2.playerPath = path1
            player2.currentTile = path1[1]
            player2.previousValue = 1
            console.log('--player2 has chosen path1')
            popUp.style.display = 'none';
        }
    }

    function pathB (){
        let popUp = document.getElementById('popupCont')
        if (turn == -1) {
            player1.playerPath = path2
            player1.currentTile = path2[1]
            player1.previousValue = 1
            console.log('--player1 has chosen path2')
            popUp.style.display = 'none';
        } else {
            player2.playerPath = path2
            player2.currentTile = path2[1]
            player2.previousValue = 1
            console.log('--player2 has chosen path2')
            popUp.style.display = 'none';
        }
    }

    function render(){
        $('#player1').appendTo(player1.currentTile);
        $('#player2').appendTo(player2.currentTile);
    }
    console.log('#',player1.currentTile)



    // Wheel Spinner
    // To-Do: Spinner seems to be too predictable, and needs to be more random?
    let container = document.querySelector(".wheel-container");
    let btn = document.getElementById("spin");
    let number = Math.ceil(Math.random() * 1000);

    btn.onclick = function () {
    	container.style.transform = "rotate(" + number + "deg)";
    	number += Math.ceil(Math.random() * 1000);
    }
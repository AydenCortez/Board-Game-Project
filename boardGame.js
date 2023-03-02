    
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2"); 
    const popup = document.getElementById("popupCont")
    var player1Turn = true;
    var previousStep = 1;
    var currentStep;
    let boardTiles = document.querySelectorAll('tile');
    var spunWheel = false;

    const startTile = document.getElementById("1");
    
    var testNumber;
    

    let board1 = ['1', '2', '3', '4', '5', '6','7', '8', '9','10', '11', '12', '13', '14']

    for (i = 0; i <= 14; i++) {
        board1[i] = document.getElementById(i);
        console.log(board1[i])
    }
    // board1.forEach((item, i) => {
    //     item.id  = i + 1;
    //     board1[i] = document.getElementById(i)
    //     console.log(document.getElementById(i))
    // })
    // console.log (board1);
    
    let path1 = ['15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']
    let path2 = ['15', '16', '17', '18', '19', '20', '21', '22', '23']

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
        movePlayers();
        turn *= -1
    }

    function start(){
        turn = 1;
        isWinner = null;
        $('#player1').appendTo(board1[1]);
        $('#player2').appendTo(board1[1])
        player1.currentTile = board1[1];
        player2.currentTile = board1[1];
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
                    console.log('player1 ', player1.previousValue)
                    break;
                case path1:
                    break;
                case path2:
                    break;

            }
        } else {
            switch (player2.playerPath) {
                case board1:
                    player2.currentTile = board1[player2.previousValue + testNumber]
                    player2.previousValue += +testNumber
                    console.log('player2 ', player2.previousValue)
                    break;
                case path1:
                    break;
                case path2:
                    break;

            }
        }
        render();
        switchTile();
    }

    function switchTile(){
        if (board1[player1.previousValue + testNumber] >= board1[14]){
            console.log('I DID IT');
        }

    }

    function render(){
        $('#player1').appendTo(player1.currentTile);
        $('#player2').appendTo(player2.currentTile);
    }



    // Wheel Spinner
    // To-Do: Spinner seems to be too predictable, and needs to be more random?
    let container = document.querySelector(".wheel-container");
    let btn = document.getElementById("spin");
    let number = Math.ceil(Math.random() * 1000);

    btn.onclick = function () {
    	container.style.transform = "rotate(" + number + "deg)";
    	number += Math.ceil(Math.random() * 1000);
    }
    
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
    let path1 = ['15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']
    let path2 = ['15', '16', '17', '18', '19', '20', '21', '22', '23']

    // player objects
    player1 = {
        currentTile: board1[0], 
        playerPath: board1,
        switched: false
    }

    player2 = {
        currentTile: board1[0],
        playerPath: board1,
        switched: false
    }

    function testButton (){
        function getTest (max) {
            return Math.floor(Math.random() * max)
        }
        testNumber = Math.floor(getTest(3) + 1)
        console.log (testNumber);
    }

    function start(){
        turn = 1;
        isWinner = null;
        player1.classList.add('player1')
        player2.classList.add('player2')
        startTile.appendChild(player1)
        startTile.appendChild(player2)
        player1.currentTile = board1[0];
        player2.currentTile = board1[0];
    }

    function spinWheel() {
        // wheelnumber = document.getElementById('')
        player1.currentTile = board1[testNumber];
        turn *= -1;
    }
    console.log (testNumber)
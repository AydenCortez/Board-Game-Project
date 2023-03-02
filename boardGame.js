    
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
        console.log(document.getElementById(i))
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

    function movePlayers() {
        if (turn === 1) {
            player1.currentTile += board1
        }
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
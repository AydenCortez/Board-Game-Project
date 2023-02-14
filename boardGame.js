    var player1 = document.getElementById("player1");
    var player1 = document.getElementById("player2"); 
    var die;

    var diceRolled = false;

    function rollDie() {
        var dieText = document.getElementById("rollText");
        die = Math.floor(Math.random() * 6) + 1;
        dieText.textContent = die;
    }

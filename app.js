$(document).ready(function() {
    var start = 0;
    var flag = 1;
    var combination1, combination2, combination3;
    var gameOver = false; // Track game status

    // Start Game
    $("#start").click(function() {
        Start();
    });

    // Reset Game
    $("#new").click(function() {
        resetGame();
    });

    function Start() {
        checkMode();
        if (start == 0) {
            $("h2").text("Select Game Mode!");
            $("h2").css("color", "red");
        } else {
            $("h2").html("Player 1 turn!");
            $("h2").css("color", "rgb(26, 114, 255)");
        }
    }


    function checkMode() {
        if ($("#multi").prop("checked")) {
            start = 1;
        } else if ($("#single").prop("checked")) {
            start = 2;
        }
    }

    $("#single").click(function() {
        $("#multi").prop("checked", false);
        if (!gameOver) {
            start = 2;
        }
        $(".game-mode").html("Single Player (Player vs Computer)");
    });

    $("#multi").click(function() {
        $("#single").prop("checked", false);
        if (!gameOver) {
            start = 1;
        }
        $(".game-mode").html("MultiPlayer (Player vs Player)");
    });


    // Place cross/circle 
    $(".btn").click(function() {
        checkMode();
        if (start == 1 && !gameOver) {
            if (flag == 1) {
                if (this.value === "0") {
                    this.innerHTML = "X";
                    this.classList.add("cross");
                    this.value = "1";
                    flag = 0;
                    if (CheckResult()) {
                        gameOver = true;
                        $("h2").html("Player 1 wins!");
                        $("h2").css("color", "red ");
                        $(".btn").eq(combination1).addClass("combination");
                        $(".btn").eq(combination2).addClass("combination");
                        $(".btn").eq(combination3).addClass("combination");
                    } else if (Draw()) {
                        gameOver = true;
                        $("h2").html("Match Draw!");
                        $("h2").css("color", "red ");
                    } else {
                        $("h2").html("Player 2 turn!");
                        $("h2").css("color", "rgb(130, 255, 21)");
                    }
                }
            } else {
                if (this.value === "0") {
                    this.innerHTML = "O";
                    this.classList.add("circle");
                    this.value = "2";
                    flag = 1;
                    if (CheckResult()) {
                        gameOver = true;
                        $("h2").html("Player 2 wins!");
                        $("h2").css("color", "red ");
                        $(".btn").eq(combination1).addClass("combination");
                        $(".btn").eq(combination2).addClass("combination");
                        $(".btn").eq(combination3).addClass("combination");
                    } else if (Draw()) {
                        gameOver = true;
                        $("h2").html("Match Draw!");
                        $("h2").css("color", "red ");
                    } else {
                        $("h2").html("Player 1 turn!");
                        $("h2").css("color", "rgb(26, 114, 255)");
                    }
                }
            }


            //Single Player
        } else if (start == 2 && !gameOver) {
            if (flag == 1) {
                if (this.value === "0") {
                    this.innerHTML = "X";
                    this.classList.add("cross");
                    this.value = "1";
                    flag = 0;
                    if (CheckResult()) {
                        gameOver = true;
                        $("h2").html("Player wins!");
                        $("h2").css("color", "red ");
                        $(".btn").eq(combination1).addClass("combination");
                        $(".btn").eq(combination2).addClass("combination");
                        $(".btn").eq(combination3).addClass("combination");
                    } else if (Draw()) {
                        gameOver = true;
                        $("h2").html("Match Draw!");
                        $("h2").css("color", "red ");
                    } else {
                        $("h2").html("Computers turn!");
                        $("h2").css("color", "rgb(130, 255, 21)");
                    }
                    setTimeout(function() {
                        while (flag == 0 && !gameOver) {
                            Computer();
                        }
                    }, 600);
                }
            }
        }
    });

    // Reset the game to its initial state
    function resetGame() {
        for (var i = 0; i < $(".btn").length; i++) {
            $(".btn")[i].innerHTML = "";
            $(".btn")[i].value = "0";
        }
        $(".btn").removeClass("cross");
        $(".btn").removeClass("circle");
        $(".btn").removeClass("combination");
        Start();
        flag = 1;
        gameOver = false;
    }

    // Check for a draw
    function Draw() {
        let len = document.querySelectorAll(".btn").length;
        for (var i = 0; i < len; i++) {
            if ($(".btn")[i].value === "0") {
                return 0;
            }
        }
        return 1;
    }

    // Result check
    function CheckResult() {
        // Horizontal Check
        if (
            ($(".btn")[0].value == $(".btn")[1].value &&
                $(".btn")[1].value == $(".btn")[2].value &&
                $(".btn")[0].value != "0")
        ) {
            combination1 = 0;
            combination2 = 1;
            combination3 = 2;
            return 1;
        } else if (
            $(".btn")[3].value == $(".btn")[4].value &&
            $(".btn")[4].value == $(".btn")[5].value &&
            $(".btn")[3].value != "0"
        ) {
            combination1 = 3;
            combination2 = 4;
            combination3 = 5;
            return 1;
        } else if (
            $(".btn")[6].value == $(".btn")[7].value &&
            $(".btn")[7].value == $(".btn")[8].value &&
            $(".btn")[6].value != "0"
        ) {
            combination1 = 6;
            combination2 = 7;
            combination3 = 8;
            return 1;
        }

        // Vertical Check
        if (
            ($(".btn")[0].value == $(".btn")[3].value &&
                $(".btn")[3].value == $(".btn")[6].value &&
                $(".btn")[0].value != "0")
        ) {
            combination1 = 0;
            combination2 = 3;
            combination3 = 6;
            return 1;
        } else if (
            $(".btn")[1].value == $(".btn")[4].value &&
            $(".btn")[4].value == $(".btn")[7].value &&
            $(".btn")[1].value != "0"
        ) {
            combination1 = 1;
            combination2 = 4;
            combination3 = 7;
            return 1;
        } else if (
            $(".btn")[2].value == $(".btn")[5].value &&
            $(".btn")[5].value == $(".btn")[8].value &&
            $(".btn")[2].value != "0"
        ) {
            combination1 = 2;
            combination2 = 5;
            combination3 = 8;
            return 1;
        }

        // Left Diagonal Check
        if (
            $(".btn")[0].value == $(".btn")[4].value &&
            $(".btn")[4].value == $(".btn")[8].value &&
            $(".btn")[4].value != "0"
        ) {
            combination1 = 0;
            combination2 = 4;
            combination3 = 8;
            return 1;
        }

        // Right Diagonal Check
        if (
            $(".btn")[2].value == $(".btn")[4].value &&
            $(".btn")[4].value == $(".btn")[6].value &&
            $(".btn")[4].value != "0"
        ) {
            combination1 = 2;
            combination2 = 4;
            combination3 = 6;
            return 1;
        }

        return 0;
    }

    function Computer() {
        var randomNumber = Math.floor(Math.random() * 9);
        console.log(randomNumber);
        console.log($(".btn")[randomNumber].value);
        if ($(".btn")[randomNumber].value === "0") {
            $(".btn")[randomNumber].innerHTML = "O";
            $(".btn")[randomNumber].classList.add("circle");
            $(".btn")[randomNumber].value = "2";
            flag = 1;
            if (CheckResult()) {
                gameOver = true;
                $("h2").html("Computer wins!");
                $("h2").css("color", "red ");
                $(".btn").eq(combination1).addClass("combination");
                $(".btn").eq(combination2).addClass("combination");
                $(".btn").eq(combination3).addClass("combination");
            } else if (Draw()) {
                gameOver = true;
                $("h2").html("Match Draw!");
                $("h2").css("color", "red ");
            } else {
                $("h2").html("Players turn!");
                $("h2").css("color", "rgb(26, 114, 255)");
            }
        }
    }
});
//jshint esversion: 6


let selectedPiece;
let interval = 1000;
let intervalID;
let clearedLines = 0;
let level = 1;
let nextLevel = false;
let score = 0;
let gameToEnd = false;
let gameRunning = false;
//display moving piece
function renderSelectedPiece() {
  for (x = 0; x < 10; x++) {
    for (y = 0; y < 20; y++) {
      if (selectedPiece.pos[y][x] == 1) {
        $("td[x=" + x + "][y=" + y + "]").css("background-color", selectedPiece.color);
      }
      if (selectedPiece.pos[y][x] == -1) {
        $("td[x=" + x + "][y=" + y + "]").css("background-color", boardBackground);
        selectedPiece.pos[y][x] = 0;
      }

    }
  }
}



//update gameboard after line clear
function renderGameBoard() {
  for (x = 0; x < 10; x++) {
    for (y = 0; y < 20; y++) {
      $("td[x=" + x + "][y=" + y + "]").css("background-color", gameBoardColoring[y][x]);

    }
  }
  $(".cleared-lines-points").text(clearedLines);
  $(".score").text(score);
  if(nextLevel){
    level++;
    nextLevel=false;
    $(".level").text(level);
    interval=Math.pow((0.8-((level-1)*0.007)),(level-1))*1000;
    clearInterval(intervalID);
    gravity();
  }
  renderSelectedPiece();
}

//flash deleted line black
function flashDeletedLine(line) {
  for (y = 0; y < line.length; y++) {
    for (x = 0; x < 10; x++) {
      $("td[x=" + x + "][y=" + line[y] + "]").css("background-color", "white");
    }
  }
}

//spawning piece
function spawnNewPiece() {
  if (selectedPiece) {
    for (x = 0; x < 10; x++) {
      for (y = 0; y < 20; y++) {
        if (selectedPiece.pos[y][x] == 1) {
          gameBoard[y][x] = 1;
          gameBoardColoring[y][x] = selectedPiece.color;
        }
      }
    }

    let yToDelete = [];
    for (y = 19; y > 0; y--) {
      let line = gameBoard[y];
      let fullLine = true;
      for (x = 0; x < 10; x++) {
        if (line[x] != 1) {
          fullLine = false;
        }
      }
      if (fullLine == true) {
        yToDelete.push(y);
      }
    }
    if (yToDelete.length) {
      score += (2*yToDelete.length-1)*level;
      flashDeletedLine(yToDelete);
      setTimeout(function() {
        for (y = 0; y < yToDelete.length; y++) {
          for (x = 0; x < 10; x++) {
            gameBoard[yToDelete[y] + y][x] = 0;
            gameBoardColoring[yToDelete[y] + y][x] = boardBackground;
          }

          let upY = yToDelete[y] + y;
          while (upY > 0) {
            for (x = 0; x < 10; x++) {
              gameBoard[upY][x] = gameBoard[upY - 1][x];
              gameBoardColoring[upY][x] = gameBoardColoring[upY - 1][x];
            }
            upY--;
          }
          clearedLines++;
          if(clearedLines%10 == 0){
            nextLevel= true;
          }
        }
        renderGameBoard();
      }, 40);

    }



  }
  console.log("spawning");
  selectedPiece = piecesArray[Math.floor(Math.random() * 7)];
  console.log(selectedPiece);
  for (x = 0; x < 10; x++) {
    for (y = 0; y < 20; y++) {
      selectedPiece.pos[y][x] = selectedPiece.initpos[y][x];
      if(selectedPiece.pos[y][x] == gameBoard[y][x] && gameBoard[y][x]==1)
      {
        gameToEnd=true;
      }
    }
  }

  selectedPiece.xMax = selectedPiece.xMaxInit;
  selectedPiece.xMin = selectedPiece.xMinInit;
  selectedPiece.yMax = selectedPiece.yMaxInit;
  selectedPiece.offsetX = 0;
  selectedPiece.offsetY = 0;
  selectedPiece.rotationCounter = 0;
  renderSelectedPiece();
  if(gameToEnd){
    gameOver();
  }
}

//gravity
function gravity(){
  intervalID = setInterval(function(){
    moveDown();
  },interval);
}

//start Game
$("td").click(function(e) {
  if (!gameRunning) {
    for (x = 0; x < 10; x++) {
      for (y = 0; y < 20; y++) {
        gameBoard[y][x]=0;
        gameBoardColoring[y][x]=boardBackground;
        $("td[x=" + x + "][y=" + y + "]").css("background-color", gameBoardColoring[y][x]);
      }
    }
    $(".context-message").text("");
    $(".game-over-message").text("");
    spawnNewPiece();
    gravity();
    gameRunning=true;
  }


});

function gameOver(){
  $(".context-message").text("Click Field to Play again");
  $(".game-over-message").text("GAME OVER");
clearInterval(intervalID);
selectedPiece=undefined;
interval = 1000;
clearedLines = 0;
level = 1;
nextLevel = false;
score = 0;
gameRunning=false;
gameToEnd=false;

}

//pressing key
$(document).keydown(function(ev) {
  if(gameRunning){


  switch (ev.key) {
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowUp":
      rotate();
      break;
    case "ArrowDown":
      moveDown();
      break;
    default:
  }
  }
});

$(document).on("swipeleft", function(ev){
  moveLeft();
});

$(document).on("swiperight", function(ev){
  moveRight();
});

$(document).on("swipedown", function(ev){
  moveDown();
});

//movement
function moveLeft() {
  if (selectedPiece.xMin > 0) {
    selectedPiece.xMin--;
    selectedPiece.xMax--;
    selectedPiece.offsetX--;
    for (x = 0; x < 10; x++) {
      for (y = 0; y < 20; y++) {
        if (selectedPiece.pos[y][x] == 1) {
          selectedPiece.pos[y][x - 1] = 1;
          selectedPiece.pos[y][x] = -1;

        }
      }
    }
    let blocked = false;
    for (x = 0; x < 10; x++) {
      for (y = 0; y < 20; y++) {
        if (selectedPiece.pos[y][x] == 1) {
          if (selectedPiece.pos[y][x] == gameBoard[y][x]) {
            blocked = true;
          }
        }
      }
    }
    if (blocked) {
      for (x = 9; x >= 0; x--) {
        for (y = 0; y < 20; y++) {
          if (selectedPiece.pos[y][x] == 1) {
            selectedPiece.pos[y][x + 1] = 1;
            selectedPiece.pos[y][x] = 0;

          }

        }
      }

      selectedPiece.xMin++;
      selectedPiece.xMax++;
      selectedPiece.offsetX++;
    }
  }

  renderSelectedPiece();
}

function moveRight() {
  if (selectedPiece.xMax < 9) {
    selectedPiece.xMin++;
    selectedPiece.xMax++;
    selectedPiece.offsetX++;
    for (x = 9; x >= 0; x--) {
      for (y = 0; y < 20; y++) {
        if (selectedPiece.pos[y][x] == 1) {
          selectedPiece.pos[y][x + 1] = 1;
          selectedPiece.pos[y][x] = -1;
        }
      }
    }
    let blocked = false;
    for (x = 0; x < 10; x++) {
      for (y = 0; y < 20; y++) {
        if (selectedPiece.pos[y][x] == 1) {
          if (selectedPiece.pos[y][x] == gameBoard[y][x]) {
            blocked = true;
          }
        }
      }
    }
    if (blocked) {
      for (x = 0; x < 10; x++) {
        for (y = 0; y < 20; y++) {
          if (selectedPiece.pos[y][x] == 1) {
            selectedPiece.pos[y][x - 1] = 1;
            selectedPiece.pos[y][x] = 0;

          }

        }
      }
      selectedPiece.xMin--;
      selectedPiece.xMax--;
      selectedPiece.offsetX--;
    }
  }
  renderSelectedPiece();
}

function moveDown() {

  selectedPiece.yMax++;
  selectedPiece.offsetY++;
  if (selectedPiece.yMax < 20) {
    for (x = 0; x < 10; x++) {
      for (y = 19; y >= 0; y--) {
        if (selectedPiece.pos[y][x] == 1) {
          selectedPiece.pos[y + 1][x] = 1;
          selectedPiece.pos[y][x] = -1;
        }
      }
    }
    let blocked = false;
    for (x = 0; x < 10; x++) {
      for (y = 19; y >= 0; y--) {
        if (selectedPiece.pos[y][x] == 1) {
          if (selectedPiece.pos[y][x] == gameBoard[y][x]) {
            blocked = true;
          }
        }
      }
    }
    if (blocked) {
      for (x = 0; x < 10; x++) {
        for (y = 0; y < 20; y++) {
          if (selectedPiece.pos[y][x] == 1) {
            selectedPiece.pos[y - 1][x] = 1;
            selectedPiece.pos[y][x] = 0;

          }

        }
      }

      spawnNewPiece();
    } else {
      renderSelectedPiece();
    }

  } else {
    spawnNewPiece();
  }


}

function rotate() {
  selectedPiece.rotationCounter++;
  if (selectedPiece.rotationCounter == selectedPiece.rotationRule.length) {
    selectedPiece.rotationCounter = 0;
  }
  selectedPiece.xMin += selectedPiece.rotX[selectedPiece.rotationCounter][0];
  selectedPiece.xMax += selectedPiece.rotX[selectedPiece.rotationCounter][1];
  selectedPiece.yMax += selectedPiece.rotX[selectedPiece.rotationCounter][2];
  if (selectedPiece.xMax < 10 && selectedPiece.xMin >= 0 && selectedPiece.yMax < 20) {
    for (x = 0; x < 10; x++) {
      for (y = 0; y < 20; y++) {
        if (selectedPiece.pos[y][x] == 1) {
          selectedPiece.pos[y][x] = -1;
        }
      }
    }
    for (x = 0; x < 10; x++) {
      for (y = 0; y < 20; y++) {
        if (selectedPiece.rotationRule[selectedPiece.rotationCounter][y][x] == 1) {
          selectedPiece.pos[y + selectedPiece.offsetY][x + selectedPiece.offsetX] = 1;
        }
      }
    }
    let blocked = false;
    for (x = 0; x < 10; x++) {
      for (y = 0; y < 20; y++) {
        if (selectedPiece.pos[y][x] == 1 && selectedPiece.pos[y][x] == gameBoard[y][x]) {
          blocked = true;
        }
      }
    }

    if (blocked) {
      selectedPiece.xMin -= selectedPiece.rotX[selectedPiece.rotationCounter][0];
      selectedPiece.xMax -= selectedPiece.rotX[selectedPiece.rotationCounter][1];
      selectedPiece.yMax -= selectedPiece.rotX[selectedPiece.rotationCounter][2];
      selectedPiece.rotationCounter--;
      if (selectedPiece.rotationCounter < 0) {
        selectedPiece.rotationCounter = selectedPiece.rotationRule.length - 1;
      }
      for (x = 0; x < 10; x++) {
        for (y = 0; y < 20; y++) {
          if (selectedPiece.pos[y][x] == 1) {
            selectedPiece.pos[y][x] = 0;
          }
        }
      }
      for (x = 0; x < 10; x++) {
        for (y = 0; y < 20; y++) {

          if (selectedPiece.rotationRule[selectedPiece.rotationCounter][y][x] == 1) {
            selectedPiece.pos[y + selectedPiece.offsetY][x + selectedPiece.offsetX] = 1;
          }
        }
      }
    }


  } else {
    selectedPiece.xMin -= selectedPiece.rotX[selectedPiece.rotationCounter][0];
    selectedPiece.xMax -= selectedPiece.rotX[selectedPiece.rotationCounter][1];
    selectedPiece.yMax -= selectedPiece.rotX[selectedPiece.rotationCounter][2];
    selectedPiece.rotationCounter--;
    if (selectedPiece.rotationCounter < 0) {
      selectedPiece.rotationCounter = selectedPiece.rotationRule.length - 1;
    }
  }
  renderSelectedPiece();
}

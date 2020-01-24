//jshint esversion: 6


let selectedPiece;

//display changes on screen
function renderSelectedPiece() {
  for (x = 0; x < 10; x++) {
    for (y = 0; y < 20; y++) {
      if (selectedPiece.pos[y][x] == 1) {
        $("td[x=" + x + "][y=" + y + "]").css("background-color", selectedPiece.color);
      }
      if (selectedPiece.pos[y][x] == -1) {
        $("td[x=" + x + "][y=" + y + "]").css("background-color", "white");
        selectedPiece.pos[y][x] = 0;
      }

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
        }
      }
    }
  }
  console.log(gameBoard);
  selectedPiece = piecesArray[Math.floor(Math.random() * 7)];
  for (x = 0; x < 10; x++) {
    for (y = 0; y < 20; y++) {
      selectedPiece.pos[y][x] = selectedPiece.initpos[y][x];

    }
  }
  selectedPiece.xMax = selectedPiece.xMaxInit;
  selectedPiece.xMin = selectedPiece.xMinInit;
  selectedPiece.yMax = selectedPiece.yMaxInit;
  selectedPiece.offsetX = 0;
  selectedPiece.offsetY = 0;
  selectedPiece.rotationCounter = 0;
  renderSelectedPiece();
}
$("td").click(function(e) {
  if (!selectedPiece) {
    spawnNewPiece();
  }


});

//pressing key
$(document).keydown(function(ev) {
  switch (ev.key) {
    case "ArrowLeft":
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
      break;
    case "ArrowRight":
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
      break;
    case "ArrowUp":
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
            if(selectedPiece.pos[y][x]==1 && selectedPiece.pos[y][x]==gameBoard[y][x]){
              blocked=true;
            }
          }
        }

        if(blocked){
          selectedPiece.xMin -= selectedPiece.rotX[selectedPiece.rotationCounter][0];
          selectedPiece.xMax -= selectedPiece.rotX[selectedPiece.rotationCounter][1];
          selectedPiece.yMax -= selectedPiece.rotX[selectedPiece.rotationCounter][2];
          selectedPiece.rotationCounter--;
          if(selectedPiece.rotationCounter<0){
            selectedPiece.rotationCounter = selectedPiece.rotationRule.length-1;
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
        if(selectedPiece.rotationCounter<0){
          selectedPiece.rotationCounter = selectedPiece.rotationRule.length-1;
        }
      }
      renderSelectedPiece();
      break;
    case "ArrowDown":

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


      break;
    default:
  }
});

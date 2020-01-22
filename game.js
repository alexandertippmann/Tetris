//jshint esversion: 6


let selectedPiece;

function renderSelectedPiece(selPiece){
  for(x=0;x<10;x++){
    for(y=0;y<20;y++){
      if(selectedPiece.pos[y][x]==1){
        $("td[x="+x+"][y="+y+"]").css("background-color",selectedPiece.color);
      }
      if(selectedPiece.pos[y][x]==-1){
        $("td[x="+x+"][y="+y+"]").css("background-color","white");
        selectedPiece.pos[y][x]=0;
      }

    }
  }
  console.log(selectedPiece);
}

//spawning piece
$("td").click(function(e){
  $("td").css("background-color","white");
  selectedPiece = piecesArray[Math.floor(Math.random()*7)];
  for(x=0;x<10;x++){
    for(y=0;y<20;y++){
      selectedPiece.pos[y][x] = selectedPiece.initpos[y][x];
      selectedPiece.xMax = selectedPiece.xMaxInit;
      selectedPiece.xMin = selectedPiece.xMinInit;
      selectedPiece.yMax = selectedPiece.yMaxInit;
    }
  }
  renderSelectedPiece(selectedPiece);
});

//pressing key
$(document).keydown(function(ev){
  switch(ev.key){
    case "ArrowLeft":
    if(selectedPiece.xMin>0){
      selectedPiece.xMin--;
      selectedPiece.xMax--;
      for(x=0;x<10;x++){
        for(y=0;y<20;y++){
          if(selectedPiece.pos[y][x]==1){
            selectedPiece.pos[y][x-1]=1;
            selectedPiece.pos[y][x]=-1;

          }
        }
      }
    }

    renderSelectedPiece(selectedPiece);
    break;
    case "ArrowRight":
    if(selectedPiece.xMax<9){
      selectedPiece.xMin++;
      selectedPiece.xMax++;
      for(x=9;x>=0;x--){
        for(y=0;y<20;y++){
          if(selectedPiece.pos[y][x]==1){
            selectedPiece.pos[y][x+1]=1;
            selectedPiece.pos[y][x]=-1;
          }
        }
      }
    }
    renderSelectedPiece(selectedPiece);
    break;
    case "ArrowUp":
    console.log("AU");
    break;
    case "ArrowDown":
    if(selectedPiece.yMax <19){
      selectedPiece.yMax++;
      for(x=0;x<10;x++){
        for(y=19;y>=0;y--){
          if(selectedPiece.pos[y][x]==1){
            selectedPiece.pos[y+1][x]=1;
            selectedPiece.pos[y][x]=-1;
          }
        }
      }
    }

    renderSelectedPiece(selectedPiece);
    break;
    case "r":
    console.log("rotate");
    break;
    default:
  }
});

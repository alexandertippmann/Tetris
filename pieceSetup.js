//jshint esversion: 6

//setting up pieces and colors
const purple = "#8e44ad";
const orange = "#e67e22";
const lightBlue = "#3498db";
const darkBlue = "#2980b9";
const red = "#e74c3c";
const green = "#2ecc71";
const yellow = "#f1c40f";

class Piece {
  constructor(initialPosition, currentPosition, color, lowestX, highestX, highestY) {
    this.initpos = initialPosition;
    this.pos = currentPosition;
    this.color = color;
    this.xMin = lowestX;
    this.xMax = highestX;
    this.yMax = highestY;
    this.xMinInit = lowestX;
    this.xMaxInit = highestX;
    this.yMaxInit = highestY;
    this.rotationCounter = 0;
    
  }
}

var tArray = [];
var iArray = [];
var oArray = [];
var sArray = [];
var zArray = [];
var lArray = [];
var llArray = [];
var tArrayPos = [];
var iArrayPos = [];
var oArrayPos = [];
var sArrayPos = [];
var zArrayPos = [];
var lArrayPos = [];
var llArrayPos = [];

for (x = 0; x < 20; x++) {
  tArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  iArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  oArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  sArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  zArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  lArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  llArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  tArrayPos.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  iArrayPos.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  oArrayPos.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  sArrayPos.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  zArrayPos.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  lArrayPos.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  llArrayPos.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}
tArray[0][4] = 1;
tArray[1][3] = 1;
tArray[1][4] = 1;
tArray[1][5] = 1;
iArray[0][5] = 1;
iArray[1][5] = 1;
iArray[2][5] = 1;
iArray[3][5] = 1;
oArray[0][4] = 1;
oArray[0][5] = 1;
oArray[1][4] = 1;
oArray[1][5] = 1;
sArray[0][4] = 1;
sArray[0][5] = 1;
sArray[1][3] = 1;
sArray[1][4] = 1;
zArray[0][3] = 1;
zArray[0][4] = 1;
zArray[1][4] = 1;
zArray[1][5] = 1;
lArray[0][4] = 1;
lArray[1][4] = 1;
lArray[2][4] = 1;
lArray[2][5] = 1;
llArray[0][4] = 1;
llArray[0][5] = 1;
llArray[1][4] = 1;
llArray[2][4] = 1;

for (x = 0; x < 10; x++) {
  for (y = 0; y < 20; y++) {
    iArrayPos[y][x] = iArray[y][x];
    oArrayPos[y][x] = oArray[y][x];
    sArrayPos[y][x] = sArray[y][x];
    zArrayPos[y][x] = zArray[y][x];
    lArrayPos[y][x] = lArray[y][x];
    llArrayPos[y][x] = llArray[y][x];
  }
}

const tPiece = new Piece(tArray, tArrayPos, purple, 3, 5, 1);
const iPiece = new Piece(iArray, iArrayPos, lightBlue, 5, 5, 3);
const oPiece = new Piece(oArray, oArrayPos, yellow, 4, 5, 1);
const sPiece = new Piece(sArray, sArrayPos, green, 3, 5, 1);
const zPiece = new Piece(zArray, zArrayPos, red, 3, 5, 1);
const lPiece = new Piece(lArray, lArrayPos, orange, 4, 5, 2);
const llPiece = new Piece(llArray, llArrayPos, darkBlue, 4, 5, 2);
const piecesArray = [tPiece, iPiece, oPiece, sPiece, zPiece, lPiece, llPiece];

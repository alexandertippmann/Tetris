//jshint esversion: 6

//setting up pieces and colors
const purple = "#8e44ad";
const orange = "#e67e22";
const lightBlue = "#3498db";
const darkBlue = "#2980b9";
const red = "#e74c3c";
const green = "#2ecc71";
const yellow = "#f1c40f";
const boardBackground = "#303030";

class Piece {
  constructor(initialPosition, currentPosition, color, lowestX, highestX, highestY, rotationRule, rotationX) {
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
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotationRule = rotationRule;
    this.rotX = rotationX;

  }
}

var tArray = [];
var tArrayRot1 = [];
var tArrayRot2 = [];
var tArrayRot3  = [];
var iArray = [];
var iArrayRot1 = [];
var oArray = [];
var sArray = [];
var sArrayRot1= [];
var zArray = [];
var zArrayRot1 = [];
var lArray = [];
var lArrayRot1 = [];
var lArrayRot2 = [];
var lArrayRot3 = [];
var llArray = [];
var llArrayRot1 = [];
var llArrayRot2 = [];
var llArrayRot3 = [];
var tArrayPos = [];
var iArrayPos = [];
var oArrayPos = [];
var sArrayPos = [];
var zArrayPos = [];
var lArrayPos = [];
var llArrayPos = [];

var gameBoard = [];
var gameBoardColoring = [];


for (x = 0; x < 20; x++) {
  tArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  tArrayRot1.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  tArrayRot2.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  tArrayRot3.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  iArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  iArrayRot1.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  oArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  sArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  sArrayRot1.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  zArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  zArrayRot1.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  lArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  lArrayRot1.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  lArrayRot2.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  lArrayRot3.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  llArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  llArrayRot1.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  llArrayRot2.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  llArrayRot3.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  tArrayPos.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  iArrayPos.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  oArrayPos.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  sArrayPos.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  zArrayPos.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  lArrayPos.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  llArrayPos.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  gameBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  gameBoardColoring.push([boardBackground, boardBackground, boardBackground, boardBackground, boardBackground, boardBackground, boardBackground, boardBackground, boardBackground, boardBackground]);
}
tArray[0][4] = 1;
tArray[1][3] = 1;
tArray[1][4] = 1;
tArray[1][5] = 1;
tArrayRot1[0][4] = 1;
tArrayRot1[1][3] = 1;
tArrayRot1[1][4] = 1;
tArrayRot1[2][4] = 1;
tArrayRot2[1][3] = 1;
tArrayRot2[1][4] = 1;
tArrayRot2[1][5] = 1;
tArrayRot2[2][4] = 1;
tArrayRot3[0][4] = 1;
tArrayRot3[1][4] = 1;
tArrayRot3[2][4] = 1;
tArrayRot3[1][5] = 1;
iArray[0][5] = 1;
iArray[1][5] = 1;
iArray[2][5] = 1;
iArray[3][5] = 1;
iArrayRot1[0][3] = 1;
iArrayRot1[0][4] = 1;
iArrayRot1[0][5] = 1;
iArrayRot1[0][6] = 1;
oArray[0][4] = 1;
oArray[0][5] = 1;
oArray[1][4] = 1;
oArray[1][5] = 1;
sArray[0][4] = 1;
sArray[0][5] = 1;
sArray[1][3] = 1;
sArray[1][4] = 1;
sArrayRot1[0][4] = 1;
sArrayRot1[1][4] = 1;
sArrayRot1[1][5] = 1;
sArrayRot1[2][5] = 1;
zArray[0][3] = 1;
zArray[0][4] = 1;
zArray[1][4] = 1;
zArray[1][5] = 1;
zArrayRot1[0][4] = 1;
zArrayRot1[1][3] = 1;
zArrayRot1[1][4] = 1;
zArrayRot1[2][3] = 1;
lArray[0][4] = 1;
lArray[1][4] = 1;
lArray[2][4] = 1;
lArray[2][5] = 1;
lArrayRot1[0][5] = 1;
lArrayRot1[1][3] = 1;
lArrayRot1[1][4] = 1;
lArrayRot1[1][5] = 1;
lArrayRot2[0][3] = 1;
lArrayRot2[0][4] = 1;
lArrayRot2[1][4] = 1;
lArrayRot2[2][4] = 1;
lArrayRot3[1][3] = 1;
lArrayRot3[1][4] = 1;
lArrayRot3[1][5] = 1;
lArrayRot3[2][3] = 1;
llArray[0][4] = 1;
llArray[0][5] = 1;
llArray[1][4] = 1;
llArray[2][4] = 1;
llArrayRot1[1][3] = 1;
llArrayRot1[1][4] = 1;
llArrayRot1[1][5] = 1;
llArrayRot1[2][5] = 1;
llArrayRot2[0][4] = 1;
llArrayRot2[1][4] = 1;
llArrayRot2[2][3] = 1;
llArrayRot2[2][4] = 1;
llArrayRot3[0][3] = 1;
llArrayRot3[1][3] = 1;
llArrayRot3[1][4] = 1;
llArrayRot3[1][5] = 1;



const tArrayRotations = [tArray,tArrayRot1,tArrayRot2,tArrayRot3];
const tArrayRot = [[-1,0,-1],[0,-1,1],[0,1,0],[1,0,0]];
const iArrayRotations = [iArray,iArrayRot1];
const iArrayRot =[[2,-1,3],[-2,1,-3]];
const sArrayRotations = [sArray,sArrayRot1];
const sArrayRot = [[-1,0,-1],[1,0,1]];
const zArrayRotations = [zArray,zArrayRot1];
const zArrayRot = [[0,1,-1],[0,-1,1]];
const lArrayRotations = [lArray,lArrayRot1,lArrayRot2,lArrayRot3];
const lArrayRot = [[1,0,0],[-1,0,-1],[0,-1,1],[0,1,0]];
const llArrayRotations = [llArray,llArrayRot1,llArrayRot2,llArrayRot3];
const llArrayRot = [[1,0,1],[-1,0,0],[0,-1,0],[0,1,-1]];
const oArrayRotations = [oArray];
const oArrayRot = [[0,0,0]];

const tPiece = new Piece( tArray,  tArrayPos,  purple,    3, 5, 1, tArrayRotations,  tArrayRot);
const iPiece = new Piece( iArray,  iArrayPos,  lightBlue, 5, 5, 3, iArrayRotations,  iArrayRot);
const oPiece = new Piece( oArray,  oArrayPos,  yellow,    4, 5, 1, oArrayRotations , oArrayRot );
const sPiece = new Piece( sArray,  sArrayPos,  green,     3, 5, 1, sArrayRotations , sArrayRot );
const zPiece = new Piece( zArray,  zArrayPos,  red,       3, 5, 1, zArrayRotations , zArrayRot );
const lPiece = new Piece( lArray,  lArrayPos,  orange,    4, 5, 2, lArrayRotations , lArrayRot );
const llPiece = new Piece(llArray, llArrayPos, darkBlue,  4, 5, 2, llArrayRotations, llArrayRot  );
const piecesArray = [tPiece, iPiece, oPiece, sPiece, zPiece, lPiece, llPiece];

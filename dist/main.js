/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");


class Gameboard {
    constructor() {
      this.board = []
      this.ships = [];
      this.WIDTH = 10;
    }
  
    createBoard(){
      this.board = new Array(100).fill(null)
    }

    addShip(name, length){
      this.ships.push(new _ship__WEBPACK_IMPORTED_MODULE_0__.default(name, length))
      }

    addShipToBoard(ship, coordinatesArr){
        coordinatesArr.forEach(coordinate=>{
          this.board[coordinate] = {
            id: ship.name}
      })}
    
    //generate a valid random spot based on ship direction and length
    generateRandomCoords(ship) {
      let randomSpot = this.generateRandomNumber()
  
      if (ship.direction === "horizontal") {
        return randomSpot % this.WIDTH < this.WIDTH - ship.shipLength + 1
          ? randomSpot
          : this.generateRandomCoords(ship);
      }
      if (ship.direction === "vertical") {
        return randomSpot < this.WIDTH * (this.WIDTH - ship.shipLength + 1)
          ? randomSpot
          : this.generateRandomCoords(ship);
      }
    }

    //returns a number from 0-99
    generateRandomNumber() {
      return Math.floor(Math.random() * this.WIDTH * this.WIDTH);
    }

    //generates an array of coordinates based on ship direction and length
    generateShipCoords(coord, ship){
      let coordinatesArr = []
      
      if (ship.direction === "horizontal") {
        for (let i = 0; i < ship.shipLength; i++) {
          let index = coord + i;
          coordinatesArr.push(index);
        }}
      
      if (ship.direction === "vertical") {
        for (let i = 0; i < ship.shipLength; i++) {
          let index = coord + 10 * i;
          coordinatesArr.push(index);
        }}
        return coordinatesArr
    }

    //check if board space is taken
    checkIfCoordsValid(coordinatesArr){
      if (coordinatesArr.some((coord)=>
        this.board[coord] !== null)) {return false;}
        else{return true;}
        
    }

    //generate valid ship coords and add them into board array
    generateRandomShipCoords(ship){
        let index = this.generateRandomCoords(ship)
        let coordinatesArr = this.generateShipCoords(index, ship)
        let validCoords = this.checkIfCoordsValid(coordinatesArr)
        if(validCoords === true){
           this.addShipToBoard(ship, coordinatesArr)
        }
        else{
          this.generateRandomShipCoords(ship)
        }
    }

    placeRandomShip(arr){
      arr.forEach(ship=>{
        this.generateRandomShipCoords(ship)
      })
    }

    randomShipsDirection(){
      this.ships.forEach(ship=>{
        ship.randomDirection()
      })
    }
  }

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAll": () => (/* binding */ renderAll),
/* harmony export */   "renderShipsOnBoard": () => (/* binding */ renderShipsOnBoard)
/* harmony export */ });
/* harmony import */ var _dragfunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dragfunctions */ "./src/dragfunctions.js");
/* harmony import */ var _gameplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameplay */ "./src/gameplay.js");



const renderBoard = (gameBoard, displayGameBoard) => {
  for (let i = 0; i <= gameBoard.board.length; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.id = i;
    displayGameBoard.appendChild(tile);
  }
};

const renderShipsOnBoard = (gameBoard, displayGameBoard) => {
  gameBoard.board.forEach((element, index) => {
    if (element !== null) {
      displayGameBoard.childNodes[index].classList.add(
        "taken",
        `${element.id}`
      );
    }
  });
};

const renderSelectionGrid = (shipsArr) => {
  const playerSelectGrid = document.querySelector(".selection-grid");
  shipsArr.forEach((ship) => {
    let shipElement = document.createElement("div");
    shipElement.classList.add("ship", `${ship.name}`);
    shipElement.setAttribute("draggable", true);
    for (let i = 0; i < ship.shipLength; i++) {
      let tile = document.createElement("div");
      tile.id = `${ship.name}-${i}`;
      shipElement.appendChild(tile);
      playerSelectGrid.appendChild(shipElement);
    }
  });
};

const rotatePlayerShips = () => {
  const rotateBtn = document.querySelector("#rotate-btn");
  const playerSelectGrid = document.querySelector(".selection-grid");
  const ships = playerSelectGrid.querySelectorAll(".ship");
  playerSelectGrid.classList.toggle("horizontal");
  ships.forEach((ship) => {
    const shipName = ship.firstChild.id.slice(0, -2);
    ship.classList.toggle(`${shipName}-horizontal`);
    ship.classList.toggle(`${shipName}`);
    _gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameboards.playerBoard.ships.forEach((ship) => {
      if (ship.name === shipName) {
        ship.direction === "vertical"
          ? (ship.direction = "horizontal")
          : (ship.direction = "vertical");
      }
    });
  });
};

const clearContainer = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

const message = (message) => {
  const displayGameInfo = document.querySelector(".game-info");
  displayGameInfo.textContent = message;
};

const applySelectorsAndListeners = () => {
  const startBtn = document.querySelector("#start-btn");
  const rotateBtn = document.querySelector("#rotate-btn");
  const resetBtn = document.querySelector("#reset-btn");
  const randomPlaceBtn = document.querySelector("#random-btn");
  rotateBtn.addEventListener("click", rotatePlayerShips);
  startBtn.addEventListener("click", startGame);
  resetBtn.addEventListener("click", resetGame);
  randomPlaceBtn.addEventListener("click", randomPlacePlayerShips);
};

const renderAll = () => {
  const playerGrid = document.querySelector(".playerGrid");
  const computerGrid = document.querySelector(".computerGrid");
  const displayGameInfo = document.querySelector(".game-info");

  applySelectorsAndListeners();
  renderBoard(_gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameboards.playerBoard, playerGrid);
  renderBoard(_gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameboards.computerBoard, computerGrid);
  renderShipsOnBoard(_gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameboards.computerBoard, computerGrid);
  renderSelectionGrid(_gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameboards.playerBoard.ships);
  _dragfunctions__WEBPACK_IMPORTED_MODULE_0__.default.addDragListeners();

  message("Drag and drop your ships to begin!");
};

const randomPlacePlayerShips = () => {
  const playerGrid = document.querySelector(".playerGrid");
  const playerSelectGrid = document.querySelector(".selection-grid");
  const takenTiles = playerGrid.getElementsByClassName("taken");
  if (takenTiles.length > 0) {
    message("Please reset the board before you may randomly place ships");
    return;
  }
  clearContainer(playerSelectGrid);
  _gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameboards.playerBoard.randomShipsDirection();
  _gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameboards.playerBoard.placeRandomShip(
    _gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameboards.playerBoard.ships
  );
  renderShipsOnBoard(_gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameboards.playerBoard, playerGrid);
  message("All ships deployed! Click Start Game to play!");
};

const resetGame = () => {
  const computerGrid = document.querySelector(".computerGrid");
  const playerGrid = document.querySelector(".playerGrid");
  const playerSelectGrid = document.querySelector(".selection-grid");

  playerSelectGrid.classList.remove("horizontal");
  clearContainer(playerGrid);
  clearContainer(computerGrid);
  clearContainer(playerSelectGrid);
  _gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameon = false;
  _gameplay__WEBPACK_IMPORTED_MODULE_1__.default.resetBoardAndShips();
  renderAll();
  changeGameMode();
  applySelectorsAndListeners();
};

const startGame = () => {
  const playerSelectGrid = document.querySelector(".selection-grid");
  const ship = document.querySelector(".ship");
  if (playerSelectGrid.contains(ship)) {
    message("Please deploy all ships to start game");
    return;
  }
  _gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameon = true;
  changeGameMode();
};

const disableClicks = () => {
  const computerGrid = document.querySelector(".computerGrid");
  const computerTiles = computerGrid.querySelectorAll("div");
  computerTiles.forEach((tile) => {
    const newTile = tile.cloneNode(true);
    tile.parentNode.replaceChild(newTile, tile);
  });
};

const playerAttack = (e) => {
  const computerGrid = document.querySelector(".computerGrid");
  const computerBoard = _gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameboards.computerBoard;
  const displayGameInfo = document.querySelector(".game-info");
  let index = e.target.id;
  //   const classes = ['hit', 'miss', 'sunk']
  if (
    e.target.classList.contains("hit") ||
    e.target.classList.contains("miss") ||
    e.target.classList.contains("sunk")
  )
    return;

  const shipName = e.target.classList[2];
  const boardReturnInfo = _gameplay__WEBPACK_IMPORTED_MODULE_1__.default.updateBoardInfo(index, computerBoard);

  switch (boardReturnInfo) {
    case "miss":
      e.target.classList.add("miss");
      break;
    case "hit":
      e.target.classList.add("hit");
      break;
    case "sunk":
      const shipTiles = computerGrid.querySelectorAll(`.${shipName}`);
      shipTiles.forEach((tile) => {
        tile.classList.add("sunk");
      });
      break;
    default:
      return;
  }
  const gameOver = _gameplay__WEBPACK_IMPORTED_MODULE_1__.default.checkIfGameOver();
  if (gameOver) {
    disableClicks();
    displayGameInfo.textContent = `Game Over! ${gameOver} wins!`;
  } else {
    return computerAttack();
  }
};

const computerAttack = () => {
  const playerBoard = _gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameboards.playerBoard;
  const playerGrid = document.querySelector(".playerGrid");
  const playerGridTiles = playerGrid.querySelectorAll("div");
  let index = _gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.players.computerPlayer.attackBoard(playerBoard);

  const boardReturnInfo = _gameplay__WEBPACK_IMPORTED_MODULE_1__.default.updateBoardInfo(index, playerBoard);

  switch (boardReturnInfo) {
    case "miss":
      playerGridTiles[index].classList.add("miss");
      break;
    case "hit":
      playerGridTiles[index].classList.add("hit");
      break;
    case "sunk":
      const shipName = playerGridTiles[index].classList[2];
      const shipTiles = playerGrid.querySelectorAll(`.${shipName}`);
      shipTiles.forEach((tile) => {
        tile.classList.add("sunk");
      });
      break;
    default:
      return;
  }

  const gameOver = _gameplay__WEBPACK_IMPORTED_MODULE_1__.default.checkIfGameOver();
  if (gameOver) {
    disableClicks();
    displayGameInfo.textContent = `Game Over! ${gameOver} wins!`;
  }
};

const changeGameMode = () => {
  const playerSelectGrid = document.querySelector(".selection-grid");
  const displayGameInfo = document.querySelector(".game-info");
  const computerGrid = document.querySelector(".computerGrid");
  const startBtn = document.querySelector("#start-btn");
  const rotateBtn = document.querySelector("#rotate-btn");
  const randomPlaceBtn = document.querySelector("#random-btn");

  if (_gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameon === false) {
    displayGameInfo.textContent = "Drag and drop your ships to begin!";
    computerGrid.classList.add("hidden");
    startBtn.classList.remove("hidden");
    rotateBtn.classList.remove("hidden");
    randomPlaceBtn.classList.remove("hidden");
    playerSelectGrid.classList.remove("hidden");
  }

  if (_gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameon === true) {
    displayGameInfo.textContent = "Click on an enemy tile to attack!";
    computerGrid.classList.remove("hidden");
    startBtn.classList.add("hidden");
    rotateBtn.classList.add("hidden");
    randomPlaceBtn.classList.add("hidden");
    playerSelectGrid.classList.add("hidden");

    const computerTiles = computerGrid.querySelectorAll("div");
    computerTiles.forEach((tile) => {
      tile.addEventListener("click", playerAttack);
    });
  }
};




/***/ }),

/***/ "./src/dragfunctions.js":
/*!******************************!*\
  !*** ./src/dragfunctions.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameplay */ "./src/gameplay.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



let selectedShipName;
let selectedShipPart;
let selectedShipContainer;

const dragFunctions = {
  addDragListeners() {
    const playerSelectGrid = document.querySelector(".selection-grid");
    const ships = playerSelectGrid.querySelectorAll(".ship");
    const playerGrid = document.querySelector(".playerGrid");
    const playerGridTiles = playerGrid.querySelectorAll("div");

    ships.forEach((ship) =>
      ship.addEventListener("dragstart", dragFunctions.dragStart)
    );
    ships.forEach((ship) =>
      ship.addEventListener("dragend", dragFunctions.dragEnd)
    );
    playerGridTiles.forEach((square) =>
      square.addEventListener("dragstart", dragFunctions.dragStart)
    );
    playerGridTiles.forEach((square) =>
      square.addEventListener("dragover", dragFunctions.dragOver)
    );
    playerGridTiles.forEach((square) =>
      square.addEventListener("dragenter", dragFunctions.dragEnter)
    );
    playerGridTiles.forEach((square) =>
      square.addEventListener("dragleave", dragFunctions.dragLeave)
    );
    playerGridTiles.forEach((square) =>
      square.addEventListener("drop", dragFunctions.dragDrop)
    );
    playerGridTiles.forEach((square) =>
      square.addEventListener("dragend", dragFunctions.dragEnd)
    );

    ships.forEach((ship) => {
      ship.addEventListener("mousedown", (e) => {
        selectedShipName = e.target.id.slice(0, -2);
        selectedShipPart = parseInt(e.target.id.slice(-1));
      });
    });
  },

  dragStart(e) {
    selectedShipContainer = e.target;
    setTimeout(() => {
      selectedShipContainer.classList.add("hide");
    }, 0);
  },

  dragEnter(e) {
    e.preventDefault();
  },

  dragOver(e) {
    e.preventDefault();
  },

  dragLeave(e) {
    e.preventDefault();
  },

  dragEnd(e) {
    e.preventDefault();
    console.log(selectedShipContainer);
    selectedShipContainer.classList.remove("hide");
  },

  dragDrop(e) {
    let adjustedBoardTile;
    const playerBoard = _gameplay__WEBPACK_IMPORTED_MODULE_0__.default.data.gameboards.playerBoard;
    const [ship] = playerBoard.ships.filter((ship) => {
      return ship.name === selectedShipName;
    });

    if (ship.direction === "vertical") {
      adjustedBoardTile = parseInt(e.target.id) - selectedShipPart * 10;
      if (
        !(
          adjustedBoardTile <
          playerBoard.WIDTH * (playerBoard.WIDTH - ship.shipLength + 1)
        )
      )
        return;
    }
    if (ship.direction === "horizontal") {
      adjustedBoardTile = parseInt(e.target.id) - selectedShipPart;
      if (
        !(
          adjustedBoardTile % playerBoard.WIDTH <
          playerBoard.WIDTH - ship.shipLength + 1
        )
      )
        return;
    }
    let coordinatesArr = playerBoard.generateShipCoords(
      adjustedBoardTile,
      ship
    );
    if (playerBoard.checkIfCoordsValid(coordinatesArr)) {
      const playerGrid = document.querySelector(".playerGrid");
      const playerSelectGrid = document.querySelector(".selection-grid");
      playerBoard.addShipToBoard(ship, coordinatesArr);
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderShipsOnBoard)(playerBoard, playerGrid);
      playerSelectGrid.removeChild(selectedShipContainer);
    }
  },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dragFunctions);


/***/ }),

/***/ "./src/gameplay.js":
/*!*************************!*\
  !*** ./src/gameplay.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/board.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");



const gamePlay = {
  data: {
    gameboards: {},
    players: {},
    gameon: false,
  },

  setup() {
    this.data.gameboards.playerBoard = new _board__WEBPACK_IMPORTED_MODULE_0__.default();
    this.data.gameboards.computerBoard = new _board__WEBPACK_IMPORTED_MODULE_0__.default();
    this.data.players.humanPlayer = new _player__WEBPACK_IMPORTED_MODULE_1__.default("Player");
    this.data.players.computerPlayer = new _player__WEBPACK_IMPORTED_MODULE_1__.default("Computer");

    this.data.gameboards.playerBoard.createBoard();
    this.data.gameboards.computerBoard.createBoard();
  },

  addShips() {
    const playerBoard = this.data.gameboards.playerBoard;
    const computerBoard = this.data.gameboards.computerBoard;
    playerBoard.addShip("destroyer", 2);
    playerBoard.addShip("submarine", 3);
    playerBoard.addShip("cruiser", 3);
    playerBoard.addShip("battleship", 4);
    playerBoard.addShip("carrier", 5);

    computerBoard.addShip("destroyer", 2);
    computerBoard.addShip("submarine", 3);
    computerBoard.addShip("cruiser", 3);
    computerBoard.addShip("battleship", 4);
    computerBoard.addShip("carrier", 5);

    computerBoard.randomShipsDirection();
    computerBoard.placeRandomShip(computerBoard.ships);
  },

  resetBoardAndShips() {
    const playerBoard = this.data.gameboards.playerBoard;
    const computerBoard = this.data.gameboards.computerBoard;

    playerBoard.board.forEach((obj, index) => {
      if (obj !== null) {
        playerBoard.board[index] = null;
      }
    });

    computerBoard.board.forEach((obj, index) => {
      if (obj !== null) {
        computerBoard.board[index] = null;
      }
    });
    playerBoard.ships = [];
    computerBoard.ships = [];
    this.addShips();
  },

  updateBoardInfo(index, gameboard) {
    let boardReturnInfo;

    if (gameboard.board[index] !== null) {
      const shipName = gameboard.board[index].id;
      gameboard.board[index].status = "hit";
      boardReturnInfo = "hit";
      const [ship] = gameboard.ships.filter((ship) => shipName === ship.name);
      ship.hit(index);
      ship.isSunk();
      if (ship.sunk === true) {
        gameboard.board.forEach((tile) => {
          if (tile === null) return;
          if (tile.id === shipName) {
            tile.status = "sunk";
          }
        });
        boardReturnInfo = "sunk";
      }
    } else {
      gameboard.board[index] = { status: "miss" };
      boardReturnInfo = "miss";
    }
    return boardReturnInfo;
  },

  checkIfGameOver() {
    if (
      this.data.gameboards.playerBoard.ships.every((ship) => ship.sunk === true)
    ) {
      return `${this.data.players.computerPlayer.name}`;
    }
    if (
      this.data.gameboards.computerBoard.ships.every(
        (ship) => ship.sunk === true
      )
    ) {
      return `${this.data.players.humanPlayer.name}`;
    }
    return false;
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gamePlay);


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Player {
    constructor(name){
        this.name = name;
    }

    randomAttackValidSpots(gameboard) {
        let possibleSpots = []
         gameboard.board.forEach((tile, index)=>{
            if(tile === null || !tile.hasOwnProperty('status')) possibleSpots.push(index)
        })
        console.log(possibleSpots)
        const randomSpot = possibleSpots[Math.floor(Math.random() * possibleSpots.length)]
        console.log(randomSpot)
        return randomSpot
    }

    checkForHits(gameboard){
        const hitsArr = []
        gameboard.board.forEach(index=>{
           if(index === null) return
           else if(index.status === 'hit') {
               hitsArr.push(gameboard.board.indexOf(index))}})
        return hitsArr
    }

    //check for surrounding tiles
    checkForSurroundingTiles(index, gameboard){
        let surroundingTiles = []
        const topTile = +index - 10
        const bottomTile = +index + 10
        const leftTile = +index - 1
        const rightTile = +index + 1
        surroundingTiles.push(topTile,bottomTile, leftTile, rightTile )
        return this.checkForValidTiles(index,surroundingTiles, gameboard)
    }

    checkForValidTiles(index, surroundingTiles, gameboard){
        //if left border
        if(index % 10 === 0) surroundingTiles.splice(2, 1)
        //if right border
        if(index % 10 === 9) surroundingTiles.splice(3, 1)
        //if surrounding tiles are out of range
        surroundingTiles = surroundingTiles.filter(tile=>{
            return tile >= 0 && tile <=  99
        })  
  
        surroundingTiles = surroundingTiles.filter(tile=>{
            if(gameboard.board[tile] === null || !gameboard.board[tile].hasOwnProperty('status')) return true;
        })
        return surroundingTiles
    }

    checkForPossibleShipDirection(hitsArr, gameboard){
        let possibleShipDirection
        const min = Math.min(...hitsArr)
        const max = Math.max(...hitsArr)
        if(Math.abs(hitsArr[0] - hitsArr[1]) === 10) possibleShipDirection = 'vertical'
        if(Math.abs(hitsArr[0] - hitsArr[1]) === 1) possibleShipDirection = 'horizontal'

        if(possibleShipDirection === 'vertical' && this.checkForValidTiles(min, [min - 10, max + 10], gameboard).length === 0) {
        console.log('YESSSSSSSS')
        possibleShipDirection = 'horizontal'}

        if(possibleShipDirection === 'horizontal' && this.checkForValidTiles(min, [min - 1, max + 1], gameboard).length === 0){
        console.log('NOOOOOO')
        possibleShipDirection = 'vertical'}
        console.log(possibleShipDirection)
        return possibleShipDirection
    }

    attackShipDirection(hitsArr, direction, gameboard){
        let bestAttackSpot
        const min = Math.min(...hitsArr)
        const max = Math.max(...hitsArr)

        if(direction === 'vertical'){
            if(this.checkForValidTiles(min, [min - 10], gameboard).length) bestAttackSpot = min - 10
            else if(this.checkForValidTiles(max, [max + 10], gameboard).length)bestAttackSpot = max + 10
        }
        if(direction === 'horizontal'){
            if(this.checkForValidTiles(min, [min - 1], gameboard).length)
                bestAttackSpot = min - 1
            else if(this.checkForValidTiles(max, [max + 1], gameboard).length) bestAttackSpot = max + 1
        }
        console.log(bestAttackSpot)
        return bestAttackSpot
    }    

    attackBoard(gameboard){
        let bestAttackSpot
        const hitsArr = this.checkForHits(gameboard)
        if(!hitsArr.length){
            console.log('NOOOOOOOOOOOO')
            bestAttackSpot = this.randomAttackValidSpots(gameboard)
        }
        if(hitsArr.length === 1){
            console.log('NOOOOOOOOOOOO????????')
            const surroundingTiles = this.checkForSurroundingTiles([hitsArr], gameboard)
            bestAttackSpot = surroundingTiles[0]
        }
        if(hitsArr.length > 1){
            console.log('NOOOOOOOOOOOO????????!!!!!!!!!!!')
            const possibleShipDirection = this.checkForPossibleShipDirection(hitsArr, gameboard)

            bestAttackSpot = this.attackShipDirection(hitsArr, possibleShipDirection, gameboard)
        }
        console.log(bestAttackSpot)
        return bestAttackSpot
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);











/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Ship {
    constructor(name, shipLength, direction = "vertical") {
      this.name = name;
      this.direction = direction;
      this.shipLength = shipLength;
      this.coords = [];
      this.sunk = false;
    }

    isSunk() {
      if (this.coords.length === this.shipLength) this.sunk = true;
    }

    hit(index){
      if(this.coords.includes(index)) return;
      this.coords.push(index)
    }

    randomDirection() {
        const randomDirection = Math.floor(Math.random() * 2);
        if (randomDirection === 0) this.direction = "horizontal";
        if (randomDirection === 1) this.direction = "vertical";
      }
  }

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameplay */ "./src/gameplay.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");




_gameplay__WEBPACK_IMPORTED_MODULE_0__.default.setup()
_gameplay__WEBPACK_IMPORTED_MODULE_0__.default.addShips()
;(0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderAll)()

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZHJhZ2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQiwwQ0FBSTtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvR3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLGlFQUFlLEk7Ozs7OztVQ3pCakI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTmlDO0FBQ0E7OztBQUdqQyxvREFBYztBQUNkLHVEQUFpQjtBQUNqQixnREFBUyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xyXG5cclxuY2xhc3MgR2FtZWJvYXJkIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICB0aGlzLmJvYXJkID0gW11cclxuICAgICAgdGhpcy5zaGlwcyA9IFtdO1xyXG4gICAgICB0aGlzLldJRFRIID0gMTA7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBjcmVhdGVCb2FyZCgpe1xyXG4gICAgICB0aGlzLmJvYXJkID0gbmV3IEFycmF5KDEwMCkuZmlsbChudWxsKVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFNoaXAobmFtZSwgbGVuZ3RoKXtcclxuICAgICAgdGhpcy5zaGlwcy5wdXNoKG5ldyBTaGlwKG5hbWUsIGxlbmd0aCkpXHJcbiAgICAgIH1cclxuXHJcbiAgICBhZGRTaGlwVG9Cb2FyZChzaGlwLCBjb29yZGluYXRlc0Fycil7XHJcbiAgICAgICAgY29vcmRpbmF0ZXNBcnIuZm9yRWFjaChjb29yZGluYXRlPT57XHJcbiAgICAgICAgICB0aGlzLmJvYXJkW2Nvb3JkaW5hdGVdID0ge1xyXG4gICAgICAgICAgICBpZDogc2hpcC5uYW1lfVxyXG4gICAgICB9KX1cclxuICAgIFxyXG4gICAgLy9nZW5lcmF0ZSBhIHZhbGlkIHJhbmRvbSBzcG90IGJhc2VkIG9uIHNoaXAgZGlyZWN0aW9uIGFuZCBsZW5ndGhcclxuICAgIGdlbmVyYXRlUmFuZG9tQ29vcmRzKHNoaXApIHtcclxuICAgICAgbGV0IHJhbmRvbVNwb3QgPSB0aGlzLmdlbmVyYXRlUmFuZG9tTnVtYmVyKClcclxuICBcclxuICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgIHJldHVybiByYW5kb21TcG90ICUgdGhpcy5XSURUSCA8IHRoaXMuV0lEVEggLSBzaGlwLnNoaXBMZW5ndGggKyAxXHJcbiAgICAgICAgICA/IHJhbmRvbVNwb3RcclxuICAgICAgICAgIDogdGhpcy5nZW5lcmF0ZVJhbmRvbUNvb3JkcyhzaGlwKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xyXG4gICAgICAgIHJldHVybiByYW5kb21TcG90IDwgdGhpcy5XSURUSCAqICh0aGlzLldJRFRIIC0gc2hpcC5zaGlwTGVuZ3RoICsgMSlcclxuICAgICAgICAgID8gcmFuZG9tU3BvdFxyXG4gICAgICAgICAgOiB0aGlzLmdlbmVyYXRlUmFuZG9tQ29vcmRzKHNoaXApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9yZXR1cm5zIGEgbnVtYmVyIGZyb20gMC05OVxyXG4gICAgZ2VuZXJhdGVSYW5kb21OdW1iZXIoKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLldJRFRIICogdGhpcy5XSURUSCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9nZW5lcmF0ZXMgYW4gYXJyYXkgb2YgY29vcmRpbmF0ZXMgYmFzZWQgb24gc2hpcCBkaXJlY3Rpb24gYW5kIGxlbmd0aFxyXG4gICAgZ2VuZXJhdGVTaGlwQ29vcmRzKGNvb3JkLCBzaGlwKXtcclxuICAgICAgbGV0IGNvb3JkaW5hdGVzQXJyID0gW11cclxuICAgICAgXHJcbiAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBsZXQgaW5kZXggPSBjb29yZCArIGk7XHJcbiAgICAgICAgICBjb29yZGluYXRlc0Fyci5wdXNoKGluZGV4KTtcclxuICAgICAgICB9fVxyXG4gICAgICBcclxuICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBsZXQgaW5kZXggPSBjb29yZCArIDEwICogaTtcclxuICAgICAgICAgIGNvb3JkaW5hdGVzQXJyLnB1c2goaW5kZXgpO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgcmV0dXJuIGNvb3JkaW5hdGVzQXJyXHJcbiAgICB9XHJcblxyXG4gICAgLy9jaGVjayBpZiBib2FyZCBzcGFjZSBpcyB0YWtlblxyXG4gICAgY2hlY2tJZkNvb3Jkc1ZhbGlkKGNvb3JkaW5hdGVzQXJyKXtcclxuICAgICAgaWYgKGNvb3JkaW5hdGVzQXJyLnNvbWUoKGNvb3JkKT0+XHJcbiAgICAgICAgdGhpcy5ib2FyZFtjb29yZF0gIT09IG51bGwpKSB7cmV0dXJuIGZhbHNlO31cclxuICAgICAgICBlbHNle3JldHVybiB0cnVlO31cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL2dlbmVyYXRlIHZhbGlkIHNoaXAgY29vcmRzIGFuZCBhZGQgdGhlbSBpbnRvIGJvYXJkIGFycmF5XHJcbiAgICBnZW5lcmF0ZVJhbmRvbVNoaXBDb29yZHMoc2hpcCl7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZW5lcmF0ZVJhbmRvbUNvb3JkcyhzaGlwKVxyXG4gICAgICAgIGxldCBjb29yZGluYXRlc0FyciA9IHRoaXMuZ2VuZXJhdGVTaGlwQ29vcmRzKGluZGV4LCBzaGlwKVxyXG4gICAgICAgIGxldCB2YWxpZENvb3JkcyA9IHRoaXMuY2hlY2tJZkNvb3Jkc1ZhbGlkKGNvb3JkaW5hdGVzQXJyKVxyXG4gICAgICAgIGlmKHZhbGlkQ29vcmRzID09PSB0cnVlKXtcclxuICAgICAgICAgICB0aGlzLmFkZFNoaXBUb0JvYXJkKHNoaXAsIGNvb3JkaW5hdGVzQXJyKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgdGhpcy5nZW5lcmF0ZVJhbmRvbVNoaXBDb29yZHMoc2hpcClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGxhY2VSYW5kb21TaGlwKGFycil7XHJcbiAgICAgIGFyci5mb3JFYWNoKHNoaXA9PntcclxuICAgICAgICB0aGlzLmdlbmVyYXRlUmFuZG9tU2hpcENvb3JkcyhzaGlwKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJhbmRvbVNoaXBzRGlyZWN0aW9uKCl7XHJcbiAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwPT57XHJcbiAgICAgICAgc2hpcC5yYW5kb21EaXJlY3Rpb24oKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkIiwiaW1wb3J0IGRyYWdGdW5jdGlvbnMgZnJvbSBcIi4vZHJhZ2Z1bmN0aW9uc1wiO1xyXG5pbXBvcnQgZ2FtZVBsYXkgZnJvbSBcIi4vZ2FtZXBsYXlcIjtcclxuXHJcbmNvbnN0IHJlbmRlckJvYXJkID0gKGdhbWVCb2FyZCwgZGlzcGxheUdhbWVCb2FyZCkgPT4ge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDw9IGdhbWVCb2FyZC5ib2FyZC5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgdGlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0aWxlLmNsYXNzTGlzdC5hZGQoXCJ0aWxlXCIpO1xyXG4gICAgdGlsZS5pZCA9IGk7XHJcbiAgICBkaXNwbGF5R2FtZUJvYXJkLmFwcGVuZENoaWxkKHRpbGUpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHJlbmRlclNoaXBzT25Cb2FyZCA9IChnYW1lQm9hcmQsIGRpc3BsYXlHYW1lQm9hcmQpID0+IHtcclxuICBnYW1lQm9hcmQuYm9hcmQuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgIGlmIChlbGVtZW50ICE9PSBudWxsKSB7XHJcbiAgICAgIGRpc3BsYXlHYW1lQm9hcmQuY2hpbGROb2Rlc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcclxuICAgICAgICBcInRha2VuXCIsXHJcbiAgICAgICAgYCR7ZWxlbWVudC5pZH1gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCByZW5kZXJTZWxlY3Rpb25HcmlkID0gKHNoaXBzQXJyKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyU2VsZWN0R3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLWdyaWRcIik7XHJcbiAgc2hpcHNBcnIuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgbGV0IHNoaXBFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHNoaXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIsIGAke3NoaXAubmFtZX1gKTtcclxuICAgIHNoaXBFbGVtZW50LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCB0cnVlKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaGlwTGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IHRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICB0aWxlLmlkID0gYCR7c2hpcC5uYW1lfS0ke2l9YDtcclxuICAgICAgc2hpcEVsZW1lbnQuYXBwZW5kQ2hpbGQodGlsZSk7XHJcbiAgICAgIHBsYXllclNlbGVjdEdyaWQuYXBwZW5kQ2hpbGQoc2hpcEVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3Qgcm90YXRlUGxheWVyU2hpcHMgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb3RhdGUtYnRuXCIpO1xyXG4gIGNvbnN0IHBsYXllclNlbGVjdEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGlvbi1ncmlkXCIpO1xyXG4gIGNvbnN0IHNoaXBzID0gcGxheWVyU2VsZWN0R3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBcIik7XHJcbiAgcGxheWVyU2VsZWN0R3JpZC5jbGFzc0xpc3QudG9nZ2xlKFwiaG9yaXpvbnRhbFwiKTtcclxuICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICBjb25zdCBzaGlwTmFtZSA9IHNoaXAuZmlyc3RDaGlsZC5pZC5zbGljZSgwLCAtMik7XHJcbiAgICBzaGlwLmNsYXNzTGlzdC50b2dnbGUoYCR7c2hpcE5hbWV9LWhvcml6b250YWxgKTtcclxuICAgIHNoaXAuY2xhc3NMaXN0LnRvZ2dsZShgJHtzaGlwTmFtZX1gKTtcclxuICAgIGdhbWVQbGF5LmRhdGEuZ2FtZWJvYXJkcy5wbGF5ZXJCb2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIGlmIChzaGlwLm5hbWUgPT09IHNoaXBOYW1lKSB7XHJcbiAgICAgICAgc2hpcC5kaXJlY3Rpb24gPT09IFwidmVydGljYWxcIlxyXG4gICAgICAgICAgPyAoc2hpcC5kaXJlY3Rpb24gPSBcImhvcml6b250YWxcIilcclxuICAgICAgICAgIDogKHNoaXAuZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBjbGVhckNvbnRhaW5lciA9IChjb250YWluZXIpID0+IHtcclxuICB3aGlsZSAoY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcclxuICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChjb250YWluZXIuZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbWVzc2FnZSA9IChtZXNzYWdlKSA9PiB7XHJcbiAgY29uc3QgZGlzcGxheUdhbWVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWluZm9cIik7XHJcbiAgZGlzcGxheUdhbWVJbmZvLnRleHRDb250ZW50ID0gbWVzc2FnZTtcclxufTtcclxuXHJcbmNvbnN0IGFwcGx5U2VsZWN0b3JzQW5kTGlzdGVuZXJzID0gKCkgPT4ge1xyXG4gIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGFydC1idG5cIik7XHJcbiAgY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb3RhdGUtYnRuXCIpO1xyXG4gIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZXNldC1idG5cIik7XHJcbiAgY29uc3QgcmFuZG9tUGxhY2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JhbmRvbS1idG5cIik7XHJcbiAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByb3RhdGVQbGF5ZXJTaGlwcyk7XHJcbiAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0R2FtZSk7XHJcbiAgcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlc2V0R2FtZSk7XHJcbiAgcmFuZG9tUGxhY2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJhbmRvbVBsYWNlUGxheWVyU2hpcHMpO1xyXG59O1xyXG5cclxuY29uc3QgcmVuZGVyQWxsID0gKCkgPT4ge1xyXG4gIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckdyaWRcIik7XHJcbiAgY29uc3QgY29tcHV0ZXJHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlckdyaWRcIik7XHJcbiAgY29uc3QgZGlzcGxheUdhbWVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWluZm9cIik7XHJcblxyXG4gIGFwcGx5U2VsZWN0b3JzQW5kTGlzdGVuZXJzKCk7XHJcbiAgcmVuZGVyQm9hcmQoZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkLCBwbGF5ZXJHcmlkKTtcclxuICByZW5kZXJCb2FyZChnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMuY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJHcmlkKTtcclxuICByZW5kZXJTaGlwc09uQm9hcmQoZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLmNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyR3JpZCk7XHJcbiAgcmVuZGVyU2VsZWN0aW9uR3JpZChnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQuc2hpcHMpO1xyXG4gIGRyYWdGdW5jdGlvbnMuYWRkRHJhZ0xpc3RlbmVycygpO1xyXG5cclxuICBtZXNzYWdlKFwiRHJhZyBhbmQgZHJvcCB5b3VyIHNoaXBzIHRvIGJlZ2luIVwiKTtcclxufTtcclxuXHJcbmNvbnN0IHJhbmRvbVBsYWNlUGxheWVyU2hpcHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyR3JpZFwiKTtcclxuICBjb25zdCBwbGF5ZXJTZWxlY3RHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3Rpb24tZ3JpZFwiKTtcclxuICBjb25zdCB0YWtlblRpbGVzID0gcGxheWVyR3JpZC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGFrZW5cIik7XHJcbiAgaWYgKHRha2VuVGlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgbWVzc2FnZShcIlBsZWFzZSByZXNldCB0aGUgYm9hcmQgYmVmb3JlIHlvdSBtYXkgcmFuZG9tbHkgcGxhY2Ugc2hpcHNcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNsZWFyQ29udGFpbmVyKHBsYXllclNlbGVjdEdyaWQpO1xyXG4gIGdhbWVQbGF5LmRhdGEuZ2FtZWJvYXJkcy5wbGF5ZXJCb2FyZC5yYW5kb21TaGlwc0RpcmVjdGlvbigpO1xyXG4gIGdhbWVQbGF5LmRhdGEuZ2FtZWJvYXJkcy5wbGF5ZXJCb2FyZC5wbGFjZVJhbmRvbVNoaXAoXHJcbiAgICBnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQuc2hpcHNcclxuICApO1xyXG4gIHJlbmRlclNoaXBzT25Cb2FyZChnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQsIHBsYXllckdyaWQpO1xyXG4gIG1lc3NhZ2UoXCJBbGwgc2hpcHMgZGVwbG95ZWQhIENsaWNrIFN0YXJ0IEdhbWUgdG8gcGxheSFcIik7XHJcbn07XHJcblxyXG5jb25zdCByZXNldEdhbWUgPSAoKSA9PiB7XHJcbiAgY29uc3QgY29tcHV0ZXJHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlckdyaWRcIik7XHJcbiAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyR3JpZFwiKTtcclxuICBjb25zdCBwbGF5ZXJTZWxlY3RHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3Rpb24tZ3JpZFwiKTtcclxuXHJcbiAgcGxheWVyU2VsZWN0R3JpZC5jbGFzc0xpc3QucmVtb3ZlKFwiaG9yaXpvbnRhbFwiKTtcclxuICBjbGVhckNvbnRhaW5lcihwbGF5ZXJHcmlkKTtcclxuICBjbGVhckNvbnRhaW5lcihjb21wdXRlckdyaWQpO1xyXG4gIGNsZWFyQ29udGFpbmVyKHBsYXllclNlbGVjdEdyaWQpO1xyXG4gIGdhbWVQbGF5LmRhdGEuZ2FtZW9uID0gZmFsc2U7XHJcbiAgZ2FtZVBsYXkucmVzZXRCb2FyZEFuZFNoaXBzKCk7XHJcbiAgcmVuZGVyQWxsKCk7XHJcbiAgY2hhbmdlR2FtZU1vZGUoKTtcclxuICBhcHBseVNlbGVjdG9yc0FuZExpc3RlbmVycygpO1xyXG59O1xyXG5cclxuY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xyXG4gIGNvbnN0IHBsYXllclNlbGVjdEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGlvbi1ncmlkXCIpO1xyXG4gIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXBcIik7XHJcbiAgaWYgKHBsYXllclNlbGVjdEdyaWQuY29udGFpbnMoc2hpcCkpIHtcclxuICAgIG1lc3NhZ2UoXCJQbGVhc2UgZGVwbG95IGFsbCBzaGlwcyB0byBzdGFydCBnYW1lXCIpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBnYW1lUGxheS5kYXRhLmdhbWVvbiA9IHRydWU7XHJcbiAgY2hhbmdlR2FtZU1vZGUoKTtcclxufTtcclxuXHJcbmNvbnN0IGRpc2FibGVDbGlja3MgPSAoKSA9PiB7XHJcbiAgY29uc3QgY29tcHV0ZXJHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlckdyaWRcIik7XHJcbiAgY29uc3QgY29tcHV0ZXJUaWxlcyA9IGNvbXB1dGVyR3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2XCIpO1xyXG4gIGNvbXB1dGVyVGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xyXG4gICAgY29uc3QgbmV3VGlsZSA9IHRpbGUuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgdGlsZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdUaWxlLCB0aWxlKTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHBsYXllckF0dGFjayA9IChlKSA9PiB7XHJcbiAgY29uc3QgY29tcHV0ZXJHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlckdyaWRcIik7XHJcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGdhbWVQbGF5LmRhdGEuZ2FtZWJvYXJkcy5jb21wdXRlckJvYXJkO1xyXG4gIGNvbnN0IGRpc3BsYXlHYW1lSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1pbmZvXCIpO1xyXG4gIGxldCBpbmRleCA9IGUudGFyZ2V0LmlkO1xyXG4gIC8vICAgY29uc3QgY2xhc3NlcyA9IFsnaGl0JywgJ21pc3MnLCAnc3VuayddXHJcbiAgaWYgKFxyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpIHx8XHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtaXNzXCIpIHx8XHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzdW5rXCIpXHJcbiAgKVxyXG4gICAgcmV0dXJuO1xyXG5cclxuICBjb25zdCBzaGlwTmFtZSA9IGUudGFyZ2V0LmNsYXNzTGlzdFsyXTtcclxuICBjb25zdCBib2FyZFJldHVybkluZm8gPSBnYW1lUGxheS51cGRhdGVCb2FyZEluZm8oaW5kZXgsIGNvbXB1dGVyQm9hcmQpO1xyXG5cclxuICBzd2l0Y2ggKGJvYXJkUmV0dXJuSW5mbykge1xyXG4gICAgY2FzZSBcIm1pc3NcIjpcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImhpdFwiOlxyXG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJzdW5rXCI6XHJcbiAgICAgIGNvbnN0IHNoaXBUaWxlcyA9IGNvbXB1dGVyR3JpZC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtzaGlwTmFtZX1gKTtcclxuICAgICAgc2hpcFRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcclxuICAgICAgICB0aWxlLmNsYXNzTGlzdC5hZGQoXCJzdW5rXCIpO1xyXG4gICAgICB9KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IGdhbWVPdmVyID0gZ2FtZVBsYXkuY2hlY2tJZkdhbWVPdmVyKCk7XHJcbiAgaWYgKGdhbWVPdmVyKSB7XHJcbiAgICBkaXNhYmxlQ2xpY2tzKCk7XHJcbiAgICBkaXNwbGF5R2FtZUluZm8udGV4dENvbnRlbnQgPSBgR2FtZSBPdmVyISAke2dhbWVPdmVyfSB3aW5zIWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBjb21wdXRlckF0dGFjaygpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGNvbXB1dGVyQXR0YWNrID0gKCkgPT4ge1xyXG4gIGNvbnN0IHBsYXllckJvYXJkID0gZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkO1xyXG4gIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckdyaWRcIik7XHJcbiAgY29uc3QgcGxheWVyR3JpZFRpbGVzID0gcGxheWVyR3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2XCIpO1xyXG4gIGxldCBpbmRleCA9IGdhbWVQbGF5LmRhdGEucGxheWVycy5jb21wdXRlclBsYXllci5hdHRhY2tCb2FyZChwbGF5ZXJCb2FyZCk7XHJcblxyXG4gIGNvbnN0IGJvYXJkUmV0dXJuSW5mbyA9IGdhbWVQbGF5LnVwZGF0ZUJvYXJkSW5mbyhpbmRleCwgcGxheWVyQm9hcmQpO1xyXG5cclxuICBzd2l0Y2ggKGJvYXJkUmV0dXJuSW5mbykge1xyXG4gICAgY2FzZSBcIm1pc3NcIjpcclxuICAgICAgcGxheWVyR3JpZFRpbGVzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiaGl0XCI6XHJcbiAgICAgIHBsYXllckdyaWRUaWxlc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwic3Vua1wiOlxyXG4gICAgICBjb25zdCBzaGlwTmFtZSA9IHBsYXllckdyaWRUaWxlc1tpbmRleF0uY2xhc3NMaXN0WzJdO1xyXG4gICAgICBjb25zdCBzaGlwVGlsZXMgPSBwbGF5ZXJHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3NoaXBOYW1lfWApO1xyXG4gICAgICBzaGlwVGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xyXG4gICAgICAgIHRpbGUuY2xhc3NMaXN0LmFkZChcInN1bmtcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdhbWVPdmVyID0gZ2FtZVBsYXkuY2hlY2tJZkdhbWVPdmVyKCk7XHJcbiAgaWYgKGdhbWVPdmVyKSB7XHJcbiAgICBkaXNhYmxlQ2xpY2tzKCk7XHJcbiAgICBkaXNwbGF5R2FtZUluZm8udGV4dENvbnRlbnQgPSBgR2FtZSBPdmVyISAke2dhbWVPdmVyfSB3aW5zIWA7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgY2hhbmdlR2FtZU1vZGUgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyU2VsZWN0R3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLWdyaWRcIik7XHJcbiAgY29uc3QgZGlzcGxheUdhbWVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWluZm9cIik7XHJcbiAgY29uc3QgY29tcHV0ZXJHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlckdyaWRcIik7XHJcbiAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0LWJ0blwiKTtcclxuICBjb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvdGF0ZS1idG5cIik7XHJcbiAgY29uc3QgcmFuZG9tUGxhY2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JhbmRvbS1idG5cIik7XHJcblxyXG4gIGlmIChnYW1lUGxheS5kYXRhLmdhbWVvbiA9PT0gZmFsc2UpIHtcclxuICAgIGRpc3BsYXlHYW1lSW5mby50ZXh0Q29udGVudCA9IFwiRHJhZyBhbmQgZHJvcCB5b3VyIHNoaXBzIHRvIGJlZ2luIVwiO1xyXG4gICAgY29tcHV0ZXJHcmlkLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICBzdGFydEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgcm90YXRlQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICByYW5kb21QbGFjZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgcGxheWVyU2VsZWN0R3JpZC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGdhbWVQbGF5LmRhdGEuZ2FtZW9uID09PSB0cnVlKSB7XHJcbiAgICBkaXNwbGF5R2FtZUluZm8udGV4dENvbnRlbnQgPSBcIkNsaWNrIG9uIGFuIGVuZW15IHRpbGUgdG8gYXR0YWNrIVwiO1xyXG4gICAgY29tcHV0ZXJHcmlkLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICBzdGFydEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgcm90YXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICByYW5kb21QbGFjZUJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgcGxheWVyU2VsZWN0R3JpZC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG5cclxuICAgIGNvbnN0IGNvbXB1dGVyVGlsZXMgPSBjb21wdXRlckdyaWQucXVlcnlTZWxlY3RvckFsbChcImRpdlwiKTtcclxuICAgIGNvbXB1dGVyVGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xyXG4gICAgICB0aWxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5ZXJBdHRhY2spO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHsgcmVuZGVyQWxsLCByZW5kZXJTaGlwc09uQm9hcmQgfTtcclxuIiwiaW1wb3J0IGdhbWVQbGF5LCB7IGRhdGEgfSBmcm9tIFwiLi9nYW1lcGxheVwiO1xyXG5pbXBvcnQgeyByZW5kZXJTaGlwc09uQm9hcmQgfSBmcm9tIFwiLi9kb21cIjtcclxuXHJcbmxldCBzZWxlY3RlZFNoaXBOYW1lO1xyXG5sZXQgc2VsZWN0ZWRTaGlwUGFydDtcclxubGV0IHNlbGVjdGVkU2hpcENvbnRhaW5lcjtcclxuXHJcbmNvbnN0IGRyYWdGdW5jdGlvbnMgPSB7XHJcbiAgYWRkRHJhZ0xpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IHBsYXllclNlbGVjdEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGlvbi1ncmlkXCIpO1xyXG4gICAgY29uc3Qgc2hpcHMgPSBwbGF5ZXJTZWxlY3RHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcclxuICAgIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckdyaWRcIik7XHJcbiAgICBjb25zdCBwbGF5ZXJHcmlkVGlsZXMgPSBwbGF5ZXJHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXZcIik7XHJcblxyXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT5cclxuICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWdGdW5jdGlvbnMuZHJhZ1N0YXJ0KVxyXG4gICAgKTtcclxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+XHJcbiAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ0Z1bmN0aW9ucy5kcmFnRW5kKVxyXG4gICAgKTtcclxuICAgIHBsYXllckdyaWRUaWxlcy5mb3JFYWNoKChzcXVhcmUpID0+XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWdGdW5jdGlvbnMuZHJhZ1N0YXJ0KVxyXG4gICAgKTtcclxuICAgIHBsYXllckdyaWRUaWxlcy5mb3JFYWNoKChzcXVhcmUpID0+XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZHJhZ0Z1bmN0aW9ucy5kcmFnT3ZlcilcclxuICAgICk7XHJcbiAgICBwbGF5ZXJHcmlkVGlsZXMuZm9yRWFjaCgoc3F1YXJlKSA9PlxyXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCBkcmFnRnVuY3Rpb25zLmRyYWdFbnRlcilcclxuICAgICk7XHJcbiAgICBwbGF5ZXJHcmlkVGlsZXMuZm9yRWFjaCgoc3F1YXJlKSA9PlxyXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCBkcmFnRnVuY3Rpb25zLmRyYWdMZWF2ZSlcclxuICAgICk7XHJcbiAgICBwbGF5ZXJHcmlkVGlsZXMuZm9yRWFjaCgoc3F1YXJlKSA9PlxyXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJhZ0Z1bmN0aW9ucy5kcmFnRHJvcClcclxuICAgICk7XHJcbiAgICBwbGF5ZXJHcmlkVGlsZXMuZm9yRWFjaCgoc3F1YXJlKSA9PlxyXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ0Z1bmN0aW9ucy5kcmFnRW5kKVxyXG4gICAgKTtcclxuXHJcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xyXG4gICAgICAgIHNlbGVjdGVkU2hpcE5hbWUgPSBlLnRhcmdldC5pZC5zbGljZSgwLCAtMik7XHJcbiAgICAgICAgc2VsZWN0ZWRTaGlwUGFydCA9IHBhcnNlSW50KGUudGFyZ2V0LmlkLnNsaWNlKC0xKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgZHJhZ1N0YXJ0KGUpIHtcclxuICAgIHNlbGVjdGVkU2hpcENvbnRhaW5lciA9IGUudGFyZ2V0O1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHNlbGVjdGVkU2hpcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuICAgIH0sIDApO1xyXG4gIH0sXHJcblxyXG4gIGRyYWdFbnRlcihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgZHJhZ092ZXIoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIGRyYWdMZWF2ZShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgZHJhZ0VuZChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zb2xlLmxvZyhzZWxlY3RlZFNoaXBDb250YWluZXIpO1xyXG4gICAgc2VsZWN0ZWRTaGlwQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xyXG4gIH0sXHJcblxyXG4gIGRyYWdEcm9wKGUpIHtcclxuICAgIGxldCBhZGp1c3RlZEJvYXJkVGlsZTtcclxuICAgIGNvbnN0IHBsYXllckJvYXJkID0gZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkO1xyXG4gICAgY29uc3QgW3NoaXBdID0gcGxheWVyQm9hcmQuc2hpcHMuZmlsdGVyKChzaGlwKSA9PiB7XHJcbiAgICAgIHJldHVybiBzaGlwLm5hbWUgPT09IHNlbGVjdGVkU2hpcE5hbWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xyXG4gICAgICBhZGp1c3RlZEJvYXJkVGlsZSA9IHBhcnNlSW50KGUudGFyZ2V0LmlkKSAtIHNlbGVjdGVkU2hpcFBhcnQgKiAxMDtcclxuICAgICAgaWYgKFxyXG4gICAgICAgICEoXHJcbiAgICAgICAgICBhZGp1c3RlZEJvYXJkVGlsZSA8XHJcbiAgICAgICAgICBwbGF5ZXJCb2FyZC5XSURUSCAqIChwbGF5ZXJCb2FyZC5XSURUSCAtIHNoaXAuc2hpcExlbmd0aCArIDEpXHJcbiAgICAgICAgKVxyXG4gICAgICApXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICBhZGp1c3RlZEJvYXJkVGlsZSA9IHBhcnNlSW50KGUudGFyZ2V0LmlkKSAtIHNlbGVjdGVkU2hpcFBhcnQ7XHJcbiAgICAgIGlmIChcclxuICAgICAgICAhKFxyXG4gICAgICAgICAgYWRqdXN0ZWRCb2FyZFRpbGUgJSBwbGF5ZXJCb2FyZC5XSURUSCA8XHJcbiAgICAgICAgICBwbGF5ZXJCb2FyZC5XSURUSCAtIHNoaXAuc2hpcExlbmd0aCArIDFcclxuICAgICAgICApXHJcbiAgICAgIClcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgY29vcmRpbmF0ZXNBcnIgPSBwbGF5ZXJCb2FyZC5nZW5lcmF0ZVNoaXBDb29yZHMoXHJcbiAgICAgIGFkanVzdGVkQm9hcmRUaWxlLFxyXG4gICAgICBzaGlwXHJcbiAgICApO1xyXG4gICAgaWYgKHBsYXllckJvYXJkLmNoZWNrSWZDb29yZHNWYWxpZChjb29yZGluYXRlc0FycikpIHtcclxuICAgICAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyR3JpZFwiKTtcclxuICAgICAgY29uc3QgcGxheWVyU2VsZWN0R3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLWdyaWRcIik7XHJcbiAgICAgIHBsYXllckJvYXJkLmFkZFNoaXBUb0JvYXJkKHNoaXAsIGNvb3JkaW5hdGVzQXJyKTtcclxuICAgICAgcmVuZGVyU2hpcHNPbkJvYXJkKHBsYXllckJvYXJkLCBwbGF5ZXJHcmlkKTtcclxuICAgICAgcGxheWVyU2VsZWN0R3JpZC5yZW1vdmVDaGlsZChzZWxlY3RlZFNoaXBDb250YWluZXIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGRyYWdGdW5jdGlvbnM7XHJcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vYm9hcmRcIjtcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcclxuXHJcbmNvbnN0IGdhbWVQbGF5ID0ge1xyXG4gIGRhdGE6IHtcclxuICAgIGdhbWVib2FyZHM6IHt9LFxyXG4gICAgcGxheWVyczoge30sXHJcbiAgICBnYW1lb246IGZhbHNlLFxyXG4gIH0sXHJcblxyXG4gIHNldHVwKCkge1xyXG4gICAgdGhpcy5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgICB0aGlzLmRhdGEuZ2FtZWJvYXJkcy5jb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy5kYXRhLnBsYXllcnMuaHVtYW5QbGF5ZXIgPSBuZXcgUGxheWVyKFwiUGxheWVyXCIpO1xyXG4gICAgdGhpcy5kYXRhLnBsYXllcnMuY29tcHV0ZXJQbGF5ZXIgPSBuZXcgUGxheWVyKFwiQ29tcHV0ZXJcIik7XHJcblxyXG4gICAgdGhpcy5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQuY3JlYXRlQm9hcmQoKTtcclxuICAgIHRoaXMuZGF0YS5nYW1lYm9hcmRzLmNvbXB1dGVyQm9hcmQuY3JlYXRlQm9hcmQoKTtcclxuICB9LFxyXG5cclxuICBhZGRTaGlwcygpIHtcclxuICAgIGNvbnN0IHBsYXllckJvYXJkID0gdGhpcy5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQ7XHJcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gdGhpcy5kYXRhLmdhbWVib2FyZHMuY29tcHV0ZXJCb2FyZDtcclxuICAgIHBsYXllckJvYXJkLmFkZFNoaXAoXCJkZXN0cm95ZXJcIiwgMik7XHJcbiAgICBwbGF5ZXJCb2FyZC5hZGRTaGlwKFwic3VibWFyaW5lXCIsIDMpO1xyXG4gICAgcGxheWVyQm9hcmQuYWRkU2hpcChcImNydWlzZXJcIiwgMyk7XHJcbiAgICBwbGF5ZXJCb2FyZC5hZGRTaGlwKFwiYmF0dGxlc2hpcFwiLCA0KTtcclxuICAgIHBsYXllckJvYXJkLmFkZFNoaXAoXCJjYXJyaWVyXCIsIDUpO1xyXG5cclxuICAgIGNvbXB1dGVyQm9hcmQuYWRkU2hpcChcImRlc3Ryb3llclwiLCAyKTtcclxuICAgIGNvbXB1dGVyQm9hcmQuYWRkU2hpcChcInN1Ym1hcmluZVwiLCAzKTtcclxuICAgIGNvbXB1dGVyQm9hcmQuYWRkU2hpcChcImNydWlzZXJcIiwgMyk7XHJcbiAgICBjb21wdXRlckJvYXJkLmFkZFNoaXAoXCJiYXR0bGVzaGlwXCIsIDQpO1xyXG4gICAgY29tcHV0ZXJCb2FyZC5hZGRTaGlwKFwiY2FycmllclwiLCA1KTtcclxuXHJcbiAgICBjb21wdXRlckJvYXJkLnJhbmRvbVNoaXBzRGlyZWN0aW9uKCk7XHJcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlUmFuZG9tU2hpcChjb21wdXRlckJvYXJkLnNoaXBzKTtcclxuICB9LFxyXG5cclxuICByZXNldEJvYXJkQW5kU2hpcHMoKSB7XHJcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IHRoaXMuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkO1xyXG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IHRoaXMuZGF0YS5nYW1lYm9hcmRzLmNvbXB1dGVyQm9hcmQ7XHJcblxyXG4gICAgcGxheWVyQm9hcmQuYm9hcmQuZm9yRWFjaCgob2JqLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAob2JqICE9PSBudWxsKSB7XHJcbiAgICAgICAgcGxheWVyQm9hcmQuYm9hcmRbaW5kZXhdID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5mb3JFYWNoKChvYmosIGluZGV4KSA9PiB7XHJcbiAgICAgIGlmIChvYmogIT09IG51bGwpIHtcclxuICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkW2luZGV4XSA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcGxheWVyQm9hcmQuc2hpcHMgPSBbXTtcclxuICAgIGNvbXB1dGVyQm9hcmQuc2hpcHMgPSBbXTtcclxuICAgIHRoaXMuYWRkU2hpcHMoKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGVCb2FyZEluZm8oaW5kZXgsIGdhbWVib2FyZCkge1xyXG4gICAgbGV0IGJvYXJkUmV0dXJuSW5mbztcclxuXHJcbiAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW2luZGV4XSAhPT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBzaGlwTmFtZSA9IGdhbWVib2FyZC5ib2FyZFtpbmRleF0uaWQ7XHJcbiAgICAgIGdhbWVib2FyZC5ib2FyZFtpbmRleF0uc3RhdHVzID0gXCJoaXRcIjtcclxuICAgICAgYm9hcmRSZXR1cm5JbmZvID0gXCJoaXRcIjtcclxuICAgICAgY29uc3QgW3NoaXBdID0gZ2FtZWJvYXJkLnNoaXBzLmZpbHRlcigoc2hpcCkgPT4gc2hpcE5hbWUgPT09IHNoaXAubmFtZSk7XHJcbiAgICAgIHNoaXAuaGl0KGluZGV4KTtcclxuICAgICAgc2hpcC5pc1N1bmsoKTtcclxuICAgICAgaWYgKHNoaXAuc3VuayA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGdhbWVib2FyZC5ib2FyZC5mb3JFYWNoKCh0aWxlKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGlsZSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgaWYgKHRpbGUuaWQgPT09IHNoaXBOYW1lKSB7XHJcbiAgICAgICAgICAgIHRpbGUuc3RhdHVzID0gXCJzdW5rXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYm9hcmRSZXR1cm5JbmZvID0gXCJzdW5rXCI7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdhbWVib2FyZC5ib2FyZFtpbmRleF0gPSB7IHN0YXR1czogXCJtaXNzXCIgfTtcclxuICAgICAgYm9hcmRSZXR1cm5JbmZvID0gXCJtaXNzXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYm9hcmRSZXR1cm5JbmZvO1xyXG4gIH0sXHJcblxyXG4gIGNoZWNrSWZHYW1lT3ZlcigpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQuc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc3VuayA9PT0gdHJ1ZSlcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gYCR7dGhpcy5kYXRhLnBsYXllcnMuY29tcHV0ZXJQbGF5ZXIubmFtZX1gO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmRhdGEuZ2FtZWJvYXJkcy5jb21wdXRlckJvYXJkLnNoaXBzLmV2ZXJ5KFxyXG4gICAgICAgIChzaGlwKSA9PiBzaGlwLnN1bmsgPT09IHRydWVcclxuICAgICAgKVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiBgJHt0aGlzLmRhdGEucGxheWVycy5odW1hblBsYXllci5uYW1lfWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVQbGF5O1xyXG4iLCJjbGFzcyBQbGF5ZXIge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICByYW5kb21BdHRhY2tWYWxpZFNwb3RzKGdhbWVib2FyZCkge1xyXG4gICAgICAgIGxldCBwb3NzaWJsZVNwb3RzID0gW11cclxuICAgICAgICAgZ2FtZWJvYXJkLmJvYXJkLmZvckVhY2goKHRpbGUsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICBpZih0aWxlID09PSBudWxsIHx8ICF0aWxlLmhhc093blByb3BlcnR5KCdzdGF0dXMnKSkgcG9zc2libGVTcG90cy5wdXNoKGluZGV4KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2cocG9zc2libGVTcG90cylcclxuICAgICAgICBjb25zdCByYW5kb21TcG90ID0gcG9zc2libGVTcG90c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZVNwb3RzLmxlbmd0aCldXHJcbiAgICAgICAgY29uc29sZS5sb2cocmFuZG9tU3BvdClcclxuICAgICAgICByZXR1cm4gcmFuZG9tU3BvdFxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRm9ySGl0cyhnYW1lYm9hcmQpe1xyXG4gICAgICAgIGNvbnN0IGhpdHNBcnIgPSBbXVxyXG4gICAgICAgIGdhbWVib2FyZC5ib2FyZC5mb3JFYWNoKGluZGV4PT57XHJcbiAgICAgICAgICAgaWYoaW5kZXggPT09IG51bGwpIHJldHVyblxyXG4gICAgICAgICAgIGVsc2UgaWYoaW5kZXguc3RhdHVzID09PSAnaGl0Jykge1xyXG4gICAgICAgICAgICAgICBoaXRzQXJyLnB1c2goZ2FtZWJvYXJkLmJvYXJkLmluZGV4T2YoaW5kZXgpKX19KVxyXG4gICAgICAgIHJldHVybiBoaXRzQXJyXHJcbiAgICB9XHJcblxyXG4gICAgLy9jaGVjayBmb3Igc3Vycm91bmRpbmcgdGlsZXNcclxuICAgIGNoZWNrRm9yU3Vycm91bmRpbmdUaWxlcyhpbmRleCwgZ2FtZWJvYXJkKXtcclxuICAgICAgICBsZXQgc3Vycm91bmRpbmdUaWxlcyA9IFtdXHJcbiAgICAgICAgY29uc3QgdG9wVGlsZSA9ICtpbmRleCAtIDEwXHJcbiAgICAgICAgY29uc3QgYm90dG9tVGlsZSA9ICtpbmRleCArIDEwXHJcbiAgICAgICAgY29uc3QgbGVmdFRpbGUgPSAraW5kZXggLSAxXHJcbiAgICAgICAgY29uc3QgcmlnaHRUaWxlID0gK2luZGV4ICsgMVxyXG4gICAgICAgIHN1cnJvdW5kaW5nVGlsZXMucHVzaCh0b3BUaWxlLGJvdHRvbVRpbGUsIGxlZnRUaWxlLCByaWdodFRpbGUgKVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrRm9yVmFsaWRUaWxlcyhpbmRleCxzdXJyb3VuZGluZ1RpbGVzLCBnYW1lYm9hcmQpXHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tGb3JWYWxpZFRpbGVzKGluZGV4LCBzdXJyb3VuZGluZ1RpbGVzLCBnYW1lYm9hcmQpe1xyXG4gICAgICAgIC8vaWYgbGVmdCBib3JkZXJcclxuICAgICAgICBpZihpbmRleCAlIDEwID09PSAwKSBzdXJyb3VuZGluZ1RpbGVzLnNwbGljZSgyLCAxKVxyXG4gICAgICAgIC8vaWYgcmlnaHQgYm9yZGVyXHJcbiAgICAgICAgaWYoaW5kZXggJSAxMCA9PT0gOSkgc3Vycm91bmRpbmdUaWxlcy5zcGxpY2UoMywgMSlcclxuICAgICAgICAvL2lmIHN1cnJvdW5kaW5nIHRpbGVzIGFyZSBvdXQgb2YgcmFuZ2VcclxuICAgICAgICBzdXJyb3VuZGluZ1RpbGVzID0gc3Vycm91bmRpbmdUaWxlcy5maWx0ZXIodGlsZT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gdGlsZSA+PSAwICYmIHRpbGUgPD0gIDk5XHJcbiAgICAgICAgfSkgIFxyXG4gIFxyXG4gICAgICAgIHN1cnJvdW5kaW5nVGlsZXMgPSBzdXJyb3VuZGluZ1RpbGVzLmZpbHRlcih0aWxlPT57XHJcbiAgICAgICAgICAgIGlmKGdhbWVib2FyZC5ib2FyZFt0aWxlXSA9PT0gbnVsbCB8fCAhZ2FtZWJvYXJkLmJvYXJkW3RpbGVdLmhhc093blByb3BlcnR5KCdzdGF0dXMnKSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gc3Vycm91bmRpbmdUaWxlc1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRm9yUG9zc2libGVTaGlwRGlyZWN0aW9uKGhpdHNBcnIsIGdhbWVib2FyZCl7XHJcbiAgICAgICAgbGV0IHBvc3NpYmxlU2hpcERpcmVjdGlvblxyXG4gICAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLmhpdHNBcnIpXHJcbiAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4uaGl0c0FycilcclxuICAgICAgICBpZihNYXRoLmFicyhoaXRzQXJyWzBdIC0gaGl0c0FyclsxXSkgPT09IDEwKSBwb3NzaWJsZVNoaXBEaXJlY3Rpb24gPSAndmVydGljYWwnXHJcbiAgICAgICAgaWYoTWF0aC5hYnMoaGl0c0FyclswXSAtIGhpdHNBcnJbMV0pID09PSAxKSBwb3NzaWJsZVNoaXBEaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCdcclxuXHJcbiAgICAgICAgaWYocG9zc2libGVTaGlwRGlyZWN0aW9uID09PSAndmVydGljYWwnICYmIHRoaXMuY2hlY2tGb3JWYWxpZFRpbGVzKG1pbiwgW21pbiAtIDEwLCBtYXggKyAxMF0sIGdhbWVib2FyZCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1lFU1NTU1NTU1MnKVxyXG4gICAgICAgIHBvc3NpYmxlU2hpcERpcmVjdGlvbiA9ICdob3Jpem9udGFsJ31cclxuXHJcbiAgICAgICAgaWYocG9zc2libGVTaGlwRGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgJiYgdGhpcy5jaGVja0ZvclZhbGlkVGlsZXMobWluLCBbbWluIC0gMSwgbWF4ICsgMV0sIGdhbWVib2FyZCkubGVuZ3RoID09PSAwKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnTk9PT09PTycpXHJcbiAgICAgICAgcG9zc2libGVTaGlwRGlyZWN0aW9uID0gJ3ZlcnRpY2FsJ31cclxuICAgICAgICBjb25zb2xlLmxvZyhwb3NzaWJsZVNoaXBEaXJlY3Rpb24pXHJcbiAgICAgICAgcmV0dXJuIHBvc3NpYmxlU2hpcERpcmVjdGlvblxyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja1NoaXBEaXJlY3Rpb24oaGl0c0FyciwgZGlyZWN0aW9uLCBnYW1lYm9hcmQpe1xyXG4gICAgICAgIGxldCBiZXN0QXR0YWNrU3BvdFxyXG4gICAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLmhpdHNBcnIpXHJcbiAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4uaGl0c0FycilcclxuXHJcbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSAndmVydGljYWwnKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jaGVja0ZvclZhbGlkVGlsZXMobWluLCBbbWluIC0gMTBdLCBnYW1lYm9hcmQpLmxlbmd0aCkgYmVzdEF0dGFja1Nwb3QgPSBtaW4gLSAxMFxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuY2hlY2tGb3JWYWxpZFRpbGVzKG1heCwgW21heCArIDEwXSwgZ2FtZWJvYXJkKS5sZW5ndGgpYmVzdEF0dGFja1Nwb3QgPSBtYXggKyAxMFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hlY2tGb3JWYWxpZFRpbGVzKG1pbiwgW21pbiAtIDFdLCBnYW1lYm9hcmQpLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIGJlc3RBdHRhY2tTcG90ID0gbWluIC0gMVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuY2hlY2tGb3JWYWxpZFRpbGVzKG1heCwgW21heCArIDFdLCBnYW1lYm9hcmQpLmxlbmd0aCkgYmVzdEF0dGFja1Nwb3QgPSBtYXggKyAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGJlc3RBdHRhY2tTcG90KVxyXG4gICAgICAgIHJldHVybiBiZXN0QXR0YWNrU3BvdFxyXG4gICAgfSAgICBcclxuXHJcbiAgICBhdHRhY2tCb2FyZChnYW1lYm9hcmQpe1xyXG4gICAgICAgIGxldCBiZXN0QXR0YWNrU3BvdFxyXG4gICAgICAgIGNvbnN0IGhpdHNBcnIgPSB0aGlzLmNoZWNrRm9ySGl0cyhnYW1lYm9hcmQpXHJcbiAgICAgICAgaWYoIWhpdHNBcnIubGVuZ3RoKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ05PT09PT09PT09PT08nKVxyXG4gICAgICAgICAgICBiZXN0QXR0YWNrU3BvdCA9IHRoaXMucmFuZG9tQXR0YWNrVmFsaWRTcG90cyhnYW1lYm9hcmQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGhpdHNBcnIubGVuZ3RoID09PSAxKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ05PT09PT09PT09PT08/Pz8/Pz8/PycpXHJcbiAgICAgICAgICAgIGNvbnN0IHN1cnJvdW5kaW5nVGlsZXMgPSB0aGlzLmNoZWNrRm9yU3Vycm91bmRpbmdUaWxlcyhbaGl0c0Fycl0sIGdhbWVib2FyZClcclxuICAgICAgICAgICAgYmVzdEF0dGFja1Nwb3QgPSBzdXJyb3VuZGluZ1RpbGVzWzBdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGhpdHNBcnIubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOT09PT09PT09PT09PPz8/Pz8/Pz8hISEhISEhISEhIScpXHJcbiAgICAgICAgICAgIGNvbnN0IHBvc3NpYmxlU2hpcERpcmVjdGlvbiA9IHRoaXMuY2hlY2tGb3JQb3NzaWJsZVNoaXBEaXJlY3Rpb24oaGl0c0FyciwgZ2FtZWJvYXJkKVxyXG5cclxuICAgICAgICAgICAgYmVzdEF0dGFja1Nwb3QgPSB0aGlzLmF0dGFja1NoaXBEaXJlY3Rpb24oaGl0c0FyciwgcG9zc2libGVTaGlwRGlyZWN0aW9uLCBnYW1lYm9hcmQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGJlc3RBdHRhY2tTcG90KVxyXG4gICAgICAgIHJldHVybiBiZXN0QXR0YWNrU3BvdFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXJcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiY2xhc3MgU2hpcCB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBzaGlwTGVuZ3RoLCBkaXJlY3Rpb24gPSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgIHRoaXMuc2hpcExlbmd0aCA9IHNoaXBMZW5ndGg7XHJcbiAgICAgIHRoaXMuY29vcmRzID0gW107XHJcbiAgICAgIHRoaXMuc3VuayA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlzU3VuaygpIHtcclxuICAgICAgaWYgKHRoaXMuY29vcmRzLmxlbmd0aCA9PT0gdGhpcy5zaGlwTGVuZ3RoKSB0aGlzLnN1bmsgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGhpdChpbmRleCl7XHJcbiAgICAgIGlmKHRoaXMuY29vcmRzLmluY2x1ZGVzKGluZGV4KSkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmNvb3Jkcy5wdXNoKGluZGV4KVxyXG4gICAgfVxyXG5cclxuICAgIHJhbmRvbURpcmVjdGlvbigpIHtcclxuICAgICAgICBjb25zdCByYW5kb21EaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcclxuICAgICAgICBpZiAocmFuZG9tRGlyZWN0aW9uID09PSAwKSB0aGlzLmRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgICAgIGlmIChyYW5kb21EaXJlY3Rpb24gPT09IDEpIHRoaXMuZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgZGVmYXVsdCBTaGlwIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2FtZVBsYXkgZnJvbSAnLi9nYW1lcGxheSdcclxuaW1wb3J0IHsgcmVuZGVyQWxsIH0gZnJvbSAnLi9kb20nXHJcblxyXG5cclxuZ2FtZVBsYXkuc2V0dXAoKVxyXG5nYW1lUGxheS5hZGRTaGlwcygpXHJcbnJlbmRlckFsbCgpXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=
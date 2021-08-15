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
    message(`Game Over! ${gameOver} wins!`);
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
    message(`Game Over! ${gameOver} wins!`);
  }
};

const changeGameMode = () => {
  const playerSelectGrid = document.querySelector(".selection-grid");
  const computerGrid = document.querySelector(".computerGrid");
  const startBtn = document.querySelector("#start-btn");
  const rotateBtn = document.querySelector("#rotate-btn");
  const randomPlaceBtn = document.querySelector("#random-btn");

  if (_gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameon === false) {
     message("Drag and drop your ships to begin!")
    computerGrid.classList.add("hidden");
    startBtn.classList.remove("hidden");
    rotateBtn.classList.remove("hidden");
    randomPlaceBtn.classList.remove("hidden");
    playerSelectGrid.classList.remove("hidden");
  }

  if (_gameplay__WEBPACK_IMPORTED_MODULE_1__.default.data.gameon === true) {
    message("Click on an enemy tile to attack!");
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
        const randomSpot = possibleSpots[Math.floor(Math.random() * possibleSpots.length)]
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
        possibleShipDirection = 'horizontal'}

        if(possibleShipDirection === 'horizontal' && this.checkForValidTiles(min, [min - 1, max + 1], gameboard).length === 0){
        possibleShipDirection = 'vertical'}
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
        return bestAttackSpot
    }    

    attackBoard(gameboard){
        let bestAttackSpot
        const hitsArr = this.checkForHits(gameboard)
        if(!hitsArr.length){
            bestAttackSpot = this.randomAttackValidSpots(gameboard)
        }
        if(hitsArr.length === 1){
            const surroundingTiles = this.checkForSurroundingTiles([hitsArr], gameboard)
            bestAttackSpot = surroundingTiles[0]
        }
        if(hitsArr.length > 1){
            const possibleShipDirection = this.checkForPossibleShipDirection(hitsArr, gameboard)

            bestAttackSpot = this.attackShipDirection(hitsArr, possibleShipDirection, gameboard)
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZHJhZ2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQiwwQ0FBSTtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JHckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUUsaUVBQWUsSTs7Ozs7O1VDekJqQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDQTs7O0FBR2pDLG9EQUFjO0FBQ2QsdURBQWlCO0FBQ2pCLGdEQUFTIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jbGFzcyBHYW1lYm9hcmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHRoaXMuYm9hcmQgPSBbXVxyXG4gICAgICB0aGlzLnNoaXBzID0gW107XHJcbiAgICAgIHRoaXMuV0lEVEggPSAxMDtcclxuICAgIH1cclxuICBcclxuICAgIGNyZWF0ZUJvYXJkKCl7XHJcbiAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQXJyYXkoMTAwKS5maWxsKG51bGwpXHJcbiAgICB9XHJcblxyXG4gICAgYWRkU2hpcChuYW1lLCBsZW5ndGgpe1xyXG4gICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXAobmFtZSwgbGVuZ3RoKSlcclxuICAgICAgfVxyXG5cclxuICAgIGFkZFNoaXBUb0JvYXJkKHNoaXAsIGNvb3JkaW5hdGVzQXJyKXtcclxuICAgICAgICBjb29yZGluYXRlc0Fyci5mb3JFYWNoKGNvb3JkaW5hdGU9PntcclxuICAgICAgICAgIHRoaXMuYm9hcmRbY29vcmRpbmF0ZV0gPSB7XHJcbiAgICAgICAgICAgIGlkOiBzaGlwLm5hbWV9XHJcbiAgICAgIH0pfVxyXG4gICAgXHJcbiAgICAvL2dlbmVyYXRlIGEgdmFsaWQgcmFuZG9tIHNwb3QgYmFzZWQgb24gc2hpcCBkaXJlY3Rpb24gYW5kIGxlbmd0aFxyXG4gICAgZ2VuZXJhdGVSYW5kb21Db29yZHMoc2hpcCkge1xyXG4gICAgICBsZXQgcmFuZG9tU3BvdCA9IHRoaXMuZ2VuZXJhdGVSYW5kb21OdW1iZXIoKVxyXG4gIFxyXG4gICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIHJhbmRvbVNwb3QgJSB0aGlzLldJRFRIIDwgdGhpcy5XSURUSCAtIHNoaXAuc2hpcExlbmd0aCArIDFcclxuICAgICAgICAgID8gcmFuZG9tU3BvdFxyXG4gICAgICAgICAgOiB0aGlzLmdlbmVyYXRlUmFuZG9tQ29vcmRzKHNoaXApO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIHJhbmRvbVNwb3QgPCB0aGlzLldJRFRIICogKHRoaXMuV0lEVEggLSBzaGlwLnNoaXBMZW5ndGggKyAxKVxyXG4gICAgICAgICAgPyByYW5kb21TcG90XHJcbiAgICAgICAgICA6IHRoaXMuZ2VuZXJhdGVSYW5kb21Db29yZHMoc2hpcCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3JldHVybnMgYSBudW1iZXIgZnJvbSAwLTk5XHJcbiAgICBnZW5lcmF0ZVJhbmRvbU51bWJlcigpIHtcclxuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuV0lEVEggKiB0aGlzLldJRFRIKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2dlbmVyYXRlcyBhbiBhcnJheSBvZiBjb29yZGluYXRlcyBiYXNlZCBvbiBzaGlwIGRpcmVjdGlvbiBhbmQgbGVuZ3RoXHJcbiAgICBnZW5lcmF0ZVNoaXBDb29yZHMoY29vcmQsIHNoaXApe1xyXG4gICAgICBsZXQgY29vcmRpbmF0ZXNBcnIgPSBbXVxyXG4gICAgICBcclxuICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaGlwTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGxldCBpbmRleCA9IGNvb3JkICsgaTtcclxuICAgICAgICAgIGNvb3JkaW5hdGVzQXJyLnB1c2goaW5kZXgpO1xyXG4gICAgICAgIH19XHJcbiAgICAgIFxyXG4gICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaGlwTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGxldCBpbmRleCA9IGNvb3JkICsgMTAgKiBpO1xyXG4gICAgICAgICAgY29vcmRpbmF0ZXNBcnIucHVzaChpbmRleCk7XHJcbiAgICAgICAgfX1cclxuICAgICAgICByZXR1cm4gY29vcmRpbmF0ZXNBcnJcclxuICAgIH1cclxuXHJcbiAgICAvL2NoZWNrIGlmIGJvYXJkIHNwYWNlIGlzIHRha2VuXHJcbiAgICBjaGVja0lmQ29vcmRzVmFsaWQoY29vcmRpbmF0ZXNBcnIpe1xyXG4gICAgICBpZiAoY29vcmRpbmF0ZXNBcnIuc29tZSgoY29vcmQpPT5cclxuICAgICAgICB0aGlzLmJvYXJkW2Nvb3JkXSAhPT0gbnVsbCkpIHtyZXR1cm4gZmFsc2U7fVxyXG4gICAgICAgIGVsc2V7cmV0dXJuIHRydWU7fVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vZ2VuZXJhdGUgdmFsaWQgc2hpcCBjb29yZHMgYW5kIGFkZCB0aGVtIGludG8gYm9hcmQgYXJyYXlcclxuICAgIGdlbmVyYXRlUmFuZG9tU2hpcENvb3JkcyhzaGlwKXtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdlbmVyYXRlUmFuZG9tQ29vcmRzKHNoaXApXHJcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzQXJyID0gdGhpcy5nZW5lcmF0ZVNoaXBDb29yZHMoaW5kZXgsIHNoaXApXHJcbiAgICAgICAgbGV0IHZhbGlkQ29vcmRzID0gdGhpcy5jaGVja0lmQ29vcmRzVmFsaWQoY29vcmRpbmF0ZXNBcnIpXHJcbiAgICAgICAgaWYodmFsaWRDb29yZHMgPT09IHRydWUpe1xyXG4gICAgICAgICAgIHRoaXMuYWRkU2hpcFRvQm9hcmQoc2hpcCwgY29vcmRpbmF0ZXNBcnIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICB0aGlzLmdlbmVyYXRlUmFuZG9tU2hpcENvb3JkcyhzaGlwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGFjZVJhbmRvbVNoaXAoYXJyKXtcclxuICAgICAgYXJyLmZvckVhY2goc2hpcD0+e1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVSYW5kb21TaGlwQ29vcmRzKHNoaXApXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmFuZG9tU2hpcHNEaXJlY3Rpb24oKXtcclxuICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXA9PntcclxuICAgICAgICBzaGlwLnJhbmRvbURpcmVjdGlvbigpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQiLCJpbXBvcnQgZHJhZ0Z1bmN0aW9ucyBmcm9tIFwiLi9kcmFnZnVuY3Rpb25zXCI7XHJcbmltcG9ydCBnYW1lUGxheSBmcm9tIFwiLi9nYW1lcGxheVwiO1xyXG5cclxuY29uc3QgcmVuZGVyQm9hcmQgPSAoZ2FtZUJvYXJkLCBkaXNwbGF5R2FtZUJvYXJkKSA9PiB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gZ2FtZUJvYXJkLmJvYXJkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCB0aWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRpbGUuY2xhc3NMaXN0LmFkZChcInRpbGVcIik7XHJcbiAgICB0aWxlLmlkID0gaTtcclxuICAgIGRpc3BsYXlHYW1lQm9hcmQuYXBwZW5kQ2hpbGQodGlsZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgcmVuZGVyU2hpcHNPbkJvYXJkID0gKGdhbWVCb2FyZCwgZGlzcGxheUdhbWVCb2FyZCkgPT4ge1xyXG4gIGdhbWVCb2FyZC5ib2FyZC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgZGlzcGxheUdhbWVCb2FyZC5jaGlsZE5vZGVzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAgIFwidGFrZW5cIixcclxuICAgICAgICBgJHtlbGVtZW50LmlkfWBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlbmRlclNlbGVjdGlvbkdyaWQgPSAoc2hpcHNBcnIpID0+IHtcclxuICBjb25zdCBwbGF5ZXJTZWxlY3RHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3Rpb24tZ3JpZFwiKTtcclxuICBzaGlwc0Fyci5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICBsZXQgc2hpcEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgc2hpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIiwgYCR7c2hpcC5uYW1lfWApO1xyXG4gICAgc2hpcEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIHRydWUpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgdGlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIHRpbGUuaWQgPSBgJHtzaGlwLm5hbWV9LSR7aX1gO1xyXG4gICAgICBzaGlwRWxlbWVudC5hcHBlbmRDaGlsZCh0aWxlKTtcclxuICAgICAgcGxheWVyU2VsZWN0R3JpZC5hcHBlbmRDaGlsZChzaGlwRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCByb3RhdGVQbGF5ZXJTaGlwcyA9ICgpID0+IHtcclxuICBjb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvdGF0ZS1idG5cIik7XHJcbiAgY29uc3QgcGxheWVyU2VsZWN0R3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLWdyaWRcIik7XHJcbiAgY29uc3Qgc2hpcHMgPSBwbGF5ZXJTZWxlY3RHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcclxuICBwbGF5ZXJTZWxlY3RHcmlkLmNsYXNzTGlzdC50b2dnbGUoXCJob3Jpem9udGFsXCIpO1xyXG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgIGNvbnN0IHNoaXBOYW1lID0gc2hpcC5maXJzdENoaWxkLmlkLnNsaWNlKDAsIC0yKTtcclxuICAgIHNoaXAuY2xhc3NMaXN0LnRvZ2dsZShgJHtzaGlwTmFtZX0taG9yaXpvbnRhbGApO1xyXG4gICAgc2hpcC5jbGFzc0xpc3QudG9nZ2xlKGAke3NoaXBOYW1lfWApO1xyXG4gICAgZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgaWYgKHNoaXAubmFtZSA9PT0gc2hpcE5hbWUpIHtcclxuICAgICAgICBzaGlwLmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiXHJcbiAgICAgICAgICA/IChzaGlwLmRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiKVxyXG4gICAgICAgICAgOiAoc2hpcC5kaXJlY3Rpb24gPSBcInZlcnRpY2FsXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGNsZWFyQ29udGFpbmVyID0gKGNvbnRhaW5lcikgPT4ge1xyXG4gIHdoaWxlIChjb250YWluZXIuZmlyc3RDaGlsZCkge1xyXG4gICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGNvbnRhaW5lci5maXJzdENoaWxkKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBtZXNzYWdlID0gKG1lc3NhZ2UpID0+IHtcclxuICBjb25zdCBkaXNwbGF5R2FtZUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtaW5mb1wiKTtcclxuICBkaXNwbGF5R2FtZUluZm8udGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG59O1xyXG5cclxuY29uc3QgYXBwbHlTZWxlY3RvcnNBbmRMaXN0ZW5lcnMgPSAoKSA9PiB7XHJcbiAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0LWJ0blwiKTtcclxuICBjb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvdGF0ZS1idG5cIik7XHJcbiAgY29uc3QgcmVzZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jlc2V0LWJ0blwiKTtcclxuICBjb25zdCByYW5kb21QbGFjZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmFuZG9tLWJ0blwiKTtcclxuICByb3RhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJvdGF0ZVBsYXllclNoaXBzKTtcclxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnRHYW1lKTtcclxuICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVzZXRHYW1lKTtcclxuICByYW5kb21QbGFjZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmFuZG9tUGxhY2VQbGF5ZXJTaGlwcyk7XHJcbn07XHJcblxyXG5jb25zdCByZW5kZXJBbGwgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyR3JpZFwiKTtcclxuICBjb25zdCBjb21wdXRlckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyR3JpZFwiKTtcclxuXHJcbiAgYXBwbHlTZWxlY3RvcnNBbmRMaXN0ZW5lcnMoKTtcclxuICByZW5kZXJCb2FyZChnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQsIHBsYXllckdyaWQpO1xyXG4gIHJlbmRlckJvYXJkKGdhbWVQbGF5LmRhdGEuZ2FtZWJvYXJkcy5jb21wdXRlckJvYXJkLCBjb21wdXRlckdyaWQpO1xyXG4gIHJlbmRlclNoaXBzT25Cb2FyZChnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMuY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJHcmlkKTtcclxuICByZW5kZXJTZWxlY3Rpb25HcmlkKGdhbWVQbGF5LmRhdGEuZ2FtZWJvYXJkcy5wbGF5ZXJCb2FyZC5zaGlwcyk7XHJcbiAgZHJhZ0Z1bmN0aW9ucy5hZGREcmFnTGlzdGVuZXJzKCk7XHJcblxyXG4gIG1lc3NhZ2UoXCJEcmFnIGFuZCBkcm9wIHlvdXIgc2hpcHMgdG8gYmVnaW4hXCIpO1xyXG59O1xyXG5cclxuY29uc3QgcmFuZG9tUGxhY2VQbGF5ZXJTaGlwcyA9ICgpID0+IHtcclxuICBjb25zdCBwbGF5ZXJHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJHcmlkXCIpO1xyXG4gIGNvbnN0IHBsYXllclNlbGVjdEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGlvbi1ncmlkXCIpO1xyXG4gIGNvbnN0IHRha2VuVGlsZXMgPSBwbGF5ZXJHcmlkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YWtlblwiKTtcclxuICBpZiAodGFrZW5UaWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICBtZXNzYWdlKFwiUGxlYXNlIHJlc2V0IHRoZSBib2FyZCBiZWZvcmUgeW91IG1heSByYW5kb21seSBwbGFjZSBzaGlwc1wiKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgY2xlYXJDb250YWluZXIocGxheWVyU2VsZWN0R3JpZCk7XHJcbiAgZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkLnJhbmRvbVNoaXBzRGlyZWN0aW9uKCk7XHJcbiAgZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkLnBsYWNlUmFuZG9tU2hpcChcclxuICAgIGdhbWVQbGF5LmRhdGEuZ2FtZWJvYXJkcy5wbGF5ZXJCb2FyZC5zaGlwc1xyXG4gICk7XHJcbiAgcmVuZGVyU2hpcHNPbkJvYXJkKGdhbWVQbGF5LmRhdGEuZ2FtZWJvYXJkcy5wbGF5ZXJCb2FyZCwgcGxheWVyR3JpZCk7XHJcbiAgbWVzc2FnZShcIkFsbCBzaGlwcyBkZXBsb3llZCEgQ2xpY2sgU3RhcnQgR2FtZSB0byBwbGF5IVwiKTtcclxufTtcclxuXHJcbmNvbnN0IHJlc2V0R2FtZSA9ICgpID0+IHtcclxuICBjb25zdCBjb21wdXRlckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyR3JpZFwiKTtcclxuICBjb25zdCBwbGF5ZXJHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJHcmlkXCIpO1xyXG4gIGNvbnN0IHBsYXllclNlbGVjdEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGlvbi1ncmlkXCIpO1xyXG5cclxuICBwbGF5ZXJTZWxlY3RHcmlkLmNsYXNzTGlzdC5yZW1vdmUoXCJob3Jpem9udGFsXCIpO1xyXG4gIGNsZWFyQ29udGFpbmVyKHBsYXllckdyaWQpO1xyXG4gIGNsZWFyQ29udGFpbmVyKGNvbXB1dGVyR3JpZCk7XHJcbiAgY2xlYXJDb250YWluZXIocGxheWVyU2VsZWN0R3JpZCk7XHJcbiAgZ2FtZVBsYXkuZGF0YS5nYW1lb24gPSBmYWxzZTtcclxuICBnYW1lUGxheS5yZXNldEJvYXJkQW5kU2hpcHMoKTtcclxuICByZW5kZXJBbGwoKTtcclxuICBjaGFuZ2VHYW1lTW9kZSgpO1xyXG4gIGFwcGx5U2VsZWN0b3JzQW5kTGlzdGVuZXJzKCk7XHJcbn07XHJcblxyXG5jb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyU2VsZWN0R3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLWdyaWRcIik7XHJcbiAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcFwiKTtcclxuICBpZiAocGxheWVyU2VsZWN0R3JpZC5jb250YWlucyhzaGlwKSkge1xyXG4gICAgbWVzc2FnZShcIlBsZWFzZSBkZXBsb3kgYWxsIHNoaXBzIHRvIHN0YXJ0IGdhbWVcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGdhbWVQbGF5LmRhdGEuZ2FtZW9uID0gdHJ1ZTtcclxuICBjaGFuZ2VHYW1lTW9kZSgpO1xyXG59O1xyXG5cclxuY29uc3QgZGlzYWJsZUNsaWNrcyA9ICgpID0+IHtcclxuICBjb25zdCBjb21wdXRlckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyR3JpZFwiKTtcclxuICBjb25zdCBjb21wdXRlclRpbGVzID0gY29tcHV0ZXJHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXZcIik7XHJcbiAgY29tcHV0ZXJUaWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XHJcbiAgICBjb25zdCBuZXdUaWxlID0gdGlsZS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICB0aWxlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld1RpbGUsIHRpbGUpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgcGxheWVyQXR0YWNrID0gKGUpID0+IHtcclxuICBjb25zdCBjb21wdXRlckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyR3JpZFwiKTtcclxuICBjb25zdCBjb21wdXRlckJvYXJkID0gZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLmNvbXB1dGVyQm9hcmQ7XHJcbiAgbGV0IGluZGV4ID0gZS50YXJnZXQuaWQ7XHJcbiAgLy8gICBjb25zdCBjbGFzc2VzID0gWydoaXQnLCAnbWlzcycsICdzdW5rJ11cclxuICBpZiAoXHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIikgfHxcclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1pc3NcIikgfHxcclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInN1bmtcIilcclxuICApXHJcbiAgICByZXR1cm47XHJcblxyXG4gIGNvbnN0IHNoaXBOYW1lID0gZS50YXJnZXQuY2xhc3NMaXN0WzJdO1xyXG4gIGNvbnN0IGJvYXJkUmV0dXJuSW5mbyA9IGdhbWVQbGF5LnVwZGF0ZUJvYXJkSW5mbyhpbmRleCwgY29tcHV0ZXJCb2FyZCk7XHJcblxyXG4gIHN3aXRjaCAoYm9hcmRSZXR1cm5JbmZvKSB7XHJcbiAgICBjYXNlIFwibWlzc1wiOlxyXG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiaGl0XCI6XHJcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcInN1bmtcIjpcclxuICAgICAgY29uc3Qgc2hpcFRpbGVzID0gY29tcHV0ZXJHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3NoaXBOYW1lfWApO1xyXG4gICAgICBzaGlwVGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xyXG4gICAgICAgIHRpbGUuY2xhc3NMaXN0LmFkZChcInN1bmtcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybjtcclxuICB9XHJcbiAgY29uc3QgZ2FtZU92ZXIgPSBnYW1lUGxheS5jaGVja0lmR2FtZU92ZXIoKTtcclxuICBpZiAoZ2FtZU92ZXIpIHtcclxuICAgIGRpc2FibGVDbGlja3MoKTtcclxuICAgIG1lc3NhZ2UoYEdhbWUgT3ZlciEgJHtnYW1lT3Zlcn0gd2lucyFgKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGNvbXB1dGVyQXR0YWNrKCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgY29tcHV0ZXJBdHRhY2sgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQ7XHJcbiAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyR3JpZFwiKTtcclxuICBjb25zdCBwbGF5ZXJHcmlkVGlsZXMgPSBwbGF5ZXJHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXZcIik7XHJcbiAgbGV0IGluZGV4ID0gZ2FtZVBsYXkuZGF0YS5wbGF5ZXJzLmNvbXB1dGVyUGxheWVyLmF0dGFja0JvYXJkKHBsYXllckJvYXJkKTtcclxuXHJcbiAgY29uc3QgYm9hcmRSZXR1cm5JbmZvID0gZ2FtZVBsYXkudXBkYXRlQm9hcmRJbmZvKGluZGV4LCBwbGF5ZXJCb2FyZCk7XHJcblxyXG4gIHN3aXRjaCAoYm9hcmRSZXR1cm5JbmZvKSB7XHJcbiAgICBjYXNlIFwibWlzc1wiOlxyXG4gICAgICBwbGF5ZXJHcmlkVGlsZXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJoaXRcIjpcclxuICAgICAgcGxheWVyR3JpZFRpbGVzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJzdW5rXCI6XHJcbiAgICAgIGNvbnN0IHNoaXBOYW1lID0gcGxheWVyR3JpZFRpbGVzW2luZGV4XS5jbGFzc0xpc3RbMl07XHJcbiAgICAgIGNvbnN0IHNoaXBUaWxlcyA9IHBsYXllckdyaWQucXVlcnlTZWxlY3RvckFsbChgLiR7c2hpcE5hbWV9YCk7XHJcbiAgICAgIHNoaXBUaWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XHJcbiAgICAgICAgdGlsZS5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2FtZU92ZXIgPSBnYW1lUGxheS5jaGVja0lmR2FtZU92ZXIoKTtcclxuICBpZiAoZ2FtZU92ZXIpIHtcclxuICAgIGRpc2FibGVDbGlja3MoKTtcclxuICAgIG1lc3NhZ2UoYEdhbWUgT3ZlciEgJHtnYW1lT3Zlcn0gd2lucyFgKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBjaGFuZ2VHYW1lTW9kZSA9ICgpID0+IHtcclxuICBjb25zdCBwbGF5ZXJTZWxlY3RHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3Rpb24tZ3JpZFwiKTtcclxuICBjb25zdCBjb21wdXRlckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyR3JpZFwiKTtcclxuICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhcnQtYnRuXCIpO1xyXG4gIGNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm90YXRlLWJ0blwiKTtcclxuICBjb25zdCByYW5kb21QbGFjZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmFuZG9tLWJ0blwiKTtcclxuXHJcbiAgaWYgKGdhbWVQbGF5LmRhdGEuZ2FtZW9uID09PSBmYWxzZSkge1xyXG4gICAgIG1lc3NhZ2UoXCJEcmFnIGFuZCBkcm9wIHlvdXIgc2hpcHMgdG8gYmVnaW4hXCIpXHJcbiAgICBjb21wdXRlckdyaWQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIHN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICByb3RhdGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIHJhbmRvbVBsYWNlQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICBwbGF5ZXJTZWxlY3RHcmlkLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgfVxyXG5cclxuICBpZiAoZ2FtZVBsYXkuZGF0YS5nYW1lb24gPT09IHRydWUpIHtcclxuICAgIG1lc3NhZ2UoXCJDbGljayBvbiBhbiBlbmVteSB0aWxlIHRvIGF0dGFjayFcIik7XHJcbiAgICBjb21wdXRlckdyaWQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIHN0YXJ0QnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICByb3RhdGVCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIHJhbmRvbVBsYWNlQnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICBwbGF5ZXJTZWxlY3RHcmlkLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcblxyXG4gICAgY29uc3QgY29tcHV0ZXJUaWxlcyA9IGNvbXB1dGVyR3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2XCIpO1xyXG4gICAgY29tcHV0ZXJUaWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XHJcbiAgICAgIHRpbGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYXllckF0dGFjayk7XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgeyByZW5kZXJBbGwsIHJlbmRlclNoaXBzT25Cb2FyZCB9O1xyXG4iLCJpbXBvcnQgZ2FtZVBsYXksIHsgZGF0YSB9IGZyb20gXCIuL2dhbWVwbGF5XCI7XHJcbmltcG9ydCB7IHJlbmRlclNoaXBzT25Cb2FyZCB9IGZyb20gXCIuL2RvbVwiO1xyXG5cclxubGV0IHNlbGVjdGVkU2hpcE5hbWU7XHJcbmxldCBzZWxlY3RlZFNoaXBQYXJ0O1xyXG5sZXQgc2VsZWN0ZWRTaGlwQ29udGFpbmVyO1xyXG5cclxuY29uc3QgZHJhZ0Z1bmN0aW9ucyA9IHtcclxuICBhZGREcmFnTGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgcGxheWVyU2VsZWN0R3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLWdyaWRcIik7XHJcbiAgICBjb25zdCBzaGlwcyA9IHBsYXllclNlbGVjdEdyaWQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xyXG4gICAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyR3JpZFwiKTtcclxuICAgIGNvbnN0IHBsYXllckdyaWRUaWxlcyA9IHBsYXllckdyaWQucXVlcnlTZWxlY3RvckFsbChcImRpdlwiKTtcclxuXHJcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PlxyXG4gICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ0Z1bmN0aW9ucy5kcmFnU3RhcnQpXHJcbiAgICApO1xyXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT5cclxuICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnRnVuY3Rpb25zLmRyYWdFbmQpXHJcbiAgICApO1xyXG4gICAgcGxheWVyR3JpZFRpbGVzLmZvckVhY2goKHNxdWFyZSkgPT5cclxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ0Z1bmN0aW9ucy5kcmFnU3RhcnQpXHJcbiAgICApO1xyXG4gICAgcGxheWVyR3JpZFRpbGVzLmZvckVhY2goKHNxdWFyZSkgPT5cclxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBkcmFnRnVuY3Rpb25zLmRyYWdPdmVyKVxyXG4gICAgKTtcclxuICAgIHBsYXllckdyaWRUaWxlcy5mb3JFYWNoKChzcXVhcmUpID0+XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIGRyYWdGdW5jdGlvbnMuZHJhZ0VudGVyKVxyXG4gICAgKTtcclxuICAgIHBsYXllckdyaWRUaWxlcy5mb3JFYWNoKChzcXVhcmUpID0+XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIGRyYWdGdW5jdGlvbnMuZHJhZ0xlYXZlKVxyXG4gICAgKTtcclxuICAgIHBsYXllckdyaWRUaWxlcy5mb3JFYWNoKChzcXVhcmUpID0+XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcmFnRnVuY3Rpb25zLmRyYWdEcm9wKVxyXG4gICAgKTtcclxuICAgIHBsYXllckdyaWRUaWxlcy5mb3JFYWNoKChzcXVhcmUpID0+XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnRnVuY3Rpb25zLmRyYWdFbmQpXHJcbiAgICApO1xyXG5cclxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XHJcbiAgICAgICAgc2VsZWN0ZWRTaGlwTmFtZSA9IGUudGFyZ2V0LmlkLnNsaWNlKDAsIC0yKTtcclxuICAgICAgICBzZWxlY3RlZFNoaXBQYXJ0ID0gcGFyc2VJbnQoZS50YXJnZXQuaWQuc2xpY2UoLTEpKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICBkcmFnU3RhcnQoZSkge1xyXG4gICAgc2VsZWN0ZWRTaGlwQ29udGFpbmVyID0gZS50YXJnZXQ7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgc2VsZWN0ZWRTaGlwQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4gICAgfSwgMCk7XHJcbiAgfSxcclxuXHJcbiAgZHJhZ0VudGVyKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICBkcmFnT3ZlcihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgZHJhZ0xlYXZlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICBkcmFnRW5kKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHNlbGVjdGVkU2hpcENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcclxuICB9LFxyXG5cclxuICBkcmFnRHJvcChlKSB7XHJcbiAgICBsZXQgYWRqdXN0ZWRCb2FyZFRpbGU7XHJcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGdhbWVQbGF5LmRhdGEuZ2FtZWJvYXJkcy5wbGF5ZXJCb2FyZDtcclxuICAgIGNvbnN0IFtzaGlwXSA9IHBsYXllckJvYXJkLnNoaXBzLmZpbHRlcigoc2hpcCkgPT4ge1xyXG4gICAgICByZXR1cm4gc2hpcC5uYW1lID09PSBzZWxlY3RlZFNoaXBOYW1lO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgYWRqdXN0ZWRCb2FyZFRpbGUgPSBwYXJzZUludChlLnRhcmdldC5pZCkgLSBzZWxlY3RlZFNoaXBQYXJ0ICogMTA7XHJcbiAgICAgIGlmIChcclxuICAgICAgICAhKFxyXG4gICAgICAgICAgYWRqdXN0ZWRCb2FyZFRpbGUgPFxyXG4gICAgICAgICAgcGxheWVyQm9hcmQuV0lEVEggKiAocGxheWVyQm9hcmQuV0lEVEggLSBzaGlwLnNoaXBMZW5ndGggKyAxKVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgYWRqdXN0ZWRCb2FyZFRpbGUgPSBwYXJzZUludChlLnRhcmdldC5pZCkgLSBzZWxlY3RlZFNoaXBQYXJ0O1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgIShcclxuICAgICAgICAgIGFkanVzdGVkQm9hcmRUaWxlICUgcGxheWVyQm9hcmQuV0lEVEggPFxyXG4gICAgICAgICAgcGxheWVyQm9hcmQuV0lEVEggLSBzaGlwLnNoaXBMZW5ndGggKyAxXHJcbiAgICAgICAgKVxyXG4gICAgICApXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IGNvb3JkaW5hdGVzQXJyID0gcGxheWVyQm9hcmQuZ2VuZXJhdGVTaGlwQ29vcmRzKFxyXG4gICAgICBhZGp1c3RlZEJvYXJkVGlsZSxcclxuICAgICAgc2hpcFxyXG4gICAgKTtcclxuICAgIGlmIChwbGF5ZXJCb2FyZC5jaGVja0lmQ29vcmRzVmFsaWQoY29vcmRpbmF0ZXNBcnIpKSB7XHJcbiAgICAgIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckdyaWRcIik7XHJcbiAgICAgIGNvbnN0IHBsYXllclNlbGVjdEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGlvbi1ncmlkXCIpO1xyXG4gICAgICBwbGF5ZXJCb2FyZC5hZGRTaGlwVG9Cb2FyZChzaGlwLCBjb29yZGluYXRlc0Fycik7XHJcbiAgICAgIHJlbmRlclNoaXBzT25Cb2FyZChwbGF5ZXJCb2FyZCwgcGxheWVyR3JpZCk7XHJcbiAgICAgIHBsYXllclNlbGVjdEdyaWQucmVtb3ZlQ2hpbGQoc2VsZWN0ZWRTaGlwQ29udGFpbmVyKTtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBkcmFnRnVuY3Rpb25zO1xyXG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2JvYXJkXCI7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XHJcblxyXG5jb25zdCBnYW1lUGxheSA9IHtcclxuICBkYXRhOiB7XHJcbiAgICBnYW1lYm9hcmRzOiB7fSxcclxuICAgIHBsYXllcnM6IHt9LFxyXG4gICAgZ2FtZW9uOiBmYWxzZSxcclxuICB9LFxyXG5cclxuICBzZXR1cCgpIHtcclxuICAgIHRoaXMuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy5kYXRhLmdhbWVib2FyZHMuY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICAgIHRoaXMuZGF0YS5wbGF5ZXJzLmh1bWFuUGxheWVyID0gbmV3IFBsYXllcihcIlBsYXllclwiKTtcclxuICAgIHRoaXMuZGF0YS5wbGF5ZXJzLmNvbXB1dGVyUGxheWVyID0gbmV3IFBsYXllcihcIkNvbXB1dGVyXCIpO1xyXG5cclxuICAgIHRoaXMuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkLmNyZWF0ZUJvYXJkKCk7XHJcbiAgICB0aGlzLmRhdGEuZ2FtZWJvYXJkcy5jb21wdXRlckJvYXJkLmNyZWF0ZUJvYXJkKCk7XHJcbiAgfSxcclxuXHJcbiAgYWRkU2hpcHMoKSB7XHJcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IHRoaXMuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkO1xyXG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IHRoaXMuZGF0YS5nYW1lYm9hcmRzLmNvbXB1dGVyQm9hcmQ7XHJcbiAgICBwbGF5ZXJCb2FyZC5hZGRTaGlwKFwiZGVzdHJveWVyXCIsIDIpO1xyXG4gICAgcGxheWVyQm9hcmQuYWRkU2hpcChcInN1Ym1hcmluZVwiLCAzKTtcclxuICAgIHBsYXllckJvYXJkLmFkZFNoaXAoXCJjcnVpc2VyXCIsIDMpO1xyXG4gICAgcGxheWVyQm9hcmQuYWRkU2hpcChcImJhdHRsZXNoaXBcIiwgNCk7XHJcbiAgICBwbGF5ZXJCb2FyZC5hZGRTaGlwKFwiY2FycmllclwiLCA1KTtcclxuXHJcbiAgICBjb21wdXRlckJvYXJkLmFkZFNoaXAoXCJkZXN0cm95ZXJcIiwgMik7XHJcbiAgICBjb21wdXRlckJvYXJkLmFkZFNoaXAoXCJzdWJtYXJpbmVcIiwgMyk7XHJcbiAgICBjb21wdXRlckJvYXJkLmFkZFNoaXAoXCJjcnVpc2VyXCIsIDMpO1xyXG4gICAgY29tcHV0ZXJCb2FyZC5hZGRTaGlwKFwiYmF0dGxlc2hpcFwiLCA0KTtcclxuICAgIGNvbXB1dGVyQm9hcmQuYWRkU2hpcChcImNhcnJpZXJcIiwgNSk7XHJcblxyXG4gICAgY29tcHV0ZXJCb2FyZC5yYW5kb21TaGlwc0RpcmVjdGlvbigpO1xyXG4gICAgY29tcHV0ZXJCb2FyZC5wbGFjZVJhbmRvbVNoaXAoY29tcHV0ZXJCb2FyZC5zaGlwcyk7XHJcbiAgfSxcclxuXHJcbiAgcmVzZXRCb2FyZEFuZFNoaXBzKCkge1xyXG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSB0aGlzLmRhdGEuZ2FtZWJvYXJkcy5wbGF5ZXJCb2FyZDtcclxuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSB0aGlzLmRhdGEuZ2FtZWJvYXJkcy5jb21wdXRlckJvYXJkO1xyXG5cclxuICAgIHBsYXllckJvYXJkLmJvYXJkLmZvckVhY2goKG9iaiwgaW5kZXgpID0+IHtcclxuICAgICAgaWYgKG9iaiAhPT0gbnVsbCkge1xyXG4gICAgICAgIHBsYXllckJvYXJkLmJvYXJkW2luZGV4XSA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbXB1dGVyQm9hcmQuYm9hcmQuZm9yRWFjaCgob2JqLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAob2JqICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZFtpbmRleF0gPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHBsYXllckJvYXJkLnNoaXBzID0gW107XHJcbiAgICBjb21wdXRlckJvYXJkLnNoaXBzID0gW107XHJcbiAgICB0aGlzLmFkZFNoaXBzKCk7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlQm9hcmRJbmZvKGluZGV4LCBnYW1lYm9hcmQpIHtcclxuICAgIGxldCBib2FyZFJldHVybkluZm87XHJcblxyXG4gICAgaWYgKGdhbWVib2FyZC5ib2FyZFtpbmRleF0gIT09IG51bGwpIHtcclxuICAgICAgY29uc3Qgc2hpcE5hbWUgPSBnYW1lYm9hcmQuYm9hcmRbaW5kZXhdLmlkO1xyXG4gICAgICBnYW1lYm9hcmQuYm9hcmRbaW5kZXhdLnN0YXR1cyA9IFwiaGl0XCI7XHJcbiAgICAgIGJvYXJkUmV0dXJuSW5mbyA9IFwiaGl0XCI7XHJcbiAgICAgIGNvbnN0IFtzaGlwXSA9IGdhbWVib2FyZC5zaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXBOYW1lID09PSBzaGlwLm5hbWUpO1xyXG4gICAgICBzaGlwLmhpdChpbmRleCk7XHJcbiAgICAgIHNoaXAuaXNTdW5rKCk7XHJcbiAgICAgIGlmIChzaGlwLnN1bmsgPT09IHRydWUpIHtcclxuICAgICAgICBnYW1lYm9hcmQuYm9hcmQuZm9yRWFjaCgodGlsZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHRpbGUgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgIGlmICh0aWxlLmlkID09PSBzaGlwTmFtZSkge1xyXG4gICAgICAgICAgICB0aWxlLnN0YXR1cyA9IFwic3Vua1wiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJvYXJkUmV0dXJuSW5mbyA9IFwic3Vua1wiO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBnYW1lYm9hcmQuYm9hcmRbaW5kZXhdID0geyBzdGF0dXM6IFwibWlzc1wiIH07XHJcbiAgICAgIGJvYXJkUmV0dXJuSW5mbyA9IFwibWlzc1wiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJvYXJkUmV0dXJuSW5mbztcclxuICB9LFxyXG5cclxuICBjaGVja0lmR2FtZU92ZXIoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkLnNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLnN1bmsgPT09IHRydWUpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGAke3RoaXMuZGF0YS5wbGF5ZXJzLmNvbXB1dGVyUGxheWVyLm5hbWV9YDtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5kYXRhLmdhbWVib2FyZHMuY29tcHV0ZXJCb2FyZC5zaGlwcy5ldmVyeShcclxuICAgICAgICAoc2hpcCkgPT4gc2hpcC5zdW5rID09PSB0cnVlXHJcbiAgICAgIClcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gYCR7dGhpcy5kYXRhLnBsYXllcnMuaHVtYW5QbGF5ZXIubmFtZX1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lUGxheTtcclxuIiwiY2xhc3MgUGxheWVyIHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUpe1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmFuZG9tQXR0YWNrVmFsaWRTcG90cyhnYW1lYm9hcmQpIHtcclxuICAgICAgICBsZXQgcG9zc2libGVTcG90cyA9IFtdXHJcbiAgICAgICAgIGdhbWVib2FyZC5ib2FyZC5mb3JFYWNoKCh0aWxlLCBpbmRleCk9PntcclxuICAgICAgICAgICAgaWYodGlsZSA9PT0gbnVsbCB8fCAhdGlsZS5oYXNPd25Qcm9wZXJ0eSgnc3RhdHVzJykpIHBvc3NpYmxlU3BvdHMucHVzaChpbmRleClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnN0IHJhbmRvbVNwb3QgPSBwb3NzaWJsZVNwb3RzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlU3BvdHMubGVuZ3RoKV1cclxuICAgICAgICByZXR1cm4gcmFuZG9tU3BvdFxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRm9ySGl0cyhnYW1lYm9hcmQpe1xyXG4gICAgICAgIGNvbnN0IGhpdHNBcnIgPSBbXVxyXG4gICAgICAgIGdhbWVib2FyZC5ib2FyZC5mb3JFYWNoKGluZGV4PT57XHJcbiAgICAgICAgICAgaWYoaW5kZXggPT09IG51bGwpIHJldHVyblxyXG4gICAgICAgICAgIGVsc2UgaWYoaW5kZXguc3RhdHVzID09PSAnaGl0Jykge1xyXG4gICAgICAgICAgICAgICBoaXRzQXJyLnB1c2goZ2FtZWJvYXJkLmJvYXJkLmluZGV4T2YoaW5kZXgpKX19KVxyXG4gICAgICAgIHJldHVybiBoaXRzQXJyXHJcbiAgICB9XHJcblxyXG4gICAgLy9jaGVjayBmb3Igc3Vycm91bmRpbmcgdGlsZXNcclxuICAgIGNoZWNrRm9yU3Vycm91bmRpbmdUaWxlcyhpbmRleCwgZ2FtZWJvYXJkKXtcclxuICAgICAgICBsZXQgc3Vycm91bmRpbmdUaWxlcyA9IFtdXHJcbiAgICAgICAgY29uc3QgdG9wVGlsZSA9ICtpbmRleCAtIDEwXHJcbiAgICAgICAgY29uc3QgYm90dG9tVGlsZSA9ICtpbmRleCArIDEwXHJcbiAgICAgICAgY29uc3QgbGVmdFRpbGUgPSAraW5kZXggLSAxXHJcbiAgICAgICAgY29uc3QgcmlnaHRUaWxlID0gK2luZGV4ICsgMVxyXG4gICAgICAgIHN1cnJvdW5kaW5nVGlsZXMucHVzaCh0b3BUaWxlLGJvdHRvbVRpbGUsIGxlZnRUaWxlLCByaWdodFRpbGUgKVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrRm9yVmFsaWRUaWxlcyhpbmRleCxzdXJyb3VuZGluZ1RpbGVzLCBnYW1lYm9hcmQpXHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tGb3JWYWxpZFRpbGVzKGluZGV4LCBzdXJyb3VuZGluZ1RpbGVzLCBnYW1lYm9hcmQpe1xyXG4gICAgICAgIC8vaWYgbGVmdCBib3JkZXJcclxuICAgICAgICBpZihpbmRleCAlIDEwID09PSAwKSBzdXJyb3VuZGluZ1RpbGVzLnNwbGljZSgyLCAxKVxyXG4gICAgICAgIC8vaWYgcmlnaHQgYm9yZGVyXHJcbiAgICAgICAgaWYoaW5kZXggJSAxMCA9PT0gOSkgc3Vycm91bmRpbmdUaWxlcy5zcGxpY2UoMywgMSlcclxuICAgICAgICAvL2lmIHN1cnJvdW5kaW5nIHRpbGVzIGFyZSBvdXQgb2YgcmFuZ2VcclxuICAgICAgICBzdXJyb3VuZGluZ1RpbGVzID0gc3Vycm91bmRpbmdUaWxlcy5maWx0ZXIodGlsZT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gdGlsZSA+PSAwICYmIHRpbGUgPD0gIDk5XHJcbiAgICAgICAgfSkgIFxyXG4gIFxyXG4gICAgICAgIHN1cnJvdW5kaW5nVGlsZXMgPSBzdXJyb3VuZGluZ1RpbGVzLmZpbHRlcih0aWxlPT57XHJcbiAgICAgICAgICAgIGlmKGdhbWVib2FyZC5ib2FyZFt0aWxlXSA9PT0gbnVsbCB8fCAhZ2FtZWJvYXJkLmJvYXJkW3RpbGVdLmhhc093blByb3BlcnR5KCdzdGF0dXMnKSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gc3Vycm91bmRpbmdUaWxlc1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRm9yUG9zc2libGVTaGlwRGlyZWN0aW9uKGhpdHNBcnIsIGdhbWVib2FyZCl7XHJcbiAgICAgICAgbGV0IHBvc3NpYmxlU2hpcERpcmVjdGlvblxyXG4gICAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLmhpdHNBcnIpXHJcbiAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4uaGl0c0FycilcclxuICAgICAgICBpZihNYXRoLmFicyhoaXRzQXJyWzBdIC0gaGl0c0FyclsxXSkgPT09IDEwKSBwb3NzaWJsZVNoaXBEaXJlY3Rpb24gPSAndmVydGljYWwnXHJcbiAgICAgICAgaWYoTWF0aC5hYnMoaGl0c0FyclswXSAtIGhpdHNBcnJbMV0pID09PSAxKSBwb3NzaWJsZVNoaXBEaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCdcclxuXHJcbiAgICAgICAgaWYocG9zc2libGVTaGlwRGlyZWN0aW9uID09PSAndmVydGljYWwnICYmIHRoaXMuY2hlY2tGb3JWYWxpZFRpbGVzKG1pbiwgW21pbiAtIDEwLCBtYXggKyAxMF0sIGdhbWVib2FyZCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcG9zc2libGVTaGlwRGlyZWN0aW9uID0gJ2hvcml6b250YWwnfVxyXG5cclxuICAgICAgICBpZihwb3NzaWJsZVNoaXBEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyAmJiB0aGlzLmNoZWNrRm9yVmFsaWRUaWxlcyhtaW4sIFttaW4gLSAxLCBtYXggKyAxXSwgZ2FtZWJvYXJkKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgIHBvc3NpYmxlU2hpcERpcmVjdGlvbiA9ICd2ZXJ0aWNhbCd9XHJcbiAgICAgICAgcmV0dXJuIHBvc3NpYmxlU2hpcERpcmVjdGlvblxyXG4gICAgfVxyXG5cclxuICAgIGF0dGFja1NoaXBEaXJlY3Rpb24oaGl0c0FyciwgZGlyZWN0aW9uLCBnYW1lYm9hcmQpe1xyXG4gICAgICAgIGxldCBiZXN0QXR0YWNrU3BvdFxyXG4gICAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLmhpdHNBcnIpXHJcbiAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4uaGl0c0FycilcclxuXHJcbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSAndmVydGljYWwnKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jaGVja0ZvclZhbGlkVGlsZXMobWluLCBbbWluIC0gMTBdLCBnYW1lYm9hcmQpLmxlbmd0aCkgYmVzdEF0dGFja1Nwb3QgPSBtaW4gLSAxMFxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuY2hlY2tGb3JWYWxpZFRpbGVzKG1heCwgW21heCArIDEwXSwgZ2FtZWJvYXJkKS5sZW5ndGgpYmVzdEF0dGFja1Nwb3QgPSBtYXggKyAxMFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hlY2tGb3JWYWxpZFRpbGVzKG1pbiwgW21pbiAtIDFdLCBnYW1lYm9hcmQpLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIGJlc3RBdHRhY2tTcG90ID0gbWluIC0gMVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuY2hlY2tGb3JWYWxpZFRpbGVzKG1heCwgW21heCArIDFdLCBnYW1lYm9hcmQpLmxlbmd0aCkgYmVzdEF0dGFja1Nwb3QgPSBtYXggKyAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiZXN0QXR0YWNrU3BvdFxyXG4gICAgfSAgICBcclxuXHJcbiAgICBhdHRhY2tCb2FyZChnYW1lYm9hcmQpe1xyXG4gICAgICAgIGxldCBiZXN0QXR0YWNrU3BvdFxyXG4gICAgICAgIGNvbnN0IGhpdHNBcnIgPSB0aGlzLmNoZWNrRm9ySGl0cyhnYW1lYm9hcmQpXHJcbiAgICAgICAgaWYoIWhpdHNBcnIubGVuZ3RoKXtcclxuICAgICAgICAgICAgYmVzdEF0dGFja1Nwb3QgPSB0aGlzLnJhbmRvbUF0dGFja1ZhbGlkU3BvdHMoZ2FtZWJvYXJkKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihoaXRzQXJyLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1cnJvdW5kaW5nVGlsZXMgPSB0aGlzLmNoZWNrRm9yU3Vycm91bmRpbmdUaWxlcyhbaGl0c0Fycl0sIGdhbWVib2FyZClcclxuICAgICAgICAgICAgYmVzdEF0dGFja1Nwb3QgPSBzdXJyb3VuZGluZ1RpbGVzWzBdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGhpdHNBcnIubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc3NpYmxlU2hpcERpcmVjdGlvbiA9IHRoaXMuY2hlY2tGb3JQb3NzaWJsZVNoaXBEaXJlY3Rpb24oaGl0c0FyciwgZ2FtZWJvYXJkKVxyXG5cclxuICAgICAgICAgICAgYmVzdEF0dGFja1Nwb3QgPSB0aGlzLmF0dGFja1NoaXBEaXJlY3Rpb24oaGl0c0FyciwgcG9zc2libGVTaGlwRGlyZWN0aW9uLCBnYW1lYm9hcmQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiZXN0QXR0YWNrU3BvdFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXJcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiY2xhc3MgU2hpcCB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBzaGlwTGVuZ3RoLCBkaXJlY3Rpb24gPSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgIHRoaXMuc2hpcExlbmd0aCA9IHNoaXBMZW5ndGg7XHJcbiAgICAgIHRoaXMuY29vcmRzID0gW107XHJcbiAgICAgIHRoaXMuc3VuayA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlzU3VuaygpIHtcclxuICAgICAgaWYgKHRoaXMuY29vcmRzLmxlbmd0aCA9PT0gdGhpcy5zaGlwTGVuZ3RoKSB0aGlzLnN1bmsgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGhpdChpbmRleCl7XHJcbiAgICAgIGlmKHRoaXMuY29vcmRzLmluY2x1ZGVzKGluZGV4KSkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmNvb3Jkcy5wdXNoKGluZGV4KVxyXG4gICAgfVxyXG5cclxuICAgIHJhbmRvbURpcmVjdGlvbigpIHtcclxuICAgICAgICBjb25zdCByYW5kb21EaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcclxuICAgICAgICBpZiAocmFuZG9tRGlyZWN0aW9uID09PSAwKSB0aGlzLmRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgICAgIGlmIChyYW5kb21EaXJlY3Rpb24gPT09IDEpIHRoaXMuZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBleHBvcnQgZGVmYXVsdCBTaGlwIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2FtZVBsYXkgZnJvbSAnLi9nYW1lcGxheSdcclxuaW1wb3J0IHsgcmVuZGVyQWxsIH0gZnJvbSAnLi9kb20nXHJcblxyXG5cclxuZ2FtZVBsYXkuc2V0dXAoKVxyXG5nYW1lUGxheS5hZGRTaGlwcygpXHJcbnJlbmRlckFsbCgpXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=
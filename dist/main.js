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
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board */ "./src/board.js");
/* harmony import */ var _dragfunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dragfunctions */ "./src/dragfunctions.js");
/* harmony import */ var _gameplay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameplay */ "./src/gameplay.js");





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
    _gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameboards.playerBoard.ships.forEach((ship) => {
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

const applySelectorsAndListeners = () => {
  const startBtn = document.querySelector("#start-btn");
  const rotateBtn = document.querySelector("#rotate-btn");
  const resetBtn = document.querySelector("#reset-btn");
  const randomPlaceBtn = document.querySelector("#random-btn");
  const displayGameInfo = document.querySelector(".game-info");
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
  renderBoard(_gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameboards.playerBoard, playerGrid);
  renderBoard(_gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameboards.computerBoard, computerGrid);
  renderShipsOnBoard(_gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameboards.computerBoard, computerGrid);
  renderSelectionGrid(_gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameboards.playerBoard.ships);

  displayGameInfo.textContent = "Drag and drop your ships to begin!";
};

const randomPlacePlayerShips = () => {
  const playerGrid = document.querySelector(".playerGrid");
  const playerSelectGrid = document.querySelector(".selection-grid");
  const displayGameInfo = document.querySelector(".game-info");
  const takenTiles = playerGrid.getElementsByClassName("taken");
  if (takenTiles.length > 0) {
    displayGameInfo.textContent =
      "Please reset the board before you may randomly place ships";
    return;
  }
  clearContainer(playerSelectGrid);
  _gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameboards.playerBoard.randomShipsDirection();
  _gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameboards.playerBoard.placeRandomShip(
    _gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameboards.playerBoard.ships
  );
  renderShipsOnBoard(_gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameboards.playerBoard, playerGrid);
  displayGameInfo.textContent = "All ships deployed! Click Start Game to play!";
};

const resetGame = () => {
  const computerGrid = document.querySelector(".computerGrid");
  const playerGrid = document.querySelector(".playerGrid");
  const playerSelectGrid = document.querySelector(".selection-grid");

  clearContainer(playerGrid);
  clearContainer(computerGrid);
  clearContainer(playerSelectGrid);
  _gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameon = false;
  _gameplay__WEBPACK_IMPORTED_MODULE_3__.default.resetBoardAndShips();
  renderAll();
  changeGameMode();
  applySelectorsAndListeners();
};

const startGame = () => {
  const playerSelectGrid = document.querySelector(".selection-grid");
  const ship = document.querySelector(".ship");
  const displayGameInfo = document.querySelector(".game-info");
  if (playerSelectGrid.contains(ship)) {
    displayGameInfo.textContent = "Please deploy all ships to start game";
    return;
  }
  _gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameon = true;
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
  const computerBoard = _gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameboards.computerBoard;
  const displayGameInfo = document.querySelector(".game-info");
  let index = e.target.id;
  if (e.target.classList.contains("hit") || e.target.classList.contains("miss"))
    return;

  const shipName = e.target.classList[2];
  const boardReturnInfo = _gameplay__WEBPACK_IMPORTED_MODULE_3__.default.updateBoardInfo(index, computerBoard);
  console.log(boardReturnInfo);

  switch (boardReturnInfo) {
    case "miss":
      e.target.classList.add("miss");
      console.log("miss");
      break;
    case "hit":
      e.target.classList.add("hit");
      console.log("hit");
      break;
    case "sunk":
      const shipTiles = computerGrid.querySelectorAll(`.${shipName}`);
      shipTiles.forEach((tile) => {
        tile.classList.add("sunk");
      });
      break;
    default:
      console.log("default");
      return;
  }
  const gameOver = _gameplay__WEBPACK_IMPORTED_MODULE_3__.default.checkIfGameOver();
  if (gameOver) {
    disableClicks();
    displayGameInfo.textContent = `Game Over! ${gameOver} wins!`;
  } else {
    computerAttack();
  }
};

const computerAttack = () => {
  const playerBoard = _gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameboards.playerBoard;
  const playerGrid = document.querySelector(".playerGrid");
  const playerGridTiles = playerGrid.querySelectorAll("div");
  let index = playerBoard.generateRandomNumber();
  if (
    playerGridTiles[index].classList.contains("hit") ||
    playerGridTiles[index].classList.contains("miss")
  )
    computerAttack();

  const boardReturnInfo = _gameplay__WEBPACK_IMPORTED_MODULE_3__.default.updateBoardInfo(index, playerBoard);

  switch (boardReturnInfo) {
    case "miss":
      playerGridTiles[index].classList.add("miss");
      console.log("miss");
      break;
    case "hit":
      playerGridTiles[index].classList.add("hit");
      console.log("hit");
      break;
    case "sunk":
      const shipTiles = playerGrid.querySelectorAll(`.${shipName}`);
      shipTiles.forEach((tile) => {
        tile.classList.add("sunk");
      });
      break;
    default:
      console.log("default");
      return;
  }
  const gameOver = _gameplay__WEBPACK_IMPORTED_MODULE_3__.default.checkIfGameOver();
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

  if (_gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameon === false) {
    displayGameInfo.textContent = "Drag and drop your ships to begin!";
    computerGrid.classList.add("hidden");
    startBtn.classList.remove("hidden");
    rotateBtn.classList.remove("hidden");
    randomPlaceBtn.classList.remove("hidden");
    playerSelectGrid.classList.remove("hidden");
  }

  if (_gameplay__WEBPACK_IMPORTED_MODULE_3__.default.data.gameon === true) {
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
    ships.forEach((ship) => ship.addEventListener("dragend", dragFunctions.dragEnd));
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
        selectedShipContainer.add('hide');
      }, 0);
  },

  dragEnter(e) {
    e.preventDefault();
  },

  dragOver(e) {
    e.preventDefault();
  },

  dragLeave(e) {
    e.preventDefault()
  },

  dragEnd(e) {
    e.preventDefault()
    console.log(selectedShipContainer)
    selectedShipContainer.classList.remove('hide')
  },

  dragDrop(e) {
    let adjustedBoardTile;
    const playerBoard = _gameplay__WEBPACK_IMPORTED_MODULE_0__.default.data.gameboards.playerBoard;
    const [ship] = playerBoard.ships.filter((ship) => {
      return ship.name === selectedShipName;
    });

    if (ship.direction === "vertical") {
      adjustedBoardTile = parseInt(e.target.id) - selectedShipPart * 10;
      if(!(adjustedBoardTile < playerBoard.WIDTH * (playerBoard.WIDTH - ship.shipLength + 1))) return
    }
    if (ship.direction === "horizontal") {
      adjustedBoardTile = parseInt(e.target.id) - selectedShipPart;
      if(!(adjustedBoardTile % playerBoard.WIDTH < playerBoard.WIDTH - ship.shipLength + 1)) return; 
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
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board */ "./src/board.js");
/* harmony import */ var _dragfunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dragfunctions */ "./src/dragfunctions.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ "./src/dom.js");






const gamePlay = {
  data: {
    gameboards: {},
    gameon: false,
  },

  setup() {
    this.data.gameboards.playerBoard = new _board__WEBPACK_IMPORTED_MODULE_1__.default();
    this.data.gameboards.computerBoard = new _board__WEBPACK_IMPORTED_MODULE_1__.default();

    this.data.gameboards.playerBoard.createBoard();
    this.data.gameboards.computerBoard.createBoard();

    // this.data.players.humanPlayer = new Player
    // this.data.players.computerPlayer = new Player
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
      return "Computer";
    }
    if (
      this.data.gameboards.computerBoard.ships.every(
        (ship) => ship.sunk === true
      )
    ) {
      return "Player";
    }
    return false;
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gamePlay);


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
/* harmony import */ var _dragfunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dragfunctions */ "./src/dragfunctions.js");




_gameplay__WEBPACK_IMPORTED_MODULE_0__.default.setup()
_gameplay__WEBPACK_IMPORTED_MODULE_0__.default.addShips()
;(0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderAll)()
_dragfunctions__WEBPACK_IMPORTED_MODULE_2__.default.addDragListeners()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZHJhZ2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLDBDQUFJO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsYUFBYTs7QUFFYjs7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RUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3pHeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUUsaUVBQWUsSTs7Ozs7O1VDekJqQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDTmlDO0FBQ0E7QUFDVTs7QUFFM0Msb0RBQWM7QUFDZCx1REFBaUI7QUFDakIsZ0RBQVM7QUFDVCxvRUFBOEIsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xyXG5cclxuY2xhc3MgR2FtZWJvYXJkIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICB0aGlzLmJvYXJkID0gW11cclxuICAgICAgdGhpcy5zaGlwcyA9IFtdO1xyXG4gICAgICB0aGlzLldJRFRIID0gMTA7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBjcmVhdGVCb2FyZCgpe1xyXG4gICAgICB0aGlzLmJvYXJkID0gbmV3IEFycmF5KDEwMCkuZmlsbChudWxsKVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFNoaXAobmFtZSwgbGVuZ3RoKXtcclxuICAgICAgdGhpcy5zaGlwcy5wdXNoKG5ldyBTaGlwKG5hbWUsIGxlbmd0aCkpXHJcbiAgICAgIH1cclxuXHJcbiAgICBhZGRTaGlwVG9Cb2FyZChzaGlwLCBjb29yZGluYXRlc0Fycil7XHJcbiAgICAgICAgY29vcmRpbmF0ZXNBcnIuZm9yRWFjaChjb29yZGluYXRlPT57XHJcbiAgICAgICAgICB0aGlzLmJvYXJkW2Nvb3JkaW5hdGVdID0ge1xyXG4gICAgICAgICAgICBpZDogc2hpcC5uYW1lfVxyXG4gICAgICB9KX1cclxuICAgIFxyXG4gICAgLy9nZW5lcmF0ZSBhIHZhbGlkIHJhbmRvbSBzcG90IGJhc2VkIG9uIHNoaXAgZGlyZWN0aW9uIGFuZCBsZW5ndGhcclxuICAgIGdlbmVyYXRlUmFuZG9tQ29vcmRzKHNoaXApIHtcclxuICAgICAgbGV0IHJhbmRvbVNwb3QgPSB0aGlzLmdlbmVyYXRlUmFuZG9tTnVtYmVyKClcclxuICBcclxuICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgIHJldHVybiByYW5kb21TcG90ICUgdGhpcy5XSURUSCA8IHRoaXMuV0lEVEggLSBzaGlwLnNoaXBMZW5ndGggKyAxXHJcbiAgICAgICAgICA/IHJhbmRvbVNwb3RcclxuICAgICAgICAgIDogdGhpcy5nZW5lcmF0ZVJhbmRvbUNvb3JkcyhzaGlwKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xyXG4gICAgICAgIHJldHVybiByYW5kb21TcG90IDwgdGhpcy5XSURUSCAqICh0aGlzLldJRFRIIC0gc2hpcC5zaGlwTGVuZ3RoICsgMSlcclxuICAgICAgICAgID8gcmFuZG9tU3BvdFxyXG4gICAgICAgICAgOiB0aGlzLmdlbmVyYXRlUmFuZG9tQ29vcmRzKHNoaXApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9yZXR1cm5zIGEgbnVtYmVyIGZyb20gMC05OVxyXG4gICAgZ2VuZXJhdGVSYW5kb21OdW1iZXIoKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLldJRFRIICogdGhpcy5XSURUSCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9nZW5lcmF0ZXMgYW4gYXJyYXkgb2YgY29vcmRpbmF0ZXMgYmFzZWQgb24gc2hpcCBkaXJlY3Rpb24gYW5kIGxlbmd0aFxyXG4gICAgZ2VuZXJhdGVTaGlwQ29vcmRzKGNvb3JkLCBzaGlwKXtcclxuICAgICAgbGV0IGNvb3JkaW5hdGVzQXJyID0gW11cclxuICAgICAgXHJcbiAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBsZXQgaW5kZXggPSBjb29yZCArIGk7XHJcbiAgICAgICAgICBjb29yZGluYXRlc0Fyci5wdXNoKGluZGV4KTtcclxuICAgICAgICB9fVxyXG4gICAgICBcclxuICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBsZXQgaW5kZXggPSBjb29yZCArIDEwICogaTtcclxuICAgICAgICAgIGNvb3JkaW5hdGVzQXJyLnB1c2goaW5kZXgpO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgcmV0dXJuIGNvb3JkaW5hdGVzQXJyXHJcbiAgICB9XHJcblxyXG4gICAgLy9jaGVjayBpZiBib2FyZCBzcGFjZSBpcyB0YWtlblxyXG4gICAgY2hlY2tJZkNvb3Jkc1ZhbGlkKGNvb3JkaW5hdGVzQXJyKXtcclxuICAgICAgaWYgKGNvb3JkaW5hdGVzQXJyLnNvbWUoKGNvb3JkKT0+XHJcbiAgICAgICAgdGhpcy5ib2FyZFtjb29yZF0gIT09IG51bGwpKSB7cmV0dXJuIGZhbHNlO31cclxuICAgICAgICBlbHNle3JldHVybiB0cnVlO31cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL2dlbmVyYXRlIHZhbGlkIHNoaXAgY29vcmRzIGFuZCBhZGQgdGhlbSBpbnRvIGJvYXJkIGFycmF5XHJcbiAgICBnZW5lcmF0ZVJhbmRvbVNoaXBDb29yZHMoc2hpcCl7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZW5lcmF0ZVJhbmRvbUNvb3JkcyhzaGlwKVxyXG4gICAgICAgIGxldCBjb29yZGluYXRlc0FyciA9IHRoaXMuZ2VuZXJhdGVTaGlwQ29vcmRzKGluZGV4LCBzaGlwKVxyXG4gICAgICAgIGxldCB2YWxpZENvb3JkcyA9IHRoaXMuY2hlY2tJZkNvb3Jkc1ZhbGlkKGNvb3JkaW5hdGVzQXJyKVxyXG4gICAgICAgIGlmKHZhbGlkQ29vcmRzID09PSB0cnVlKXtcclxuICAgICAgICAgICB0aGlzLmFkZFNoaXBUb0JvYXJkKHNoaXAsIGNvb3JkaW5hdGVzQXJyKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgdGhpcy5nZW5lcmF0ZVJhbmRvbVNoaXBDb29yZHMoc2hpcClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGxhY2VSYW5kb21TaGlwKGFycil7XHJcbiAgICAgIGFyci5mb3JFYWNoKHNoaXA9PntcclxuICAgICAgICB0aGlzLmdlbmVyYXRlUmFuZG9tU2hpcENvb3JkcyhzaGlwKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJhbmRvbVNoaXBzRGlyZWN0aW9uKCl7XHJcbiAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwPT57XHJcbiAgICAgICAgc2hpcC5yYW5kb21EaXJlY3Rpb24oKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xyXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2JvYXJkXCI7XHJcbmltcG9ydCBkcmFnRnVuY3Rpb25zIGZyb20gXCIuL2RyYWdmdW5jdGlvbnNcIjtcclxuaW1wb3J0IGdhbWVQbGF5IGZyb20gXCIuL2dhbWVwbGF5XCI7XHJcblxyXG5jb25zdCByZW5kZXJCb2FyZCA9IChnYW1lQm9hcmQsIGRpc3BsYXlHYW1lQm9hcmQpID0+IHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBnYW1lQm9hcmQuYm9hcmQubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IHRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGlsZS5jbGFzc0xpc3QuYWRkKFwidGlsZVwiKTtcclxuICAgIHRpbGUuaWQgPSBpO1xyXG4gICAgZGlzcGxheUdhbWVCb2FyZC5hcHBlbmRDaGlsZCh0aWxlKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCByZW5kZXJTaGlwc09uQm9hcmQgPSAoZ2FtZUJvYXJkLCBkaXNwbGF5R2FtZUJvYXJkKSA9PiB7XHJcbiAgZ2FtZUJvYXJkLmJvYXJkLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICBkaXNwbGF5R2FtZUJvYXJkLmNoaWxkTm9kZXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICAgXCJ0YWtlblwiLFxyXG4gICAgICAgIGAke2VsZW1lbnQuaWR9YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgcmVuZGVyU2VsZWN0aW9uR3JpZCA9IChzaGlwc0FycikgPT4ge1xyXG4gIGNvbnN0IHBsYXllclNlbGVjdEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGlvbi1ncmlkXCIpO1xyXG4gIHNoaXBzQXJyLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgIGxldCBzaGlwRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzaGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiLCBgJHtzaGlwLm5hbWV9YCk7XHJcbiAgICBzaGlwRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgdHJ1ZSk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCB0aWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgdGlsZS5pZCA9IGAke3NoaXAubmFtZX0tJHtpfWA7XHJcbiAgICAgIHNoaXBFbGVtZW50LmFwcGVuZENoaWxkKHRpbGUpO1xyXG4gICAgICBwbGF5ZXJTZWxlY3RHcmlkLmFwcGVuZENoaWxkKHNoaXBFbGVtZW50KTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJvdGF0ZVBsYXllclNoaXBzID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm90YXRlLWJ0blwiKTtcclxuICBjb25zdCBwbGF5ZXJTZWxlY3RHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3Rpb24tZ3JpZFwiKTtcclxuICBjb25zdCBzaGlwcyA9IHBsYXllclNlbGVjdEdyaWQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xyXG4gIHBsYXllclNlbGVjdEdyaWQuY2xhc3NMaXN0LnRvZ2dsZShcImhvcml6b250YWxcIik7XHJcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgY29uc3Qgc2hpcE5hbWUgPSBzaGlwLmZpcnN0Q2hpbGQuaWQuc2xpY2UoMCwgLTIpO1xyXG4gICAgc2hpcC5jbGFzc0xpc3QudG9nZ2xlKGAke3NoaXBOYW1lfS1ob3Jpem9udGFsYCk7XHJcbiAgICBzaGlwLmNsYXNzTGlzdC50b2dnbGUoYCR7c2hpcE5hbWV9YCk7XHJcbiAgICBnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICBpZiAoc2hpcC5uYW1lID09PSBzaGlwTmFtZSkge1xyXG4gICAgICAgIHNoaXAuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCJcclxuICAgICAgICAgID8gKHNoaXAuZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCIpXHJcbiAgICAgICAgICA6IChzaGlwLmRpcmVjdGlvbiA9IFwidmVydGljYWxcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgY2xlYXJDb250YWluZXIgPSAoY29udGFpbmVyKSA9PiB7XHJcbiAgd2hpbGUgKGNvbnRhaW5lci5maXJzdENoaWxkKSB7XHJcbiAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGFwcGx5U2VsZWN0b3JzQW5kTGlzdGVuZXJzID0gKCkgPT4ge1xyXG4gIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGFydC1idG5cIik7XHJcbiAgY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb3RhdGUtYnRuXCIpO1xyXG4gIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZXNldC1idG5cIik7XHJcbiAgY29uc3QgcmFuZG9tUGxhY2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JhbmRvbS1idG5cIik7XHJcbiAgY29uc3QgZGlzcGxheUdhbWVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWluZm9cIik7XHJcbiAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByb3RhdGVQbGF5ZXJTaGlwcyk7XHJcbiAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0R2FtZSk7XHJcbiAgcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlc2V0R2FtZSk7XHJcbiAgcmFuZG9tUGxhY2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJhbmRvbVBsYWNlUGxheWVyU2hpcHMpO1xyXG59O1xyXG5cclxuY29uc3QgcmVuZGVyQWxsID0gKCkgPT4ge1xyXG4gIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckdyaWRcIik7XHJcbiAgY29uc3QgY29tcHV0ZXJHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlckdyaWRcIik7XHJcbiAgY29uc3QgZGlzcGxheUdhbWVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWluZm9cIik7XHJcblxyXG4gIGFwcGx5U2VsZWN0b3JzQW5kTGlzdGVuZXJzKCk7XHJcbiAgcmVuZGVyQm9hcmQoZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkLCBwbGF5ZXJHcmlkKTtcclxuICByZW5kZXJCb2FyZChnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMuY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJHcmlkKTtcclxuICByZW5kZXJTaGlwc09uQm9hcmQoZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLmNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyR3JpZCk7XHJcbiAgcmVuZGVyU2VsZWN0aW9uR3JpZChnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQuc2hpcHMpO1xyXG5cclxuICBkaXNwbGF5R2FtZUluZm8udGV4dENvbnRlbnQgPSBcIkRyYWcgYW5kIGRyb3AgeW91ciBzaGlwcyB0byBiZWdpbiFcIjtcclxufTtcclxuXHJcbmNvbnN0IHJhbmRvbVBsYWNlUGxheWVyU2hpcHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyR3JpZFwiKTtcclxuICBjb25zdCBwbGF5ZXJTZWxlY3RHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3Rpb24tZ3JpZFwiKTtcclxuICBjb25zdCBkaXNwbGF5R2FtZUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtaW5mb1wiKTtcclxuICBjb25zdCB0YWtlblRpbGVzID0gcGxheWVyR3JpZC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGFrZW5cIik7XHJcbiAgaWYgKHRha2VuVGlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgZGlzcGxheUdhbWVJbmZvLnRleHRDb250ZW50ID1cclxuICAgICAgXCJQbGVhc2UgcmVzZXQgdGhlIGJvYXJkIGJlZm9yZSB5b3UgbWF5IHJhbmRvbWx5IHBsYWNlIHNoaXBzXCI7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNsZWFyQ29udGFpbmVyKHBsYXllclNlbGVjdEdyaWQpO1xyXG4gIGdhbWVQbGF5LmRhdGEuZ2FtZWJvYXJkcy5wbGF5ZXJCb2FyZC5yYW5kb21TaGlwc0RpcmVjdGlvbigpO1xyXG4gIGdhbWVQbGF5LmRhdGEuZ2FtZWJvYXJkcy5wbGF5ZXJCb2FyZC5wbGFjZVJhbmRvbVNoaXAoXHJcbiAgICBnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQuc2hpcHNcclxuICApO1xyXG4gIHJlbmRlclNoaXBzT25Cb2FyZChnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQsIHBsYXllckdyaWQpO1xyXG4gIGRpc3BsYXlHYW1lSW5mby50ZXh0Q29udGVudCA9IFwiQWxsIHNoaXBzIGRlcGxveWVkISBDbGljayBTdGFydCBHYW1lIHRvIHBsYXkhXCI7XHJcbn07XHJcblxyXG5jb25zdCByZXNldEdhbWUgPSAoKSA9PiB7XHJcbiAgY29uc3QgY29tcHV0ZXJHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlckdyaWRcIik7XHJcbiAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyR3JpZFwiKTtcclxuICBjb25zdCBwbGF5ZXJTZWxlY3RHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3Rpb24tZ3JpZFwiKTtcclxuXHJcbiAgY2xlYXJDb250YWluZXIocGxheWVyR3JpZCk7XHJcbiAgY2xlYXJDb250YWluZXIoY29tcHV0ZXJHcmlkKTtcclxuICBjbGVhckNvbnRhaW5lcihwbGF5ZXJTZWxlY3RHcmlkKTtcclxuICBnYW1lUGxheS5kYXRhLmdhbWVvbiA9IGZhbHNlO1xyXG4gIGdhbWVQbGF5LnJlc2V0Qm9hcmRBbmRTaGlwcygpO1xyXG4gIHJlbmRlckFsbCgpO1xyXG4gIGNoYW5nZUdhbWVNb2RlKCk7XHJcbiAgYXBwbHlTZWxlY3RvcnNBbmRMaXN0ZW5lcnMoKTtcclxufTtcclxuXHJcbmNvbnN0IHN0YXJ0R2FtZSA9ICgpID0+IHtcclxuICBjb25zdCBwbGF5ZXJTZWxlY3RHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3Rpb24tZ3JpZFwiKTtcclxuICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwXCIpO1xyXG4gIGNvbnN0IGRpc3BsYXlHYW1lSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1pbmZvXCIpO1xyXG4gIGlmIChwbGF5ZXJTZWxlY3RHcmlkLmNvbnRhaW5zKHNoaXApKSB7XHJcbiAgICBkaXNwbGF5R2FtZUluZm8udGV4dENvbnRlbnQgPSBcIlBsZWFzZSBkZXBsb3kgYWxsIHNoaXBzIHRvIHN0YXJ0IGdhbWVcIjtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgZ2FtZVBsYXkuZGF0YS5nYW1lb24gPSB0cnVlO1xyXG4gIGNoYW5nZUdhbWVNb2RlKCk7XHJcbn07XHJcblxyXG5jb25zdCBkaXNhYmxlQ2xpY2tzID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNvbXB1dGVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJHcmlkXCIpO1xyXG4gIGNvbnN0IGNvbXB1dGVyVGlsZXMgPSBjb21wdXRlckdyaWQucXVlcnlTZWxlY3RvckFsbChcImRpdlwiKTtcclxuICBjb21wdXRlclRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcclxuICAgIGNvbnN0IG5ld1RpbGUgPSB0aWxlLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHRpbGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3VGlsZSwgdGlsZSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBwbGF5ZXJBdHRhY2sgPSAoZSkgPT4ge1xyXG4gIGNvbnN0IGNvbXB1dGVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJHcmlkXCIpO1xyXG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMuY29tcHV0ZXJCb2FyZDtcclxuICBjb25zdCBkaXNwbGF5R2FtZUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtaW5mb1wiKTtcclxuICBsZXQgaW5kZXggPSBlLnRhcmdldC5pZDtcclxuICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1pc3NcIikpXHJcbiAgICByZXR1cm47XHJcblxyXG4gIGNvbnN0IHNoaXBOYW1lID0gZS50YXJnZXQuY2xhc3NMaXN0WzJdO1xyXG4gIGNvbnN0IGJvYXJkUmV0dXJuSW5mbyA9IGdhbWVQbGF5LnVwZGF0ZUJvYXJkSW5mbyhpbmRleCwgY29tcHV0ZXJCb2FyZCk7XHJcbiAgY29uc29sZS5sb2coYm9hcmRSZXR1cm5JbmZvKTtcclxuXHJcbiAgc3dpdGNoIChib2FyZFJldHVybkluZm8pIHtcclxuICAgIGNhc2UgXCJtaXNzXCI6XHJcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm1pc3NcIik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImhpdFwiOlxyXG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImhpdFwiKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwic3Vua1wiOlxyXG4gICAgICBjb25zdCBzaGlwVGlsZXMgPSBjb21wdXRlckdyaWQucXVlcnlTZWxlY3RvckFsbChgLiR7c2hpcE5hbWV9YCk7XHJcbiAgICAgIHNoaXBUaWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XHJcbiAgICAgICAgdGlsZS5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgY29uc29sZS5sb2coXCJkZWZhdWx0XCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IGdhbWVPdmVyID0gZ2FtZVBsYXkuY2hlY2tJZkdhbWVPdmVyKCk7XHJcbiAgaWYgKGdhbWVPdmVyKSB7XHJcbiAgICBkaXNhYmxlQ2xpY2tzKCk7XHJcbiAgICBkaXNwbGF5R2FtZUluZm8udGV4dENvbnRlbnQgPSBgR2FtZSBPdmVyISAke2dhbWVPdmVyfSB3aW5zIWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbXB1dGVyQXR0YWNrKCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgY29tcHV0ZXJBdHRhY2sgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQ7XHJcbiAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyR3JpZFwiKTtcclxuICBjb25zdCBwbGF5ZXJHcmlkVGlsZXMgPSBwbGF5ZXJHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXZcIik7XHJcbiAgbGV0IGluZGV4ID0gcGxheWVyQm9hcmQuZ2VuZXJhdGVSYW5kb21OdW1iZXIoKTtcclxuICBpZiAoXHJcbiAgICBwbGF5ZXJHcmlkVGlsZXNbaW5kZXhdLmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSB8fFxyXG4gICAgcGxheWVyR3JpZFRpbGVzW2luZGV4XS5jbGFzc0xpc3QuY29udGFpbnMoXCJtaXNzXCIpXHJcbiAgKVxyXG4gICAgY29tcHV0ZXJBdHRhY2soKTtcclxuXHJcbiAgY29uc3QgYm9hcmRSZXR1cm5JbmZvID0gZ2FtZVBsYXkudXBkYXRlQm9hcmRJbmZvKGluZGV4LCBwbGF5ZXJCb2FyZCk7XHJcblxyXG4gIHN3aXRjaCAoYm9hcmRSZXR1cm5JbmZvKSB7XHJcbiAgICBjYXNlIFwibWlzc1wiOlxyXG4gICAgICBwbGF5ZXJHcmlkVGlsZXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm1pc3NcIik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImhpdFwiOlxyXG4gICAgICBwbGF5ZXJHcmlkVGlsZXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaGl0XCIpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJzdW5rXCI6XHJcbiAgICAgIGNvbnN0IHNoaXBUaWxlcyA9IHBsYXllckdyaWQucXVlcnlTZWxlY3RvckFsbChgLiR7c2hpcE5hbWV9YCk7XHJcbiAgICAgIHNoaXBUaWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XHJcbiAgICAgICAgdGlsZS5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgY29uc29sZS5sb2coXCJkZWZhdWx0XCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IGdhbWVPdmVyID0gZ2FtZVBsYXkuY2hlY2tJZkdhbWVPdmVyKCk7XHJcbiAgaWYgKGdhbWVPdmVyKSB7XHJcbiAgICBkaXNhYmxlQ2xpY2tzKCk7XHJcbiAgICBkaXNwbGF5R2FtZUluZm8udGV4dENvbnRlbnQgPSBgR2FtZSBPdmVyISAke2dhbWVPdmVyfSB3aW5zIWA7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgY2hhbmdlR2FtZU1vZGUgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyU2VsZWN0R3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLWdyaWRcIik7XHJcbiAgY29uc3QgZGlzcGxheUdhbWVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWluZm9cIik7XHJcbiAgY29uc3QgY29tcHV0ZXJHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlckdyaWRcIik7XHJcbiAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0LWJ0blwiKTtcclxuICBjb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvdGF0ZS1idG5cIik7XHJcbiAgY29uc3QgcmFuZG9tUGxhY2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JhbmRvbS1idG5cIik7XHJcblxyXG4gIGlmIChnYW1lUGxheS5kYXRhLmdhbWVvbiA9PT0gZmFsc2UpIHtcclxuICAgIGRpc3BsYXlHYW1lSW5mby50ZXh0Q29udGVudCA9IFwiRHJhZyBhbmQgZHJvcCB5b3VyIHNoaXBzIHRvIGJlZ2luIVwiO1xyXG4gICAgY29tcHV0ZXJHcmlkLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICBzdGFydEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgcm90YXRlQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICByYW5kb21QbGFjZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgcGxheWVyU2VsZWN0R3JpZC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGdhbWVQbGF5LmRhdGEuZ2FtZW9uID09PSB0cnVlKSB7XHJcbiAgICBkaXNwbGF5R2FtZUluZm8udGV4dENvbnRlbnQgPSBcIkNsaWNrIG9uIGFuIGVuZW15IHRpbGUgdG8gYXR0YWNrIVwiO1xyXG4gICAgY29tcHV0ZXJHcmlkLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICBzdGFydEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgcm90YXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICByYW5kb21QbGFjZUJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgcGxheWVyU2VsZWN0R3JpZC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG5cclxuICAgIGNvbnN0IGNvbXB1dGVyVGlsZXMgPSBjb21wdXRlckdyaWQucXVlcnlTZWxlY3RvckFsbChcImRpdlwiKTtcclxuICAgIGNvbXB1dGVyVGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xyXG4gICAgICB0aWxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5ZXJBdHRhY2spO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHsgcmVuZGVyQWxsLCByZW5kZXJTaGlwc09uQm9hcmQgfTtcclxuIiwiaW1wb3J0IGdhbWVQbGF5LCB7IGRhdGEgfSBmcm9tIFwiLi9nYW1lcGxheVwiO1xyXG5pbXBvcnQgeyByZW5kZXJTaGlwc09uQm9hcmQgfSBmcm9tIFwiLi9kb21cIjtcclxuXHJcbmxldCBzZWxlY3RlZFNoaXBOYW1lO1xyXG5sZXQgc2VsZWN0ZWRTaGlwUGFydDtcclxubGV0IHNlbGVjdGVkU2hpcENvbnRhaW5lcjtcclxuXHJcbmNvbnN0IGRyYWdGdW5jdGlvbnMgPSB7XHJcbiAgYWRkRHJhZ0xpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IHBsYXllclNlbGVjdEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGlvbi1ncmlkXCIpO1xyXG4gICAgY29uc3Qgc2hpcHMgPSBwbGF5ZXJTZWxlY3RHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcclxuICAgIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckdyaWRcIik7XHJcbiAgICBjb25zdCBwbGF5ZXJHcmlkVGlsZXMgPSBwbGF5ZXJHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXZcIik7XHJcblxyXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT5cclxuICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWdGdW5jdGlvbnMuZHJhZ1N0YXJ0KVxyXG4gICAgKTtcclxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ0Z1bmN0aW9ucy5kcmFnRW5kKSk7XHJcbiAgICBwbGF5ZXJHcmlkVGlsZXMuZm9yRWFjaCgoc3F1YXJlKSA9PlxyXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnRnVuY3Rpb25zLmRyYWdTdGFydClcclxuICAgICk7XHJcbiAgICBwbGF5ZXJHcmlkVGlsZXMuZm9yRWFjaCgoc3F1YXJlKSA9PlxyXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGRyYWdGdW5jdGlvbnMuZHJhZ092ZXIpXHJcbiAgICApO1xyXG4gICAgcGxheWVyR3JpZFRpbGVzLmZvckVhY2goKHNxdWFyZSkgPT5cclxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgZHJhZ0Z1bmN0aW9ucy5kcmFnRW50ZXIpXHJcbiAgICApO1xyXG4gICAgcGxheWVyR3JpZFRpbGVzLmZvckVhY2goKHNxdWFyZSkgPT5cclxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgZHJhZ0Z1bmN0aW9ucy5kcmFnTGVhdmUpXHJcbiAgICApO1xyXG4gICAgcGxheWVyR3JpZFRpbGVzLmZvckVhY2goKHNxdWFyZSkgPT5cclxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGRyYWdGdW5jdGlvbnMuZHJhZ0Ryb3ApXHJcbiAgICApO1xyXG4gICAgcGxheWVyR3JpZFRpbGVzLmZvckVhY2goKHNxdWFyZSkgPT5cclxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIGRyYWdGdW5jdGlvbnMuZHJhZ0VuZClcclxuICAgICk7XHJcblxyXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcclxuICAgICAgICBzZWxlY3RlZFNoaXBOYW1lID0gZS50YXJnZXQuaWQuc2xpY2UoMCwgLTIpO1xyXG4gICAgICAgIHNlbGVjdGVkU2hpcFBhcnQgPSBwYXJzZUludChlLnRhcmdldC5pZC5zbGljZSgtMSkpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGRyYWdTdGFydChlKSB7XHJcbiAgICBzZWxlY3RlZFNoaXBDb250YWluZXIgPSBlLnRhcmdldDtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHNlbGVjdGVkU2hpcENvbnRhaW5lci5hZGQoJ2hpZGUnKTtcclxuICAgICAgfSwgMCk7XHJcbiAgfSxcclxuXHJcbiAgZHJhZ0VudGVyKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICBkcmFnT3ZlcihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgZHJhZ0xlYXZlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gIH0sXHJcblxyXG4gIGRyYWdFbmQoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zb2xlLmxvZyhzZWxlY3RlZFNoaXBDb250YWluZXIpXHJcbiAgICBzZWxlY3RlZFNoaXBDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpXHJcbiAgfSxcclxuXHJcbiAgZHJhZ0Ryb3AoZSkge1xyXG4gICAgbGV0IGFkanVzdGVkQm9hcmRUaWxlO1xyXG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQ7XHJcbiAgICBjb25zdCBbc2hpcF0gPSBwbGF5ZXJCb2FyZC5zaGlwcy5maWx0ZXIoKHNoaXApID0+IHtcclxuICAgICAgcmV0dXJuIHNoaXAubmFtZSA9PT0gc2VsZWN0ZWRTaGlwTmFtZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgIGFkanVzdGVkQm9hcmRUaWxlID0gcGFyc2VJbnQoZS50YXJnZXQuaWQpIC0gc2VsZWN0ZWRTaGlwUGFydCAqIDEwO1xyXG4gICAgICBpZighKGFkanVzdGVkQm9hcmRUaWxlIDwgcGxheWVyQm9hcmQuV0lEVEggKiAocGxheWVyQm9hcmQuV0lEVEggLSBzaGlwLnNoaXBMZW5ndGggKyAxKSkpIHJldHVyblxyXG4gICAgfVxyXG4gICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICBhZGp1c3RlZEJvYXJkVGlsZSA9IHBhcnNlSW50KGUudGFyZ2V0LmlkKSAtIHNlbGVjdGVkU2hpcFBhcnQ7XHJcbiAgICAgIGlmKCEoYWRqdXN0ZWRCb2FyZFRpbGUgJSBwbGF5ZXJCb2FyZC5XSURUSCA8IHBsYXllckJvYXJkLldJRFRIIC0gc2hpcC5zaGlwTGVuZ3RoICsgMSkpIHJldHVybjsgXHJcbiAgICB9XHJcbiAgICBsZXQgY29vcmRpbmF0ZXNBcnIgPSBwbGF5ZXJCb2FyZC5nZW5lcmF0ZVNoaXBDb29yZHMoXHJcbiAgICAgIGFkanVzdGVkQm9hcmRUaWxlLFxyXG4gICAgICBzaGlwXHJcbiAgICApO1xyXG4gICAgaWYgKHBsYXllckJvYXJkLmNoZWNrSWZDb29yZHNWYWxpZChjb29yZGluYXRlc0FycikpIHtcclxuICAgICAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyR3JpZFwiKTtcclxuICAgICAgY29uc3QgcGxheWVyU2VsZWN0R3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLWdyaWRcIik7XHJcbiAgICAgIHBsYXllckJvYXJkLmFkZFNoaXBUb0JvYXJkKHNoaXAsIGNvb3JkaW5hdGVzQXJyKTtcclxuICAgICAgcmVuZGVyU2hpcHNPbkJvYXJkKHBsYXllckJvYXJkLCBwbGF5ZXJHcmlkKTtcclxuICAgICAgcGxheWVyU2VsZWN0R3JpZC5yZW1vdmVDaGlsZChzZWxlY3RlZFNoaXBDb250YWluZXIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGRyYWdGdW5jdGlvbnM7XHJcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9ib2FyZFwiO1xyXG5pbXBvcnQgZHJhZ0Z1bmN0aW9ucyBmcm9tIFwiLi9kcmFnZnVuY3Rpb25zXCI7XHJcblxyXG5pbXBvcnQgeyByZW5kZXJBbGwgfSBmcm9tIFwiLi9kb21cIjtcclxuXHJcbmNvbnN0IGdhbWVQbGF5ID0ge1xyXG4gIGRhdGE6IHtcclxuICAgIGdhbWVib2FyZHM6IHt9LFxyXG4gICAgZ2FtZW9uOiBmYWxzZSxcclxuICB9LFxyXG5cclxuICBzZXR1cCgpIHtcclxuICAgIHRoaXMuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy5kYXRhLmdhbWVib2FyZHMuY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcclxuXHJcbiAgICB0aGlzLmRhdGEuZ2FtZWJvYXJkcy5wbGF5ZXJCb2FyZC5jcmVhdGVCb2FyZCgpO1xyXG4gICAgdGhpcy5kYXRhLmdhbWVib2FyZHMuY29tcHV0ZXJCb2FyZC5jcmVhdGVCb2FyZCgpO1xyXG5cclxuICAgIC8vIHRoaXMuZGF0YS5wbGF5ZXJzLmh1bWFuUGxheWVyID0gbmV3IFBsYXllclxyXG4gICAgLy8gdGhpcy5kYXRhLnBsYXllcnMuY29tcHV0ZXJQbGF5ZXIgPSBuZXcgUGxheWVyXHJcbiAgfSxcclxuXHJcbiAgYWRkU2hpcHMoKSB7XHJcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IHRoaXMuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkO1xyXG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IHRoaXMuZGF0YS5nYW1lYm9hcmRzLmNvbXB1dGVyQm9hcmQ7XHJcbiAgICBwbGF5ZXJCb2FyZC5hZGRTaGlwKFwiZGVzdHJveWVyXCIsIDIpO1xyXG4gICAgcGxheWVyQm9hcmQuYWRkU2hpcChcInN1Ym1hcmluZVwiLCAzKTtcclxuICAgIHBsYXllckJvYXJkLmFkZFNoaXAoXCJjcnVpc2VyXCIsIDMpO1xyXG4gICAgcGxheWVyQm9hcmQuYWRkU2hpcChcImJhdHRsZXNoaXBcIiwgNCk7XHJcbiAgICBwbGF5ZXJCb2FyZC5hZGRTaGlwKFwiY2FycmllclwiLCA1KTtcclxuXHJcbiAgICBjb21wdXRlckJvYXJkLmFkZFNoaXAoXCJkZXN0cm95ZXJcIiwgMik7XHJcbiAgICBjb21wdXRlckJvYXJkLmFkZFNoaXAoXCJzdWJtYXJpbmVcIiwgMyk7XHJcbiAgICBjb21wdXRlckJvYXJkLmFkZFNoaXAoXCJjcnVpc2VyXCIsIDMpO1xyXG4gICAgY29tcHV0ZXJCb2FyZC5hZGRTaGlwKFwiYmF0dGxlc2hpcFwiLCA0KTtcclxuICAgIGNvbXB1dGVyQm9hcmQuYWRkU2hpcChcImNhcnJpZXJcIiwgNSk7XHJcblxyXG4gICAgY29tcHV0ZXJCb2FyZC5yYW5kb21TaGlwc0RpcmVjdGlvbigpO1xyXG4gICAgY29tcHV0ZXJCb2FyZC5wbGFjZVJhbmRvbVNoaXAoY29tcHV0ZXJCb2FyZC5zaGlwcyk7XHJcbiAgfSxcclxuXHJcbiAgcmVzZXRCb2FyZEFuZFNoaXBzKCkge1xyXG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSB0aGlzLmRhdGEuZ2FtZWJvYXJkcy5wbGF5ZXJCb2FyZDtcclxuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSB0aGlzLmRhdGEuZ2FtZWJvYXJkcy5jb21wdXRlckJvYXJkO1xyXG5cclxuICAgIHBsYXllckJvYXJkLmJvYXJkLmZvckVhY2goKG9iaiwgaW5kZXgpID0+IHtcclxuICAgICAgaWYgKG9iaiAhPT0gbnVsbCkge1xyXG4gICAgICAgIHBsYXllckJvYXJkLmJvYXJkW2luZGV4XSA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbXB1dGVyQm9hcmQuYm9hcmQuZm9yRWFjaCgob2JqLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAob2JqICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZFtpbmRleF0gPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHBsYXllckJvYXJkLnNoaXBzID0gW107XHJcbiAgICBjb21wdXRlckJvYXJkLnNoaXBzID0gW107XHJcbiAgICB0aGlzLmFkZFNoaXBzKCk7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlQm9hcmRJbmZvKGluZGV4LCBnYW1lYm9hcmQpIHtcclxuICAgIGxldCBib2FyZFJldHVybkluZm87XHJcblxyXG4gICAgaWYgKGdhbWVib2FyZC5ib2FyZFtpbmRleF0gIT09IG51bGwpIHtcclxuICAgICAgY29uc3Qgc2hpcE5hbWUgPSBnYW1lYm9hcmQuYm9hcmRbaW5kZXhdLmlkO1xyXG4gICAgICBnYW1lYm9hcmQuYm9hcmRbaW5kZXhdLnN0YXR1cyA9IFwiaGl0XCI7XHJcbiAgICAgIGJvYXJkUmV0dXJuSW5mbyA9IFwiaGl0XCI7XHJcbiAgICAgIGNvbnN0IFtzaGlwXSA9IGdhbWVib2FyZC5zaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXBOYW1lID09PSBzaGlwLm5hbWUpO1xyXG4gICAgICBzaGlwLmhpdChpbmRleCk7XHJcbiAgICAgIHNoaXAuaXNTdW5rKCk7XHJcbiAgICAgIGlmIChzaGlwLnN1bmsgPT09IHRydWUpIHtcclxuICAgICAgICBnYW1lYm9hcmQuYm9hcmQuZm9yRWFjaCgodGlsZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHRpbGUgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgIGlmICh0aWxlLmlkID09PSBzaGlwTmFtZSkge1xyXG4gICAgICAgICAgICB0aWxlLnN0YXR1cyA9IFwic3Vua1wiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJvYXJkUmV0dXJuSW5mbyA9IFwic3Vua1wiO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBnYW1lYm9hcmQuYm9hcmRbaW5kZXhdID0geyBzdGF0dXM6IFwibWlzc1wiIH07XHJcbiAgICAgIGJvYXJkUmV0dXJuSW5mbyA9IFwibWlzc1wiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJvYXJkUmV0dXJuSW5mbztcclxuICB9LFxyXG5cclxuICBjaGVja0lmR2FtZU92ZXIoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkLnNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLnN1bmsgPT09IHRydWUpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIFwiQ29tcHV0ZXJcIjtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5kYXRhLmdhbWVib2FyZHMuY29tcHV0ZXJCb2FyZC5zaGlwcy5ldmVyeShcclxuICAgICAgICAoc2hpcCkgPT4gc2hpcC5zdW5rID09PSB0cnVlXHJcbiAgICAgIClcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gXCJQbGF5ZXJcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZVBsYXk7XHJcbiIsImNsYXNzIFNoaXAge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgc2hpcExlbmd0aCwgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgICB0aGlzLnNoaXBMZW5ndGggPSBzaGlwTGVuZ3RoO1xyXG4gICAgICB0aGlzLmNvb3JkcyA9IFtdO1xyXG4gICAgICB0aGlzLnN1bmsgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpc1N1bmsoKSB7XHJcbiAgICAgIGlmICh0aGlzLmNvb3Jkcy5sZW5ndGggPT09IHRoaXMuc2hpcExlbmd0aCkgdGhpcy5zdW5rID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBoaXQoaW5kZXgpe1xyXG4gICAgICBpZih0aGlzLmNvb3Jkcy5pbmNsdWRlcyhpbmRleCkpIHJldHVybjtcclxuICAgICAgdGhpcy5jb29yZHMucHVzaChpbmRleClcclxuICAgIH1cclxuXHJcbiAgICByYW5kb21EaXJlY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgcmFuZG9tRGlyZWN0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XHJcbiAgICAgICAgaWYgKHJhbmRvbURpcmVjdGlvbiA9PT0gMCkgdGhpcy5kaXJlY3Rpb24gPSBcImhvcml6b250YWxcIjtcclxuICAgICAgICBpZiAocmFuZG9tRGlyZWN0aW9uID09PSAxKSB0aGlzLmRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgU2hpcCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGdhbWVQbGF5IGZyb20gJy4vZ2FtZXBsYXknXHJcbmltcG9ydCB7IHJlbmRlckFsbCB9IGZyb20gJy4vZG9tJ1xyXG5pbXBvcnQgZHJhZ0Z1bmN0aW9ucyBmcm9tICcuL2RyYWdmdW5jdGlvbnMnXHJcblxyXG5nYW1lUGxheS5zZXR1cCgpXHJcbmdhbWVQbGF5LmFkZFNoaXBzKClcclxucmVuZGVyQWxsKClcclxuZHJhZ0Z1bmN0aW9ucy5hZGREcmFnTGlzdGVuZXJzKCkiXSwic291cmNlUm9vdCI6IiJ9
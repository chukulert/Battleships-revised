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
/* harmony export */   "renderAll": () => (/* binding */ renderAll)
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



    let selectedShipElement;
    let draggedShipContainer;
    let draggedShipLength;
    let draggedShipDirection;

const dragFunctions = {

    addDragListeners(){
    const playerSelectGrid = document.querySelector(".selection-grid");
    const ships = playerSelectGrid.querySelectorAll(".ship")

    ships.forEach((ship) => ship.addEventListener("dragstart", dragFunctions.dragStart));
    // ships.forEach((ship) => ship.addEventListener("dragend", dragEnd));
    _gameplay__WEBPACK_IMPORTED_MODULE_0__.playerBoard.board.forEach((square) =>
      square.addEventListener("dragstart", dragFunctions.dragStart)
    );
    _gameplay__WEBPACK_IMPORTED_MODULE_0__.playerBoard.board.forEach((square) =>
      square.addEventListener("dragover", dragFunctions.dragOver)
    );
    _gameplay__WEBPACK_IMPORTED_MODULE_0__.playerBoard.board.forEach((square) =>
      square.addEventListener("dragenter", dragFunctions.dragEnter)
    );
    _gameplay__WEBPACK_IMPORTED_MODULE_0__.playerBoard.board.forEach((square) =>
      square.addEventListener("dragleave", dragFunctions.dragLeave)
    );
    _gameplay__WEBPACK_IMPORTED_MODULE_0__.playerBoard.board.forEach((square) =>
      square.addEventListener("drop", dragFunctions.dragDrop)
    );
    // playerBoard.board.forEach(square =>
    //   square.addEventListener("dragend", dragEnd)
    // )

    ships.forEach((ship) => {
      ship.addEventListener("mousedown", (e) => {
        selectedShipElement = e.target;
      });
    });
    },

    dragStart(e) {
      draggedShipContainer = e.target;
      draggedShipLength = draggedShipContainer.childNodes.length;

      // const draggedShipChildNodes = Array.from(draggedShipContainer.childNodes)
      // for(let i = 1; i < draggedShipChildNodes.length; i++){
      //   draggedShipChildNodes[i].style.opacity = 0;
      // }
     
    },

    // function dragEnd(e){
    //   e.preventDefault()
    //   for(let i = 1; i < draggedShipChildNodes.length; i++){
    //     draggedShipChildNodes[i].style.opacity = 1;
    // }}

    dragOver(e) {
      e.preventDefault();

      // const draggedShipChildNodes = Array.from(draggedShipContainer.childNodes)
      // for(let i = 1; i < draggedShipChildNodes.length; i++){
      //   draggedShipChildNodes[i].style.opacity = 1;
    },

    dragEnter(e) {
      e.preventDefault();
      e.target.style.background = "grey";
    },

    dragLeave(e) {
      console.log("drag leave");
      e.target.style.background = "";
    },

    dragDrop(e) {
      const tileID = parseInt(e.target.id);
      const shipName = selectedShipElement.id.slice(0, -2);
      const isValidSpot = checkIfValidSpot(draggedShipContainer, tileID);

      const shipIndexArr = [];
      if (draggedShipDirection === "horizontal") {
        for (let i = 0; i < draggedShipLength; i++) {
          let index = tileID + i;
          shipIndexArr.push(index);
        }
      }
      if (draggedShipDirection === "vertical") {
        for (let i = 0; i < draggedShipLength; i++) {
          let index = tileID + 10 * i;
          shipIndexArr.push(index);
        }
      }

      const isTaken = shipIndexArr.some((index) =>
      _gameplay__WEBPACK_IMPORTED_MODULE_0__.playerBoard.board[index - 1].classList.contains("taken"));

      if (!isTaken && isValidSpot) {
        //render player ship by adding classes onto board
        shipIndexArr.forEach((index) => {
          _gameplay__WEBPACK_IMPORTED_MODULE_0__.playerBoard.board[index - 1].classList.add(
            "taken",
            "player",
            shipName
          );
        });
      } else return;
      e.target.style.background = "";
      playerSelectGrid.removeChild(draggedShipContainer);
      if (!checkStartGame())
        displayGameInfo.textContent =
          "All ships deployed! Click Start Game to play!";
    },

    checkIfValidSpot(ship, index) {
      const shipName = selectedShipElement.id.slice(0, -2);
      playerShips.forEach((ship) => {
        if (ship.name === shipName) draggedShipDirection = ship.direction;
      });
      if (draggedShipDirection === "horizontal") {
        return index % _gameplay__WEBPACK_IMPORTED_MODULE_0__.playerBoard.WIDTH < _gameplay__WEBPACK_IMPORTED_MODULE_0__.playerBoard.WIDTH - draggedShipLength + 2 &&
          index % _gameplay__WEBPACK_IMPORTED_MODULE_0__.playerBoard.WIDTH !== 0
          ? true
          : false;
      }
      if (draggedShipDirection === "vertical") {
        return index <= _gameplay__WEBPACK_IMPORTED_MODULE_0__.playerBoard.WIDTH * (_gameplay__WEBPACK_IMPORTED_MODULE_0__.playerBoard.WIDTH - draggedShipLength + 1) ? true : false;
      }
    }
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
      console.log(ship);
      if (ship.sunk === true) {
        gameboard.board.forEach((tile) => {
          if (tile === null) return;
          if (tile.id === shipName) {
            tile.status = "sunk";
          }
        });
        boardReturnInfo = "sunk";
      }
    }
    if (gameboard.board[index] === null) {
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



_gameplay__WEBPACK_IMPORTED_MODULE_0__.default.setup()
_gameplay__WEBPACK_IMPORTED_MODULE_0__.default.addShips()
;(0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderAll)()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZHJhZ2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLDBDQUFJO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsYUFBYTs7QUFFYjs7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QTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTmlDO0FBQ0E7O0FBRWpDLG9EQUFjO0FBQ2QsdURBQWlCO0FBQ2pCLGdEQUFTLEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgdGhpcy5ib2FyZCA9IFtdXHJcbiAgICAgIHRoaXMuc2hpcHMgPSBbXTtcclxuICAgICAgdGhpcy5XSURUSCA9IDEwO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgY3JlYXRlQm9hcmQoKXtcclxuICAgICAgdGhpcy5ib2FyZCA9IG5ldyBBcnJheSgxMDApLmZpbGwobnVsbClcclxuICAgIH1cclxuXHJcbiAgICBhZGRTaGlwKG5hbWUsIGxlbmd0aCl7XHJcbiAgICAgIHRoaXMuc2hpcHMucHVzaChuZXcgU2hpcChuYW1lLCBsZW5ndGgpKVxyXG4gICAgICB9XHJcblxyXG4gICAgYWRkU2hpcFRvQm9hcmQoc2hpcCwgY29vcmRpbmF0ZXNBcnIpe1xyXG4gICAgICAgIGNvb3JkaW5hdGVzQXJyLmZvckVhY2goY29vcmRpbmF0ZT0+e1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFtjb29yZGluYXRlXSA9IHtcclxuICAgICAgICAgICAgaWQ6IHNoaXAubmFtZX1cclxuICAgICAgfSl9XHJcbiAgICBcclxuICAgIC8vZ2VuZXJhdGUgYSB2YWxpZCByYW5kb20gc3BvdCBiYXNlZCBvbiBzaGlwIGRpcmVjdGlvbiBhbmQgbGVuZ3RoXHJcbiAgICBnZW5lcmF0ZVJhbmRvbUNvb3JkcyhzaGlwKSB7XHJcbiAgICAgIGxldCByYW5kb21TcG90ID0gdGhpcy5nZW5lcmF0ZVJhbmRvbU51bWJlcigpXHJcbiAgXHJcbiAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICByZXR1cm4gcmFuZG9tU3BvdCAlIHRoaXMuV0lEVEggPCB0aGlzLldJRFRIIC0gc2hpcC5zaGlwTGVuZ3RoICsgMVxyXG4gICAgICAgICAgPyByYW5kb21TcG90XHJcbiAgICAgICAgICA6IHRoaXMuZ2VuZXJhdGVSYW5kb21Db29yZHMoc2hpcCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgICByZXR1cm4gcmFuZG9tU3BvdCA8IHRoaXMuV0lEVEggKiAodGhpcy5XSURUSCAtIHNoaXAuc2hpcExlbmd0aCArIDEpXHJcbiAgICAgICAgICA/IHJhbmRvbVNwb3RcclxuICAgICAgICAgIDogdGhpcy5nZW5lcmF0ZVJhbmRvbUNvb3JkcyhzaGlwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vcmV0dXJucyBhIG51bWJlciBmcm9tIDAtOTlcclxuICAgIGdlbmVyYXRlUmFuZG9tTnVtYmVyKCkge1xyXG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5XSURUSCAqIHRoaXMuV0lEVEgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vZ2VuZXJhdGVzIGFuIGFycmF5IG9mIGNvb3JkaW5hdGVzIGJhc2VkIG9uIHNoaXAgZGlyZWN0aW9uIGFuZCBsZW5ndGhcclxuICAgIGdlbmVyYXRlU2hpcENvb3Jkcyhjb29yZCwgc2hpcCl7XHJcbiAgICAgIGxldCBjb29yZGluYXRlc0FyciA9IFtdXHJcbiAgICAgIFxyXG4gICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgbGV0IGluZGV4ID0gY29vcmQgKyBpO1xyXG4gICAgICAgICAgY29vcmRpbmF0ZXNBcnIucHVzaChpbmRleCk7XHJcbiAgICAgICAgfX1cclxuICAgICAgXHJcbiAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgbGV0IGluZGV4ID0gY29vcmQgKyAxMCAqIGk7XHJcbiAgICAgICAgICBjb29yZGluYXRlc0Fyci5wdXNoKGluZGV4KTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIHJldHVybiBjb29yZGluYXRlc0FyclxyXG4gICAgfVxyXG5cclxuICAgIC8vY2hlY2sgaWYgYm9hcmQgc3BhY2UgaXMgdGFrZW5cclxuICAgIGNoZWNrSWZDb29yZHNWYWxpZChjb29yZGluYXRlc0Fycil7XHJcbiAgICAgIGlmIChjb29yZGluYXRlc0Fyci5zb21lKChjb29yZCk9PlxyXG4gICAgICAgIHRoaXMuYm9hcmRbY29vcmRdICE9PSBudWxsKSkge3JldHVybiBmYWxzZTt9XHJcbiAgICAgICAgZWxzZXtyZXR1cm4gdHJ1ZTt9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy9nZW5lcmF0ZSB2YWxpZCBzaGlwIGNvb3JkcyBhbmQgYWRkIHRoZW0gaW50byBib2FyZCBhcnJheVxyXG4gICAgZ2VuZXJhdGVSYW5kb21TaGlwQ29vcmRzKHNoaXApe1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2VuZXJhdGVSYW5kb21Db29yZHMoc2hpcClcclxuICAgICAgICBsZXQgY29vcmRpbmF0ZXNBcnIgPSB0aGlzLmdlbmVyYXRlU2hpcENvb3JkcyhpbmRleCwgc2hpcClcclxuICAgICAgICBsZXQgdmFsaWRDb29yZHMgPSB0aGlzLmNoZWNrSWZDb29yZHNWYWxpZChjb29yZGluYXRlc0FycilcclxuICAgICAgICBpZih2YWxpZENvb3JkcyA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgdGhpcy5hZGRTaGlwVG9Cb2FyZChzaGlwLCBjb29yZGluYXRlc0FycilcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgIHRoaXMuZ2VuZXJhdGVSYW5kb21TaGlwQ29vcmRzKHNoaXApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYWNlUmFuZG9tU2hpcChhcnIpe1xyXG4gICAgICBhcnIuZm9yRWFjaChzaGlwPT57XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVJhbmRvbVNoaXBDb29yZHMoc2hpcClcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByYW5kb21TaGlwc0RpcmVjdGlvbigpe1xyXG4gICAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcD0+e1xyXG4gICAgICAgIHNoaXAucmFuZG9tRGlyZWN0aW9uKClcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZCIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9ib2FyZFwiO1xyXG5pbXBvcnQgZHJhZ0Z1bmN0aW9ucyBmcm9tIFwiLi9kcmFnZnVuY3Rpb25zXCI7XHJcbmltcG9ydCBnYW1lUGxheSBmcm9tIFwiLi9nYW1lcGxheVwiO1xyXG5cclxuY29uc3QgcmVuZGVyQm9hcmQgPSAoZ2FtZUJvYXJkLCBkaXNwbGF5R2FtZUJvYXJkKSA9PiB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gZ2FtZUJvYXJkLmJvYXJkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCB0aWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRpbGUuY2xhc3NMaXN0LmFkZChcInRpbGVcIik7XHJcbiAgICB0aWxlLmlkID0gaTtcclxuICAgIGRpc3BsYXlHYW1lQm9hcmQuYXBwZW5kQ2hpbGQodGlsZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgcmVuZGVyU2hpcHNPbkJvYXJkID0gKGdhbWVCb2FyZCwgZGlzcGxheUdhbWVCb2FyZCkgPT4ge1xyXG4gIGdhbWVCb2FyZC5ib2FyZC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgZGlzcGxheUdhbWVCb2FyZC5jaGlsZE5vZGVzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAgIFwidGFrZW5cIixcclxuICAgICAgICBgJHtlbGVtZW50LmlkfWBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlbmRlclNlbGVjdGlvbkdyaWQgPSAoc2hpcHNBcnIpID0+IHtcclxuICBjb25zdCBwbGF5ZXJTZWxlY3RHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3Rpb24tZ3JpZFwiKTtcclxuICBzaGlwc0Fyci5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICBsZXQgc2hpcEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgc2hpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXBcIiwgYCR7c2hpcC5uYW1lfWApO1xyXG4gICAgc2hpcEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIHRydWUpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgdGlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIHRpbGUuaWQgPSBgJHtzaGlwLm5hbWV9LSR7aX1gO1xyXG4gICAgICBzaGlwRWxlbWVudC5hcHBlbmRDaGlsZCh0aWxlKTtcclxuICAgICAgcGxheWVyU2VsZWN0R3JpZC5hcHBlbmRDaGlsZChzaGlwRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCByb3RhdGVQbGF5ZXJTaGlwcyA9ICgpID0+IHtcclxuICBjb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvdGF0ZS1idG5cIik7XHJcbiAgY29uc3QgcGxheWVyU2VsZWN0R3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLWdyaWRcIik7XHJcbiAgY29uc3Qgc2hpcHMgPSBwbGF5ZXJTZWxlY3RHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcclxuICBwbGF5ZXJTZWxlY3RHcmlkLmNsYXNzTGlzdC50b2dnbGUoXCJob3Jpem9udGFsXCIpO1xyXG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgIGNvbnN0IHNoaXBOYW1lID0gc2hpcC5maXJzdENoaWxkLmlkLnNsaWNlKDAsIC0yKTtcclxuICAgIHNoaXAuY2xhc3NMaXN0LnRvZ2dsZShgJHtzaGlwTmFtZX0taG9yaXpvbnRhbGApO1xyXG4gICAgc2hpcC5jbGFzc0xpc3QudG9nZ2xlKGAke3NoaXBOYW1lfWApO1xyXG4gICAgZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgaWYgKHNoaXAubmFtZSA9PT0gc2hpcE5hbWUpIHtcclxuICAgICAgICBzaGlwLmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiXHJcbiAgICAgICAgICA/IChzaGlwLmRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiKVxyXG4gICAgICAgICAgOiAoc2hpcC5kaXJlY3Rpb24gPSBcInZlcnRpY2FsXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGNsZWFyQ29udGFpbmVyID0gKGNvbnRhaW5lcikgPT4ge1xyXG4gIHdoaWxlIChjb250YWluZXIuZmlyc3RDaGlsZCkge1xyXG4gICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGNvbnRhaW5lci5maXJzdENoaWxkKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBhcHBseVNlbGVjdG9yc0FuZExpc3RlbmVycyA9ICgpID0+IHtcclxuICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhcnQtYnRuXCIpO1xyXG4gIGNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm90YXRlLWJ0blwiKTtcclxuICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVzZXQtYnRuXCIpO1xyXG4gIGNvbnN0IHJhbmRvbVBsYWNlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyYW5kb20tYnRuXCIpO1xyXG4gIGNvbnN0IGRpc3BsYXlHYW1lSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1pbmZvXCIpO1xyXG4gIHJvdGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcm90YXRlUGxheWVyU2hpcHMpO1xyXG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGFydEdhbWUpO1xyXG4gIHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXNldEdhbWUpO1xyXG4gIHJhbmRvbVBsYWNlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByYW5kb21QbGFjZVBsYXllclNoaXBzKTtcclxufTtcclxuXHJcbmNvbnN0IHJlbmRlckFsbCA9ICgpID0+IHtcclxuICBjb25zdCBwbGF5ZXJHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJHcmlkXCIpO1xyXG4gIGNvbnN0IGNvbXB1dGVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJHcmlkXCIpO1xyXG4gIGNvbnN0IGRpc3BsYXlHYW1lSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1pbmZvXCIpO1xyXG5cclxuICBhcHBseVNlbGVjdG9yc0FuZExpc3RlbmVycygpO1xyXG4gIHJlbmRlckJvYXJkKGdhbWVQbGF5LmRhdGEuZ2FtZWJvYXJkcy5wbGF5ZXJCb2FyZCwgcGxheWVyR3JpZCk7XHJcbiAgcmVuZGVyQm9hcmQoZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLmNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyR3JpZCk7XHJcbiAgcmVuZGVyU2hpcHNPbkJvYXJkKGdhbWVQbGF5LmRhdGEuZ2FtZWJvYXJkcy5jb21wdXRlckJvYXJkLCBjb21wdXRlckdyaWQpO1xyXG4gIHJlbmRlclNlbGVjdGlvbkdyaWQoZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkLnNoaXBzKTtcclxuXHJcbiAgZGlzcGxheUdhbWVJbmZvLnRleHRDb250ZW50ID0gXCJEcmFnIGFuZCBkcm9wIHlvdXIgc2hpcHMgdG8gYmVnaW4hXCI7XHJcbn07XHJcblxyXG5jb25zdCByYW5kb21QbGFjZVBsYXllclNoaXBzID0gKCkgPT4ge1xyXG4gIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckdyaWRcIik7XHJcbiAgY29uc3QgcGxheWVyU2VsZWN0R3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLWdyaWRcIik7XHJcbiAgY29uc3QgZGlzcGxheUdhbWVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWluZm9cIik7XHJcbiAgY29uc3QgdGFrZW5UaWxlcyA9IHBsYXllckdyaWQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRha2VuXCIpO1xyXG4gIGlmICh0YWtlblRpbGVzLmxlbmd0aCA+IDApIHtcclxuICAgIGRpc3BsYXlHYW1lSW5mby50ZXh0Q29udGVudCA9XHJcbiAgICAgIFwiUGxlYXNlIHJlc2V0IHRoZSBib2FyZCBiZWZvcmUgeW91IG1heSByYW5kb21seSBwbGFjZSBzaGlwc1wiO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBjbGVhckNvbnRhaW5lcihwbGF5ZXJTZWxlY3RHcmlkKTtcclxuICBnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQucmFuZG9tU2hpcHNEaXJlY3Rpb24oKTtcclxuICBnYW1lUGxheS5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQucGxhY2VSYW5kb21TaGlwKFxyXG4gICAgZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkLnNoaXBzXHJcbiAgKTtcclxuICByZW5kZXJTaGlwc09uQm9hcmQoZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkLCBwbGF5ZXJHcmlkKTtcclxuICBkaXNwbGF5R2FtZUluZm8udGV4dENvbnRlbnQgPSBcIkFsbCBzaGlwcyBkZXBsb3llZCEgQ2xpY2sgU3RhcnQgR2FtZSB0byBwbGF5IVwiO1xyXG59O1xyXG5cclxuY29uc3QgcmVzZXRHYW1lID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNvbXB1dGVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJHcmlkXCIpO1xyXG4gIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckdyaWRcIik7XHJcbiAgY29uc3QgcGxheWVyU2VsZWN0R3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLWdyaWRcIik7XHJcblxyXG4gIGNsZWFyQ29udGFpbmVyKHBsYXllckdyaWQpO1xyXG4gIGNsZWFyQ29udGFpbmVyKGNvbXB1dGVyR3JpZCk7XHJcbiAgY2xlYXJDb250YWluZXIocGxheWVyU2VsZWN0R3JpZCk7XHJcbiAgZ2FtZVBsYXkuZGF0YS5nYW1lb24gPSBmYWxzZTtcclxuICBnYW1lUGxheS5yZXNldEJvYXJkQW5kU2hpcHMoKTtcclxuICByZW5kZXJBbGwoKTtcclxuICBjaGFuZ2VHYW1lTW9kZSgpO1xyXG4gIGFwcGx5U2VsZWN0b3JzQW5kTGlzdGVuZXJzKCk7XHJcbn07XHJcblxyXG5jb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyU2VsZWN0R3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLWdyaWRcIik7XHJcbiAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcFwiKTtcclxuICBjb25zdCBkaXNwbGF5R2FtZUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtaW5mb1wiKTtcclxuICBpZiAocGxheWVyU2VsZWN0R3JpZC5jb250YWlucyhzaGlwKSkge1xyXG4gICAgZGlzcGxheUdhbWVJbmZvLnRleHRDb250ZW50ID0gXCJQbGVhc2UgZGVwbG95IGFsbCBzaGlwcyB0byBzdGFydCBnYW1lXCI7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGdhbWVQbGF5LmRhdGEuZ2FtZW9uID0gdHJ1ZTtcclxuICBjaGFuZ2VHYW1lTW9kZSgpO1xyXG59O1xyXG5cclxuY29uc3QgZGlzYWJsZUNsaWNrcyA9ICgpID0+IHtcclxuICBjb25zdCBjb21wdXRlckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyR3JpZFwiKTtcclxuICBjb25zdCBjb21wdXRlclRpbGVzID0gY29tcHV0ZXJHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXZcIik7XHJcbiAgY29tcHV0ZXJUaWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XHJcbiAgICBjb25zdCBuZXdUaWxlID0gdGlsZS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICB0aWxlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld1RpbGUsIHRpbGUpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgcGxheWVyQXR0YWNrID0gKGUpID0+IHtcclxuICBjb25zdCBjb21wdXRlckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyR3JpZFwiKTtcclxuICBjb25zdCBjb21wdXRlckJvYXJkID0gZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLmNvbXB1dGVyQm9hcmQ7XHJcbiAgY29uc3QgZGlzcGxheUdhbWVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWluZm9cIik7XHJcbiAgbGV0IGluZGV4ID0gZS50YXJnZXQuaWQ7XHJcbiAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtaXNzXCIpKVxyXG4gICAgcmV0dXJuO1xyXG5cclxuICBjb25zdCBzaGlwTmFtZSA9IGUudGFyZ2V0LmNsYXNzTGlzdFsyXTtcclxuICBjb25zdCBib2FyZFJldHVybkluZm8gPSBnYW1lUGxheS51cGRhdGVCb2FyZEluZm8oaW5kZXgsIGNvbXB1dGVyQm9hcmQpO1xyXG4gIGNvbnNvbGUubG9nKGJvYXJkUmV0dXJuSW5mbyk7XHJcblxyXG4gIHN3aXRjaCAoYm9hcmRSZXR1cm5JbmZvKSB7XHJcbiAgICBjYXNlIFwibWlzc1wiOlxyXG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgY29uc29sZS5sb2coXCJtaXNzXCIpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJoaXRcIjpcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgY29uc29sZS5sb2coXCJoaXRcIik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcInN1bmtcIjpcclxuICAgICAgY29uc3Qgc2hpcFRpbGVzID0gY29tcHV0ZXJHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3NoaXBOYW1lfWApO1xyXG4gICAgICBzaGlwVGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xyXG4gICAgICAgIHRpbGUuY2xhc3NMaXN0LmFkZChcInN1bmtcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZGVmYXVsdFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gIH1cclxuICBjb25zdCBnYW1lT3ZlciA9IGdhbWVQbGF5LmNoZWNrSWZHYW1lT3ZlcigpO1xyXG4gIGlmIChnYW1lT3Zlcikge1xyXG4gICAgZGlzYWJsZUNsaWNrcygpO1xyXG4gICAgZGlzcGxheUdhbWVJbmZvLnRleHRDb250ZW50ID0gYEdhbWUgT3ZlciEgJHtnYW1lT3Zlcn0gd2lucyFgO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb21wdXRlckF0dGFjaygpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGNvbXB1dGVyQXR0YWNrID0gKCkgPT4ge1xyXG4gIGNvbnN0IHBsYXllckJvYXJkID0gZ2FtZVBsYXkuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkO1xyXG4gIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckdyaWRcIik7XHJcbiAgY29uc3QgcGxheWVyR3JpZFRpbGVzID0gcGxheWVyR3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2XCIpO1xyXG4gIGxldCBpbmRleCA9IHBsYXllckJvYXJkLmdlbmVyYXRlUmFuZG9tTnVtYmVyKCk7XHJcbiAgaWYgKFxyXG4gICAgcGxheWVyR3JpZFRpbGVzW2luZGV4XS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIikgfHxcclxuICAgIHBsYXllckdyaWRUaWxlc1tpbmRleF0uY2xhc3NMaXN0LmNvbnRhaW5zKFwibWlzc1wiKVxyXG4gIClcclxuICAgIGNvbXB1dGVyQXR0YWNrKCk7XHJcblxyXG4gIGNvbnN0IGJvYXJkUmV0dXJuSW5mbyA9IGdhbWVQbGF5LnVwZGF0ZUJvYXJkSW5mbyhpbmRleCwgcGxheWVyQm9hcmQpO1xyXG5cclxuICBzd2l0Y2ggKGJvYXJkUmV0dXJuSW5mbykge1xyXG4gICAgY2FzZSBcIm1pc3NcIjpcclxuICAgICAgcGxheWVyR3JpZFRpbGVzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgY29uc29sZS5sb2coXCJtaXNzXCIpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJoaXRcIjpcclxuICAgICAgcGxheWVyR3JpZFRpbGVzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImhpdFwiKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwic3Vua1wiOlxyXG4gICAgICBjb25zdCBzaGlwVGlsZXMgPSBwbGF5ZXJHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3NoaXBOYW1lfWApO1xyXG4gICAgICBzaGlwVGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xyXG4gICAgICAgIHRpbGUuY2xhc3NMaXN0LmFkZChcInN1bmtcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZGVmYXVsdFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gIH1cclxuICBjb25zdCBnYW1lT3ZlciA9IGdhbWVQbGF5LmNoZWNrSWZHYW1lT3ZlcigpO1xyXG4gIGlmIChnYW1lT3Zlcikge1xyXG4gICAgZGlzYWJsZUNsaWNrcygpO1xyXG4gICAgZGlzcGxheUdhbWVJbmZvLnRleHRDb250ZW50ID0gYEdhbWUgT3ZlciEgJHtnYW1lT3Zlcn0gd2lucyFgO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGNoYW5nZUdhbWVNb2RlID0gKCkgPT4ge1xyXG4gIGNvbnN0IHBsYXllclNlbGVjdEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGlvbi1ncmlkXCIpO1xyXG4gIGNvbnN0IGRpc3BsYXlHYW1lSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1pbmZvXCIpO1xyXG4gIGNvbnN0IGNvbXB1dGVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJHcmlkXCIpO1xyXG4gIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGFydC1idG5cIik7XHJcbiAgY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb3RhdGUtYnRuXCIpO1xyXG4gIGNvbnN0IHJhbmRvbVBsYWNlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyYW5kb20tYnRuXCIpO1xyXG5cclxuICBpZiAoZ2FtZVBsYXkuZGF0YS5nYW1lb24gPT09IGZhbHNlKSB7XHJcbiAgICBkaXNwbGF5R2FtZUluZm8udGV4dENvbnRlbnQgPSBcIkRyYWcgYW5kIGRyb3AgeW91ciBzaGlwcyB0byBiZWdpbiFcIjtcclxuICAgIGNvbXB1dGVyR3JpZC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgc3RhcnRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIHJvdGF0ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgcmFuZG9tUGxhY2VCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIHBsYXllclNlbGVjdEdyaWQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICB9XHJcblxyXG4gIGlmIChnYW1lUGxheS5kYXRhLmdhbWVvbiA9PT0gdHJ1ZSkge1xyXG4gICAgZGlzcGxheUdhbWVJbmZvLnRleHRDb250ZW50ID0gXCJDbGljayBvbiBhbiBlbmVteSB0aWxlIHRvIGF0dGFjayFcIjtcclxuICAgIGNvbXB1dGVyR3JpZC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgc3RhcnRCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIHJvdGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgcmFuZG9tUGxhY2VCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIHBsYXllclNlbGVjdEdyaWQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuXHJcbiAgICBjb25zdCBjb21wdXRlclRpbGVzID0gY29tcHV0ZXJHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXZcIik7XHJcbiAgICBjb21wdXRlclRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcclxuICAgICAgdGlsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheWVyQXR0YWNrKTtcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB7IHJlbmRlckFsbCB9O1xyXG4iLCJcclxuaW1wb3J0IHsgcGxheWVyQm9hcmQgfSBmcm9tICcuL2dhbWVwbGF5J1xyXG5cclxuICAgIGxldCBzZWxlY3RlZFNoaXBFbGVtZW50O1xyXG4gICAgbGV0IGRyYWdnZWRTaGlwQ29udGFpbmVyO1xyXG4gICAgbGV0IGRyYWdnZWRTaGlwTGVuZ3RoO1xyXG4gICAgbGV0IGRyYWdnZWRTaGlwRGlyZWN0aW9uO1xyXG5cclxuY29uc3QgZHJhZ0Z1bmN0aW9ucyA9IHtcclxuXHJcbiAgICBhZGREcmFnTGlzdGVuZXJzKCl7XHJcbiAgICBjb25zdCBwbGF5ZXJTZWxlY3RHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3Rpb24tZ3JpZFwiKTtcclxuICAgIGNvbnN0IHNoaXBzID0gcGxheWVyU2VsZWN0R3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBcIilcclxuXHJcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ0Z1bmN0aW9ucy5kcmFnU3RhcnQpKTtcclxuICAgIC8vIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ0VuZCkpO1xyXG4gICAgcGxheWVyQm9hcmQuYm9hcmQuZm9yRWFjaCgoc3F1YXJlKSA9PlxyXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnRnVuY3Rpb25zLmRyYWdTdGFydClcclxuICAgICk7XHJcbiAgICBwbGF5ZXJCb2FyZC5ib2FyZC5mb3JFYWNoKChzcXVhcmUpID0+XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZHJhZ0Z1bmN0aW9ucy5kcmFnT3ZlcilcclxuICAgICk7XHJcbiAgICBwbGF5ZXJCb2FyZC5ib2FyZC5mb3JFYWNoKChzcXVhcmUpID0+XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIGRyYWdGdW5jdGlvbnMuZHJhZ0VudGVyKVxyXG4gICAgKTtcclxuICAgIHBsYXllckJvYXJkLmJvYXJkLmZvckVhY2goKHNxdWFyZSkgPT5cclxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgZHJhZ0Z1bmN0aW9ucy5kcmFnTGVhdmUpXHJcbiAgICApO1xyXG4gICAgcGxheWVyQm9hcmQuYm9hcmQuZm9yRWFjaCgoc3F1YXJlKSA9PlxyXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJhZ0Z1bmN0aW9ucy5kcmFnRHJvcClcclxuICAgICk7XHJcbiAgICAvLyBwbGF5ZXJCb2FyZC5ib2FyZC5mb3JFYWNoKHNxdWFyZSA9PlxyXG4gICAgLy8gICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ0VuZClcclxuICAgIC8vIClcclxuXHJcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xyXG4gICAgICAgIHNlbGVjdGVkU2hpcEVsZW1lbnQgPSBlLnRhcmdldDtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZHJhZ1N0YXJ0KGUpIHtcclxuICAgICAgZHJhZ2dlZFNoaXBDb250YWluZXIgPSBlLnRhcmdldDtcclxuICAgICAgZHJhZ2dlZFNoaXBMZW5ndGggPSBkcmFnZ2VkU2hpcENvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aDtcclxuXHJcbiAgICAgIC8vIGNvbnN0IGRyYWdnZWRTaGlwQ2hpbGROb2RlcyA9IEFycmF5LmZyb20oZHJhZ2dlZFNoaXBDb250YWluZXIuY2hpbGROb2RlcylcclxuICAgICAgLy8gZm9yKGxldCBpID0gMTsgaSA8IGRyYWdnZWRTaGlwQ2hpbGROb2Rlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIC8vICAgZHJhZ2dlZFNoaXBDaGlsZE5vZGVzW2ldLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAvLyB9XHJcbiAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGZ1bmN0aW9uIGRyYWdFbmQoZSl7XHJcbiAgICAvLyAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgLy8gICBmb3IobGV0IGkgPSAxOyBpIDwgZHJhZ2dlZFNoaXBDaGlsZE5vZGVzLmxlbmd0aDsgaSsrKXtcclxuICAgIC8vICAgICBkcmFnZ2VkU2hpcENoaWxkTm9kZXNbaV0uc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAvLyB9fVxyXG5cclxuICAgIGRyYWdPdmVyKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgLy8gY29uc3QgZHJhZ2dlZFNoaXBDaGlsZE5vZGVzID0gQXJyYXkuZnJvbShkcmFnZ2VkU2hpcENvbnRhaW5lci5jaGlsZE5vZGVzKVxyXG4gICAgICAvLyBmb3IobGV0IGkgPSAxOyBpIDwgZHJhZ2dlZFNoaXBDaGlsZE5vZGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgLy8gICBkcmFnZ2VkU2hpcENoaWxkTm9kZXNbaV0uc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICB9LFxyXG5cclxuICAgIGRyYWdFbnRlcihlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9IFwiZ3JleVwiO1xyXG4gICAgfSxcclxuXHJcbiAgICBkcmFnTGVhdmUoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImRyYWcgbGVhdmVcIik7XHJcbiAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSBcIlwiO1xyXG4gICAgfSxcclxuXHJcbiAgICBkcmFnRHJvcChlKSB7XHJcbiAgICAgIGNvbnN0IHRpbGVJRCA9IHBhcnNlSW50KGUudGFyZ2V0LmlkKTtcclxuICAgICAgY29uc3Qgc2hpcE5hbWUgPSBzZWxlY3RlZFNoaXBFbGVtZW50LmlkLnNsaWNlKDAsIC0yKTtcclxuICAgICAgY29uc3QgaXNWYWxpZFNwb3QgPSBjaGVja0lmVmFsaWRTcG90KGRyYWdnZWRTaGlwQ29udGFpbmVyLCB0aWxlSUQpO1xyXG5cclxuICAgICAgY29uc3Qgc2hpcEluZGV4QXJyID0gW107XHJcbiAgICAgIGlmIChkcmFnZ2VkU2hpcERpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyYWdnZWRTaGlwTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGxldCBpbmRleCA9IHRpbGVJRCArIGk7XHJcbiAgICAgICAgICBzaGlwSW5kZXhBcnIucHVzaChpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChkcmFnZ2VkU2hpcERpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkcmFnZ2VkU2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBsZXQgaW5kZXggPSB0aWxlSUQgKyAxMCAqIGk7XHJcbiAgICAgICAgICBzaGlwSW5kZXhBcnIucHVzaChpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBpc1Rha2VuID0gc2hpcEluZGV4QXJyLnNvbWUoKGluZGV4KSA9PlxyXG4gICAgICBwbGF5ZXJCb2FyZC5ib2FyZFtpbmRleCAtIDFdLmNsYXNzTGlzdC5jb250YWlucyhcInRha2VuXCIpKTtcclxuXHJcbiAgICAgIGlmICghaXNUYWtlbiAmJiBpc1ZhbGlkU3BvdCkge1xyXG4gICAgICAgIC8vcmVuZGVyIHBsYXllciBzaGlwIGJ5IGFkZGluZyBjbGFzc2VzIG9udG8gYm9hcmRcclxuICAgICAgICBzaGlwSW5kZXhBcnIuZm9yRWFjaCgoaW5kZXgpID0+IHtcclxuICAgICAgICAgIHBsYXllckJvYXJkLmJvYXJkW2luZGV4IC0gMV0uY2xhc3NMaXN0LmFkZChcclxuICAgICAgICAgICAgXCJ0YWtlblwiLFxyXG4gICAgICAgICAgICBcInBsYXllclwiLFxyXG4gICAgICAgICAgICBzaGlwTmFtZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHJldHVybjtcclxuICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9IFwiXCI7XHJcbiAgICAgIHBsYXllclNlbGVjdEdyaWQucmVtb3ZlQ2hpbGQoZHJhZ2dlZFNoaXBDb250YWluZXIpO1xyXG4gICAgICBpZiAoIWNoZWNrU3RhcnRHYW1lKCkpXHJcbiAgICAgICAgZGlzcGxheUdhbWVJbmZvLnRleHRDb250ZW50ID1cclxuICAgICAgICAgIFwiQWxsIHNoaXBzIGRlcGxveWVkISBDbGljayBTdGFydCBHYW1lIHRvIHBsYXkhXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrSWZWYWxpZFNwb3Qoc2hpcCwgaW5kZXgpIHtcclxuICAgICAgY29uc3Qgc2hpcE5hbWUgPSBzZWxlY3RlZFNoaXBFbGVtZW50LmlkLnNsaWNlKDAsIC0yKTtcclxuICAgICAgcGxheWVyU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgIGlmIChzaGlwLm5hbWUgPT09IHNoaXBOYW1lKSBkcmFnZ2VkU2hpcERpcmVjdGlvbiA9IHNoaXAuZGlyZWN0aW9uO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKGRyYWdnZWRTaGlwRGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgIHJldHVybiBpbmRleCAlIHBsYXllckJvYXJkLldJRFRIIDwgcGxheWVyQm9hcmQuV0lEVEggLSBkcmFnZ2VkU2hpcExlbmd0aCArIDIgJiZcclxuICAgICAgICAgIGluZGV4ICUgcGxheWVyQm9hcmQuV0lEVEggIT09IDBcclxuICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgOiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZHJhZ2dlZFNoaXBEaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xyXG4gICAgICAgIHJldHVybiBpbmRleCA8PSBwbGF5ZXJCb2FyZC5XSURUSCAqIChwbGF5ZXJCb2FyZC5XSURUSCAtIGRyYWdnZWRTaGlwTGVuZ3RoICsgMSkgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBkcmFnRnVuY3Rpb25zIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xyXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2JvYXJkXCI7XHJcbmltcG9ydCBkcmFnRnVuY3Rpb25zIGZyb20gXCIuL2RyYWdmdW5jdGlvbnNcIjtcclxuXHJcbmltcG9ydCB7IHJlbmRlckFsbCB9IGZyb20gXCIuL2RvbVwiO1xyXG5cclxuY29uc3QgZ2FtZVBsYXkgPSB7XHJcbiAgZGF0YToge1xyXG4gICAgZ2FtZWJvYXJkczoge30sXHJcbiAgICBnYW1lb246IGZhbHNlLFxyXG4gIH0sXHJcblxyXG4gIHNldHVwKCkge1xyXG4gICAgdGhpcy5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgICB0aGlzLmRhdGEuZ2FtZWJvYXJkcy5jb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG5cclxuICAgIHRoaXMuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkLmNyZWF0ZUJvYXJkKCk7XHJcbiAgICB0aGlzLmRhdGEuZ2FtZWJvYXJkcy5jb21wdXRlckJvYXJkLmNyZWF0ZUJvYXJkKCk7XHJcblxyXG4gICAgLy8gdGhpcy5kYXRhLnBsYXllcnMuaHVtYW5QbGF5ZXIgPSBuZXcgUGxheWVyXHJcbiAgICAvLyB0aGlzLmRhdGEucGxheWVycy5jb21wdXRlclBsYXllciA9IG5ldyBQbGF5ZXJcclxuICB9LFxyXG5cclxuICBhZGRTaGlwcygpIHtcclxuICAgIGNvbnN0IHBsYXllckJvYXJkID0gdGhpcy5kYXRhLmdhbWVib2FyZHMucGxheWVyQm9hcmQ7XHJcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gdGhpcy5kYXRhLmdhbWVib2FyZHMuY29tcHV0ZXJCb2FyZDtcclxuICAgIHBsYXllckJvYXJkLmFkZFNoaXAoXCJkZXN0cm95ZXJcIiwgMik7XHJcbiAgICBwbGF5ZXJCb2FyZC5hZGRTaGlwKFwic3VibWFyaW5lXCIsIDMpO1xyXG4gICAgcGxheWVyQm9hcmQuYWRkU2hpcChcImNydWlzZXJcIiwgMyk7XHJcbiAgICBwbGF5ZXJCb2FyZC5hZGRTaGlwKFwiYmF0dGxlc2hpcFwiLCA0KTtcclxuICAgIHBsYXllckJvYXJkLmFkZFNoaXAoXCJjYXJyaWVyXCIsIDUpO1xyXG5cclxuICAgIGNvbXB1dGVyQm9hcmQuYWRkU2hpcChcImRlc3Ryb3llclwiLCAyKTtcclxuICAgIGNvbXB1dGVyQm9hcmQuYWRkU2hpcChcInN1Ym1hcmluZVwiLCAzKTtcclxuICAgIGNvbXB1dGVyQm9hcmQuYWRkU2hpcChcImNydWlzZXJcIiwgMyk7XHJcbiAgICBjb21wdXRlckJvYXJkLmFkZFNoaXAoXCJiYXR0bGVzaGlwXCIsIDQpO1xyXG4gICAgY29tcHV0ZXJCb2FyZC5hZGRTaGlwKFwiY2FycmllclwiLCA1KTtcclxuXHJcbiAgICBjb21wdXRlckJvYXJkLnJhbmRvbVNoaXBzRGlyZWN0aW9uKCk7XHJcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlUmFuZG9tU2hpcChjb21wdXRlckJvYXJkLnNoaXBzKTtcclxuICB9LFxyXG5cclxuICByZXNldEJvYXJkQW5kU2hpcHMoKSB7XHJcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IHRoaXMuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkO1xyXG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IHRoaXMuZGF0YS5nYW1lYm9hcmRzLmNvbXB1dGVyQm9hcmQ7XHJcblxyXG4gICAgcGxheWVyQm9hcmQuYm9hcmQuZm9yRWFjaCgob2JqLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAob2JqICE9PSBudWxsKSB7XHJcbiAgICAgICAgcGxheWVyQm9hcmQuYm9hcmRbaW5kZXhdID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29tcHV0ZXJCb2FyZC5ib2FyZC5mb3JFYWNoKChvYmosIGluZGV4KSA9PiB7XHJcbiAgICAgIGlmIChvYmogIT09IG51bGwpIHtcclxuICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkW2luZGV4XSA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcGxheWVyQm9hcmQuc2hpcHMgPSBbXTtcclxuICAgIGNvbXB1dGVyQm9hcmQuc2hpcHMgPSBbXTtcclxuICAgIHRoaXMuYWRkU2hpcHMoKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGVCb2FyZEluZm8oaW5kZXgsIGdhbWVib2FyZCkge1xyXG4gICAgbGV0IGJvYXJkUmV0dXJuSW5mbztcclxuXHJcbiAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW2luZGV4XSAhPT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBzaGlwTmFtZSA9IGdhbWVib2FyZC5ib2FyZFtpbmRleF0uaWQ7XHJcbiAgICAgIGdhbWVib2FyZC5ib2FyZFtpbmRleF0uc3RhdHVzID0gXCJoaXRcIjtcclxuICAgICAgYm9hcmRSZXR1cm5JbmZvID0gXCJoaXRcIjtcclxuICAgICAgY29uc3QgW3NoaXBdID0gZ2FtZWJvYXJkLnNoaXBzLmZpbHRlcigoc2hpcCkgPT4gc2hpcE5hbWUgPT09IHNoaXAubmFtZSk7XHJcbiAgICAgIHNoaXAuaGl0KGluZGV4KTtcclxuICAgICAgc2hpcC5pc1N1bmsoKTtcclxuICAgICAgY29uc29sZS5sb2coc2hpcCk7XHJcbiAgICAgIGlmIChzaGlwLnN1bmsgPT09IHRydWUpIHtcclxuICAgICAgICBnYW1lYm9hcmQuYm9hcmQuZm9yRWFjaCgodGlsZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHRpbGUgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgIGlmICh0aWxlLmlkID09PSBzaGlwTmFtZSkge1xyXG4gICAgICAgICAgICB0aWxlLnN0YXR1cyA9IFwic3Vua1wiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJvYXJkUmV0dXJuSW5mbyA9IFwic3Vua1wiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW2luZGV4XSA9PT0gbnVsbCkge1xyXG4gICAgICBnYW1lYm9hcmQuYm9hcmRbaW5kZXhdID0geyBzdGF0dXM6IFwibWlzc1wiIH07XHJcbiAgICAgIGJvYXJkUmV0dXJuSW5mbyA9IFwibWlzc1wiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJvYXJkUmV0dXJuSW5mbztcclxuICB9LFxyXG5cclxuICBjaGVja0lmR2FtZU92ZXIoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuZGF0YS5nYW1lYm9hcmRzLnBsYXllckJvYXJkLnNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLnN1bmsgPT09IHRydWUpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIFwiQ29tcHV0ZXJcIjtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5kYXRhLmdhbWVib2FyZHMuY29tcHV0ZXJCb2FyZC5zaGlwcy5ldmVyeShcclxuICAgICAgICAoc2hpcCkgPT4gc2hpcC5zdW5rID09PSB0cnVlXHJcbiAgICAgIClcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gXCJQbGF5ZXJcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZVBsYXk7XHJcbiIsImNsYXNzIFNoaXAge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgc2hpcExlbmd0aCwgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgICB0aGlzLnNoaXBMZW5ndGggPSBzaGlwTGVuZ3RoO1xyXG4gICAgICB0aGlzLmNvb3JkcyA9IFtdO1xyXG4gICAgICB0aGlzLnN1bmsgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpc1N1bmsoKSB7XHJcbiAgICAgIGlmICh0aGlzLmNvb3Jkcy5sZW5ndGggPT09IHRoaXMuc2hpcExlbmd0aCkgdGhpcy5zdW5rID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBoaXQoaW5kZXgpe1xyXG4gICAgICBpZih0aGlzLmNvb3Jkcy5pbmNsdWRlcyhpbmRleCkpIHJldHVybjtcclxuICAgICAgdGhpcy5jb29yZHMucHVzaChpbmRleClcclxuICAgIH1cclxuXHJcbiAgICByYW5kb21EaXJlY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgcmFuZG9tRGlyZWN0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XHJcbiAgICAgICAgaWYgKHJhbmRvbURpcmVjdGlvbiA9PT0gMCkgdGhpcy5kaXJlY3Rpb24gPSBcImhvcml6b250YWxcIjtcclxuICAgICAgICBpZiAocmFuZG9tRGlyZWN0aW9uID09PSAxKSB0aGlzLmRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgU2hpcCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGdhbWVQbGF5IGZyb20gJy4vZ2FtZXBsYXknXHJcbmltcG9ydCB7IHJlbmRlckFsbCB9IGZyb20gJy4vZG9tJ1xyXG5cclxuZ2FtZVBsYXkuc2V0dXAoKVxyXG5nYW1lUGxheS5hZGRTaGlwcygpXHJcbnJlbmRlckFsbCgpIl0sInNvdXJjZVJvb3QiOiIifQ==
import dragFunctions from "./dragfunctions";
import gamePlay from "./gameplay";

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
    gamePlay.data.gameboards.playerBoard.ships.forEach((ship) => {
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
  renderBoard(gamePlay.data.gameboards.playerBoard, playerGrid);
  renderBoard(gamePlay.data.gameboards.computerBoard, computerGrid);
  renderShipsOnBoard(gamePlay.data.gameboards.computerBoard, computerGrid);
  renderSelectionGrid(gamePlay.data.gameboards.playerBoard.ships);
  dragFunctions.addDragListeners();

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
  gamePlay.data.gameboards.playerBoard.randomShipsDirection();
  gamePlay.data.gameboards.playerBoard.placeRandomShip(
    gamePlay.data.gameboards.playerBoard.ships
  );
  renderShipsOnBoard(gamePlay.data.gameboards.playerBoard, playerGrid);
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
  gamePlay.data.gameon = false;
  gamePlay.resetBoardAndShips();
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
  gamePlay.data.gameon = true;
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
  const computerBoard = gamePlay.data.gameboards.computerBoard;
  let index = e.target.id;
  //   const classes = ['hit', 'miss', 'sunk']
  if (
    e.target.classList.contains("hit") ||
    e.target.classList.contains("miss") ||
    e.target.classList.contains("sunk")
  )
    return;

  const shipName = e.target.classList[2];
  const boardReturnInfo = gamePlay.updateBoardInfo(index, computerBoard);

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
  const gameOver = gamePlay.checkIfGameOver();
  if (gameOver) {
    disableClicks();
    message(`Game Over! ${gameOver} wins!`);
  } else {
    return computerAttack();
  }
};

const computerAttack = () => {
  const playerBoard = gamePlay.data.gameboards.playerBoard;
  const playerGrid = document.querySelector(".playerGrid");
  const playerGridTiles = playerGrid.querySelectorAll("div");
  let index = gamePlay.data.players.computerPlayer.attackBoard(playerBoard);

  const boardReturnInfo = gamePlay.updateBoardInfo(index, playerBoard);

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

  const gameOver = gamePlay.checkIfGameOver();
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

  if (gamePlay.data.gameon === false) {
     message("Drag and drop your ships to begin!")
    computerGrid.classList.add("hidden");
    startBtn.classList.remove("hidden");
    rotateBtn.classList.remove("hidden");
    randomPlaceBtn.classList.remove("hidden");
    playerSelectGrid.classList.remove("hidden");
  }

  if (gamePlay.data.gameon === true) {
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

export { renderAll, renderShipsOnBoard };

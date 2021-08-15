import gamePlay, { data } from "./gameplay";
import { renderShipsOnBoard } from "./dom";

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
    const playerBoard = gamePlay.data.gameboards.playerBoard;
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
      renderShipsOnBoard(playerBoard, playerGrid);
      playerSelectGrid.removeChild(selectedShipContainer);
    }
  },
};
export default dragFunctions;

import Gameboard from "./board";
import Player from "./player";

const gamePlay = {
  data: {
    gameboards: {},
    players: {},
    gameon: false,
  },

  setup() {
    this.data.gameboards.playerBoard = new Gameboard();
    this.data.gameboards.computerBoard = new Gameboard();
    this.data.players.humanPlayer = new Player("Player");
    this.data.players.computerPlayer = new Player("Computer");

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

export default gamePlay;

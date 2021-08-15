import Gameboard from "../board";
import gamePlay from "../gameplay";

describe("Setup functions", () => {
  beforeEach(() => {
    gamePlay.setup();
  });
  test("Setup", () => {
    expect(gamePlay.data.gameboards.playerBoard).toBeInstanceOf(Gameboard);
    expect(gamePlay.data.gameboards.computerBoard).toBeInstanceOf(Gameboard);
  });

  test("add ships to board array", () => {
    gamePlay.addShips();
    gamePlay.data.gameboards.computerBoard.ships[0].direction = "vertical";
    expect(gamePlay.data.gameboards.playerBoard.ships.length).toBe(5);
    expect(gamePlay.data.gameboards.computerBoard.ships.length).toBe(5);
    expect(gamePlay.data.gameboards.playerBoard.ships[0]).toMatchObject({
      name: "destroyer",
      shipLength: 2,
      coords: [],
      direction: "vertical",
      sunk: false,
    });
    expect(gamePlay.data.gameboards.computerBoard.ships[0]).toMatchObject({
      name: "destroyer",
      shipLength: 2,
      coords: [],
      direction: "vertical",
      sunk: false,
    });
  });
});

describe("Gameplay functions", () => {
  beforeEach(() => {
    gamePlay.setup();
    gamePlay.addShips();
    const playerboard = gamePlay.data.gameboards.playerBoard;
    const computerboard = gamePlay.data.gameboards.computerBoard;
    let destroyer = playerboard.ships[0];
    let submarine = playerboard.ships[1];
    let cruiser = playerboard.ships[2];
    let battleship = playerboard.ships[3];
    let carrier = playerboard.ships[4];

    playerboard.addShipToBoard(destroyer, [1, 2]);
    playerboard.addShipToBoard(submarine, [3, 4, 5]);
    playerboard.addShipToBoard(cruiser, [6, 7, 8]);
    playerboard.addShipToBoard(battleship, [10, 11, 12, 13]);
    playerboard.addShipToBoard(carrier, [14, 15, 16, 17, 18]);
  });

  test("Reset board and ships", () => {
    const playerboard = gamePlay.data.gameboards.playerBoard;
    const computerboard = gamePlay.data.gameboards.computerBoard;
    gamePlay.resetBoardAndShips();
    expect(playerboard.ships.length).toBe(5);
    expect(computerboard.ships.length).toBe(5);

    let playerArr = [];
    let computerArr = [];
    computerboard.board.forEach((obj) => {
      if (obj !== null) computerArr.push(obj);
    });
    playerboard.board.forEach((obj) => {
      if (obj !== null) playerArr.push(obj);
    });
    expect(computerArr.length).toBe(17);
    expect(playerArr.length).toBe(0);
  });

  test("Updating of board info", () => {
    const playerBoard = gamePlay.data.gameboards.playerBoard;
    const boardinfo1 = gamePlay.updateBoardInfo(1, playerBoard);
    const boardinfo2 = gamePlay.updateBoardInfo(2, playerBoard);
    const boardinfo3 = gamePlay.updateBoardInfo(9, playerBoard);
    expect(boardinfo1).toBe("hit");
    expect(boardinfo2).toBe("sunk");
    expect(boardinfo3).toBe("miss");
    expect(playerBoard.board[2].status).toBe("sunk");
    expect(playerBoard.board[9].status).toBe("miss");
  });

  test("Check if game is over for Player", () => {
    const playerboard = gamePlay.data.gameboards.playerBoard;
    playerboard.ships.forEach((ship) => (ship.sunk = true));
    expect(gamePlay.checkIfGameOver()).toBe("Computer");
  });
  test("Check if game is over for Computer", () => {
    const computerboard = gamePlay.data.gameboards.computerBoard;
    computerboard.ships.forEach((ship) => (ship.sunk = true));
    expect(gamePlay.checkIfGameOver()).toBe("Player");
  });
});

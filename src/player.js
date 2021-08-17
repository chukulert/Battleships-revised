class Player {
  constructor(name) {
    this.name = name;
  }

  randomAttackValidSpots(gameboard) {
    let possibleSpots = [];
    gameboard.board.forEach((tile, index) => {
      if (tile === null || !tile.hasOwnProperty("status"))
        possibleSpots.push(index);
    });
    const randomSpot =
      possibleSpots[Math.floor(Math.random() * possibleSpots.length)];
    return randomSpot;
  }

  checkForHits(gameboard) {
    const hitsArr = [];
    gameboard.board.forEach((index) => {
      if (index === null) return;
      else if (index.status === "hit") {
        hitsArr.push(gameboard.board.indexOf(index));
      }
    });
    return hitsArr;
  }

  //check for surrounding tiles
  checkForSurroundingTiles(index, gameboard) {
    let surroundingTiles = [];
    const topTile = +index - 10;
    const bottomTile = +index + 10;
    const leftTile = +index - 1;
    const rightTile = +index + 1;
    surroundingTiles.push(topTile, bottomTile, leftTile, rightTile);
    return this.checkForValidTiles(index, surroundingTiles, gameboard);
  }

  checkForValidTiles(index, surroundingTiles, gameboard) {
    //if left border
    if (index % 10 === 0) surroundingTiles.splice(2, 1);
    //if right border
    if (index % 10 === 9) surroundingTiles.splice(3, 1);
    //if surrounding tiles are out of range
    surroundingTiles = surroundingTiles.filter((tile) => {
      return tile >= 0 && tile <= 99;
    });

    surroundingTiles = surroundingTiles.filter((tile) => {
      if (
        gameboard.board[tile] === null ||
        !gameboard.board[tile].hasOwnProperty("status")
      )
        return true;
    });
    return surroundingTiles;
  }

  checkForPossibleShipDirection(hitsArr, gameboard) {
    let possibleShipDirection;
    const min = Math.min(...hitsArr);
    const max = Math.max(...hitsArr);
    if (Math.abs(hitsArr[0] - hitsArr[1]) === 10)
      possibleShipDirection = "vertical";
    if (Math.abs(hitsArr[0] - hitsArr[1]) === 1)
      possibleShipDirection = "horizontal";

    if (
      possibleShipDirection === "vertical" &&
      this.checkForValidTiles(min, [min - 10, max + 10], gameboard).length === 0
    ) {
      possibleShipDirection = "horizontal";
    }

    if (
      possibleShipDirection === "horizontal" &&
      this.checkForValidTiles(min, [min - 1, max + 1], gameboard).length === 0
    ) {
      possibleShipDirection = "vertical";
    }
    return possibleShipDirection;
  }

  attackShipDirection(hitsArr, direction, gameboard) {
    let bestAttackSpot;
    const min = Math.min(...hitsArr);
    const max = Math.max(...hitsArr);

    if (direction === "vertical") {
      if (this.checkForValidTiles(min, [min - 10], gameboard).length) {
        bestAttackSpot = min - 10;
      } else if (this.checkForValidTiles(max, [max + 10], gameboard).length) {
        bestAttackSpot = max + 10;
      } else {
        let newMax = gameboard.board.findIndex((tile, index) => {
            return index > min && !tile.hasOwnProperty("status");
      })
      bestAttackSpot = newMax
    }}
    if (direction === "horizontal") {
      if (this.checkForValidTiles(min, [min - 1], gameboard).length) {
        bestAttackSpot = min - 1;
      } else if (this.checkForValidTiles(max, [max + 1], gameboard).length) {
        bestAttackSpot = max + 1;
      } else {
        let newMax = gameboard.board.findIndex((tile, index) => {
          console.log(index);
          return index > min && !tile.hasOwnProperty("status");
        });
        bestAttackSpot = newMax;
      }
    }
    return bestAttackSpot;
  }

  attackBoard(gameboard) {
    let bestAttackSpot;
    const hitsArr = this.checkForHits(gameboard);
    if (!hitsArr.length) {
      bestAttackSpot = this.randomAttackValidSpots(gameboard);
    }
    if (hitsArr.length === 1) {
      const surroundingTiles = this.checkForSurroundingTiles(
        [hitsArr],
        gameboard
      );
      bestAttackSpot = surroundingTiles[0];
    }
    if (hitsArr.length > 1) {
      const possibleShipDirection = this.checkForPossibleShipDirection(
        hitsArr,
        gameboard
      );
      bestAttackSpot = this.attackShipDirection(
        hitsArr,
        possibleShipDirection,
        gameboard
      );
    }
    return bestAttackSpot;
  }
}

export default Player;

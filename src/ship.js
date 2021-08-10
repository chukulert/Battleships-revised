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

  export default Ship
import Ship from "../ship";

describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship("destroyer", 2);
  });

  test("creates a new ship", () => {
    expect(ship).toEqual({
      name: "destroyer",
      shipLength: 2,
      coords: [],
      direction: "vertical",
      sunk: false,
    });
  });

  test("hit function", () => {
    ship.hit(1);
    expect(ship.coords).toContain(1);
  });

  test("test for double hits", () => {
    ship.hit(1);
    ship.hit(1);
    expect(ship.coords.length).toBe(1);
  });

  test("ship is sunk", () => {
    ship.hit(1);
    ship.hit(2);
    ship.isSunk();
    expect(ship.sunk).toBe(true);
  });
});

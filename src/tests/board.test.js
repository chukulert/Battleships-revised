import Gameboard from '../board'
import Ship from '../ship'

describe('board', ()=>{
    let playerBoard
    let testBoard
    let shipA
    let shipB

    beforeEach(()=>{
        playerBoard = new Gameboard
        shipA = new Ship('Carrier', 5)
        shipB = { name: 'Carrier', shipLength: 5, coords: [], direction : 'horizontal', sunk : false }
    })

    test('initialize a new game board', ()=>{
        playerBoard.createBoard()
        expect(playerBoard.board.length).toBeLessThanOrEqual(100)
        expect(playerBoard.board[0]).toBeFalsy()
    })

    test('Add ship to ships array', ()=>{
        playerBoard.addShip('destroyer', 2)
        expect(playerBoard.ships[0]).toEqual({ name: 'destroyer', shipLength: 2, coords: [], direction : 'vertical', sunk : false })
    })

    test('Add ship to board', ()=>{
        playerBoard.addShipToBoard(shipA, [1,2,3,4,5])
        for(let i = 1; i < 6; i++){
            expect(playerBoard.board[i]).toBeTruthy()
        }
    })

    test('Generating a random spot with a ship', ()=>{
        expect(playerBoard.generateRandomCoords(shipB) % 10).toBeLessThanOrEqual(5)
        expect(playerBoard.generateRandomCoords(shipA)).toBeLessThanOrEqual(59)
    })

    test('Generating a random number from 1 to 100', () => {
        expect(playerBoard.generateRandomNumber()).toBeLessThanOrEqual(99)
        expect(playerBoard.generateRandomNumber()).toBeGreaterThanOrEqual(0)
    })

    test('Check if coords are valid', ()=>{
        playerBoard.createBoard()
        playerBoard.addShipToBoard(shipA, [1,2,3,4,5])
        let index = playerBoard.checkIfCoordsValid([1,2,3,4,5])
        let index2 = playerBoard.checkIfCoordsValid([6,7,8,9,10])
        expect(index).toBe(false)
        expect(index2).toBe(true)
    })

    test('Generate ship coords array', ()=>{
        let coordinatesArr = playerBoard.generateShipCoords(5, shipA)
        let coordinatesArr2 = playerBoard.generateShipCoords(4, shipB)
        expect(coordinatesArr).toStrictEqual([5,15,25,35,45])
        expect(coordinatesArr2).toStrictEqual([4,5,6,7,8])
    })

    test('Add valid ship to board', ()=>{
        playerBoard.createBoard()
        playerBoard.generateRandomShipCoords(shipA)
        const validBoardArr = playerBoard.board.filter(index=>{
            return index !== null
        })
        expect(validBoardArr.length).toBe(5)
        playerBoard.generateRandomShipCoords(shipB)
        const validBoardArr2 = playerBoard.board.filter(index=>{
            return index !== null
        })
        expect(validBoardArr2.length).toBe(10)
    })

    test('place array of ships', ()=>{
        playerBoard.createBoard()
        let shipArr = [shipA, shipB]
        playerBoard.placeRandomShip(shipArr)
        const validBoardArr = playerBoard.board.filter(index=>{
            return index !== null
        })
        expect(validBoardArr.length).toBe(10)
    })










})
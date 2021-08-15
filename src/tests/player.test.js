import gamePlay from '../gameplay'

describe('test player functions for computer', ()=>{
    let playerboard
    let HumanPlayer

    beforeEach(()=>{
        gamePlay.setup()
        gamePlay.addShips()
        HumanPlayer = gamePlay.data.players.humanPlayer
        playerboard = gamePlay.data.gameboards.playerBoard
        let destroyer = playerboard.ships[0]
        let submarine = playerboard.ships[1]
        let cruiser = playerboard.ships[2]
        let battleship = playerboard.ships[3]
        let carrier = playerboard.ships[4]

        playerboard.addShipToBoard(destroyer, [1,2])
        playerboard.addShipToBoard(submarine, [3,4,5])
        playerboard.addShipToBoard(cruiser, [6,7,8])
        playerboard.addShipToBoard(battleship, [10,11,12,13])
        playerboard.addShipToBoard(carrier, [14,15,16,17,18])
    })
    //randomAttackValidSpots
    test('attack random available spot', ()=>{
        let spot = HumanPlayer.randomAttackValidSpots(playerboard)
        expect(playerboard.board[spot]).toBeFalsy()
    })
    //checkForHits
    test('check for hit spot', ()=>{
        playerboard.board[18].status = 'hit'
        playerboard.board[17].status = 'hit'
        let hits = HumanPlayer.checkForHits(playerboard)
        expect(hits).toContain(17, 18)
    })
    //checkForValidTiles
    test('check for valid tiles', ()=>{
        let combinedTilesArr1 = HumanPlayer.checkForValidTiles(0, [-10, 10, -1, 1], playerboard)
        expect(combinedTilesArr1).toContain(1, 10)

        let combinedTilesArr2 = HumanPlayer.checkForValidTiles(29, [19, 39, 28, 30], playerboard)
        expect(combinedTilesArr2).toContain(19, 39, 28)

        playerboard.board[8].status = 'hit'
        let combinedTilesArr3 = HumanPlayer.checkForValidTiles(9, [-1, 19, 8, 10], playerboard)
        expect(combinedTilesArr3).toContain(19)
    })
    //checkForSurroundingTiles
    test('check for valid surrounding tiles', ()=>{
        let combinedTilesArr1 = HumanPlayer.checkForSurroundingTiles(0, playerboard)
        expect(combinedTilesArr1).toContain(1, 10)

        let combinedTilesArr2 = HumanPlayer.checkForSurroundingTiles(29, playerboard)
        expect(combinedTilesArr2).toContain(19, 39, 28)

        playerboard.board[8].status = 'hit'
        playerboard.board[9] = {status: 'miss'}
        let combinedTilesArr3 = HumanPlayer.checkForSurroundingTiles(9, playerboard)
        expect(combinedTilesArr3).toContain(19)
    })
    //checkForPossibleShipDirection
    test('check for possible ship direction', ()=>{
        let one = HumanPlayer.checkForPossibleShipDirection([1,2], playerboard)
        let two =  HumanPlayer.checkForPossibleShipDirection([2,1], playerboard)
        let three = HumanPlayer.checkForPossibleShipDirection([10,20], playerboard)
        let four = HumanPlayer.checkForPossibleShipDirection([31,21], playerboard)
        expect(one).toBe('horizontal')
        expect(two).toBe('horizontal')
        expect(three).toBe('vertical')
        expect(four).toBe('vertical')
    })
    //checkForPossibleShipDirection
    test('check for odd cases of possible ship direction', ()=>{
        playerboard.board[8].status = 'hit'
        playerboard.board[18].status = 'hit'
        let one = HumanPlayer.checkForPossibleShipDirection([8,18], playerboard)
        expect(one).toBe('vertical')

        playerboard.board[6].status = 'hit'
        playerboard.board[16].status = 'hit'
        playerboard.board[26] = {status: 'miss'}
        let two = HumanPlayer.checkForPossibleShipDirection([6,16], playerboard)
        expect(two).toBe('horizontal')
    })

    //attackShipDirection
    test('Attack ship with possible direction', ()=>{
        let one = HumanPlayer.attackShipDirection([47, 48], 'horizontal', playerboard)
        let two = HumanPlayer.attackShipDirection([45, 55], 'vertical', playerboard)
        let three = HumanPlayer.attackShipDirection([45, 55], 'horizontal', playerboard)
        let four = HumanPlayer.attackShipDirection([47, 48], 'vertical', playerboard)
        expect(one).toBe(46)
        expect(two).toBe(35)
        expect(three).toBe(44)
        expect(four).toBe(37)
    })
    
    //attackBoard (1 hit spot)
    test('Attacking a board with 1 hit spot and return best spot', ()=>{
        playerboard.board[10].status = 'hit'
        const bestSpot = HumanPlayer.attackBoard(playerboard)
        expect(bestSpot).toBe(0)
    })

    //attackBoard (multiple hit cases)
    test('Attacking a board with multiple hit spots and return best spot', ()=>{
        playerboard.board[8].status = 'hit'
        playerboard.board[18].status = 'hit'
        playerboard.board[28] = {status: 'miss'}
        const bestSpot = HumanPlayer.attackBoard(playerboard)
        expect(bestSpot).toBe(7)
    })
 
})
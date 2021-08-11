import gamePlay from './gameplay'
import { renderAll } from './dom'
import dragFunctions from './dragfunctions'

gamePlay.setup()
gamePlay.addShips()
renderAll()
dragFunctions.addDragListeners()
const Player = require("../factories/player")
const Game = require('../game_play')



test("mock game with player1 winning, no back and forth",()=>{
    var game = Game()
    game.player1.randomShipPlacement();

    game.player2.manualShipPlacement(game.player2.gameboard.ships[0],[[1,2],[1,3],[1,4],[1,5],[1,6]])
    game.player2.manualShipPlacement(game.player2.gameboard.ships[1],[[2,3],[2,4],[2,5],[2,6]])
    game.player2.manualShipPlacement(game.player2.gameboard.ships[2],[[8,5],[8,6],[8,7]])
    game.player2.manualShipPlacement(game.player2.gameboard.ships[3],[[7,3],[8,3],[9,3]])
    game.player2.manualShipPlacement(game.player2.gameboard.ships[4],[[4,4],[4,5]])

    var positions_till_sunk = [];
    for(let i=0; i<game.player2.gameboard.ships.length;i++){
        positions_till_sunk.push(game.player2.gameboard.ships[i].position)
    }
    positions_till_sunk = positions_till_sunk.flat()
    for(let i=0;i<positions_till_sunk.length;i++){
        game.player1.manual_attack(game.player2, positions_till_sunk[i])
        game.counter++
    }

    var winner = game.determine_winner(game.player1,game.player2)
    console.log(`${winner.name} has won after ${game.counter} rounds!`)
    expect(winner).toBe(game.player1)
})

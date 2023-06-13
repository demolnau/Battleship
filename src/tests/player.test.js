//const Ship = require("./ship")
//const {Square, Gameboard} = require("./gameboard.js")
const Player = require("../factories/player.js")
//const DIMENSIONS =10;

var player4 = Player();
var player3 = Player();

// test("create a player that is a person and wants to randomly place their ships",()=>{
//     player4.randomShipPlacement();
// })
test("check the number of ships that have been placed",()=>{
    player4.randomShipPlacement();
    console.log("checking the number of placed ships for random placement: " + player4.gameboard.number_of_ships_played)
    expect(player4.gameboard.number_of_ships_played).toBe(5)
})

test("create a player that wants to manually place their ships. check the number of ships that have been placed",()=>{
    player3.manualShipPlacement(player3.gameboard.ships[0],[[1,2],[1,3],[1,4],[1,5],[1,6]])
    player3.manualShipPlacement(player3.gameboard.ships[1],[[2,3],[2,4],[2,5],[2,6]])
    player3.manualShipPlacement(player3.gameboard.ships[2],[[8,5],[8,6],[8,7]])
    player3.manualShipPlacement(player3.gameboard.ships[3],[[7,3],[8,3],[9,3]])
    player3.manualShipPlacement(player3.gameboard.ships[4],[[4,4],[4,5]])
    expect(player3.gameboard.number_of_ships_played).toBe(5)
})
test("check the number of available positions to hit",()=>{
    expect(player4.available_moves.length).toBe(100)
})
test("manual attack hit",()=>{
    expect(player4.manual_attack(player3,[4,4])).toBe()
})

test("record of the hits on player3's board",()=>{
    expect(JSON.stringify(player3.gameboard.position_of_hits)).toBe(JSON.stringify([[4,4]]));
})
test("should not have the index for position 4,4 still listed in the available positions to attack for player 1",()=>{
    //const removed_index = player3.gameboard.get_index(4,4)
    expect(JSON.stringify(player4.available_moves).includes(JSON.stringify([4,4]))).toBe(false)
})

test("manual attack miss",()=>{
    expect(player4.manual_attack(player3,[6,3])).toBe(false)
})

test("record of the misses on player3's board",()=>{
    player4.manual_attack(player3,[6,4])
    expect(JSON.stringify(player3.gameboard.missed_shots)).toBe(JSON.stringify([[6,3], [6,4]]));
})


test("random attack",()=>{
    player3.random_attack(player4)
    expect(player3.available_moves.length).toBe(99)
})
//const Ship = require("./ship")
//const {Square, Gameboard} = require("./gameboard.js")
const Player = require("./player.js")
const DIMENSIONS =10;

var player1 = Player();
var player3 = Player();

test("create a player that is a person and wants to randomly place their ships",()=>{
    player1.randomShipPlacement();
})
test("check the number of ships that have been placed",()=>{
    expect(player1.gameboard.number_of_ships_played).toBe(5)
})

test("create a player that wants to manually place their ships",()=>{
    player3.manualShipPlacement(player3.gameboard.ships[0],[[1,2],[1,3],[1,4],[1,5],[1,6]])
    player3.manualShipPlacement(player3.gameboard.ships[1],[[2,3],[2,4],[2,5],[2,6]])
    player3.manualShipPlacement(player3.gameboard.ships[2],[[8,5],[8,6],[8,7]])
    player3.manualShipPlacement(player3.gameboard.ships[3],[[7,3],[8,3],[9,3]])
    player3.manualShipPlacement(player3.gameboard.ships[4],[[4,4],[4,5]])
})
test("check the number of ships that have been placed",()=>{
    expect(player3.gameboard.number_of_ships_played).toBe(5)
})

test("manual attack hit",()=>{
    expect(player1.manual_attack(player3,[4,4])).toBe(true)
})
test("record of the hits on player3's board",()=>{
    expect(JSON.stringify(player3.gameboard.position_of_hits)).toBe(JSON.stringify([[4,4]]));
})
test("manual attack miss",()=>{
    expect(player1.manual_attack(player3,[6,3])).toBe(false)
})
test("manual attack miss",()=>{
    expect(player1.manual_attack(player3,[6,4])).toBe(false)
})

test("record of the misses on player3's board",()=>{
    expect(JSON.stringify(player3.gameboard.missed_shots)).toBe(JSON.stringify([[6,3], [6,4]]));
})

test("random attack",()=>{
    console.log(player1.random_attack(player3))
})
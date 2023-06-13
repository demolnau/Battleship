//const Ship = require("./ship")
const  Gameboard = require("../factories/gameboard.js")
const DIMENSIONS =10;
const myGameboard = Gameboard();
var game_random= Gameboard();
const possible_positions = [[2,3], [3,3], [4,3]];
// const REQUIRED_SHIPS = [
//     ["carrier", 5],
//     ["battleship", 4],
//     ["cruiser", 3],
//     ["submarine",3],
//     ["destroyer", 2]
// ]

test("position within board",()=>{
    expect(myGameboard.check_position_on_board(4,4)).toBe(true)
})
test("position within board false",()=>{
    expect(myGameboard.check_position_on_board(4,10)).toBe(false)
})

test("position within board false",()=>{
    expect(myGameboard.check_position_on_board(-1,2)).toBe(false)
})

test("is placement possible, true", ()=>{
    expect(myGameboard.isPlacementPossible(myGameboard.ships[3],possible_positions)).toBe(true)
})

test("is placement possible, false too long of an array", ()=> {
    expect(myGameboard.isPlacementPossible(myGameboard.ships[4],possible_positions)).toBe(false)
})
test("is placement possible, false too short", ()=> {
    expect(myGameboard.isPlacementPossible(myGameboard.ships[0],possible_positions)).toBe(false)
})
test("is placement possible, false outside of board", ()=> {
    var out_of_bounds = [[4,8],[4,9],[4,10]]
    expect(myGameboard.isPlacementPossible(myGameboard.ships[3],out_of_bounds)).toBe(false)
})

test("is placement possible, false because ship already at that position", ()=> {
    myGameboard.placeShip(myGameboard.ships[3],possible_positions)
    expect(myGameboard.isPlacementPossible(myGameboard.ships[4],possible_positions)).toBe(false)
})

test("gameboard should keep track of the ship placement, should be false because this was already placed above",()=>{
    expect(myGameboard.isPlacementPossible(myGameboard.ships[3],possible_positions)).toBe(false)
});

test("ship sound not allow the placement of a ship if that spot is taken",()=>{
    expect(myGameboard.placeShip(myGameboard.ships[3],possible_positions)).toBe(false)
});

test("give the position of the 4th ship for gameboard",()=>{
    expect(JSON.stringify(myGameboard.ships[3].position)).toBe(JSON.stringify([[2,3], [3,3], [4,3]]))
});

test("Check the number of ships that have been placed so far",()=>{
    expect(myGameboard.number_of_ships_played).toBe(1)
})

test("Check the number of ships that have been placed so far",()=>{
    var gameboard2= Gameboard();
    gameboard2.placeShip(gameboard2.ships[4], [[4,4],[4,5]])
    gameboard2.placeShip(gameboard2.ships[2],[[7,3],[8,3],[9,3]])
    expect(gameboard2.number_of_ships_played).toBe(2)
})

test("receive attack function should determine if a ship was missed",()=>{
    expect(myGameboard.receiveAttack(5,3)).toBe(false)
});

test("receive attack function should determine if a ship was hit",()=>{
    expect(myGameboard.receiveAttack(3,3)).toBe(true)
});

test("receive attack function should not allow a previously made attack",()=>{
    expect(myGameboard.receiveAttack(3,3)).toBe(false)
});

test("receive attack function should record the missed coordinates",()=>{
    expect(JSON.stringify(myGameboard.missed_shots)).toBe(JSON.stringify([[5,3]]))
});

test("receive attack function should record the hit coordinates",()=>{
    expect(JSON.stringify(myGameboard.position_of_hits)).toBe(JSON.stringify([[3,3]]))
});

test("Gameboards should report whether or not all of their ships have been sunk",()=> {
    myGameboard.receiveAttack(2,3)
    myGameboard.receiveAttack(4,3)
    expect(myGameboard.sunk_all_ships()).toBe(false)
});

test("get the number of ships sunk",()=>{
    expect(myGameboard.number_of_ships_sunk).toBe(1)
})

test("mock test setting the number of ships sunk to 5",()=>{
    var sinkable = Gameboard()
    sinkable.number_of_ships_sunk = 5    
    //console.log("number of ships sunk: "+myGameboard.number_of_ships_sunk)
    expect(sinkable.sunk_all_ships()).toBe(true)

})


test("generate a vertical array given a length and a starting position",()=>{
    var new_game = Gameboard();
    //console.log(new_game.get_possible_position_array(44, 4, true).possible_pos_array)
    expect(JSON.stringify(new_game.get_possible_position_array(44, 4, true))).toBe(JSON.stringify([[4,4],[5,4],[6,4],[7,4]]))
})

test("generate a horizontal position array given a starting position and a length",()=>{
    var game1 = Gameboard();
    expect(JSON.stringify(game1.get_possible_position_array(44, 3, false))).toBe(JSON.stringify([[4,4], [4,5],[4,6]]))
})

test("randomly generate a position array",()=>{
    game_random.randomly_place_ships()
    //console.log(game_random.ships)
    // expect(JSON.stringify(game_random.ships)).toBe(JSON.stringify(
    //     [
    //         {
    //           name: 'carrier',
    //           ship_length: 5,
    //           position: [ [Array], [Array], [Array], [Array], [Array] ],
    //           hits: 0,
    //           sunk: false,
    //           hit: [Function: hit],
    //           isSunk: [Function: isSunk]
    //         },
    //         {
    //           name: 'battleship',
    //           ship_length: 4,
    //           position: [ [Array], [Array], [Array], [Array] ],
    //           hits: 0,
    //           sunk: false,
    //           hit: [Function: hit],
    //           isSunk: [Function: isSunk]
    //         },
    //         {
    //           name: 'cruiser',
    //           ship_length: 3,
    //           position: [ [Array], [Array], [Array] ],
    //           hits: 0,
    //           sunk: false,
    //           hit: [Function: hit],
    //           isSunk: [Function: isSunk]
    //         },
    //         {
    //           name: 'submarine',
    //           ship_length: 3,
    //           position: [ [Array], [Array], [Array] ],
    //           hits: 0,
    //           sunk: false,
    //           hit: [Function: hit],
    //           isSunk: [Function: isSunk]
    //         },
    //         {
    //           name: 'destroyer',
    //           ship_length: 2,
    //           position: [ [Array], [Array] ],
    //           hits: 0,
    //           sunk: false,
    //           hit: [Function: hit],
    //           isSunk: [Function: isSunk]
    //         }
    
    //     ]
    
    // ))
})
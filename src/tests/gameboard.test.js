//const Ship = require("./ship")
const Gameboard = require("../factories/gameboard.js")


test("position within board",()=>{
    const myGameboard = Gameboard();
    expect(myGameboard.check_position_on_board(4,4)).toBe(true)
})
test("position within board false",()=>{
    const myGameboard = Gameboard();
    expect(myGameboard.check_position_on_board(4,10)).toBe(false)
})

test("position within board false",()=>{
    const myGameboard = Gameboard();
    expect(myGameboard.check_position_on_board(-1,2)).toBe(false)
})

test("is placement possible, true", ()=>{
    const myGameboard = Gameboard();
    const possible_positions = [[2,3], [3,3], [4,3]];
    expect(myGameboard.isPlacementPossible(myGameboard.ships[3],possible_positions)).toBe(true)
})

test("is placement possible, false too long of an array", ()=> {
    const myGameboard = Gameboard();
    const possible_positions = [[2,3], [3,3], [4,3]];
    expect(myGameboard.isPlacementPossible(myGameboard.ships[4],possible_positions)).toBe(false)
})
test("is placement possible, false too short", ()=> {
    const myGameboard = Gameboard();
    const possible_positions = [[2,3], [3,3], [4,3]];
    expect(myGameboard.isPlacementPossible(myGameboard.ships[0],possible_positions)).toBe(false)
})
test("is placement possible, false outside of board", ()=> {
    const myGameboard = Gameboard();
    var out_of_bounds = [[4,8],[4,9],[4,10]]
    expect(myGameboard.isPlacementPossible(myGameboard.ships[3],out_of_bounds)).toBe(false)
})

test("is placement possible, false because ship already at that position", ()=> {
    const myGameboard = Gameboard();
    const possible_positions = [[2,3], [3,3], [4,3]];
    myGameboard.placeShip(myGameboard.ships[3],possible_positions)
    expect(myGameboard.isPlacementPossible(myGameboard.ships[4],possible_positions)).toBe(false)
})

test("gameboard should keep track of the ship placement, should be false because this was already placed above",()=>{
    const myGameboard = Gameboard();
    const possible_positions = [[2,3], [3,3], [4,3]];
    myGameboard.placeShip(myGameboard.ships[3],possible_positions)
    expect(myGameboard.isPlacementPossible(myGameboard.ships[3],possible_positions)).toBe(false)
});


test("give the position of the 4th ship for gameboard",()=>{
    const myGameboard = Gameboard();
    const possible_positions = [[2,3], [3,3], [4,3]];
    myGameboard.placeShip(myGameboard.ships[3],possible_positions)
    expect(JSON.stringify(myGameboard.ships[3].position)).toBe(JSON.stringify([[2,3], [3,3], [4,3]]))
});

test("Check the number of ships that have been placed so far",()=>{
    const myGameboard = Gameboard();
    const possible_positions = [[2,3], [3,3], [4,3]];
    myGameboard.placeShip(myGameboard.ships[3],possible_positions)
    expect(myGameboard.get_number_of_ships_placed()).toBe(1)
})

test("Check the number of ships that have been placed so far",()=>{
    var gameboard2= Gameboard();
    gameboard2.placeShip(gameboard2.ships[4], [[4,4],[4,5]])
    gameboard2.placeShip(gameboard2.ships[2],[[7,3],[8,3],[9,3]])
    expect(gameboard2.get_number_of_ships_placed()).toBe(2)
})

test("receive attack function should determine if a ship was missed",()=>{
    const myGameboard = Gameboard();
    const possible_positions = [[2,3], [3,3], [4,3]];
    myGameboard.placeShip(myGameboard.ships[3],possible_positions)
    expect(myGameboard.receiveAttack(5,3)).toBe(false)
});

test("receive attack function should determine if a ship was hit",()=>{
    const myGameboard = Gameboard();
    const possible_positions = [[2,3], [3,3], [4,3]];
    myGameboard.placeShip(myGameboard.ships[3],possible_positions)
    expect(myGameboard.receiveAttack(3,3)).toBe(true)
});

test("receive attack function should not allow a previously made attack",()=>{
    const myGameboard = Gameboard();
    const possible_positions = [[2,3], [3,3], [4,3]];
    myGameboard.placeShip(myGameboard.ships[3],possible_positions)
    myGameboard.receiveAttack(3,3)
    expect(myGameboard.receiveAttack(3,3)).toBe(undefined)
});

test("receive attack function should record the missed coordinates",()=>{
    const myGameboard = Gameboard();
    const possible_positions = [[2,3], [3,3], [4,3]];
    myGameboard.placeShip(myGameboard.ships[3],possible_positions)
    myGameboard.receiveAttack(5,3)
    expect(JSON.stringify(myGameboard.missed_shots)).toBe(JSON.stringify([[5,3]]))
});

test("receive attack function should record the hit coordinates",()=>{
    const myGameboard = Gameboard();
    const possible_positions = [[2,3], [3,3], [4,3]];
    myGameboard.placeShip(myGameboard.ships[3],possible_positions)
    myGameboard.receiveAttack(3,3)
    expect(JSON.stringify(myGameboard.position_of_hits)).toBe(JSON.stringify([[3,3]]))
});

test("Gameboards should report whether or not all of their ships have been sunk",()=> {
    const myGameboard = Gameboard();
    const possible_positions = [[2,3], [3,3], [4,3]];
    myGameboard.placeShip(myGameboard.ships[3],possible_positions)
    myGameboard.receiveAttack(3,3)
    myGameboard.receiveAttack(2,3)
    myGameboard.receiveAttack(4,3)
    expect(myGameboard.sunk_all_ships()).toBe(false)
});

test("get the number of ships sunk",()=>{
    const myGameboard = Gameboard();
    const possible_positions = [[2,3], [3,3], [4,3]];
    myGameboard.placeShip(myGameboard.ships[3],possible_positions)
    myGameboard.receiveAttack(3,3)
    myGameboard.receiveAttack(2,3)
    myGameboard.receiveAttack(4,3)
    expect(myGameboard.number_of_ships_sunk).toBe(1)
})

test("mock test setting the number of ships sunk to 5",()=>{
    var sinkable = Gameboard()
    sinkable.number_of_ships_sunk = 5    
    expect(sinkable.sunk_all_ships()).toBe(true)

})


test("generate a vertical array given a length and a starting position",()=>{
    var new_game = Gameboard();
    expect(JSON.stringify(new_game.get_possible_position_array(row=4,column=4, length=4, isVertical=true))).toBe(JSON.stringify([[4,4],[5,4],[6,4],[7,4]]))
})

test("generate a horizontal position array given a starting position and a length",()=>{
    var game1 = Gameboard();
    expect(JSON.stringify(game1.get_possible_position_array(row=4,column=4, length=3, isVertical=false))).toBe(JSON.stringify([[4,4],[4,5],[4,6]]))
})


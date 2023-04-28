const Ship = require("./ship")
const {Square, Gameboard} = require("./gameboard.js")
const DIMENSIONS =10;

const myGameboard = Gameboard();
myGameboard.initialize();
const possible_positions = [[2,3], [3,3], [4,3]]

beforeAll(() =>{
    // const myGameboard = Gameboard();
    // myGameboard.initialize();
    // const possible_positions = [[2,3], [3,3], [4,3]]
    //battleship.position = [[1,2],[1,3],[1,4],[1,5]]
    
})


// test("can I make a square",()=>{
//     let mySquare = Square(4,4)
//     expect(JSON.stringify(mySquare.position)).toBe(JSON.stringify([4,4]))
// })

test("position within board",()=>{
    const myGameboard = Gameboard();
    myGameboard.initialize();
    const possible_positions = [[2,3], [3,3], [4,3]]
    expect(myGameboard.check_position_on_board(4,4)).toBe(true)
})

test("test get adjacent positions",()=>{
    expect(JSON.stringify(myGameboard.get_adjacent_positions(4,4))).toBe(
        JSON.stringify([
        [3,4],
        [4,3],
        [4,5],
        [5,4]
        ])
        )
})

test("is placement possible", ()=>{
    expect(myGameboard.isPlacementPossible(possible_positions)).toBe(true)
})


test("gameboard should keep track of the ship placement",()=>{
    expect(myGameboard.placeShip(myGameboard.ships[3],possible_positions)).toBe(true)
});

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
    myGameboard.number_of_ships_sunk = 5    
    console.log(myGameboard.number_of_ships_sunk)
    expect(myGameboard.sunk_all_ships()).toBe(true)
})
const Ship = require("./ship")
const {Square, Gameboard} = require("./gameboard.js")

const DIMENSIONS =10;

test("can I make a square",()=>{
    let mySquare = Square(4,4)
    expect(JSON.stringify(mySquare.position)).toBe(JSON.stringify([4,4]))
})

test("position within board",()=>{
    //let mySquare = Square(4,4)
    const myGameboard = Gameboard();
    expect(myGameboard.check_position_on_board(4,4)).toBe(true)
})

test("test get adjacent positions",()=>{
    const myGameboard = Gameboard();
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
    const myGameboard = Gameboard();
    myGameboard.initialize();
    const possible_positions = [[2,3], [3,3], [4,3]]
    expect(myGameboard.isPlacementPossible(possible_positions)).toBe(true)
})


// test("gameboard should keep track of the ship placement",()=>{
// });

// test("receive attack function should determine if a ship was hit",()=>{

// });

// test("receive attack function should record the missed coordinates",()=>{

// });

// test("Gameboards should report whether or not all of their ships have been sunk",()=> {

// });
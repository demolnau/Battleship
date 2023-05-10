//import Ship from "./javascript.js"
const Ship = require('../factories/ship');

let battleship;
beforeAll(() =>{
    battleship = Ship("battleship", 4)
    battleship.position = [[1,2],[1,3],[1,4],[1,5]]
})
test('hit the ship once',()=> {
    expect(battleship.hit()).toBe(1);
}
)
test('hit the ship again',()=> {
    expect(battleship.hit()).toBe(2);
    //console.log(`battleship hit twice. hits: ${battleship.hits}`)
}
)
test('check if ship is still afloat',()=> {
    expect(battleship.isSunk()).toBe(false);
}
)

test('hit ship twice more and then it should be sunk',()=> {
    battleship.hit();
    expect(battleship.hit()).toBe(4);
    
});

test("is the battleship sunk?",()=>{
    //console.log(`How many hits has the ship taken? ${battleship.hits}`)
    //console.log(`How long was the ship? ${battleship.ship_length}`)
    expect(battleship.isSunk()).toBe(true)
})
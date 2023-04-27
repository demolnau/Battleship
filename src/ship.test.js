//import Ship from "./javascript.js"
const Ship = require('./ship');

let battleship;
beforeAll(() =>{
    battleship = Ship("battleship",[[1,2],[1,3],[1,4],[1,5]])
})
test('hit the ship once',()=> {
    expect(battleship.hit()).toBe(1);
}
)
test('hit the ship again',()=> {
    expect(battleship.hit()).toBe(2);
}
)
test('check if ship is still afloat',()=> {
    expect(battleship.isSunk()).toBe(false);
}
)

test('hit ship twice more and then it should be sunk',()=> {
    battleship.hit();
    battleship.hit();
    expect(battleship.isSunk()).toBe(true);
});
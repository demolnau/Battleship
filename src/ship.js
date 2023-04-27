//Carrier = 5
//Battleship = 4
//Cruiser =3
//Submarine =3
//Destroyer =2

function Ship(name, ship_length){
    this.name = name;
    this.ship_length = ship_length;
    const position_arr = [];
    const hits = 0;
    const sunk = false;
    //increases the number of hits
    function hit(){
        this.hits  = this.hits +1;
        return this.hits;
    }
    //determines if the ship is sunk based on the length and the number of hits taken
    function isSunk(){
        if(this.ship_length==this.hits){
            this.sunk = true;
        }
        return this.sunk;
    }

    return {name, ship_length, position_arr, hits, sunk, hit, isSunk}
}

module.exports = Ship;
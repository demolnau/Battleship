function Ship(name, ship_length){
    this.name = name;
    const hits = 0;
    const sunk = false;
    this.ship_length = ship_length;
    const position = [];
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

    return {name, ship_length, position, hits, sunk, hit, isSunk}
}

module.exports = Ship;
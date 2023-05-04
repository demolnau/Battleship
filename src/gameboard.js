const Ship = require("./ship")

const NUMBER_OF_REQUIRED_SHIPS = 5
const DIMENSIONS = 10;
const REQUIRED_SHIPS = [
    ["carrier", 5],
    ["battleship", 4],
    ["cruiser", 3],
    ["submarine",3],
    ["destroyer", 2]
]


function Square(posX,posY){
    const position = [posX,posY]
    const has_ship = -1;
    return{position, has_ship}
}

//Gameboard is a 10X10
function Gameboard(){
    const board = create_board();
    const ships = generate_ships();
    const missed_shots = [];
    const position_of_hits = [];
    var number_of_ships_sunk = 0 ;
    var number_of_ships_played = 0;
    

    function create_board(){
        var game_board = [] 
        for(let i=0; i<DIMENSIONS; i++){
            for (let j=0; j<DIMENSIONS; j++){
                let newSquare = Square(i,j);
                game_board.push(newSquare)
            }
        }
        return game_board
    }

    function generate_ships(){
        var ships = [];
        for (let i=0;  i<REQUIRED_SHIPS.length; i++){
            const ship = Ship(REQUIRED_SHIPS[i][0], REQUIRED_SHIPS[i][1])
            //console.log(`created ${REQUIRED_SHIPS[i][0]} with a length of ${REQUIRED_SHIPS[i][1]}`)
            ships.push(ship)
        }
        return ships;
    }

    //checks that the position is within the board 
    function check_position_on_board(posX, posY){
        if(posX<DIMENSIONS && posX>-1 ){
            if(posY<DIMENSIONS && posY > -1){
                return true
            }
        }
        console.log("position "+ posX + "," +posY + " is not on the board")
        return false;
    }


    this.get_index=function(posX, posY){
        for(let i=0; i<board.length;i++){
            if(JSON.stringify(board[i].position) == JSON.stringify([posX,posY])){
                return i;
            }
        }
    }


    this.isPlacementPossible = function(ship_to_place,position_arr){
        console.log("ship to place: "+ ship_to_place.name)
        if(ship_to_place.ship_length != position_arr.length){
            console.log("Array is not the same length as the ship length required for that type of ship")
            return false;
        }
        //loops through the possible positions
        for(let i = 0 ; i< position_arr.length; i++){
            var index_of_interest = this.get_index(position_arr[i][0],position_arr[i][1]);
            //check if all positions are within board
            if(!check_position_on_board(position_arr[i][0], position_arr[i][1]) ){
                console.log("That position is off the board")
                return false;
            }
            //check that there is no ship already at that position
            if(board[index_of_interest].has_ship!=-1){
                console.log("There is already a ship at one of those positions")
                return false;
            }
        }
        return true;
    }

    function placeShip(ship_to_place, position_arr){
        //check if placement is possible
        if(!isPlacementPossible(ship_to_place,position_arr)){
            return false;
        }
        else{ 
            ship_to_place.position = position_arr
            //console.log(ship_to_place.position)
            for(let i=0;i<position_arr.length;i++){
                //console.log(board[get_index(position_arr[i][0],position_arr[i][1])])
                board[get_index(position_arr[i][0],position_arr[i][1])].has_ship=i            
            }
            number_of_ships_played = number_of_ships_played + 1;
            console.log("number of ships played increased by one: "+ number_of_ships_played + "\n" + ship_to_place.name + " placed successfully")
            return true;
        }    
    }

    function receiveAttack(posX, posY){
        let direct_hit = false;
        
        //determines if the coordinates hit any of the ships,
        //sends a hit to the correct ship,
        //records the coordinates of missed shot
        if(JSON.stringify(missed_shots).includes(JSON.stringify([posX, posY])) || JSON.stringify(position_of_hits).includes(JSON.stringify([posX,posY]))){
            console.log("you already made that move!")
        }
        else{
            for(let i=0;i<this.ships.length;i++){
                //console.log(JSON.stringify(this.ships[i].position))
                // if(this.ships[i].position==[]){
                //     return;
                // }

                if(JSON.stringify(this.ships[i].position).includes(JSON.stringify([posX,posY]))){
                    console.log("you hit a ship!")
                    this.ships[i].hits++;
                    if(this.ships[i].isSunk()==true){
                        this.number_of_ships_sunk++;
                        console.log(`YOU SUNK A ${this.ships[i].name} !!!!!`)
                    }
                    direct_hit = true;
                    //console.log("position of hits array " + this.position_of_hits)
                    //console.log("current position" + `[${posX}, ${posY}]`)
                    this.position_of_hits.push([posX,posY])
                    if(this.sunk_all_ships()==true){
                        console.log("GAME OVER")
                    }
                }
                
            }
            if(direct_hit==false){
                console.log("you missed!")
                this.missed_shots.push([posX, posY])
            }
            
        }
        return direct_hit
    }

    
    //determines if all the ships placed have been sunk
    function sunk_all_ships(){
        if(REQUIRED_SHIPS.length>this.number_of_ships_sunk){
            return false;
        }
        else{
            
            return true;
        }
    }


    this.get_possible_position_array = function(starting_position, length, isVertical){
        var possible_pos_array=[]
        var previousPos = starting_position;
        var abort = false;
        possible_pos_array.push(board[starting_position].position)
        if(isVertical == true){
            console.log("Generating a vertical position array")
            for(let i=1;i<length;i++){
                previousPos  = previousPos + 10
                if(board[previousPos]== undefined){
                    console.log("Attempted to create a position off the board")
                    abort = true
                    return
                }
                else{
                    pos_of_interest = board[previousPos].position
                    possible_pos_array.push(pos_of_interest)
                }
            }
        }
        else{
            console.log("Generating a horizontal position array")
            for(let i=1;i<length;i++){
                previousPos  = previousPos+ 1
                if(board[previousPos] == undefined){
                    console.log("Attempted to create a position off the board")
                    abort = true
                    return
                }
                else{
                    pos_of_interest = board[previousPos].position
                    possible_pos_array.push(pos_of_interest)
                }
                
            }
        }
        console.log("Generated possible array: "+JSON.stringify(possible_pos_array))
        return{possible_pos_array, abort}
    }
    
    function randomly_place_ships(){
        while(number_of_ships_played<5){
            var index_i = Math.floor(Math.random()*(DIMENSIONS*DIMENSIONS));
            var isVertical = Math.random() < 0.5;
            console.log("randomly generated starting position: " + index_i + "\n" + "number of ships played: "+ number_of_ships_played)
            var results = get_possible_position_array(index_i, this.ships[number_of_ships_played].ship_length, isVertical)
            var pos_arr = results.possible_pos_array
            var abort = results.abort
            if(abort==false){
                placeShip(this.ships[number_of_ships_played], pos_arr)
            }
            else{
                console.log("This position array will not work. Generate a new positon array")
                return
            }
        }
    }

    return{
        board, 
        ships,
        missed_shots,
        number_of_ships_sunk,
        number_of_ships_played,
        position_of_hits,
        placeShip, 
        create_board, 
        generate_ships,
        get_index,
        receiveAttack,
        check_position_on_board,
        sunk_all_ships, 
        create_board, 
        isPlacementPossible,
        get_possible_position_array,
        randomly_place_ships
    }
}

module.exports = {Square, Gameboard};



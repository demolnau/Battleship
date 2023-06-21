const Ship = require("./ship")

//const NUMBER_OF_REQUIRED_SHIPS = 5
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
    //const hit = false;
    //const has_ship = -1;
    return{position}
}

//Gameboard is a 10X10
function Gameboard(){
    var board = create_board();
    var ships = generate_ships();
    var missed_shots = [];
    var position_of_hits = [];
    var number_of_ships_sunk = 0 ;
    var number_of_ships_played = 0;

    function create_board(){
        var gameboard = [] 
        for(let i=0; i<DIMENSIONS; i++){
            gameboard[i]=[]
            for (let j=0; j<DIMENSIONS; j++){
                let newSquare = Square(i,j);
                gameboard[i][j] = newSquare
                //gameboard.push([i,j])
            }
        }
        return gameboard
    }

    function generate_ships(){
        var ships = [];
        for (let i=0;  i<REQUIRED_SHIPS.length; i++){
            const ship = Ship(REQUIRED_SHIPS[i][0], REQUIRED_SHIPS[i][1])
            ships.push(ship)
        }
        return ships;
    }

    //checks that the position is within the board 
    function check_position_on_board(posX, posY){
        if(posX<10 && posX>-1 ){
            if(posY<DIMENSIONS && posY > -1){
                return true
            }
        }
        console.log("position "+ posX + "," +posY + " is not on the board")
        return false;
    }

    function nowrap(ship_to_place,position_arr,isVertical){
        if(isVertical==false){
            if(position_arr[0][1]+ship_to_place.ship_length-1>9){
                return false
            }
        }
    }

    function get_position_of_ships(){
        try{
            var position_of_ships = []
            for(let i=0;i<REQUIRED_SHIPS.length;i++){
                var position_arr = this.ships[i].position
                position_of_ships.push(...position_arr)
            }
            return position_of_ships
        }
        catch(error){
            if(error instanceof TypeError){
                var position_of_ships = []
                for(let i=0;i<REQUIRED_SHIPS.length;i++){
                    var position_arr = ships[i].position
                    position_of_ships.push(...position_arr)
                }
                return position_of_ships
            }
            else{
                throw error
            }
        }

    }
  
    function isPlacementPossible(ship_to_place, position_arr, isVertical){
            var position_of_ships = get_position_of_ships()
            if(ship_to_place.ship_length != position_arr.length){
                console.log("Array is not the same length as the ship length required for that type of ship")
                return false;
            }
            if(nowrap(ship_to_place,position_arr,isVertical)==false){
                console.log("wrapping is not allowed!")
                return false
            }
            
            //loops through the possible positions
            for(let i = 0 ; i< position_arr.length; i++){
                if(JSON.stringify(position_of_ships).includes(JSON.stringify(position_arr[i]))){
                    console.log("WARNING: There is already a ship there")
                    return false
                }
                //check if all positions are within board
                if(!check_position_on_board(position_arr[i][0], position_arr[i][1]) ){
                    console.log("That position is off the board")
                    return false;
                }
            }
            return true;
        
    }

    function placeShip(ship_to_place, position_arr, isVertical){
            console.log("Called place ship on: " + ship_to_place.name +
            "\n at position: "+ JSON.stringify(position_arr))
            if(isPlacementPossible(ship_to_place, position_arr, isVertical)){
                ship_to_place.position = position_arr
                console.log(ship_to_place.name + " placed successfully")
                return true
            } 
            else{
                console.log("WARNING: You cannot place ship")
                return false
            }
    }


    function receiveAttack(posX, posY){
            if(JSON.stringify(this.missed_shots).includes(JSON.stringify([posX, posY])) || JSON.stringify(this.position_of_hits).includes(JSON.stringify([posX,posY]))){
                console.log("you already made that move!")
                return
            }
            else{
                for(let i=0;i<this.ships.length;i++){
                    if(JSON.stringify(this.ships[i].position).includes(JSON.stringify([posX,posY]))){
                        console.log("you hit a ship!")
                        this.ships[i].hits++;
                        this.position_of_hits.push([posX,posY])
                        if(this.ships[i].isSunk()==true){
                            this.number_of_ships_sunk++;
                            console.log(`YOU SUNK A ${this.ships[i].name}!`)
                        }
                        if(this.sunk_all_ships()==true){
                            console.log("GAME OVER")
                        }
                        return true
                    }

                }
                console.log("you missed!")
                this.missed_shots.push([posX, posY])
                return false
            }
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


    function get_possible_position_array(row, column, length, isVertical){
        var starting_position = [row,column]
        var possible_pos_array=[]
        var previousPos;
        possible_pos_array.push(starting_position)
        if(isVertical == true){
            //console.log("Generating a vertical position array")
            for(let i=1;i<length;i++){
                previousPos  = [row+i, column]
                possible_pos_array.push(previousPos)
            }
        }
        else{
            //console.log("Generating a horizontal position array")
            for(let i=1;i<length;i++){
                previousPos  = [row, column+i]
                possible_pos_array.push(previousPos)
                }
            }
        //console.log("Generated possible array: "+JSON.stringify(possible_pos_array))
        return possible_pos_array
    }
    
    function randomly_place_single_ship(ship_to_place){
            var row = Math.floor(Math.random()*DIMENSIONS);
            var column = Math.floor(Math.random()*DIMENSIONS)
            var isVertical = Math.random() < 0.5;
            var position_arr = get_possible_position_array(row, column, ship_to_place.ship_length, isVertical)
            if(position_arr==undefined){
                console.log("This position array will not work. Generate a new positon array")
                return false
            }
            else{
                if(placeShip(ship_to_place,position_arr, isVertical)){
                    return true
                }
                else{
                    return false
                }
            }
    }

    //  function randomly_place_ships(){
    //     while(this.number_of_ships_played<5){
    //         if(randomly_place_single_ship(this.ships[this.number_of_ships_played])){
    //             this.number_of_ships_played++
    //         }
    //     }
    //     return JSON.stringify(get_position_of_ships())
    // }

    function randomly_place_ships(){
        var counter = 0
        while(counter<5){
            if(randomly_place_single_ship(this.ships[counter])){
                //this.number_of_ships_played++
                counter++
            }
        }
        return JSON.stringify(get_position_of_ships())
    }

    function get_sunk_ship_positions(){
        var sunk_ship_positions = []
        for(let i=0; i<5 ;i++){
            if(this.ships[i].isSunk()==true){
                sunk_ship_positions.push(...this.ships[i].position)
            }
        }
        return sunk_ship_positions
    }
    
    function get_number_of_ships_placed(){
        //var counter=0
        for(let i=0; i<this.ships.length ;i++){
            if(this.ships[i].position.length!=0){
                //console.log("Get number of ships placed: " + typeof(this.ships[i].position))
                this.number_of_ships_played++
                //counter++
            }
        }
        return this.number_of_ships_played
    }


    return{
        board, 
        ships,
        missed_shots,
        number_of_ships_sunk,
        number_of_ships_played,
        position_of_hits,
        get_position_of_ships,
        placeShip, 
        create_board, 
        generate_ships,
        receiveAttack,
        check_position_on_board,
        sunk_all_ships, 
        create_board, 
        isPlacementPossible,
        get_possible_position_array,
        randomly_place_single_ship,
        randomly_place_ships,
        get_sunk_ship_positions,
        get_number_of_ships_placed
    }
}



module.exports =  Gameboard;



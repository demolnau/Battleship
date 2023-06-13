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
    const has_ship = -1;
    return{position, has_ship}
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

        try{
            var position_of_ships = this.get_position_of_ships()
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
        catch(error){
            if(error instanceof TypeError ){
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
            else{
                throw error
            }
        }
        
    }

    function placeShip(ship_to_place, position_arr , isVertical){
        try{
            console.log("Called place ship on: " + ship_to_place.name +
            "\n for positions: "+JSON.stringify(position_arr)+
            "\n Number of ships already on board: " + number_of_ships_played)
            if(this.isPlacementPossible(ship_to_place, position_arr, isVertical)){
                ship_to_place.position = position_arr
                number_of_ships_played++;
                console.log(ship_to_place.name + " placed successfully \n Number of ships placed now updated to " + number_of_ships_played)
                return true
            } 
            else{
                console.log("WARNING: You cannot place ship")
                return false
            }
        }
        catch(error){
            if(error instanceof TypeError){
                console.log("Alternate called: \n Called place ship on: " + ship_to_place.name +
                "\n for positions: "+JSON.stringify(position_arr)+
                "\n Number of ships already on board: " + number_of_ships_played)
                if(isPlacementPossible(ship_to_place, position_arr, isVertical)){
                    ship_to_place.position = position_arr
                    number_of_ships_played++;
                    console.log(ship_to_place.name + " placed successfully \n Number of ships placed now updated to " + number_of_ships_played)
                    return true
                } 
                else{
                    console.log("WARNING: You cannot place ship")
                    return false
                }
            }
            else{
                console.log(error)
                
            }
        }
        
        
    }

    function receiveAttack(posX, posY){
        //let direct_hit = false;
        //var position_of_ships =  this.get_position_of_ships();
        //determines if the coordinates hit any of the ships,
        //sends a hit to the correct ship,
        //records the coordinates of missed shot
        try{
            if(JSON.stringify(this.missed_shots).includes(JSON.stringify([posX, posY])) || JSON.stringify(this.position_of_hits).includes(JSON.stringify([posX,posY]))){
                console.log("you already made that move!")
            }
            else{
                for(let i=0;i<this.ships.length;i++){
                    if(JSON.stringify(this.ships[i].position).includes(JSON.stringify([posX,posY]))){
                        //console.log("you hit a ship!")
                        this.ships[i].hits++;
                        //direct_hit = true;
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
                    // else{
                    //     console.log("you missed!")
                    //     this.missed_shots.push([posX, posY])
                    //     return false
                    // }
                }
                //console.log("you missed!")
                this.missed_shots.push([posX, posY])
                return false
            }
        }
        catch(error){
            if(JSON.stringify(missed_shots).includes(JSON.stringify([posX, posY])) || JSON.stringify(position_of_hits).includes(JSON.stringify([posX,posY]))){
                console.log("you already made that move!")
            }
            else{
                for(let i=0;i<ships.length;i++){
                    if(JSON.stringify(ships[i].position).includes(JSON.stringify([posX,posY]))){
                        //console.log("you hit a ship!")
                        ships[i].hits++;
                        //direct_hit = true;
                        position_of_hits.push([posX,posY])
                        if(ships[i].isSunk()==true){
                            number_of_ships_sunk++;
                            console.log(`YOU SUNK A ${ships[i].name}!`)
                        }
                        if(sunk_all_ships()==true){
                            console.log("GAME OVER")
                        }
                        return true
                    }
                    // else{
                    //     console.log("you missed!")
                    //     missed_shots.push([posX, posY])
                    //     return false
                    // }
                }
                //console.log("you missed!")
                missed_shots.push([posX, posY])
                return false
            }
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


    this.get_possible_position_array = function(starting_position, length, isVertical){
        var possible_pos_array=[]
        var previousPos = starting_position;
        possible_pos_array.push(board[starting_position].position)
        if(isVertical == true){
            console.log("Generating a vertical position array")
            for(let i=1;i<length;i++){
                previousPos  = previousPos + 10
                if(board[previousPos]== undefined){
                    console.log("Attempted to create a position off the board")
                    return
                }
                else{
                    var pos_of_interest = board[previousPos].position
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
                    return 
                }
                else{
                    var pos_of_interest = board[previousPos].position
                    possible_pos_array.push(pos_of_interest)
                }
                
            }
        }
        console.log("Generated possible array: "+JSON.stringify(possible_pos_array))
        return possible_pos_array
    }
    
    function randomly_place_single_ship(ship_to_place){
            var index_i = Math.floor(Math.random()*(DIMENSIONS*DIMENSIONS));
            var isVertical = Math.random() < 0.5;
            var results = get_possible_position_array(index_i, ship_to_place.ship_length, isVertical)
            if(results==undefined){
                console.log("This position array will not work. Generate a new positon array")
                return false
            }
            else{
                try{
                    var placement = placeShip(ship_to_place,results, isVertical)
                    console.log("Placement: "+ placement)
                    if(placement==true){
                        return true
                    }
                    else{
                        return false
                    }
                }
                catch(error){
                    console.log(error)
                }
            }
    }

     function randomly_place_ships(){
        var counter = 0
        while(counter<5){
            console.log(counter)
            var placement = randomly_place_single_ship(this.ships[counter])
            if(placement==true){
                console.log("placement worked")
                counter++
            }
            else{
                console.log("Need to try that again")
            }

        }
        console.log(`Position of randomly placed ships: ${JSON.stringify(get_position_of_ships())}`)
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
        get_index,
        receiveAttack,
        check_position_on_board,
        sunk_all_ships, 
        create_board, 
        isPlacementPossible,
        get_possible_position_array,
        randomly_place_single_ship,
        randomly_place_ships,
        get_sunk_ship_positions
    }
}


module.exports = {Square, Gameboard};



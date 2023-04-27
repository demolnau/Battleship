const Ship = require("./ship")

const NUMBER_OF_REQUIRED_SHIPS = 5
const DIMENSIONS = 10;

const REQUIRED_SHIPS = {
    "carrier": 5,
    "battleship": 4,
    "cruiser": 3,
    "submarine":3,
    "destroyer": 2
}

function Square(posX,posY){
    const position = [posX,posY]
    const hit = false;
    const has_ship = -1;
    return{position, hit, has_ship}
}

//Gameboard is a 10X10
function Gameboard(){
    //const board_ready = false;
    const number_of_ships_played = 0;
    const missed_shots = [];
    const position_of_hits =[]
    const number_of_ships_sunk = 0 ;
    const board = [];
    const ships=[];

    function create_board(){
        for(let i=0; i<DIMENSIONS; i++){
            for (let j=0; j<DIMENSIONS; j++){
                let newSquare = Square(i,j);
                this.board.push(newSquare)
            }
        }
        return this.board
    }

    function generate_ships(){
        for (let i=0;  i<REQUIRED_SHIPS.length; i++){
            const ship = Ship(REQUIRED_SHIPS[i][0], REQUIRED_SHIPS[i][1])
            console.log(`created ${REQUIRED_SHIPS[i][0]} with a length of ${REQUIRED_SHIPS[i][1]}`)
            this.ships.push(ship)
        }
        return this.ships;
    }

    function initialize(){
        this.create_board()
        this.generate_ships();
    }



    //places a ship on the board 
    //TODO record ship placement
    function placeShip(ship_to_place, position_arr){
        //check if placement is possible
        if(!isPlacementPossible(position_arr)){
            return false;
        }
        else{ 
            ship_to_place.position_arr = position_arr
            this.number_of_ships_played++;
            for(let i=0;i<position_arr.length;i++){
                this.board[this.get_index(position_arr[i][0],position_arr[i][1])].has_ship=i            
            }
            return true;
        }    
    }



    // function get_diagonal_positions(position_of_interest){
    //     const diagonal_moves =[[-1,-1],[1, -1],[-1,1],[1,1]]
    //     const diagonal_positions=[]
    //     for(let i=0; i<diagonal_moves.length;i++){
    //         let pos_x = position_of_interest[0]+diagonal_moves[i][0]
    //         let pos_y = position_of_interest[1]+diagonal_moves[i][1]
    //         diagonal_positions.push([pos_x, pos_y])
    //     }
    //     return(diagonal_positions)
    // }

    // function diagonal_check(position_arr){
    //     const previous_position = position_arr[0]
    //     const diagonal_positions = get_diagonal_positions(previous_position)
    //     const current_position = null;
    //     for(let i = 1 ; i< position_arr.length; i++){
    //         current_position = position_arr[i];
    //         if(diagonal_positions.includes(current_position)){
    //             //TODO
    //             console.log("That is an illegal move! NO DIAGONALS ALLOWED")
    //         }
            
    //     }
    // }

    //checks that the position is within the board 
    function check_position_on_board(posX, posY){
        if(posX<DIMENSIONS && posX>-1 ){
            if(posY<DIMENSIONS && posY > -1){
                return true
            }
        }
        return false;
    }

    function get_index(posX, posY){
        for(let i=0; i<this.board.length;i++){
            if(JSON.stringify(this.board[i].position) == JSON.stringify([posX,posY])){
                return i;
            }
        }
    }

    function get_adjacent_positions(posX, posY){
        const adjacent_moves =[[-1,0],[0, -1],[0,1],[1,0]]
        const adjacent_positions=[]
        for(let i=0; i<adjacent_moves.length;i++){
            let pos_x = posX+adjacent_moves[i][0]
            let pos_y = posY+adjacent_moves[i][1]
            adjacent_positions.push([pos_x, pos_y])
        }
        return(adjacent_positions)
}

    function isPlacementPossible(position_arr){
        //loops through the possible positions
        for(let i = 0 ; i< position_arr.length; i++){
        //console.log(this.board[this.get_index(position_arr[i][0],position_arr[i][1])].has_ship)
            //check if all positions are within board
            if(!check_position_on_board(position_arr[i][0], position_arr[i][1]) ){
                return false;
            }
            //check that there is no ship already at that position
            if (this.board[this.get_index(position_arr[i][0],position_arr[i][1])].has_ship != -1){
                return false;
            }
        }
    return true;
    }

    //checks the number of ships placed on the board
    // function check_if_board_is_ready(){
    //     if(number_of_ships_played<NUMBER_OF_REQUIRED_SHIPS){
    //         console.log("need to place more ships")
    //         return false;
    //     }
    //     else{
    //         this.board_ready = true;
    //         return this.board_ready;
    //     }
    // }
    
    //determines if the coordinates hit any of the ships,
    //sends a hit to the correct ship,
    //records the coordinates of missed shot
    function receiveAttack(posX,posY){
        //TODO
    }

    //determines if all the ships placed have been sunk
    function sunk_all_ships(){
        if(number_of_ships_played>number_of_ships_sunk){
            return false;
        }
        else{
            return true;
        }
    }

    return{
        board, 
        ships,
        missed_shots,
        number_of_ships_sunk,
        placeShip, 
        create_board, 
        generate_ships,
        get_index,
        get_adjacent_positions,
        receiveAttack,
        check_position_on_board,
        sunk_all_ships, 
        create_board, 
        isPlacementPossible,
        initialize
    }
}

module.exports = {Square, Gameboard};



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
    const board = [];
    const ships = [];
    const missed_shots = [];
    const position_of_hits =[];
    var number_of_ships_sunk = 0 ;
    var number_of_ships_played = 0;
    

    function create_board(){
        for(let i=0; i<DIMENSIONS; i++){
            for (let j=0; j<DIMENSIONS; j++){
                let newSquare = Square(i,j);
                this.board.push(newSquare)
            }
        }
        return this.board
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

    function generate_ships(){
        for (let i=0;  i<REQUIRED_SHIPS.length; i++){
            const ship = Ship(REQUIRED_SHIPS[i][0], REQUIRED_SHIPS[i][1])
            //console.log(`created ${REQUIRED_SHIPS[i][0]} with a length of ${REQUIRED_SHIPS[i][1]}`)
            this.ships.push(ship)
        }
        return this.ships
    }

    function initialize(){
        this.create_board()
        this.generate_ships()
    }

    this.get_index=function(posX, posY){
        for(let i=0; i<board.length;i++){
            if(JSON.stringify(board[i].position) == JSON.stringify([posX,posY])){
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

    this.isPlacementPossible = function(position_arr){
        //loops through the possible positions
        for(let i = 0 ; i< position_arr.length; i++){
            const index_of_interst = this.get_index(position_arr[i][0],position_arr[i][1]);
            //check if all positions are within board
            if(!check_position_on_board(position_arr[i][0], position_arr[i][1]) ){
                return false;
            }
            //check that there is no ship already at that position
            if(board[index_of_interst].has_ship!=-1){
                return false;
            }
        }
        return true;
    }

    function placeShip(ship_to_place, position_arr){
        //check if placement is possible
        if(!isPlacementPossible(position_arr)){
            return false;
        }
        else{ 
            ship_to_place.position = position_arr
            this.number_of_ships_played++;
            //console.log(ship_to_place.position)
            for(let i=0;i<position_arr.length;i++){
                //console.log(this.get_index(position_arr[i][0],position_arr[i][1]))
                this.board[this.get_index(position_arr[i][0],position_arr[i][1])].has_ship=i            
            }
            return true;
        }    
    }

    function receiveAttack(posX, posY){
        let direct_hit = false;
        console.log(posX + "," + posY)
        //determines if the coordinates hit any of the ships,
        //sends a hit to the correct ship,
        //records the coordinates of missed shot
        if(JSON.stringify(missed_shots).includes(JSON.stringify([posX, posY])) || JSON.stringify(position_of_hits).includes(JSON.stringify([posX,posY]))){
            console.log("you already made that move!")
        }
        else{
            for(let i=0;i<this.ships.length;i++){
                //console.log(JSON.stringify(this.ships[i].position))
                if(this.ships[i].position==[]){
                    return;
                }
                if(JSON.stringify(this.ships[i].position).includes(JSON.stringify([posX,posY]))){
                    console.log("you hit a ship")
                    this.ships[i].hits++;
                    if(this.ships[i].isSunk()==true){
                        this.number_of_ships_sunk++;
                        console.log(`YOU SUNK A ${this.ships[i].name} !!!!!`)
                    }
                    direct_hit = true;
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
    

    return{
        board, 
        ships,
        missed_shots,
        number_of_ships_sunk,
        number_of_ships_played,
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



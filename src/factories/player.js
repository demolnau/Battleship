//const Ship = require("./ship")
const {Gameboard} = require("./gameboard.js")
const DIMENSIONS = 10;


function Player(){
    var gameboard = Gameboard();
    var name = null;
    var available_moves = get_available_moves(JSON.parse(JSON.stringify(gameboard.board) ))
    var previous_moves = [];
    var priority_moves = [];

    function get_available_moves(arr){
        var pos_arr = []
        for(let i=0; i<arr.length;i++){
            pos_arr.push(arr[i].position)
        }
         return pos_arr
    }
    

    function get_index_from_available_moves(posX, posY){
        for(let i=0; i<available_moves.length;i++){
            if(JSON.stringify(available_moves[i]) == JSON.stringify([posX,posY])){
                return i;
            }
        }
    }

    function randomShipPlacement(){
        this.gameboard.randomly_place_ships();
    }
    function manualShipPlacement(ship, pos_arr, isVertical){
        this.gameboard.placeShip(ship, pos_arr, isVertical)
    }

    function manual_attack(opponent, arr){
        //if attack has not been made at that position opponent will receive attack. The opponent's board will record the misses or hits made on their ships. 
        if(this.gameboard.number_of_ships_played==5 && opponent.gameboard.number_of_ships_played==5){
            var posX = arr[0]
            var posY = arr[1]
            var index_i = this.get_index_from_available_moves(posX,posY)
            console.log(`Attack ${opponent.name} at position [${posX},${posY}]`)
            if(index_i!=undefined){
                this.available_moves.splice(index_i,1)
                if(!JSON.stringify(this.previous_moves).includes(JSON.stringify([posX,posY]))){
                    this.previous_moves.push([posX,posY])
                    return opponent.gameboard.receiveAttack(posX, posY)
                }
            }
            else{
                return undefined
            }
        }
    }

    function random_attack(opponent){
        //if both players have placed their ships, they can launch an attack
        if(this.gameboard.number_of_ships_played==5 && opponent.gameboard.number_of_ships_played==5){
            console.log("Number of moves available: " + this.available_moves.length)
            if(this.available_moves.length > 0){
                var index_i = Math.floor(Math.random()*(this.available_moves.length));
                //console.log("random index generated:" + index_i)
                var posX= this.available_moves[index_i][0]
                var posY = this.available_moves[index_i][1]
                this.available_moves.splice(index_i,1)
                  if(!JSON.stringify(this.previous_moves).includes(JSON.stringify([posX,posY]))){
                    this.previous_moves.push([posX,posY])
                    return opponent.gameboard.receiveAttack(posX, posY)
                }
            }
            else{ 
                console.log("there are no more moves to make")
                return
            }
        }
    }
    
    function is_player_ai(response){
        if(response == "yes"){
            return true
        }
        if(response == "no"){
            return false
        }
    }

    function get_neighboring_positions(arr, player){
        //console.log(`searching for neighboring positions of ${arr}`)
        var steps = [[0,-1],[-1,0],[0,1],[1,0]]
        var neighboring_positions = []
        for(let i=0;i<steps.length;i++){
            var possibleX = steps[i][0] + arr[0]
            var possibleY = steps[i][1] + arr[1]
            var possible_position = [possibleX,possibleY]
            //console.log(possible_position)
            //if position is on the board, add it to the neighboring array
            if(player.gameboard.check_position_on_board(possibleX,possibleY)){
                neighboring_positions.push(possible_position)
            }

        }
        //console.log(`neighboring positions of ${JSON.stringify(arr)}: ${JSON.stringify(neighboring_positions)}`)
        return neighboring_positions
    }

    function smart_attack(opponent){
        //if the last move was a hit...
        if(JSON.stringify(opponent.gameboard.position_of_hits).includes(JSON.stringify(this.previous_moves[this.previous_moves.length-1]))){
            var last_posX = this.previous_moves[this.previous_moves.length-1][0]
            var last_posY = this.previous_moves[this.previous_moves.length-1][1]
            var neighboring_positions = get_neighboring_positions([last_posX,last_posY],opponent)
            for(let i=0;i<neighboring_positions.length;i++){
                //console.log(neighboring_positions[i])
                if(!JSON.stringify(previous_moves).includes(JSON.stringify(neighboring_positions[i]))){
                    this.priority_moves.push(neighboring_positions[i])
                }
            }
            this.manual_attack(opponent, this.priority_moves.pop())
            //console.log(this.priority_moves)
        }
        //if the last move was not a hit,but there are still priority moves 
        else{
            if(this.priority_moves.length!=0){
                this.manual_attack(opponent, this.priority_moves.pop())
            }
            else{
                this.random_attack(opponent)
            }
        }

    }



    return{
        gameboard,
        name,
        available_moves,
        previous_moves,
        priority_moves,
        get_available_moves,
        get_index_from_available_moves,
        randomShipPlacement,
        manualShipPlacement,
        manual_attack,
        random_attack,
        is_player_ai,
        get_neighboring_positions,
        smart_attack
    }
}

module.exports = Player;




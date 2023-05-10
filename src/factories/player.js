//const Ship = require("./ship")
const {Gameboard} = require("./gameboard.js")
const DIMENSIONS = 10;

function Player(){
    var gameboard = Gameboard();
    var name = null;
    var available_moves = get_available_moves(JSON.parse(JSON.stringify(gameboard.board) ))
    var previous_moves = [];

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
    function manualShipPlacement(ship, pos_arr){
        this.gameboard.placeShip(ship, pos_arr)
    }

    function manual_attack(opponent, arr){
        //if attack has not been made at that position opponent will receive attack. The opponent's board will record the misses or hits made on their ships. 
        if(this.gameboard.number_of_ships_played==5 && opponent.gameboard.number_of_ships_played==5){
            var posX = arr[0]
            var posY = arr[1]
            var index_i = this.get_index_from_available_moves(posX,posY)
            console.log("position to splice: " + index_i)
            this.available_moves.splice(index_i,1)
            if(!JSON.stringify(this.previous_moves).includes(JSON.stringify([posX,posY]))){
                this.previous_moves.push([posX,posY])
                return opponent.gameboard.receiveAttack(posX, posY)
            }
        }
    }


    function random_attack(opponent){
        if(this.gameboard.number_of_ships_played==5 && opponent.gameboard.number_of_ships_played==5){
            console.log("Number of moves available: " + this.available_moves.length)
            var index_i = Math.floor(Math.random()*(this.available_moves.length));
            console.log("random index generated:" + index_i)
            var posX= this.available_moves[index_i][0]
            var posY = this.available_moves[index_i][1]
             this.available_moves.splice(index_i,1)
             console.log("attack on opponent at index: "+ index_i +" at position["+posX+","+posY+"]")
             console.log("Number of available moves left: "+ this.available_moves.length)
            if(!JSON.stringify(this.previous_moves).includes(JSON.stringify([posX,posY]))){
                this.previous_moves.push([posX,posY])
                return opponent.gameboard.receiveAttack(posX, posY)
            }
        }
    }
    return{
        gameboard,
        name,
        available_moves,
        previous_moves,
        get_available_moves,
        get_index_from_available_moves,
        randomShipPlacement,
        manualShipPlacement,
        manual_attack,
        random_attack
    }
}

module.exports = Player;




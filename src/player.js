//const Ship = require("./ship")
const {Gameboard} = require("./gameboard.js")
const DIMENSIONS = 10;

function Player(){
    var gameboard = Gameboard();
    //var gameboard_set = false;
    function randomShipPlacement(){
        this.gameboard.randomly_place_ships();
    }
    function manualShipPlacement(ship, pos_arr){
        this.gameboard.placeShip(ship, pos_arr)
    }

    // function isGameboardSet(){
    //     console.log("number of ships placed thus far: " + this.gameboard.number_of_ships_played)
    //     if(this.gameboard.number_of_ships_played==5){
    //         return true
    //     }
    //     else{
    //         return false;
    //     }
    // }


    function manual_attack(opponent, arr){
        //if attack has not been made at that position opponent will receive attack. The opponent's board will record the misses or hits made on their ships. 
        if(this.gameboard.number_of_ships_played==5){
            var posX = arr[0]
            var posY = arr[1]
            return opponent.gameboard.receiveAttack(posX,posY)
        }
    }

    function random_attack(opponent){
        if(this.gameboard.number_of_ships_played==5){
            var index_i = Math.floor(Math.random()*(DIMENSIONS*DIMENSIONS));
            console.log("attack on opponent at index: "+ index_i)
            console.log("Get position at on the opponent's board at position: "+ JSON.stringify(opponent.gameboard.board[index_i].position))
            return opponent.gameboard.receiveAttack(opponent.gameboard.board[index_i].position[0],opponent.gameboard.board[index_i].position[1])
        }
    }

    return{
        gameboard,
        randomShipPlacement,
        manualShipPlacement,
        //isGameboardSet,
        manual_attack,
        random_attack
    }
}
module.exports = Player;




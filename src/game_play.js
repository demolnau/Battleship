//import Player from "/factories/player.js";
const Player = require("./factories/player")



// function play_a_round(player1, player2){
//     player1.random_attack(player2)
//     if(player2.gameboard.number_of_ships_sunk<5){
//         player2.random_attack(player1)
//     }
// }

// function determine_winner(player1,player2){
//     if(player1.gameboard.number_of_ships_sunk==5){
//         return player2
//     }
//     if(player2.gameboard.number_of_ships_sunk==5){
//         return player1
//     }
// }

// function play_a_game(){
//     var player1 = Player()
//     player1.name = "player1"
//     var player2 = Player()
//     player2.name = "player2"
//     var counter=0;
//     player1.randomShipPlacement();
//     //player2.randomShipPlacement();
//     player2.manualShipPlacement(player2.gameboard.ships[0],[[1,2],[1,3],[1,4],[1,5],[1,6]])
//     player2.manualShipPlacement(player2.gameboard.ships[1],[[2,3],[2,4],[2,5],[2,6]])
//     player2.manualShipPlacement(player2.gameboard.ships[2],[[8,5],[8,6],[8,7]])
//     player2.manualShipPlacement(player2.gameboard.ships[3],[[7,3],[8,3],[9,3]])
//     player2.manualShipPlacement(player2.gameboard.ships[4],[[4,4],[4,5]])
//     //play_a_round(player1, player2)
//     var positions_till_sunk = [];
//     for(let i=0; i<player2.gameboard.ships.length;i++){
//         positions_till_sunk.push(player2.gameboard.ships[i].position)
//     }
//     positions_till_sunk = positions_till_sunk.flat()
//     console.log("array of player2 ship positions: " + JSON.stringify(positions_till_sunk))

//     //console.log("Number of ships sunk on player1's board: "+player1.gameboard.number_of_ships_sunk)
//     // while(player1.gameboard.sunk_all_ships()==false && player2.gameboard.sunk_all_ships()==false){
//     //     //play_a_round(player1, player2)
//     //     counter++
//     // }
//     for(let i=0;i<positions_till_sunk.length;i++){
//         player1.manual_attack(player2, positions_till_sunk[i])
//         counter++
//     }
    
//     //alternating_moves();
//     var winner = determine_winner(player1,player2)
//     console.log(`${winner.name} has won after ${counter} rounds!`)
//     return winner
// }

function Game(){
    var counter = 0 
    var player1 = Player()
    var player2 = Player()

    function set_players_names(player1_name, player2_name){
        this.player1.name = player1_name
        this.player2.name = player2_name
    }
    
    function alternating_moves(player1, player2){
        while(player1.gameboard.number_of_ships_sunk<5 || player2.gameboard.number_of_ships_sunk<5){
            this.counter++;
            player1.random_attack(player2)
            //player2.random_attack(player1)
                if(player2.gameboard.number_of_ships_sunk<5){
                    player2.random_attack(player1)
                }
        }
    }
    function determine_winner(player1,player2){
        if(this.player1.gameboard.number_of_ships_sunk==5){
            return player2
        }
        else{
            return player1
        }
    }

    function play_a_game(){
        //var players = get_players("player1","player2")
        this.player1.randomShipPlacement();
        this.player2.randomShipPlacement();
        alternating_moves(this.player1, this.player2);
        var winner = this.determine_winner(this.player1,this.player2)
        console.log(`${winner.name} has won after ${this.counter} rounds!`)
        return winner
    }
    return{
        counter,
        player1,
        player2,
        set_players_names,
        alternating_moves,
        determine_winner,
        play_a_game
    }
}
module.exports = Game


//module.exports = determine_winner
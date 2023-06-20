import './styles.css'
const Player = require("./factories/player")

var player1 = Player()
var player2 = Player()
player1.name = "Player1"
player2.name = "Player2"

function get_selection(ship, starting_position, target_length, isVertical){
    var posX = Number(starting_position[0])
    var posY = Number(starting_position[1])
    possible_pos_array=[]
    possible_pos_array.push(starting_position)
    for(let i=1;i<target_length;i++){
                if(isVertical==true){
                    posX = posX+1
                    var possible_position = [posX,posY]
                    possible_pos_array.push(possible_position)
                }
                else{
                    posY = posY+1
                    var possible_position = [posX,posY]
                    possible_pos_array.push(possible_position)
                }
    }
    if(player1.gameboard.isPlacementPossible(ship,possible_pos_array,isVertical) == false){
        return
    }
    else{
        return possible_pos_array
    }
    
}


var my_grid = document.querySelector('.grid-container-mine')
var opponent_grid =document.querySelector('.grid-container-opponent')

var hit_me = player1.gameboard.position_of_hits
var missed_me = player1.gameboard.missed_shots

var hit_opponent = player2.gameboard.position_of_hits
var missed_opponent = player2.gameboard.missed_shots



var content = document.querySelector(".choices > .content")
var manual_placement = document.querySelector(".manual_placement")
var random_placement = document.querySelector(".random_placement")
var reset_button = document.createElement("button")
reset_button.classList.add("reset_button")
reset_button.innerHTML = "Reset"
var my_console =document.querySelector(".console > .text")
my_console.innerHTML = "Would you like to place your own ships manually or at random?"

var rotate_selection = document.createElement("button")
rotate_selection.innerHTML = "Rotate ship"
rotate_selection.classList.add("rotate_ship")

var next_selection = document.createElement("button")
next_selection.innerHTML = "Place next ship"
next_selection.classList.add("place_next_ship")

function create_opponent_board(){
    for(let i=1;i<DIMENSIONS+1; i++){
        for(let j=1;j<DIMENSIONS+1;j++){
            var item = document.createElement('div');
            item.className = "grid-item"
            item.style.gridRow= i +"/"+ "span 1";
            item.style.gridColumn= j +"/"+ "span 1 ";
            item.innerHTML=`${i-1},${j-1}`
            opponent_grid.append(item)
        }
    }
}

function create_my_board(){
    for(let m=1;m<DIMENSIONS+1; m++){
        for(let n=1;n<DIMENSIONS+1;n++){
            var item = document.createElement('div');
            //item.className = "item_"+m+", "+n+ " grid-item"
            item.className = "grid-item"
            item.style.gridRow= m +"/"+ "span 1";
            item.style.gridColumn= n +"/"+ "span 1 ";
            item.innerHTML=`${m-1},${n-1}`
            my_grid.append(item)
        }
    }
}

create_opponent_board()
create_my_board()
var my_grid_items = my_grid.querySelectorAll(":scope > .grid-item")
var opponent_grid_items = opponent_grid.querySelectorAll(":scope > .grid-item")
var selection = [] 
var current_ship ;
var target_length;
var isVertical = false;
var position = []
var isPlaced;

manual_placement.addEventListener("click", manually_place_ships_by_click);

random_placement.onclick = function() {
    content.innerHTML = ""
    my_console.innerHTML = ""
    player1.gameboard.randomly_place_ships()
    player1.gameboard.get_number_of_ships_placed()
    check_my_status()
    ready_to_play()
}





function manually_place_ships_by_click(){
    //right click to switch between vertical and horizontal placement options
    content.innerHTML = ""
    my_console.innerHTML = ""
    content.appendChild(reset_button)
    current_ship = player1.gameboard.ships[0]
    isPlaced=false
    get_position_loop()
    mouseover_loop()
    make_seleciton_loop()
    //get_next_ship()
}






function toggle_isVertical(to_tog){
if(to_tog==false){
    return true
}
else{
    return false
}
}



function get_position_loop(){
my_grid_items.forEach(function(item){
    item.addEventListener("mouseover",function(){
        get_position(item)
    }
    )
})
}


window.addEventListener('contextmenu',function(event){
    event.preventDefault();
    isVertical = toggle_isVertical(isVertical)
})


function mouseover_loop(){
    my_grid_items.forEach(function(item){
        item.addEventListener("mouseover", mouseover_selection)
    })
}

function get_position(item){
    var posX = Number(item.innerHTML[0])
    var posY = Number(item.innerHTML[2])
    position = [posX, posY]
    return position
}
function mouseover_selection(){
target_length = current_ship.ship_length;
    if(isPlaced==false){
        selection = get_selection(current_ship, position, target_length, isVertical)
        if(selection==undefined){
            remove_all_highlight()
        }
        else{
            highlight(selection)
        }
        return selection
    }
    else{
        return
    }
}

function highlight(arr){
    my_grid_items.forEach(function(item){
        position = get_position(item)
        if(JSON.stringify(arr).includes(position)){
            item.classList.add("hover_over")
        }
        else{
            item.classList.remove("hover_over")
        }
    })
}

function remove_all_highlight(){
    my_grid_items.forEach(function(item){
        item.classList.remove("hover_over")
    })
}

function make_selection(ship, arr, isVertical){
    if(isPlaced==false){
        remove_all_highlight()
        var results = player1.gameboard.placeShip(ship,arr,isVertical)
        isPlaced = true
        check_my_status()
        if(results){
            get_next_ship()
        }
    }
}


function make_seleciton_loop(){
my_grid_items.forEach(function(item){
    item.addEventListener("click", function(){
       make_selection(current_ship,selection,isVertical)
    }) 
})

}

function remove_mouseover(){
    my_grid_items.forEach(function(item){
        item.removeEventListener("mouseover", mouseover_selection)
    })
}

function get_next_ship(){
    player1.gameboard.number_of_ships_played++
    if(player1.gameboard.number_of_ships_played<5){
        current_ship = player1.gameboard.ships[player1.gameboard.number_of_ships_played]
        my_console.innerHTML = ""
        my_console.innerHTML = `Place your ${current_ship.name} . Right-click to rotate.`
        isPlaced = false
    }
    if(player1.gameboard.number_of_ships_played==5){
        console.log("You placed all your ships! Ready to play!")
        my_console.innerHTML = ""
        ready_to_play()
    }

}


function ready_to_play(){
    player2.gameboard.randomly_place_ships()
    player2.gameboard.get_number_of_ships_placed()
    my_console.innerHTML = "Now we are ready to play. Click on the opposing team's board to launch an attack."
    content.appendChild(reset_button)
    play_a_game()
}

reset_button.onclick = function(){
    location.reload();
}

function play_a_game(){
    opponent_grid_items.forEach(function(item){
        var posX = Number(item.innerHTML[0])
        var posY = Number(item.innerHTML[2])
        var position = [posX, posY]
        
            item.onclick = function(){
                my_console.innerHTML=""
                if(player1.gameboard.number_of_ships_sunk<5 && player2.gameboard.number_of_ships_sunk<5){
                    my_console.innerHTML ="Entered this loop on a click"
                    var result = player1.manual_attack(player2,position)
                    if(result!=undefined){
                        check_opponents_status(item)
                        if(result==true){
                            my_console.innerHTML = `Direct hit at [${item.innerHTML}] on opponent`
                            if(player2.gameboard.number_of_ships_sunk==5){
                                my_console.innerHTML  = `You are a winner!`
                                return
                            }
                        }
                        else{
                            my_console.innerHTML = `Attack at [${item.innerHTML}] missed opponent`
                        }
                        //now opponent makes a move
                        player2.smart_attack(player1)
                        check_my_status()
                        if(player1.gameboard.number_of_ships_sunk==5){
                            my_console.innerHTML  = `You lost! Click reset to play again!`
                            return
                        }
                        
                    }
            
                    else{
                        my_console.innerHTML = `Attack at [${item.innerHTML}] is not allowed \n Number of ships played: ${player1.gameboard.number_of_ships_played} \n Number of my ships sunk: ${player1.gameboard.number_of_ships_sunk} `
                    }
            }
            else{
                my_console.innerHTML = "No more moves are allowed. Please reset your game if you want to continue."
                return
            }
            }    
    })
}

function check_my_status(){
    my_grid_items.forEach(function(item){
        var posX = Number(item.innerHTML[0])
        var posY = Number(item.innerHTML[2])
        var position = [posX, posY]
        var my_ships = player1.gameboard.get_position_of_ships()
        var my_sunk_ships = player1.gameboard.get_sunk_ship_positions()
        //console.log("My ships" + JSON.stringify(my_ships))
        if(JSON.stringify(my_ships).includes(JSON.stringify(position))){
            item.classList.add("ship_present")  
        }
        if(JSON.stringify(hit_me).includes(JSON.stringify(position))){
            item.classList.add("hit")
        }
        if(JSON.stringify(missed_me).includes(JSON.stringify(position))){
            item.classList.add("miss")
        }
        if(JSON.stringify(my_sunk_ships).includes(JSON.stringify(position))){
            my_ship_is_sunk(my_sunk_ships)
        }
    })
}


function check_opponents_status(item){
    var posX = Number(item.innerHTML[0])
    var posY = Number(item.innerHTML[2])
    var position = [posX, posY]
    var sunk_ships_opponents = player2.gameboard.get_sunk_ship_positions()

    if(JSON.stringify(sunk_ships_opponents).includes(JSON.stringify(position))){
        //console.log(JSON.stringify(sunk_ships_opponents))
        opponent_ship_is_sunk(sunk_ships_opponents)
    }
    if(JSON.stringify(hit_opponent).includes(JSON.stringify(position))){
        item.classList.add("hit")
    }
    if(JSON.stringify(missed_opponent).includes(JSON.stringify(position))){
        item.classList.add("miss")
    }
}

function opponent_ship_is_sunk(arr){
opponent_grid_items.forEach(function(item){
    var posX = Number(item.innerHTML[0])
    var posY = Number(item.innerHTML[2])
    var position = [posX, posY]
    if(JSON.stringify(arr).includes(JSON.stringify(position))){
        item.classList.remove("hit")
        item.classList.add("sunk")
    }
    })
}

function my_ship_is_sunk(arr){
    my_grid_items.forEach(function(item){
        var posX = Number(item.innerHTML[0])
        var posY = Number(item.innerHTML[2])
        var position = [posX, posY]
        if(JSON.stringify(arr).includes(JSON.stringify(position))){
            item.classList.remove("hit")
            item.classList.add("sunk")
        }
    })
}
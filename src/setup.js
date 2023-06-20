var my_grid = document.querySelector('.grid-container-mine')
var opponent_grid =document.querySelector('.grid-container-opponent')
var DIMENSIONS = 10;

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

function setup_boards(){
    create_opponent_board()
    create_my_board()
    var my_console = document.querySelector(".console > .text")
    my_console.innerHTML = "Would you like to place your own ships manually or at random?"
}

module.exports = setup_boards


let scoreTag = document.getElementById("score");
let blockBox = document.getElementById("blockBox");
let tileMap = document.getElementById("woodoku");

let score = 0;
let combo = 1;

let blockBoxList = [
    document.getElementById("blockBox-0"),
    document.getElementById("blockBox-1"),
    document.getElementById("blockBox-2"),
];

setUpTileMap();

function setUpGame(){

    //change Display
    scoreTag.style.display = "";
    blockBox.style.display = "";
    scoreTag.style.color = "";

    //init gameInfo
    score = 0;
    combo = 1;

    //init Tag
    updateScore();
    setBlocks();
    resetTileMap();
}

function updateScore(){
    scoreTag.innerText = score;
}

function setBlocks(){
    document.querySelectorAll(".block").forEach(b => b.remove());
    setBlock(parseInt(Math.random()*blockList.length),0);
    setBlock(parseInt(Math.random()*blockList.length),1);
    setBlock(parseInt(Math.random()*blockList.length),2);
}

function setBlock(index,num){
    let block = getBlock(index);
    let clickBox = blockBoxList[num].querySelector(".clickBox");

    block.className = "block";
    clickBox.appendChild(block);

    //down event
    clickBox.addEventListener("mousedown",function(e) {
        pickWithMouse(e,block);
    });
    clickBox.addEventListener("touchstart",function(e) {
        pickWithTouch(e,block);
    });

}

function setUpTileMap(){
    
    for(let i = 0; i < 9; i++){

        let rowLine = document.createElement("tr");

        for(let j = 0; j < 9; j++){

            let tile = document.createElement("td");

            tile.id = `${i} - ${j}`;
            tile.className = "inTd";
            
            if(parseInt(i/3)%2 == 0){
                if(parseInt(j/3)%2 != 0){
                    tile.classList.add("otherBaseColorTile");
                }
            }
            else{
                if(parseInt(j/3)%2 == 0){
                    tile.classList.add("otherBaseColorTile");
                }
            }

            if(i%3 == 2){
                tile.style.borderBottomWidth = "5px";
            }
            else if(i%3 == 0){
                tile.style.borderTopWidth = "5px";
            }

            if(j%3 == 2){
                tile.style.borderRightWidth = "5px";
            }
            else if(j%3 == 0){
                tile.style.borderLeftWidth = "5px";
            }

            rowLine.appendChild(tile);
        }

        rowLine.className = "inTr";
        tileMap.appendChild(rowLine);
    }
}

function resetTileMap(){
    for(let row = 0; row < 9; row++){
        for(let column = 0; column < 9; column++){
            getTile(row,column).classList.remove("fill");
        }
    }
}

function setPosition(tag,x,y){
    tag.style.top = `${y}px`;
    tag.style.left = `${x}px`;
}

function getTile(row,column){
    return document.getElementById(`${row} - ${column}`);
}
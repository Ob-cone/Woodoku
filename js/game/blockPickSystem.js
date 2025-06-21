let mouseX = 0;
let mouseY = 0;
let position = [0,0];
let findList = [];
let removeList = new Set();

function pickWithMouse(e,block){
    mouseX = e.clientX;
    mouseY = e.clientY;
    pick(block);
}

function pickWithTouch(e,block){
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
    pick(block);
}

function pick(block){
    let blockPosition = block.getBoundingClientRect();
    position = [blockPosition.x-mouseX,blockPosition.y-mouseY];
    block.classList.add("pick");
    setPosition(block,mouseX + position[0],mouseY + position[1])

}

function pickEnd(block){

    block.classList.remove("pick");
    block.style.top = "";
    block.style.left = "";

    if(findList.length != 0){

        score += findList.length;

        score += parseInt((removeList.size **1.1) * 2 * Math.sqrt(combo));
        combo += removeList.size == 0 ? -combo + 1 : 1;

        updateScore();

        findList.forEach(tile => {
            tile.classList.remove("findBlock");
            tile.classList.add("fill");
        });
        
        removeList.forEach(tile => {
            tile.classList.remove("fill");
            tile.classList.remove("removeTile");
        });
        
        findList = [];
        block.remove();

        let blocks = document.querySelectorAll(".block");
        if(blocks.length == 0){
            setBlocks();
            blocks = document.querySelectorAll(".block");
        }

        blocks.forEach(b => {
            if(isFillAble(b.info)){
                b.classList.remove("notFillBlock");
                b.querySelectorAll("td").forEach(t => {
                    t.classList.remove("notFillAble");
                })
            }
            else{
                b.classList.add("notFillBlock");
                b.querySelectorAll("td").forEach(t => {
                    if(t.classList.contains("fill")){
                        t.classList.add("notFillAble");   
                    }
                })
            }
        });

        if(blocks.length == document.querySelectorAll(".notFillBlock").length){
            updateBestScore(score);
            gameOver();
        }

    }
}

function moveUpdate(){
    let pick = document.querySelector(".pick");

    if(pick == null) return;

    setPosition(pick,mouseX + position[0],mouseY + position[1])
    findBlock();

    removeList = getRemoveTiles();

    pick.querySelectorAll("td").forEach(tile => tile.classList.remove("removeTile"));
    
    removeList.forEach(tile => {
        if(tile.classList.contains("findBlock")){
            let changeTile = Array.from(pick.querySelectorAll("td"))
            .filter(blt => blt.position && blt.position[0] == tile.tileNum[0] && blt.position[1] == tile.tileNum[1]);
            changeTile[0].classList.add("removeTile");
        }
        else{
            tile.classList.add("removeTile")
        }
    });
}

function outPickEnd(){
    let picks = document.querySelectorAll(".pick");
    for(let i = 0; i < picks.length; i++){
        pickEnd(picks[i]);
    }
}

//
function getRemoveTiles(){

    let findList = new Set();
    let boxList = [];

    for(let i = 0; i < 9; i++){

        let rowLine = [];
        let columnLine = [];

        for(let j = 0; j < 9; j++){

            let rowTile = getTile(i,j);
            if(rowTile.classList.contains("fill") || rowTile.classList.contains("findBlock")){
                rowLine.push(rowTile);
                if(boxList[3 * parseInt(i/3) + parseInt(j/3)] == null){
                    boxList[3 * parseInt(i/3) + parseInt(j/3)] = []
                }
                boxList[3 * parseInt(i/3) + parseInt(j/3)].push(rowTile);

            }
            else {
                rowLine.push(null);
            }

            let columnTile = getTile(j,i);
            if(columnTile.classList.contains("fill") || columnTile.classList.contains("findBlock")){
                columnLine.push(columnTile);
            }
            else {
                columnLine.push(null);
            }

        }

        if(!rowLine.includes(null)){
            rowLine.forEach(tile => {
                findList.add(tile);
            });
        }
        if(!columnLine.includes(null)){
            columnLine.forEach(tile => {
                findList.add(tile);
            });
        }

    }

    boxList.forEach(box => {
        if(box.length == 9){
            box.forEach(tile => {
                findList.add(tile);
            });
        }
    });

    return findList;
}

//
function isFillAble(block){
    let blockShapes = block.shape;
    for(let i = 0; i< 10-block.size[0];i++){
        for(let j = 0; j< 10-block.size[1];j++){
            let isAble = true;
            for(let s = 0;s < blockShapes.length;s++){
                let tile = getTile(i+blockShapes[s][0],j+blockShapes[s][1]);
                if(!tile || tile.classList.contains("fill")){
                    isAble = false;
                    break;
                }
            }
            if(isAble){
                return true;
            }
        }
    }
    return false;
}

//
function getPosition(tag){
    return [parseFloat(tag.style.left),parseFloat(tag.style.top)]
}

//
function findBlock(){
    let pick = document.querySelector(".pick");
    let pickPosition = getPosition(pick);
    let find;
    findList = [];
    for(let i =0;i < 9;i++){
        for(let j = 0;j < 9;j++){
            let tile = getTile(i,j);
            let tilePosition = tile.getBoundingClientRect();
            if(tilePosition.x - tilePosition.width*0.5 < pickPosition[0] && pickPosition[0] < tilePosition.x + tilePosition.width*0.5 &&
            tilePosition.y - tilePosition.height * 0.5 < pickPosition[1] && pickPosition[1] < tilePosition.y + tilePosition.height * 0.5){
                find = [i,j];
            }
            if(tile.classList.contains("findBlock")){
                tile.classList.remove("findBlock");
                tile.tileNum = [];
            }
            if(tile.classList.contains("removeTile")){
                tile.classList.remove("removeTile");
            }
        }
    }
    if(find != null && getTile(find[0]+pick.info.size[0]-1,find[1]+pick.info.size[1]-1) != null){
        for(let i = 0; i <pick.info.shape.length; i++){
            let element = pick.info.shape[i];
            let fillTile = getTile(find[0]+element[0],find[1]+element[1]);
            if(fillTile != null && !fillTile.classList.contains("fill")){
                findList.push(fillTile);
            }
            else{
                findList = [];
                return;
            }
        }
        findList.forEach((element,index) => {
            element.classList.add("findBlock");
            element.tileNum = pick.info.shape[index];
        });
    }
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  moveUpdate();
});

document.addEventListener('touchmove', (e) => {
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
    moveUpdate();
});

document.addEventListener("mouseup",function() {
    outPickEnd();
});

document.addEventListener("touchend",function() {
    outPickEnd();
});
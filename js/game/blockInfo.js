
function Block(size,shape){
    this.size = size;
    this.shape = shape;
}

let blockList = [
    //기본형
    new Block(
        [1,1],
        [[0,0]]
    ),
    new Block(
        [1,2],
        [[0,0],[0,1]]
    ),
    new Block(
        [1,3],
        [[0,0],[0,1],[0,2]]
    ),
    new Block(
        [1,4],
        [[0,0],[0,1],[0,2],[0,3]]
    ),
    new Block(
        [1,5],
        [[0,0],[0,1],[0,2],[0,3],[0,4]]
    ),
    new Block(
        [2,1],
        [[0,0],[1,0]]
    ),
    new Block(
        [3,1],
        [[0,0],[1,0],[2,0]]
    ),
    new Block(
        [4,1],
        [[0,0],[1,0],[2,0],[3,0]]
    ),
    new Block(
        [5,1],
        [[0,0],[1,0],[2,0],[3,0],[4,0]]
    ),
    //정사각형
    new Block(
        [2,2],
        [[0,0],[0,1],[1,0],[1,1]]
    ),
    new Block(
        [3,3],
        [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]
    ),
    //L각형
    new Block(
        [2,2],
        [[0,0],[0,1],[1,0]]
    ),
    new Block(
        [2,2],
        [[0,0],[0,1],[1,1]]
    ),
    new Block(
        [2,2],
        [[1,0],[1,1],[0,0]]
    ),
    new Block(
        [2,2],
        [[1,0],[1,1],[0,1]]
    ),

    new Block(
        [3,3],
        [[0,0],[1,0],[2,0],[2,1],[2,2]]
    ),
    new Block(
        [3,3],
        [[0,2],[1,2],[2,0],[2,1],[2,2]]
    ),
    new Block(
        [3,3],
        [[0,0],[1,0],[2,0],[0,1],[0,2]]
    ),
    new Block(
        [3,3],
        [[0,0],[0,1],[0,2],[1,2],[2,2]]
    ),

    new Block(
        [3,2],
        [[0,0],[1,0],[2,0],[2,1]]
    ),
    new Block(
        [3,2],
        [[0,1],[1,1],[2,0],[2,1]]
    ),
    new Block(
        [3,2],
        [[0,0],[1,0],[2,0],[0,1]]
    ),
    new Block(
        [3,2],
        [[0,0],[0,1],[1,1],[2,1]]
    ),

    new Block(
        [2,3],
        [[0,0],[0,1],[0,2],[1,0]]
    ),
    new Block(
        [2,3],
        [[0,0],[0,1],[0,2],[1,2]]
    ),
    new Block(
        [2,3],
        [[1,0],[1,1],[1,2],[0,0]]
    ),
    new Block(
        [2,3],
        [[1,0],[1,1],[1,2],[0,2]]
    ),
    //T자형
    new Block(
        [2,3],
        [[0,0],[0,1],[0,2],[1,1]]
    ),
    new Block(
        [2,3],
        [[1,0],[1,1],[1,2],[0,1]]
    ),
    new Block(
        [3,3],
        [[0,0],[0,1],[0,2],[1,1],[2,1]]
    ),
    new Block(
        [3,3],
        [[2,0],[2,1],[2,2],[1,1],[0,1]]
    ),
    new Block(
        [3,3],
        [[0,0],[1,0],[1,1],[1,2],[2,0]]
    ),
    new Block(
        [3,3],
        [[0,2],[1,0],[1,1],[1,2],[2,2]]
    ),
    //z자형
    new Block(
        [2,3],
        [[0,0],[0,1],[1,1],[1,2]]
    ),
    new Block(
        [2,3],
        [[0,1],[0,2],[1,0],[1,1]]
    ),
    new Block(
        [3,2],
        [[0,0],[1,0],[1,1],[2,1]]
    ),
    new Block(
        [3,2],
        [[0,1],[1,0],[1,1],[2,0]]
    ),
    //ㄷ 자형
    new Block(
        [2,3],
        [[0,0],[0,1],[0,2],[1,0],[1,2]]
    ),
    new Block(
        [2,3],
        [[0,0],[0,2],[1,0],[1,1],[1,2]]
    ),
    new Block(
        [3,2],
        [[0,0],[0,1],[1,0],[2,0],[2,1]]
    ),
    new Block(
        [3,2],
        [[0,0],[0,1],[1,1],[2,0],[2,1]]
    ),
    //플러스
    new Block(
        [3,3],
        [[0,1],[1,0],[1,1],[1,2],[2,1]]
    ),
    //대각선
    new Block(
        [3,3],
        [[0,0],[1,1],[2,2]]
    ),
    new Block(
        [3,3],
        [[0,2],[1,1],[2,0]]
    ),
];

function getBlock(index){

    let block = document.createElement("table");
    let blockInfo = blockList[index];

    for(let i = 0; i < blockInfo.size[0]; i++){

        let rowLine = document.createElement("tr");

        for(let j = 0; j< blockInfo.size[1]; j++){
            let tile = document.createElement("td");
            let position = [i,j];
            if(isFillTile(blockInfo.shape,position)){
                tile.className = "fill";
                tile.position = position;
            }

            rowLine.appendChild(tile);
        }

        block.appendChild(rowLine);
    }

    block.info = blockInfo;
    return block;
}

function isFillTile(shape,position){
    for(let i = 0; i < shape.length; i++){
        let dot = shape[i];

        if(dot[0] == position[0] && dot[1] == position[1]){
            return true;
        }

    }

    return false;
}
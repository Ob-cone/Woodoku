
let urlParms = new URLSearchParams(window.location.search);
let score = urlParms.get('score');
score = decodeURIComponent(score);
score = atob(score);

let tilemap = urlParms.get("tilemap");
tilemap = decodeURIComponent(tilemap);
tilemap = atob(tilemap);
tilemap = Uint8Array.from(tilemap, c => c.charCodeAt(0));
tilemap = decompress(tilemap);

let blocks = urlParms.get("blocks");
blocks = decodeURIComponent(blocks);
blocks = atob(blocks);
blocks = Uint8Array.from(blocks, c => c.charCodeAt(0));

let blocksDiv = document.getElementById("blocks");
blocks.forEach(b => {
    let block = document.createElement("div");
    block.className = "block blockDisplay";
    block.appendChild(getBlock(b))
    blocksDiv.appendChild(block);
});

let time = urlParms.get("time");
let timeDiv = document.getElementById("time");
if(time != null){
    time = decodeURIComponent(time);
    time = atob(time);
    timeDiv.innerText = time;
}

function decompress(bytes) {
    const bits = [];
    for (let i = 0; i < 81; i++) {
        const byteIndex = Math.floor(i / 8);
        const bitIndex = 7 - (i % 8);
        const bit = (bytes[byteIndex] >> bitIndex) & 1;
        bits.push(bit);
    }
    return bits;
}

let woodoku = document.getElementById("woodoku");
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

            if(tilemap[9*i+j] == 1){
                tile.classList.add("fill");
            }
            rowLine.appendChild(tile);
        }

        rowLine.className = "inTr";
        woodoku.appendChild(rowLine);
    }
}

setUpTileMap();
document.getElementById("scoreTitle").innerText = `Score: ${score}`;

let themeButton = document.getElementById("theme");
let themeIcon = document.getElementById("themeIcon");
let mainSizeStyle = document.getElementById("mainSize")
let gameSizeStyle = document.getElementById("gameSize")
let isDarkMod = false;

themeButton.addEventListener("click",function() {
    isDarkMod = !isDarkMod;
    if(!isDarkMod){
        this.className = "themeNotChecked";
        themeIcon.style.transform = "";
        themeIcon.style.backgroundColor = "";
        mainStyle.href = "css/lightMod/mainLight.css";
        gameStyle.href = "css/lightMod/gameLight.css";
    }
    else{
        this.classList = "themeChecked";
        console.log(themeIcon.getBoundingClientRect());
        themeIcon.style.transform = `translateX(${themeIcon.getBoundingClientRect().width}px)`;
        themeIcon.style.backgroundColor = "yellow";
        mainStyle.href = "css/darkMod/mainDark.css";
        gameStyle.href = "css/darkMod/gameDark.css";
    }
});

function changeSize(){
    let width = window.innerWidth;
    if(width < 450){
        mainSizeStyle.href = "css/smallMod/main.css";
        gameSizeStyle.href = "css/smallMod/game.css";
    }
    else{
        mainSizeStyle.href = "css/defaultMod/main.css";
        gameSizeStyle.href = "css/defaultMod/game.css";
    }
}

window.addEventListener("resize",function() {
    changeSize();
});

let title = document.getElementById("title");
title.onclick = () => {
    location.href = "index.html";
};
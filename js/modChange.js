let modDiv = document.getElementById("mod");
let leftButton = document.getElementById("leftMod");
let rightButton = document.getElementById("rightMod");
let scoreDiv = document.getElementById("bestScore");
let timerH1 = document.getElementById("time");

let modList = ["Default","TimeAttack"];
let modScoreList = [0,0];
let nowMod = 0;

function changeMod(i){
    modScoreList[nowMod] = bestScore;
    nowMod = (modList.length+nowMod+i)%modList.length;
    modDiv.innerText = modList[nowMod];
    bestScore = modScoreList[nowMod]
    scoreDiv.innerText = `${bestScore}`;

    timerH1.style.display = nowMod === 1 ? "":"none";

}

leftButton.addEventListener("click",() => changeMod(-1));
rightButton.addEventListener("click",() => changeMod(1));

function gameOver(){
    let gameOverState = document.getElementById("gameOverState");
    gameOverState.style.display = "";
    scoreTag.style.color = "rgba(1,1,1,0)";
    let bestScoreTag = document.getElementById("gameOverBestScore")
    bestScoreTag.innerText = `Best Score: ${bestScore}`;
    let gameOverScoreTag = document.getElementById("gameOverScore");
    gameOverScoreTag.innerText = score;
}

let againButton = document.getElementById("againButton");

againButton.onmouseover = function() {
    this.style.backgroundColor = "#F261AD";
};

againButton.onmouseout = function() {
    this.style.backgroundColor = "pink";
}

againButton.onclick = function() {
    let mainState = document.getElementById("gameOverState");
    mainState.style.display = "none";

    setUpGame();
}

let mainButton = document.getElementById("mainButton");

mainButton.onmouseover = function() {
    this.style.backgroundColor = "pink";
};

mainButton.onmouseout = function() {
    this.style.backgroundColor = "white";
}

mainButton.onclick = function() {
    let mainState = document.getElementById("mainState");
    mainState.style.display = "flex";

    let gameState = document.getElementById("gameState");
    gameState.style.display = "none";

    let gameOverState = document.getElementById("gameOverState");
    gameOverState.style.display = "none";
}
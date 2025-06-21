let bestScore = 0;
let bestScoreTag = document.getElementById("bestScore");

function updateBestScore(score){
    bestScore = Math.max(score,bestScore);
    bestScoreTag.innerText = bestScore;
}